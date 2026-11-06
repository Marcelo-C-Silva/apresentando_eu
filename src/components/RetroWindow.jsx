import { useEffect, useRef } from 'react';
import { Rnd } from 'react-rnd';

export function RetroWindow({
  id,
  title,
  children,
  geometry,
  zIndex,
  active,
  compact,
  maximized,
  focusToken,
  onClose,
  onFocus,
  onMinimize,
  onToggleMaximize,
  onDragStop,
  onResizeStop,
}) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (focusToken > 0) sectionRef.current?.focus({ preventScroll: true });
  }, [focusToken]);

  const content = (
    <section
      ref={sectionRef}
      className={`window retro-window ${active ? 'is-active' : 'is-inactive'}`}
      aria-label={title}
      tabIndex={-1}
      onMouseDown={onFocus}
      onFocus={onFocus}
    >
      <div className="title-bar retro-window__title">
        <button aria-label={`Fechar ${title}`} className="close" type="button" onClick={onClose} />
        <h2 className="title">{title}</h2>
        {!compact && (
          <div className="window-actions">
            <button
              aria-label={`Minimizar ${title}`}
              className="window-action"
              type="button"
              onClick={onMinimize}
            >
              _
            </button>
            <button
              aria-label={`${maximized ? 'Restaurar' : 'Maximizar'} ${title}`}
              aria-pressed={maximized}
              className="resize"
              type="button"
              onClick={onToggleMaximize}
            />
          </div>
        )}
      </div>
      <div className="separator" />
      <div className="window-pane retro-window__pane">{children}</div>
    </section>
  );

  if (compact) {
    return (
      <div
        className={`compact-window ${active ? '' : 'is-covered'}`}
        style={{ zIndex }}
        data-window-id={id}
      >
        {content}
      </div>
    );
  }

  return (
    <Rnd
      bounds=".desktop"
      cancel=".title-bar button"
      className="desktop-window"
      data-window-id={id}
      disableDragging={maximized}
      dragHandleClassName="retro-window__title"
      enableResizing={!maximized}
      minWidth={280}
      minHeight={180}
      position={{ x: geometry.x, y: geometry.y }}
      size={{ width: geometry.width, height: geometry.height }}
      style={{ zIndex }}
      onDragStop={(_, data) => onDragStop(data.x, data.y)}
      onResizeStop={(_, __, ref, ___, position) =>
        onResizeStop(ref.offsetWidth, ref.offsetHeight, position.x, position.y)
      }
    >
      {content}
    </Rnd>
  );
}
