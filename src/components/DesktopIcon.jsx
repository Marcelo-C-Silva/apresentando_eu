import { assetPath } from '../utils/assets.js';

export function DesktopIcon({ icon, label, onOpen }) {
  return (
    <button className="desktop-icon" type="button" onClick={onOpen}>
      <span className="desktop-icon__image">
        <img src={assetPath(icon)} alt="" aria-hidden="true" />
      </span>
      <span className="desktop-icon__label">{label}</span>
    </button>
  );
}
