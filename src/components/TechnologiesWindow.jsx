import { technologies } from '../data/portfolio.js';
import { assetPath } from '../utils/assets.js';

export function TechnologiesWindow() {
  return (
    <div className="technology-grid">
      {technologies.map((group) => (
        <section className="technology-group" key={group.title}>
          <h3>{group.title}</h3>
          <div className="technology-list">
            {group.items.map((item) => (
              <figure className="technology-item" key={item.name}>
                <img src={assetPath(item.icon)} alt="" aria-hidden="true" />
                <figcaption>{item.name}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
