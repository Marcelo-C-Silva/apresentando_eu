import { profile } from '../data/portfolio.js';

export function ContactWindow() {
  return (
    <address className="contact-window">
      <p>Entre em contato por esses links:</p>
      <a href={profile.github} target="_blank" rel="noreferrer">
        GitHub
      </a>
      <a href={profile.linkedin} target="_blank" rel="noreferrer">
        LinkedIn
      </a>
      <a href={`mailto:${profile.email}`}>{profile.email}</a>
    </address>
  );
}
