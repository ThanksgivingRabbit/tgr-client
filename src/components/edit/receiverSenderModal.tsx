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

const Container = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

const Wrapper = styled(Flex)`
  align-items: center;
  gap: 2rem;
`;
const Title = styled(Text)`
  white-space: nowrap;
  min-width: 6rem;
`;
export const ReceiverSenderModal = ({
  handleClickNextPage,
  handleSetSongpyeon,
  songpyeon,
}: ReceiverSenderModalType) => {
  const receiver = useRef(null);
  const sender = useRef(null);

  const handleClick = (event) => {
    if (sender.current.value === '') return;
    event.preventDefault();
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
    <Container>
      <Wrapper>
        <Title>보내는 사람</Title>
        <Input ref={(el) => (receiver.current = el)} />
      </Wrapper>
      <Wrapper>
        <Title>받는 사람</Title>
        <Input
          ref={(el) => (sender.current = el)}
          required
        />
      </Wrapper>
      <Button
        type='submit'
        onClick={handleClick}
      >
        다음
      </Button>
    </Container>
  );
};
