import { assetPath } from '../utils/assets.js';

export function ProjectDetailWindow({ project }) {
  if (!project) {
    return <p>Selecione um projeto para ver os detalhes.</p>;
  }

  return (
    <div className="project-detail">
      <p>{project.description}</p>
      <div className="project-detail__icons" aria-label="Tecnologias usadas">
        {project.icons.map((icon) => (
          <img key={icon} src={assetPath(icon)} alt="" aria-hidden="true" />
        ))}
      </div>
      <a className="btn retro-link" href={project.link} target="_blank" rel="noreferrer">
        Acessar Projeto
      </a>
    </div>
  );
}
