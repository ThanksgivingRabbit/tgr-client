import axios from 'axios';

import { SongpyeonType } from '../hook/useSongPyeon';

const BASE_API_URL = 'https://thanks-giving-rabbit.herokuapp.com';

export const makeSongpyeon = async (data: Partial<SongpyeonType>) => {
  const {
    data: {
      data: { code },
    },
  } = await axios({
    url: `${BASE_API_URL}/api/v1/songpyeons`,
    method: 'POST',
    headers: {
      'Content-Type': `application/json`,
    },
    data,
  });
  return code;
};

export const getSongpyeon = async (code: string) => {
  const {
    data: { data },
  } = await axios({
    url: `${BASE_API_URL}/api/v1/songpyeons/${code}`,
    method: 'GET',
    headers: {
      'Content-Type': `application/json`,
    },
  });
  if (data?.hint !== undefined) return { status: 300, ...data };

  return { status: 200, ...data };
};

export const authenticate = async (code: string, password: string) => {
  try {
    const {
      data: { data },
    } = await axios({
      url: `${BASE_API_URL}/api/v1/songpyeons/${code}/authenticate`,
      method: 'POST',
      headers: {
        'Content-Type': `application/json`,
      },
      data: {
        password,
      },
    });
    if (data?.status === 401) return { status: 401 };

    return { status: 200, data };
  } catch (e) {
    return { status: 401 };
  }
};
