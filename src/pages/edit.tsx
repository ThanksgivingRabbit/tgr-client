import { Center, Heading, Stack, Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import styled from 'styled-components';

import ContentModal from '../components/edit/contentModal';
import PasswordModal from '../components/edit/passwordModal';
import ReceiverSenderModal from '../components/edit/receiverSenderModal';
import { useSongpyeon } from '../hook/useSongPyeon';

const Container = styled(Center)`
  height: 100%;
  width: 100%;
  background: url(' ./src/assets/background.jpeg ');
`;

const ContentContainer = styled(Stack)`
  flex-direction: column;
`;

const StepCounterCountainer = styled(Flex)`
  padding: 1rem 0px;
  align-items: center;
  width: 100%;
  justify-content: space-around;
`;

const CircleIcon = styled(Flex)<{ selected: boolean }>`
  border-radius: 100%;
  width: 2rem;
  justify-content: center;
  align-items: center;
  height: 2rem;
  border: 1px solid ${({ selected }) => (selected ? 'green' : 'grey')};
`;

const MAX_PAGE = 3;

const StepCounter = ({ currentCount, maxCount }: { currentCount: number; maxCount: number }) => (
  <StepCounterCountainer>
    {Array(maxCount)
      .fill('')
      .map((v, index) => (
        <CircleIcon
          // eslint-disable-next-line react/no-array-index-key
          key={index + 1}
          selected={currentCount === index + 1}
        >
          <p>{index + 1}</p>
        </CircleIcon>
      ))}
  </StepCounterCountainer>
);

const EditPage = () => {
  const { songpyeon, handleSetSongpyeon } = useSongpyeon();
  const [counter, setCounter] = useState<number>(1);

  const handleClickNextPage = () => setCounter((page) => Math.min(page + 1, MAX_PAGE));
  const handleClickPrevPage = () => setCounter((page) => Math.max(page - 1, 1));

  return (
    <Container h='100vh'>
      <Box
        padding='8'
        maxW='md'
        minWidth='4rem'
        maxH='md'
        display='flex'
        flexDirection='column'
        background='white'
        borderWidth='1px'
        borderRadius='lg'
        overflow='hidden'
      >
        <Heading mb={4}>송편 만들기</Heading>
        <StepCounter
          currentCount={counter}
          maxCount={MAX_PAGE}
        />
        <ContentContainer spacing={12}>
          {counter === 1 && (
            <ReceiverSenderModal
              songpyeon={songpyeon}
              handleClickNextPage={handleClickNextPage}
              handleSetSongpyeon={handleSetSongpyeon}
            />
          )}
          {counter === 2 && (
            <ContentModal
              songpyeon={songpyeon}
              handleClickNextPage={handleClickNextPage}
              handleClickPrevPage={handleClickPrevPage}
              handleSetSongpyeon={handleSetSongpyeon}
            />
          )}
          {counter === 3 && (
            <PasswordModal
              songpyeon={songpyeon}
              handleClickPrevPage={handleClickPrevPage}
              handleSetSongpyeon={handleSetSongpyeon}
            />
          )}
        </ContentContainer>
      </Box>
    </Container>
  );
};

export default EditPage;
