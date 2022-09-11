/* eslint no-return-assign: "error" */

import { Button, Center, Stack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { shareMessage } from '../utils/index';

const SongpyeonImg = styled.div<{ size: number }>`
  width: ${({ size }) => `${size}rem`};
  height: ${({ size }) => `${size}rem`};
  background-size: cover !important;
  background: url(' /src/assets/songpyeon.png ');
`;

const ResultPage = () => {
  const { id, sender } = useParams();

  const handleShareToKakao = () => {
    shareMessage(sender ?? '익명', id);
  };

  return (
    <Center h='100vh'>
      <Stack>
        <SongpyeonImg size={10} />
        <Button onClick={handleShareToKakao}>카카오톡으로 공유하기</Button>
      </Stack>
    </Center>
  );
};

export default ResultPage;
