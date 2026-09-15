export function MenuBar({ onOpen }) {
  const menuItems = [
    ['Sobre', 'profile'],
    ['Projetos', 'projects'],
    ['Tecnologias', 'technologies'],
    ['Contato', 'contact'],
  ];

  return (
    <header className="menu-bar" aria-label="Barra de menu">
      <button className="menu-brand" type="button" onClick={() => onOpen('profile')}>
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
