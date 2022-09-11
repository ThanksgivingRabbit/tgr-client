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
