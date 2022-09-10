import { SongpyeonType } from '../hook/useSongPyeon';

const BASE_API_URL = 'https://thanks-giving-rabbit.herokuapp.com/';

export const makeSongpyeon = async (data: Partial<SongpyeonType>) => {
  const result = await fetch(`${BASE_API_URL}/api/v1/songpyeons`, {
    method: 'POST',
    // mode: 'no-cors',
    body: {
      ...data,
    },
  });
  return result.json();
};
