import { PlayerData, usePlayerStore } from 'renderer/store';

const ipc = window.electron.ipcRenderer;

const play = () => ipc.PLAYER_PLAY();

const pause = () => ipc.PLAYER_PAUSE();

const stop = () => ipc.PLAYER_STOP();

const currentTime = () => ipc.PLAYER_CURRENT_TIME();

const next = () => ipc.PLAYER_NEXT();

const previous = () => ipc.PLAYER_PREVIOUS();

const setQueue = (data: PlayerData) => ipc.PLAYER_SET_QUEUE(data);

const setQueueNext = (data: PlayerData) => ipc.PLAYER_SET_QUEUE_NEXT(data);

const seek = (seconds: number) => ipc.PLAYER_SEEK(seconds);

const seekTo = (seconds: number) => ipc.PLAYER_SEEK_TO(seconds);

const volume = (value: number) => ipc.PLAYER_VOLUME(value);

const mute = () => ipc.PLAYER_MUTE();

const {
  setCurrentTime,
  play: setPlay,
  pause: setPause,
  autoNext,
} = usePlayerStore.getState();

ipc.RENDERER_PLAYER_PLAY(() => setPlay());

ipc.RENDERER_PLAYER_PAUSE(() => setPause());

ipc.RENDERER_PLAYER_STOP(() => setPause());

ipc.RENDERER_PLAYER_CURRENT_TIME((_event, time) => setCurrentTime(time));

ipc.RENDERER_PLAYER_SET_QUEUE_NEXT(() => {
  const playerData = autoNext();
  setQueueNext(playerData);
});

export const mpvPlayer = {
  currentTime,
  mute,
  next,
  pause,
  play,
  previous,
  seek,
  seekTo,
  setQueue,
  setQueueNext,
  stop,
  volume,
};
