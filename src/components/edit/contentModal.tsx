/* eslint no-return-assign: "error" */
import { Button, Flex, Textarea, Text } from '@chakra-ui/react';
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

import { SongpyeonType } from '../../hook/useSongPyeon';
import { getRandomComment } from '../../utils/index';

interface ContentModalType {
  handleClickNextPage: () => void;
  handleClickPrevPage: () => void;
  // eslint-disable-next-line no-unused-vars
  handleSetSongpyeon: (data: Partial<SongpyeonType>) => void;
  songpyeon: SongpyeonType;
}

const Container = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

const Wrapper = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
`;
const Title = styled(Text)`
  white-space: nowrap;
  min-width: 6rem;
  font-size: 0.8rem;
`;
export const ContentModal = ({
  handleClickNextPage,
  handleClickPrevPage,
  handleSetSongpyeon,
  songpyeon,
}: ContentModalType) => {
  const content = useRef<HTMLTextAreaElement>(null);

  const handleGetRandomComment = () => {
    if (content.current === null) return;
    content.current.value = getRandomComment();
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (content.current === null || content.current?.value === '') return;
    event.preventDefault();
    handleSetSongpyeon({
      content: content.current.value,
    });
    handleClickNextPage();
  };

  useEffect(() => {
    if (content.current === null) return;
    content.current.value = songpyeon.content;
  }, [content]);
  return (
    <Container>
      <Wrapper>
        <Title>덕담 내용을 적어주세요</Title>
        <Button onClick={handleGetRandomComment}>랜덤 돌리기</Button>
      </Wrapper>
      <Textarea
        ref={content}
        required
      />
      <Wrapper>
        <Button onClick={handleClickPrevPage}>이전</Button>
        <Button
          type='submit'
          onClick={handleClick}
        >
          다음
        </Button>
      </Wrapper>
    </Container>
  );
};
