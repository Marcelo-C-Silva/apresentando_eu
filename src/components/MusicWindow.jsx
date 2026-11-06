function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00';
  const whole = Math.floor(seconds);
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`;
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
};

export function MusicWindow({ player }) {
  const { track, playing, shuffle, time, duration, failed } = player;
  const progress = duration > 0 ? Math.min(100, (time / duration) * 100) : 0;

  return (
    <div className="music-player">
      <div className="music-player__display" aria-live="polite">
        <p className="music-player__title">{track.title}</p>
        <p className="music-player__artist">{failed ? 'Não foi possível tocar esta faixa' : track.artist}</p>
      </div>

      <div className="music-player__progress">
        <div
          className="music-player__bar"
          role="progressbar"
          aria-label="Progresso da faixa"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
        <span className="music-player__time">
          {formatTime(time)} / {formatTime(duration)}
        </span>
      </div>

      <div className="music-player__controls">
        <button type="button" className="music-player__button" aria-label="Faixa anterior" onClick={player.previous}>
          <Icon>{icons.previous}</Icon>
        </button>
        <button
          type="button"
          className="music-player__button music-player__button--main"
          aria-label={playing ? 'Pausar' : 'Tocar'}
          onClick={player.togglePlay}
        >
          <Icon>{playing ? icons.pause : icons.play}</Icon>
        </button>
        <button type="button" className="music-player__button" aria-label="Próxima faixa" onClick={player.next}>
          <Icon>{icons.next}</Icon>
        </button>
        <button
          type="button"
          className="music-player__button"
          aria-label="Ordem aleatória"
          aria-pressed={shuffle}
          onClick={player.toggleShuffle}
        >
          <Icon>{icons.shuffle}</Icon>
        </button>
      </div>
    </div>
  );
}
