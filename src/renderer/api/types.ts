export interface BaseResponse<T> {
  data: T;
  error?: string | any;
  response: 'Success' | 'Error';
  statusCode: number;
}

export interface BasePaginatedResponse<T> {
  data: T;
  error?: string | any;
  pagination: {
    nextPage: string | null;
    prevPage: string | null;
    startIndex: number;
    totalEntries: number;
  };
  response: 'Success' | 'Error';
  statusCode: number;
}

export interface BasePaginationRequest {
  limit: number;
  page: number;
}

export type ServerResponse = {
  createdAt: string;
  id: number;
  name: string;
  remoteUserId: string;
  serverFolder?: ServerFolderResponse[];
  serverType: string;
  token: string;
  updatedAt: string;
  url: string;
  username: string;
};

export type ServerFolderResponse = {
  createdAt: string;
  enabled: boolean;
  id: number;
  isPublic: boolean;
  name: string;
  remoteId: string;
  serverId: number;
  updatedAt: string;
};

export type User = {
  createdAt: string;
  enabled: boolean;
  id: number;
  isAdmin: boolean;
  password: string;
  updatedAt: string;
  username: string;
};

export type Login = {
  accessToken: string;
  refreshToken: string;
} & User;

export type Ping = {
  description: string;
  name: string;
  version: string;
};

export type GenreResponse = {
  createdAt: string;
  id: number;
  name: string;
  updatedAt: string;
};

export type ArtistResponse = {
  biography: string | null;
  createdAt: string;
  id: number;
  name: string;
  remoteCreatedAt: string | null;
  remoteId: string;
  serverFolderId: number;
  updatedAt: string;
};

export type ExternalResponse = {
  createdAt: string;
  id: number;
  name: string;
  updatedAt: string;
  url: string;
};

export type ImageResponse = {
  createdAt: string;
  id: number;
  name: string;
  updatedAt: string;
  url: string;
};

export type PingResponse = BaseResponse<Ping>;

export type LoginResponse = BaseResponse<Login>;

export type UserResponse = BaseResponse<User>;

export type AlbumResponse = BaseResponse<Album>;

export type AlbumsResponse = BasePaginatedResponse<Album[]>;

export interface Album {
  _count: Count;
  albumArtistId: number;
  createdAt: string;
  date: string;
  genres: GenreResponse[];
  id: number;
  name: string;
  remoteCreatedAt: string;
  remoteId: string;
  serverFolderId: number;
  songs: Song[];
  updatedAt: string;
  year: number;
}

export interface Song {
  album?: Partial<Album>;
  albumId: number;
  artistName: null;
  artists?: ArtistResponse[];
  bitRate: number;
  container: string;
  createdAt: string;
  date: string;
  disc: number;
  duration: number;
  externals?: ExternalResponse[];
  id: number;
  images?: ImageResponse[];
  name: string;
  remoteCreatedAt: string;
  remoteId: string;
  serverFolderId: number;
  track: number;
  updatedAt: string;
  year: number;
}

export type Count = {
  artists?: number;
  externals?: number;
  favorites?: number;
  genres?: number;
  images?: number;
  ratings?: number;
  songs?: number;
};
