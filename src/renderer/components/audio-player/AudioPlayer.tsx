import {
  useImperativeHandle,
  forwardRef,
  useRef,
  useState,
  useCallback,
} from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
import {
  CrossfadeStyle,
  PlaybackStyle,
  PlayerStatus,
  Song,
} from '../../../types';
import { crossfadeHandler, gaplessHandler } from './utils/listenHandlers';

interface AudioPlayerProps extends ReactPlayerProps {
  crossfadeDuration: number;
  crossfadeStyle: CrossfadeStyle;
  currentPlayer: 1 | 2;
  player1: Song;
  player2: Song;
  status: PlayerStatus;
  style: PlaybackStyle;
  volume: number;
}

export type AudioPlayerProgress = {
  loaded: number;
  loadedSeconds: number;
  played: number;
  playedSeconds: number;
};

const getDuration = (ref: any) => {
  return ref.current?.player?.player?.player?.duration;
};

export const AudioPlayer = forwardRef(
  (
    {
      status,
      style,
      crossfadeStyle,
      crossfadeDuration,
      currentPlayer,
      autoNext,
      player1,
      player2,
      muted,
      volume,
    }: AudioPlayerProps,
    ref: any
  ) => {
    const player1Ref = useRef<any>(null);
    const player2Ref = useRef<any>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useImperativeHandle(ref, () => ({
      get player1() {
        return player1Ref?.current;
      },
      get player2() {
        return player2Ref?.current;
      },
    }));

    const handleOnEnded = () => {
      autoNext();
      setIsTransitioning(false);
    };

    const handleCrossfade1 = useCallback(
      (e: AudioPlayerProgress) => {
        return crossfadeHandler({
          currentPlayer,
          currentPlayerRef: player1Ref,
          currentTime: e.playedSeconds,
          duration: getDuration(player1Ref),
          fadeDuration: crossfadeDuration,
          fadeType: crossfadeStyle,
          isTransitioning,
          nextPlayerRef: player2Ref,
          player: 1,
          setIsTransitioning,
          volume,
        });
      },
      [
        crossfadeDuration,
        crossfadeStyle,
        currentPlayer,
        isTransitioning,
        volume,
      ]
    );

    const handleCrossfade2 = useCallback(
      (e: AudioPlayerProgress) => {
        return crossfadeHandler({
          currentPlayer,
          currentPlayerRef: player2Ref,
          currentTime: e.playedSeconds,
          duration: getDuration(player2Ref),
          fadeDuration: crossfadeDuration,
          fadeType: crossfadeStyle,
          isTransitioning,
          nextPlayerRef: player1Ref,
          player: 2,
          setIsTransitioning,
          volume,
        });
      },
      [
        crossfadeDuration,
        crossfadeStyle,
        currentPlayer,
        isTransitioning,
        volume,
      ]
    );

    const handleGapless1 = useCallback(
      (e: AudioPlayerProgress) => {
        return gaplessHandler({
          currentTime: e.playedSeconds,
          duration: getDuration(player1Ref),
          isFlac: player1?.suffix === 'flac',
          isTransitioning,
          nextPlayerRef: player2Ref,
          setIsTransitioning,
        });
      },
      [isTransitioning, player1?.suffix]
    );

    const handleGapless2 = useCallback(
      (e: AudioPlayerProgress) => {
        return gaplessHandler({
          currentTime: e.playedSeconds,
          duration: getDuration(player2Ref),
          isFlac: player2?.suffix === 'flac',
          isTransitioning,
          nextPlayerRef: player1Ref,
          setIsTransitioning,
        });
      },
      [isTransitioning, player2?.suffix]
    );

    return (
      <>
        <ReactPlayer
          ref={player1Ref}
          height={0}
          muted={muted}
          playing={currentPlayer === 1 && status === PlayerStatus.Playing}
          progressInterval={isTransitioning ? 10 : 250}
          url={player1?.streamUrl}
          volume={volume}
          width={0}
          onEnded={handleOnEnded}
          onProgress={
            style === PlaybackStyle.Gapless ? handleGapless1 : handleCrossfade1
          }
        />
        <ReactPlayer
          ref={player2Ref}
          height={0}
          muted={muted}
          playing={currentPlayer === 2 && status === PlayerStatus.Playing}
          progressInterval={isTransitioning ? 10 : 250}
          url={player2?.streamUrl}
          volume={volume}
          width={0}
          onEnded={handleOnEnded}
          onProgress={
            style === PlaybackStyle.Gapless ? handleGapless2 : handleCrossfade2
          }
        />
      </>
    );
  }
);
