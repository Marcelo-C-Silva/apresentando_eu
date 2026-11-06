import { assetPath } from '../utils/assets.js';

export function DesktopIcon({ icon, label, onOpen, downloadHref }) {
  const content = (
    <>
      <span className="desktop-icon__image">
        <img src={assetPath(icon)} alt="" aria-hidden="true" />
      </span>
      <span className="desktop-icon__label">{label}</span>
    </>
  );

  if (downloadHref) {
    return (
      <a className="desktop-icon" href={downloadHref} download aria-label={`Baixar ${label}`}>
        {content}
      </a>
    );
  }

  return (
    <button className="desktop-icon" type="button" onClick={onOpen}>
      {content}
    </button>
  );
}
