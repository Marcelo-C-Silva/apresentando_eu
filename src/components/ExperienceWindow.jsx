import { courses, education, experience } from '../data/portfolio.js';

export function ExperienceWindow() {
  return (
    <div className="experience">
      {experience.map((job) => (
        <article className="experience__item" key={`${job.company}-${job.period}`}>
          <h3>{job.role}</h3>
          <p className="experience__meta">
            {job.company} | {job.period} | {job.location}
          </p>
          <ul>
            {job.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      ))}

      <section className="experience__item">
        <h3>Formação</h3>
        {education.map((item) => (
          <p key={item.title}>
            {item.title}
            <span className="experience__meta">{item.detail}</span>
          </p>
        ))}
      </section>

      <section className="experience__item">
        <h3>Cursos</h3>
        <ul className="experience__courses">
          {courses.map((course) => (
            <li key={`${course.title}-${course.detail}`}>
              {course.title}
              <span className="experience__meta">{course.detail}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
