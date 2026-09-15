import { useEffect, useMemo, useState } from 'react';
import { MenuBar } from './components/MenuBar.jsx';
import { DesktopIcon } from './components/DesktopIcon.jsx';
import { RetroWindow } from './components/RetroWindow.jsx';
import { ProfileWindow } from './components/ProfileWindow.jsx';
import { TechnologiesWindow } from './components/TechnologiesWindow.jsx';
import { ProjectsWindow } from './components/ProjectsWindow.jsx';
import { ProjectDetailWindow } from './components/ProjectDetailWindow.jsx';
import { ContactWindow } from './components/ContactWindow.jsx';
import { ResumeWindow } from './components/ResumeWindow.jsx';

const windowDefinitions = {
  profile: {
    title: 'Sobre Joao Marcelo',
    icon: 'desktop/about-retro.png',
    label: 'Sobre Mim',
    defaultGeometry: { x: 150, y: 104, width: 720, height: 475 },
    defaultOpen: true,
  },
  technologies: {
    title: 'Tecnologias',
    icon: 'desktop/technologies-retro.png',
    label: 'Tecnologias',
    defaultGeometry: { x: 180, y: 370, width: 520, height: 430 },
    defaultOpen: false,
  },
  projects: {
    title: 'Projetos',
    icon: 'desktop/projects-retro.png',
    label: 'Projetos',
    defaultGeometry: { x: 700, y: 310, width: 650, height: 500 },
    defaultOpen: false,
  },
  contact: {
    title: 'Contato',
    icon: 'desktop/contact-retro.png',
    label: 'Contato',
    defaultGeometry: { x: 820, y: 160, width: 380, height: 245 },
    defaultOpen: false,
  },
  resume: {
    title: 'Currículo',
    icon: 'desktop/resume-retro.png',
    label: 'Currículo.pdf',
    defaultGeometry: { x: 500, y: 230, width: 360, height: 210 },
    defaultOpen: false,
  },
  projectDetail: {
    title: 'Detalhes do Projeto',
    defaultGeometry: { x: 500, y: 220, width: 470, height: 300 },
    defaultOpen: false,
  },
};

function createInitialWindows() {
  return Object.fromEntries(
    Object.entries(windowDefinitions).map(([id, definition], index) => [
      id,
      {
        ...definition.defaultGeometry,
        open: definition.defaultOpen,
        minimized: false,
        zIndex: 10 + index,
      },
    ]),
  );
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = () => setMatches(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}

export default function App() {
  const compact = useMediaQuery('(max-width: 760px)');
  const [windows, setWindows] = useState(createInitialWindows);
  const [activeWindow, setActiveWindow] = useState('profile');
  const [topZ, setTopZ] = useState(30);
  const [selectedProject, setSelectedProject] = useState(null);
  const desktopIconOrder = ['profile', 'technologies', 'projects', 'resume', 'contact'];

  const desktopIcons = useMemo(
    () =>
      desktopIconOrder.map((id) => {
        const definition = windowDefinitions[id];

        return {
          id,
          icon: definition.icon,
          label: definition.label,
        };
      }),
    [],
  );

  function updateWindow(id, changes) {
    setWindows((current) => ({
      ...current,
      [id]: {
        ...current[id],
        ...changes,
      },
    }));
  }

  function bringToFront(id) {
    setTopZ((current) => {
      const nextZ = current + 1;
      updateWindow(id, { zIndex: nextZ });
      return nextZ;
    });
    setActiveWindow(id);
  }

  function openWindow(id) {
    setTopZ((current) => {
      const nextZ = current + 1;
      updateWindow(id, { open: true, minimized: false, zIndex: nextZ });
      return nextZ;
    });
    setActiveWindow(id);
  }

  function closeWindow(id) {
    updateWindow(id, { open: false, minimized: false });
  }

  function minimizeWindow(id) {
    updateWindow(id, { minimized: true });
  }

  function selectProject(project) {
    setSelectedProject(project);
    openWindow('projectDetail');
  }

  function renderWindow(id) {
    if (id === 'profile') return <ProfileWindow onClose={() => closeWindow('profile')} />;
    if (id === 'technologies') return <TechnologiesWindow />;
    if (id === 'projects') return <ProjectsWindow onSelectProject={selectProject} />;
    if (id === 'contact') return <ContactWindow />;
    if (id === 'resume') return <ResumeWindow />;
    if (id === 'projectDetail') return <ProjectDetailWindow project={selectedProject} />;
    return null;
  }

  const minimizedWindows = Object.entries(windows).filter(([, state]) => state.open && state.minimized);

  return (
    <div className="portfolio-os">
      <MenuBar onOpen={openWindow} />
      <main className="desktop" aria-label="Área de trabalho do portfólio">
        <div className="desktop-icons" aria-label="Atalhos">
          {desktopIcons.map((item) => (
            <DesktopIcon
              key={item.id}
              icon={item.icon}
              label={item.label}
              onOpen={() => openWindow(item.id)}
            />
          ))}
        </div>

        <div className="windows-layer">
          {Object.entries(windowDefinitions).map(([id, definition]) => {
            const state = windows[id];

            if (!state.open || state.minimized) return null;

            return (
              <RetroWindow
                key={id}
                id={id}
                title={id === 'projectDetail' && selectedProject ? selectedProject.title : definition.title}
                geometry={state}
                zIndex={state.zIndex}
                active={activeWindow === id}
                compact={compact}
                onFocus={() => bringToFront(id)}
                onClose={() => closeWindow(id)}
                onMinimize={() => minimizeWindow(id)}
                onDragStop={(x, y) => updateWindow(id, { x, y })}
                onResizeStop={(width, height, x, y) => updateWindow(id, { width, height, x, y })}
              >
                {renderWindow(id)}
              </RetroWindow>
            );
          })}
        </div>
      </main>

      {minimizedWindows.length > 0 && (
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
