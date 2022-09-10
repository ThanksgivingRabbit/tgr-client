import { Center, Heading, Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

import { ContentModal, ReceiverSenderModal, PasswordModal } from '../components/edit/index';
import { useSongpyeon } from '../hook/useSongPyeon';

const Container = styled(Center)`
  height: 100%;
  width: 100%;
  background: url(' ./src/assets/background.jpeg ');
`;

const StepCounterCountainer = styled(Flex)`
  padding: 1rem 0px;
  margin-bottom: 1rem;
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
  border: 2px solid ${({ selected }) => (selected ? 'green' : 'grey')};
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
        width='90%'
        maxWidth='400px'
        height='90%'
        maxHeight='500px'
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
        <TransitionGroup className='transitions-wrapper'>
          <CSSTransition
            key={counter}
            classNames='right'
            timeout={500}
          >
            <div style={{ height: '100%' }}>
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
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Box>
    </Container>
  );
};

export default EditPage;
