import { assetPath } from '../utils/assets.js';

export function ProjectDetailWindow({ project }) {
  if (!project) {
    return <p>Selecione um projeto para ver os detalhes.</p>;
  }

  return (
    <div className="project-detail">
      <img className="project-detail__image" src={assetPath(project.image)} alt={`Imagem do projeto ${project.title}`} />
      {project.context && <p className="project-detail__context">{project.context}</p>}
      <p>{project.description}</p>

      <ul className="project-detail__technologies" aria-label="Tecnologias usadas">
        {project.technologies.map((item) => (
          <li key={item.name}>
            <img src={assetPath(item.icon)} alt="" aria-hidden="true" />
            {item.name}
          </li>
        ))}
      </ul>

      {project.links.length > 0 && (
        <div className="project-detail__links">
          {project.links.map((link) => (
            <a className="btn retro-link" href={link.href} target="_blank" rel="noreferrer" key={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
