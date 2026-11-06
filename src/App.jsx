import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MenuBar } from './components/MenuBar.jsx';
import { DesktopIcon } from './components/DesktopIcon.jsx';
import { RetroWindow } from './components/RetroWindow.jsx';
import { ProfileWindow } from './components/ProfileWindow.jsx';
import { ExperienceWindow } from './components/ExperienceWindow.jsx';
import { TechnologiesWindow } from './components/TechnologiesWindow.jsx';
import { ProjectsWindow } from './components/ProjectsWindow.jsx';
import { ProjectDetailWindow } from './components/ProjectDetailWindow.jsx';
import { ContactWindow } from './components/ContactWindow.jsx';
import { MusicWindow } from './components/MusicWindow.jsx';
import { tracks } from './data/music.js';
import { profile } from './data/portfolio.js';
import { useMusicPlayer } from './hooks/useMusicPlayer.js';
import { assetPath } from './utils/assets.js';

const COMPACT_QUERY = '(max-width: 760px)';
const ICON_GUTTER = 140;
const WINDOW_MARGIN = 12;
const MIN_WINDOW_WIDTH = 280;

const windowDefinitions = {
  // Fica primeiro para abrir atrás das demais janelas quando a tela for estreita.
  music: {
    title: 'Player',
    defaultGeometry: { x: 900, y: 70, width: 320, height: 200 },
    defaultOpen: true,
    compactDefaultOpen: false,
  },
  profile: {
    title: `Sobre ${profile.displayName}`,
    defaultGeometry: { x: 150, y: 70, width: 720, height: 500 },
    defaultOpen: true,
  },
  experience: {
    title: 'Experiência',
    defaultGeometry: { x: 300, y: 40, width: 640, height: 580 },
    defaultOpen: false,
  },
  technologies: {
    title: 'Tecnologias',
    defaultGeometry: { x: 180, y: 90, width: 560, height: 600 },
    defaultOpen: false,
  },
  projects: {
    title: 'Projetos',
    defaultGeometry: { x: 620, y: 60, width: 680, height: 600 },
    defaultOpen: false,
  },
  contact: {
    title: 'Contato',
    defaultGeometry: { x: 820, y: 160, width: 380, height: 245 },
    defaultOpen: false,
  },
  projectDetail: {
    title: 'Detalhes do Projeto',
    defaultGeometry: { x: 400, y: 50, width: 540, height: 620 },
    defaultOpen: false,
  },
};

const desktopIcons = [
  { id: 'profile', icon: 'desktop/about-retro.png', label: 'Sobre Mim' },
  { id: 'experience', icon: 'desktop/skills-retro.png', label: 'Experiência' },
  { id: 'projects', icon: 'desktop/projects-retro.png', label: 'Projetos' },
  { id: 'technologies', icon: 'desktop/technologies-retro.png', label: 'Tecnologias' },
  { id: 'resume', icon: 'desktop/resume-retro.png', label: 'Currículo.pdf', download: profile.resume },
  { id: 'contact', icon: 'desktop/contact-retro.png', label: 'Contato' },
  { id: 'music', icon: 'desktop/music-retro.png', label: 'Player' },
];

function createInitialWindows(compact) {
  return Object.fromEntries(
    Object.entries(windowDefinitions).map(([id, definition], index) => [
      id,
      {
        ...definition.defaultGeometry,
        open: compact ? (definition.compactDefaultOpen ?? definition.defaultOpen) : definition.defaultOpen,
        minimized: false,
        maximized: false,
        custom: false,
        focusToken: 0,
        zIndex: 10 + index,
      },
    ]),
  );
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max));
}

// Calculada a cada render para que as janelas sempre caibam na área de trabalho,
// sem perder a posição original quando a tela volta a crescer.
function fitToDesktop(state, desktop) {
  if (state.maximized) return { x: 0, y: 0, width: desktop.width, height: desktop.height };

  const margin = state.custom ? 0 : WINDOW_MARGIN;
  const left = state.custom ? 0 : ICON_GUTTER;
  const width = Math.min(state.width, Math.max(desktop.width - left - margin, MIN_WINDOW_WIDTH), desktop.width);
  const height = Math.min(state.height, desktop.height - margin * 2);

  return {
    x: clamp(state.x, Math.min(left, desktop.width - width), Math.max(desktop.width - width - margin, 0)),
    y: clamp(state.y, margin, Math.max(desktop.height - height - margin, margin)),
    width,
    height,
  };
}

function getTopWindow(windows) {
  const visible = Object.entries(windows).filter(([, state]) => state.open && !state.minimized);
  if (visible.length === 0) return null;
  return visible.reduce((top, entry) => (entry[1].zIndex > top[1].zIndex ? entry : top))[0];
}

function getNextZ(windows) {
  return Math.max(...Object.values(windows).map((state) => state.zIndex)) + 1;
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = () => setMatches(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}

function useElementSize(ref) {
  const [size, setSize] = useState(null);

  useLayoutEffect(() => {
    const element = ref.current;
    const measure = () => setSize({ width: element.clientWidth, height: element.clientHeight });

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);

    return () => observer.disconnect();
  }, [ref]);

  return size;
}

export default function App() {
  const compact = useMediaQuery(COMPACT_QUERY);
  const desktopRef = useRef(null);
  const desktopSize = useElementSize(desktopRef);
  const [windows, setWindows] = useState(() => createInitialWindows(window.matchMedia(COMPACT_QUERY).matches));
  const music = useMusicPlayer(tracks);
  const [selectedProject, setSelectedProject] = useState(null);
  const returnFocusTo = useRef({});
  const pendingFocus = useRef(null);

  const topWindow = getTopWindow(windows);

  function updateWindow(id, changes) {
    setWindows((current) => ({
      ...current,
      [id]: { ...current[id], ...changes },
    }));
  }

  function bringToFront(id) {
    setWindows((current) =>
      getTopWindow(current) === id
        ? current
        : { ...current, [id]: { ...current[id], zIndex: getNextZ(current) } },
    );
  }

  function openWindow(id) {
    returnFocusTo.current[id] = document.activeElement;
    setWindows((current) => ({
      ...current,
      [id]: {
        ...current[id],
        open: true,
        minimized: false,
        zIndex: getNextZ(current),
        focusToken: current[id].focusToken + 1,
      },
    }));
  }

  function closeWindow(id) {
    if (id === 'music') music.stop();
    pendingFocus.current = returnFocusTo.current[id];
    updateWindow(id, { open: false, minimized: false, maximized: false });
  }

  function minimizeWindow(id) {
    pendingFocus.current = returnFocusTo.current[id];
    updateWindow(id, { minimized: true });
  }

  function selectProject(project) {
    setSelectedProject(project);
    openWindow('projectDetail');
  }

  // Devolve o foco ao elemento que abriu a janela, depois que ela sai da tela.
  useEffect(() => {
    const element = pendingFocus.current;
    pendingFocus.current = null;
    if (element?.isConnected) element.focus({ preventScroll: true });
  }, [windows]);

  useEffect(() => {
    if (!topWindow) return undefined;

    function handleKeyDown(event) {
      if (event.key === 'Escape') closeWindow(topWindow);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [topWindow]);

  function renderWindow(id) {
    if (id === 'profile') return <ProfileWindow onClose={() => closeWindow('profile')} />;
    if (id === 'experience') return <ExperienceWindow />;
    if (id === 'technologies') return <TechnologiesWindow />;
    if (id === 'projects') return <ProjectsWindow onSelectProject={selectProject} />;
    if (id === 'contact') return <ContactWindow />;
    if (id === 'music') return <MusicWindow player={music} />;
    if (id === 'projectDetail') return <ProjectDetailWindow project={selectedProject} />;
    return null;
  }

  const minimizedWindows = Object.entries(windows).filter(([, state]) => state.open && state.minimized);

  return (
    <div className="portfolio-os">
      <MenuBar onOpen={openWindow} musicPlaying={music.playing} />
      <audio {...music.audioElement} />
      <main className="desktop" ref={desktopRef} aria-label="Área de trabalho do portfólio">
        <div className="desktop-icons" aria-label="Atalhos" inert={compact && topWindow !== null}>
          {desktopIcons.map((item) => (
            <DesktopIcon
              key={item.id}
              icon={item.icon}
              label={item.label}
              downloadHref={item.download && assetPath(item.download)}
              onOpen={() => openWindow(item.id)}
            />
          ))}
        </div>

        {desktopSize && (
          <div className="windows-layer">
            {Object.entries(windowDefinitions).map(([id, definition]) => {
              const state = windows[id];

              if (!state.open || state.minimized) return null;

              return (
                <RetroWindow
                  key={id}
                  id={id}
                  title={id === 'projectDetail' && selectedProject ? selectedProject.title : definition.title}
                  geometry={fitToDesktop(state, desktopSize)}
                  zIndex={state.zIndex}
                  active={topWindow === id}
                  compact={compact}
                  maximized={state.maximized}
                  focusToken={state.focusToken}
                  onFocus={() => bringToFront(id)}
                  onClose={() => closeWindow(id)}
                  onMinimize={() => minimizeWindow(id)}
                  onToggleMaximize={() => updateWindow(id, { maximized: !state.maximized })}
                  onDragStop={(x, y) => updateWindow(id, { x, y, custom: true })}
                  onResizeStop={(width, height, x, y) => updateWindow(id, { width, height, x, y, custom: true })}
                >
                  {renderWindow(id)}
                </RetroWindow>
              );
            })}
          </div>
        )}
      </main>

      {!compact && minimizedWindows.length > 0 && (
        <footer className="dock" aria-label="Janelas minimizadas">
          {minimizedWindows.map(([id]) => (
            <button className="dock__item" type="button" key={id} onClick={() => openWindow(id)}>
              {windowDefinitions[id].title}
            </button>
          ))}
        </footer>
      )}
    </div>
  );
}
