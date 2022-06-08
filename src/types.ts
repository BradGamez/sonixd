const Server: { [x: string]: 'JELLYFIN' | 'SUBSONIC' } = {
  JELLYFIN: 'JELLYFIN',
  SUBSONIC: 'SUBSONIC',
};

export type ServerType = typeof Server[keyof typeof Server];

export enum Item {
  Album = 'album',
  Artist = 'artist',
  Folder = 'folder',
  Genre = 'genre',
  Music = 'music',
  Playlist = 'playlist',
}

export enum PlayerStatus {
  Paused = 'paused',
  Playing = 'playing',
}

export enum PlayerRepeat {
  All = 'all',
  None = 'none',
  One = 'one',
}

export enum Play {
  Later = 'later',
  Next = 'next',
  Now = 'play',
}

export enum CrossfadeStyle {
  ConstantPower = 'constantPower',
  ConstantPowerSlowCut = 'constantPowerSlowCut',
  ConstantPowerSlowFade = 'constantPowerSlowFade',
  Dipped = 'dipped',
  EqualPower = 'equalPower',
  Linear = 'linear',
}

export enum PlaybackStyle {
  Crossfade = 'crossfade',
  Gapless = 'gapless',
}

export enum PlaybackType {
  Local = 'local',
  Web = 'web',
}

// export type ServerType = Server.Subsonic | Server.Jellyfin;

export type APIEndpoints =
  | 'getPlaylist'
  | 'getPlaylists'
  | 'getStarred'
  | 'getAlbum'
  | 'getAlbums'
  | 'getRandomSongs'
  | 'getArtist'
  | 'getArtists'
  | 'getArtistInfo'
  | 'getArtistSongs'
  | 'startScan'
  | 'getScanStatus'
  | 'star'
  | 'unstar'
  | 'batchStar'
  | 'batchUnstar'
  | 'setRating'
  | 'getSimilarSongs'
  | 'updatePlaylistSongs'
  | 'updatePlaylistSongsLg'
  | 'deletePlaylist'
  | 'createPlaylist'
  | 'updatePlaylist'
  | 'updatePlaylistSongsLg'
  | 'deletePlaylist'
  | 'createPlaylist'
  | 'updatePlaylist'
  | 'clearPlaylist'
  | 'getGenres'
  | 'getSearch'
  | 'scrobble'
  | 'getIndexes'
  | 'getMusicFolders'
  | 'getMusicDirectory'
  | 'getMusicDirectorySongs'
  | 'getDownloadUrl'
  | 'getSongs'
  | 'getTopSongs'
  | 'getSongsByGenre'
  | 'getLyrics';

export interface GenericItem {
  id: string;
  title: string;
}

export interface APIResult {
  data: Album[] | Artist[] | Genre[] | Playlist[] | Song[];
  totalRecordCount?: number;
}

export interface Album {
  albumArtist?: string;
  albumArtistId: string;
  albumGenre?: string;
  albumId: string;
  artist?: Artist[];
  created: string;
  duration: number;
  genre?: Genre[];
  id: string;
  image: string;
  isDir?: boolean;
  playCount?: number;
  song?: Song[];
  songCount: number;
  starred?: string;
  title: string;
  type: Item.Album;
  uniqueId: string;
  userRating?: number;
  year?: number;
}

export interface Artist {
  album?: Album[];
  albumCount?: number;
  duration?: number;
  genre?: Genre[];
  id?: string;
  image?: string;
  info?: ArtistInfo;
  starred?: string;
  title: string;
  type?: Item.Artist;
  uniqueId?: string;
  userRating?: number;
}

export interface ArtistInfo {
  biography?: string;
  externalUrl: GenericItem[];
  imageUrl?: string;
  similarArtist?: Artist[];
}

export interface Folder {
  created: string;
  id: string;
  image: string;
  isDir?: boolean;
  title: string;
  type: Item.Folder;
  uniqueId: string;
}

export interface Genre {
  albumCount?: number;
  id: string;
  songCount?: number;
  title: string;
  type?: Item.Genre;
  uniqueId?: string;
}

export interface Playlist {
  changed?: string;
  comment?: string;
  created?: string;
  duration: number;
  genre?: Genre[];
  id: string;
  image: string;
  owner?: string;
  public?: boolean;
  song?: Song[];
  songCount?: number;
  title: string;
  type: Item.Playlist;
  uniqueId: string;
}

export interface Song {
  album?: string;
  albumArtist?: string;
  albumArtistId?: number;
  albumGenre?: string;
  albumId?: number;
  artist?: Artist[];
  artistName?: string | null;
  bitRate?: number;
  contentType?: string;
  created?: string;
  discNumber?: number;
  duration?: number;
  genre?: Genre[];
  id: number;
  image?: string;
  isDir?: boolean;
  parent?: string;
  path?: string;
  playCount?: number;
  size?: number;
  starred?: string;
  streamUrl: string;
  suffix?: string;
  title: string;
  track?: number;
  type?: Item.Music;
  uniqueId?: string;
  userRating?: number;
  year?: number;
}

export interface ScanStatus {
  count: number | 'N/a';
  scanning: boolean;
}

export interface Sort {
  column?: string;
  type: 'asc' | 'desc';
}

export interface Pagination {
  activePage?: number;
  pages?: number;
  recordsPerPage: number;
  serverSide?: boolean;
}

export interface ServerFolderAuth {
  id: number;
  locked: boolean;
  serverId: number;
  token: string;
  type: string;
  url: string;
  userId: string;
  username: string;
}
