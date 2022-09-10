/* eslint no-return-assign: "error" */
import { Button, Flex, Textarea, Text } from '@chakra-ui/react';
import { useRef, useEffect } from 'react';
import styled from 'styled-components';

import { SongpyeonType } from '../../hook/useSongPyeon';

interface ReceiverSenderModalType {
  handleClickNextPage: () => void;
  handleClickPrevPage: () => void;
  // eslint-disable-next-line no-unused-vars
  handleSetSongpyeon: (data: Partial<SongpyeonType>) => void;
  songpyeon: SongpyeonType;
}

const Wrapper = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
`;
const Title = styled(Text)`
  white-space: nowrap;
  min-width: 6rem;
`;
const ContentModal = ({
  handleClickNextPage,
  handleClickPrevPage,
  handleSetSongpyeon,
  songpyeon,
}: ReceiverSenderModalType) => {
  const content = useRef(null);

  const handleClick = () => {
    if (content.current.value === '') return;
    handleSetSongpyeon({
      content: content.current.value,
    });
    handleClickNextPage();
  };

  useEffect(() => {
    content.current.value = songpyeon.content;
  }, [content]);
  return (
    <>
      <Wrapper>
        <Title>덕담 내용을 적어주세요</Title>
        <Button>랜덤 돌리기</Button>
      </Wrapper>
      <Textarea ref={(el) => (content.current = el)} />
      <Wrapper>
        <Button onClick={handleClickPrevPage}>이전</Button>
        <Button onClick={handleClick}>다음</Button>
      </Wrapper>
    </>
  );
};

export default ContentModal;
