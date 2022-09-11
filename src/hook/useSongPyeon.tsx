import { useState } from 'react';

export interface SongpyeonType {
  content: string;
  sender: null | string;
  receiver: string;
  password: null | string;
  hint: null | string;
}

const INIT_SONGPYEON: SongpyeonType = {
  content: '',
  hint: null,
  password: null,
  sender: null,
  receiver: '',
};

export const useSongpyeon = () => {
  const [songpyeon, setSongpyeon] = useState<SongpyeonType>(INIT_SONGPYEON);

  const handleSetSongpyeon = (data: Partial<SongpyeonType>) =>
    setSongpyeon((prev) => ({ ...prev, ...data }));

  return {
    songpyeon,
    handleSetSongpyeon,
  };
};
