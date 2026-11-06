import { useEffect, useRef, useState } from 'react';
import { assetPath } from '../utils/assets.js';

const RESTART_THRESHOLD_SECONDS = 3;

function pickRandomIndex(current, length) {
  if (length < 2) return current;
  const offset = 1 + Math.floor(Math.random() * (length - 1));
  return (current + offset) % length;
}

export function useMusicPlayer(tracks) {
  const audioRef = useRef(null);
  const wantsToPlay = useRef(false);
  const history = useRef([]);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [failed, setFailed] = useState(false);

  const track = tracks[index];

  function startPlayback() {
    setFailed(false);
    audioRef.current?.play().catch((error) => {
      // AbortError só indica que a faixa foi trocada antes de começar a tocar.
      if (error.name === 'AbortError') return;
      wantsToPlay.current = false;
      setPlaying(false);
      if (error.name !== 'NotAllowedError') setFailed(true);
    });
  }

  function play() {
    wantsToPlay.current = true;
    startPlayback();
  }

  function pause() {
    wantsToPlay.current = false;
    audioRef.current?.pause();
  }

  function togglePlay() {
    if (audioRef.current?.paused) play();
    else pause();
  }

  function goTo(nextIndex) {
    setTime(0);
    setDuration(0);
    setFailed(false);
    if (nextIndex === index) {
      if (audioRef.current) audioRef.current.currentTime = 0;
      if (wantsToPlay.current) startPlayback();
      return;
    }
    setIndex(nextIndex);
  }

  function next() {
    history.current.push(index);
    goTo(shuffle ? pickRandomIndex(index, tracks.length) : (index + 1) % tracks.length);
  }

  function previous() {
    if ((audioRef.current?.currentTime ?? 0) > RESTART_THRESHOLD_SECONDS) {
      audioRef.current.currentTime = 0;
      return;
    }
    goTo(history.current.pop() ?? (index - 1 + tracks.length) % tracks.length);
  }

  function stop() {
    pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
    setTime(0);
  }

  // Com a nova faixa já no <audio>, continua tocando se a pessoa estava ouvindo.
  useEffect(() => {
    if (wantsToPlay.current) startPlayback();
  }, [index]);

  // Controles da tela de bloqueio e do teclado multimídia.
  useEffect(() => {
    if (!('mediaSession' in navigator)) return undefined;

    navigator.mediaSession.metadata = new MediaMetadata({ title: track.title, artist: track.artist });
    navigator.mediaSession.setActionHandler('play', play);
    navigator.mediaSession.setActionHandler('pause', pause);
    navigator.mediaSession.setActionHandler('nexttrack', next);
    navigator.mediaSession.setActionHandler('previoustrack', previous);

    return () => {
      for (const action of ['play', 'pause', 'nexttrack', 'previoustrack']) {
        navigator.mediaSession.setActionHandler(action, null);
      }
    };
  });

  const audioElement = {
    ref: audioRef,
    src: assetPath(track.src),
    preload: 'none',
    onPlay: () => setPlaying(true),
    onPause: () => setPlaying(false),
    onEnded: next,
    onTimeUpdate: (event) => setTime(event.currentTarget.currentTime),
    onLoadedMetadata: (event) => setDuration(event.currentTarget.duration),
    onError: () => {
      wantsToPlay.current = false;
      setPlaying(false);
      setFailed(true);
    },
  };

  return {
    track,
    playing,
    shuffle,
    time,
    duration,
    failed,
    togglePlay,
    next,
    previous,
    stop,
    toggleShuffle: () => setShuffle((current) => !current),
    audioElement,
  };
}
