import { rand } from './random';

export const COMMENT_LIST = [
  '추석 잘 보내세요.',
  '재미있는 개발하세요',
  '즐거운 한가위 되세요',
  '아들~ 공부는 잘하고 있지?',
];

export const COMMENT_LIST_LENGTH = COMMENT_LIST.length;

export const getRandomComment = () => COMMENT_LIST[rand(0, COMMENT_LIST_LENGTH - 1)];
