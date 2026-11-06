import { profile } from '../data/portfolio.js';

const menuItems = [
  ['Sobre', 'profile'],
  ['Experiência', 'experience'],
  ['Projetos', 'projects'],
  ['Tecnologias', 'technologies'],
  ['Contato', 'contact'],
];

export function MenuBar({ onOpen, musicPlaying }) {
  return (
    <header className="menu-bar" aria-label="Barra de menu">
      {/* A fonte do logo não tem o caractere "ã", por isso o texto visível fica sem acento. */}
      <button
        className="menu-brand"
        type="button"
        aria-label={profile.displayName}
        onClick={() => onOpen('profile')}
      >
        Joao Marcelo
      </button>
      <nav className="menu-navigation" aria-label="Janelas do portfólio">
        {menuItems.map(([label, windowId]) => (
          <button key={windowId} type="button" onClick={() => onOpen(windowId)}>
            {label}
          </button>
        ))}
      </nav>
      <button
        className={`menu-music ${musicPlaying ? 'is-playing' : ''}`}
        type="button"
        aria-label={musicPlaying ? 'Abrir player de música, tocando agora' : 'Abrir player de música'}
        onClick={() => onOpen('music')}
      >
        <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" shapeRendering="crispEdges" aria-hidden="true">
          <path d="M5 2h9v2H5zM5 4h2v8H5zM12 4h2v7h-2zM2 11h5v3H2zM9 10h5v3H9z" />
        </svg>
      </button>
      <span className="menu-version">Portfolio OS 2.0</span>
    </header>
  );
}
