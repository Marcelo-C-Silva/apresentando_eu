import { Rnd } from 'react-rnd';

export function RetroWindow({
  id,
  title,
  children,
  geometry,
  zIndex,
  active,
  compact,
  onClose,
  onFocus,
  onMinimize,
  onDragStop,
  onResizeStop,
}) {
  const content = (
    <section
      className={`window retro-window ${active ? 'is-active' : 'is-inactive'}`}
      aria-label={title}
      onMouseDown={onFocus}
      onFocus={onFocus}
    >
      <div className="title-bar retro-window__title">
        <button aria-label={`Fechar ${title}`} className="close" type="button" onClick={onClose}>
          <span aria-hidden="true">x</span>
        </button>
        <h2 className="title">{title}</h2>
        <div className="window-actions">
          <button
            aria-label={`Minimizar ${title}`}
            className="window-action"
            type="button"
            onClick={onMinimize}
          >
            _
          </button>
          <button aria-label="Redimensionar" className="resize" type="button" />
        </div>
      </div>
      <div className="separator" />
      <div className="window-pane retro-window__pane">{children}</div>
    </section>
  );

  if (compact) {
    return (
      <div className="compact-window" style={{ zIndex }} data-window-id={id}>
        {content}
      </div>
    );
  }

  return (
    <Rnd
      bounds=".desktop"
      className="desktop-window"
      dragHandleClassName="retro-window__title"
      minWidth={280}
      minHeight={180}
      position={{ x: geometry.x, y: geometry.y }}
      size={{ width: geometry.width, height: geometry.height }}
      style={{ zIndex }}
      onMouseDown={onFocus}
      onDragStop={(_, data) => onDragStop(data.x, data.y)}
      onResizeStop={(_, __, ref, ___, position) =>
        onResizeStop(ref.offsetWidth, ref.offsetHeight, position.x, position.y)
      }
    >
      {content}
    </Rnd>
  );
}
