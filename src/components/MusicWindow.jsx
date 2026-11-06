function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00';
  const whole = Math.floor(seconds);
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`;
}

function getProgress({ time, duration }) {
  return duration > 0 ? Math.min(100, (time / duration) * 100) : 0;
}

function Icon({ children }) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" shapeRendering="crispEdges" aria-hidden="true">
      {children}
    </svg>
  );
}

const icons = {
  previous: <path d="M2 2h2v12H2zM13 2h1v12h-1zM12 3h1v10h-1zM11 4h1v8h-1zM10 5h1v6h-1zM9 6h1v4H9zM8 7h1v2H8z" />,
  next: <path d="M12 2h2v12h-2zM2 2h1v12H2zM3 3h1v10H3zM4 4h1v8H4zM5 5h1v6H5zM6 6h1v4H6zM7 7h1v2H7z" />,
  play: <path d="M3 1h2v14H3zM5 2h2v12H5zM7 4h2v8H7zM9 5h2v6H9zM11 7h2v2h-2z" />,
  pause: <path d="M3 2h4v12H3zM9 2h4v12H9z" />,
  shuffle: (
    <path d="M1 3h3v2H1zM4 4h2v2H4zM6 5h1v2H6zM7 6h1v2H7zM8 8h1v2H8zM9 9h1v2H9zM10 10h2v2h-2zM1 11h3v2H1zM4 10h2v2H4zM6 9h1v2H6zM9 5h1v2H9zM10 4h2v2h-2zM12 2h1v5h-1zM13 3h1v3h-1zM14 4h1v1h-1zM12 9h1v5h-1zM13 10h1v3h-1zM14 11h1v1h-1z" />
  ),
  close: <path d="M3 3h2v2H3zM5 5h2v2H5zM7 7h2v2H7zM9 5h2v2H9zM11 3h2v2h-2zM5 9h2v2H5zM3 11h2v2H3zM9 9h2v2H9zM11 11h2v2h-2z" />,
  up: <path d="M7 4h2v2H7zM5 6h6v2H5zM3 8h10v2H3z" />,
  down: <path d="M3 6h10v2H3zM5 8h6v2H5zM7 10h2v2H7z" />,
};

// Cada faixa tem um CD próprio: muda o número de brilhos e o desenho do rótulo.
const WEDGES = [
  'M16 16 L16 3 L23 5 Z',
  'M16 16 L27 8 L29 14 Z',
  'M16 16 L29 19 L26 25 Z',
  'M16 16 L16 29 L9 27 Z',
  'M16 16 L5 24 L3 18 Z',
  'M16 16 L3 13 L6 7 Z',
];

function CdDisc({ index, playing }) {
  const step = 1 + (index % 3);
  const wedges = WEDGES.filter((_, wedge) => wedge % step === 0);
  const labelStyle = index % 3;

  return (
    <span className={`cd-disc ${playing ? 'is-playing' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 32 32" shapeRendering="crispEdges">
        <circle cx="16" cy="16" r="14.5" fill="#fff" stroke="#111" strokeWidth="2" />
        {wedges.map((wedge) => (
          <path d={wedge} fill="url(#cd-dither)" key={wedge} />
        ))}
        <circle cx="16" cy="16" r="6.5" fill={labelStyle === 0 ? '#111' : '#fff'} stroke="#111" strokeWidth="1.5" />
        {labelStyle === 1 && <path d="M16 10v12M10 16h12" stroke="#111" strokeWidth="2" />}
        {labelStyle === 2 && <path d="M12 12h3v3h-3zM17 17h3v3h-3z" fill="#111" />}
        <circle cx="16" cy="16" r="2.5" fill="#fff" stroke="#111" strokeWidth="1" />
      </svg>
    </span>
  );
}

// Padrão pontilhado dos brilhos do CD, compartilhado por todos os discos da página.
export function CdDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <pattern id="cd-dither" width="2" height="2" patternUnits="userSpaceOnUse">
        <rect width="1" height="1" fill="#111" />
        <rect x="1" y="1" width="1" height="1" fill="#111" />
      </pattern>
    </svg>
  );
}

function ProgressBar({ player, className }) {
  const progress = getProgress(player);

  return (
    <div
      className={className}
      role="progressbar"
      aria-label="Progresso da faixa"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
    >
      <span style={{ width: `${progress}%` }} />
    </div>
  );
}

function ControlButton({ label, icon, className = '', ...props }) {
  return (
    <button type="button" className={`music-player__button ${className}`} aria-label={label} {...props}>
      <Icon>{icon}</Icon>
    </button>
  );
}

function trackStatus({ track, failed }) {
  return failed ? 'Não foi possível tocar esta faixa' : track.artist;
}

export function MusicWindow({ player }) {
  const { track, index, playing, shuffle, time, duration } = player;

  return (
    <div className="music-player">
      <div className="music-player__display" aria-live="polite">
        <CdDisc index={index} playing={playing} />
        <div className="music-player__text">
          <p className="music-player__title">{track.title}</p>
          <p className="music-player__artist">{trackStatus(player)}</p>
        </div>
      </div>

      <div className="music-player__progress">
        <ProgressBar player={player} className="music-player__bar" />
        <span className="music-player__time">
          {formatTime(time)} / {formatTime(duration)}
        </span>
      </div>

      <div className="music-player__controls">
        <ControlButton label="Faixa anterior" icon={icons.previous} onClick={player.previous} />
        <ControlButton
          label={playing ? 'Pausar' : 'Tocar'}
          icon={playing ? icons.pause : icons.play}
          className="music-player__button--main"
          onClick={player.togglePlay}
        />
        <ControlButton label="Próxima faixa" icon={icons.next} onClick={player.next} />
        <ControlButton label="Ordem aleatória" icon={icons.shuffle} aria-pressed={shuffle} onClick={player.toggleShuffle} />
      </div>
    </div>
  );
}

export function MusicBar({ player, expanded, onToggleExpanded, onClose }) {
  const { track, index, playing, shuffle, time, duration } = player;

  return (
    <section className={`music-bar ${expanded ? 'is-expanded' : ''}`} aria-label="Player de música">
      <ProgressBar player={player} className="music-bar__progress" />

      {expanded && (
        <div className="music-bar__extra">
          <ControlButton label="Faixa anterior" icon={icons.previous} onClick={player.previous} />
          <ControlButton label="Ordem aleatória" icon={icons.shuffle} aria-pressed={shuffle} onClick={player.toggleShuffle} />
          <span className="music-bar__time">
            {formatTime(time)} / {formatTime(duration)}
          </span>
          <ControlButton label="Fechar player" icon={icons.close} onClick={onClose} />
        </div>
      )}

      <div className="music-bar__main">
        <button
          type="button"
          className="music-bar__info"
          aria-expanded={expanded}
          aria-label={`${track.title}, ${trackStatus(player)}. ${expanded ? 'Recolher' : 'Mostrar mais'} controles`}
          onClick={onToggleExpanded}
        >
          <CdDisc index={index} playing={playing} />
          <span className="music-bar__text" aria-live="polite">
            <span className="music-bar__title">{track.title}</span>
            <span className="music-bar__artist">{trackStatus(player)}</span>
          </span>
          <Icon>{expanded ? icons.down : icons.up}</Icon>
        </button>
        <ControlButton
          label={playing ? 'Pausar' : 'Tocar'}
          icon={playing ? icons.pause : icons.play}
          onClick={player.togglePlay}
        />
        <ControlButton label="Próxima faixa" icon={icons.next} onClick={player.next} />
      </div>
    </section>
  );
}
