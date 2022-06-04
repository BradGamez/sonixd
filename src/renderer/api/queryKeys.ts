export const queryKeys = {
  album: (albumId: number) => ['album', albumId] as const,
  ping: (url: string) => ['ping', url] as const,
  servers: ['servers'] as const,
};
