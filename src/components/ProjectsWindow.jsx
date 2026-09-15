import { projects } from '../data/portfolio.js';
import { assetPath } from '../utils/assets.js';

export function ProjectsWindow({ onSelectProject }) {
  return (
    <div className="project-grid">
      {projects.map((project) => (
        <article className="project-tile" key={project.id}>
          <img src={assetPath(project.image)} alt="" className="project-tile__image" />
          <div className="project-tile__body">
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <button className="btn" type="button" onClick={() => onSelectProject(project)}>
              Ver mais
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
