/* eslint no-return-assign: "error" */
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { SongpyeonType } from '../../hook/useSongPyeon';

interface ReceiverSenderModalType {
  handleClickNextPage: () => void;
  // eslint-disable-next-line no-unused-vars
  handleSetSongpyeon: (data: Partial<SongpyeonType>) => void;
  songpyeon: SongpyeonType;
}

const Wrapper = styled(Flex)`
  align-items: center;
  gap: 2rem;
`;
const Title = styled(Text)`
  white-space: nowrap;
  min-width: 6rem;
`;
const ReceiverSenderModal = ({
  handleClickNextPage,
  handleSetSongpyeon,
  songpyeon,
}: ReceiverSenderModalType) => {
  const receiver = useRef(null);
  const sender = useRef(null);

  const handleClick = () => {
    if (sender.current.value === '') return;
    handleSetSongpyeon({
      receiver: receiver.current.value,
      sender: sender.current.value,
    });

    handleClickNextPage();
  };

  useEffect(() => {
    receiver.current.value = songpyeon.receiver;
    sender.current.value = songpyeon.sender ?? '';
  }, [receiver, sender]);

  return (
    <>
      <Wrapper>
        <Title>보내는 사람</Title>
        <Input ref={(el) => (receiver.current = el)} />
      </Wrapper>
      <Wrapper>
        <Title>받는 사람</Title>
        <Input ref={(el) => (sender.current = el)} />
      </Wrapper>
      <Button onClick={handleClick}>다음</Button>
    </>
  );
};

export default ReceiverSenderModal;
