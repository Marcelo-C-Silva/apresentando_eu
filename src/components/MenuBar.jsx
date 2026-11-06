import { profile } from '../data/portfolio.js';

const menuItems = [
  ['Sobre', 'profile'],
  ['Experiência', 'experience'],
  ['Projetos', 'projects'],
  ['Tecnologias', 'technologies'],
  ['Contato', 'contact'],
];

export function MenuBar({ onOpen }) {
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
      <span className="menu-version">Portfolio OS 2.0</span>
    </header>
  );
}
