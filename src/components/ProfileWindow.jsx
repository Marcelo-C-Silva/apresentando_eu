import { profile } from '../data/portfolio.js';
import { assetPath } from '../utils/assets.js';

export function ProfileWindow({ onClose }) {
  return (
    <div className="profile-dialog">
      <figure className="profile-dialog__portrait">
        <img src={assetPath('img/img-header.webp')} alt={`Retrato de ${profile.displayName}`} />
      </figure>

      <div className="profile-dialog__content">
        <div className="profile-dialog__identity">
          <h1>{profile.displayName}</h1>
          <p>{profile.role}</p>
          <p>{profile.location}</p>
        </div>

        <p className="profile-dialog__course">{profile.course}</p>

        <ul className="profile-dialog__skills" aria-label="Habilidades principais">
          {profile.featuredSkills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>

        <ul className="profile-dialog__highlights" aria-label="Habilidades pessoais">
          {profile.softSkills.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="profile-dialog__actions">
          <a className="btn retro-link" href={assetPath(profile.resume)} download>
            Baixar Currículo
          </a>
          <button className="btn" type="button" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
