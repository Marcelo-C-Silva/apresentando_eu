import { profile } from '../data/portfolio.js';
import { assetPath } from '../utils/assets.js';

export function ResumeWindow() {
  return (
    <div className="resume-window">
      <p>Arquivo disponível para download:</p>
      <a className="btn retro-link" href={assetPath(profile.resume)} download>
        Curriculo_Joao_Marcelo.pdf
      </a>
    </div>
  );
}
