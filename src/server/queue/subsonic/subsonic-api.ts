import axios from 'axios';
import { Server } from '../../types/types';
import {
  SSAlbumListEntry,
  SSAlbumListResponse,
  SSAlbumResponse,
  SSAlbumsParams,
  SSArtistIndex,
  SSArtistInfoResponse,
  SSArtistsResponse,
  SSGenresResponse,
  SSMusicFoldersResponse,
} from './subsonic-types';

const api = axios.create({
  validateStatus: (status) => status >= 200,
});

api.interceptors.response.use(
  (res: any) => {
    res.data = res.data['subsonic-response'];
    return res;
  },
  (err: any) => {
    return Promise.reject(err);
  }
);

const getMusicFolders = async (server: Server) => {
  const { data } = await api.get<SSMusicFoldersResponse>(
    `${server.url}/rest/getMusicFolders.view?v=1.13.0&c=sonixd&f=json&${server.token}`
  );

  return data.musicFolders.musicFolder;
};

const getArtists = async (server: Server, musicFolderId: string) => {
  const { data } = await api.get<SSArtistsResponse>(
    `${server.url}/rest/getArtists.view?v=1.13.0&c=sonixd&f=json&${server.token}`,
    { params: { musicFolderId } }
  );

  const artists = (data.artists?.index || []).flatMap(
    (index: SSArtistIndex) => index.artist
  );

  return artists;
};

const getGenres = async (server: Server) => {
  const { data: genres } = await api.get<SSGenresResponse>(
    `${server.url}/rest/getGenres.view?v=1.13.0&c=sonixd&f=json&${server.token}`
  );

  return genres;
};

const getAlbum = async (server: Server, id: string) => {
  const { data: album } = await api.get<SSAlbumResponse>(
    `${server.url}/rest/getAlbum.view?v=1.13.0&c=sonixd&f=json&${server.token}`,
    { params: { id } }
  );

  return album;
};

const getAlbums = async (
  server: Server,
  params: SSAlbumsParams,
  recursiveData: any[] = []
) => {
  const albums: any = api
    .get<SSAlbumListResponse>(
      `${server.url}/rest/getAlbumList2.view?v=1.13.0&c=sonixd&f=json&${server.token}`,
      { params }
    )
    .then((res) => {
      if (
        !res.data.albumList2.album ||
        res.data.albumList2.album.length === 0
      ) {
        // Flatten and return once there are no more albums left
        return recursiveData.flatMap((album) => album);
      }

      // On every iteration, push the existing combined album array and increase the offset
      recursiveData.push(res.data.albumList2.album);
      return getAlbums(
        server,
        {
          musicFolderId: params.musicFolderId,
          offset: (params.offset || 0) + (params.size || 0),
          size: params.size,
          type: 'newest',
        },

        recursiveData
      );
    })
    .catch((err) => console.log(err));

  return albums as SSAlbumListEntry[];
};

const getArtistInfo = async (server: Server, id: string) => {
  const { data: artistInfo } = await api.get<SSArtistInfoResponse>(
    `${server.url}/rest/getArtistInfo2.view?v=1.13.0&c=sonixd&f=json&${server.token}`,
    { params: { id } }
  );

  return {
    ...artistInfo,
    artistInfo2: {
      ...artistInfo.artistInfo2,
      biography: artistInfo.artistInfo2.biography
        .replaceAll(/<a target.*<\/a>/gm, '')
        .replace('Biography not available', ''),
    },
  };
};

export const subsonicApi = {
  getAlbum,
  getAlbums,
  getArtistInfo,
  getArtists,
  getGenres,
  getMusicFolders,
};
