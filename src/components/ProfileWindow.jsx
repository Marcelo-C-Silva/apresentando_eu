import { profile } from '../data/portfolio.js';
import { assetPath } from '../utils/assets.js';

const featuredSkills = ['Ruby on Rails', 'React e JavaScript', 'HTML, CSS e Java', 'Git e PostgreSQL'];
const softSkills = ['Organização no código', 'Proatividade', 'Foco na experiência do usuário'];

export function ProfileWindow({ onClose }) {
  return (
    <div className="profile-dialog">
      <figure className="profile-dialog__portrait">
        <img src={assetPath('img/img-header.png')} alt="Joao Marcelo" />
      </figure>

      <div className="profile-dialog__content">
        <div className="profile-dialog__identity">
          <h1>Joao Marcelo</h1>
          <p>Desenvolvedor Front-end</p>
          <p>{profile.age}</p>
          <p>{profile.course}</p>
        </div>

        <ul className="profile-dialog__skills" aria-label="Habilidades principais">
          {featuredSkills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>

        <ul className="profile-dialog__highlights" aria-label="Habilidades pessoais">
          {softSkills.map((item) => (
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
