/* eslint no-return-assign: "error" */

import { Center, VStack, Input, Text, Box, Button, Spacer } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { authenticate, getSongpyeon } from '../api';
import useConfetti from '../hook/useConfetti';
import { useSongpyeon } from '../hook/useSongPyeon';

const SongpyeonImg = styled.div<{ size: number }>`
  width: ${({ size }) => `${size}rem`};
  height: ${({ size }) => `${size}rem`};
  background-size: cover !important;
  background-position: center !important;
  background: url('/songpyeon.png');
`;

const SongpyeonPage = () => {
  const { id } = useParams();
  const [size, setSize] = useState(10);
  const [isAuth, setIsAuth] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [hint, setHint] = useState('');
  const { songpyeon, handleSetSongpyeon } = useSongpyeon();

  useConfetti(size === 14);

  useEffect(() => {
    async function getFecth() {
      const { status, ...data } = await getSongpyeon(id!);
      if (status === 300) {
        setHint(data.hint);
        setIsAuth(true);
      } else handleSetSongpyeon(data);
    }
    getFecth();
  }, [id]);

  // eslint-disable-next-line consistent-return
  const handleAuthanticate = async () => {
    if (inputRef.current === null) return;
    // eslint-disable-next-line consistent-return
    if (inputRef.current.value === '') return alert('암호를 입력해주세요.');
    const { status, data } = await authenticate(id!, inputRef.current.value);
    if (status === 401) alert('비밀번호가 잘못되었습니다.');
    else {
      handleSetSongpyeon(data);
      setIsAuth(false);
    }
  };

  const handleClick = () => {
    setSize((prev) => Math.min(prev + 1, 14));
  };
  return (
    <Center h='100vh'>
      {isAuth && (
        <VStack align='stretch'>
          <Box display='flex'>
            <pre>{'힌트 : '}</pre>
            <Text>{hint}</Text>
          </Box>
          <Input ref={inputRef} />
          <Button onClick={handleAuthanticate}>입력</Button>
        </VStack>
      )}
      {!isAuth && (
        <div>
          {size < 14 ? (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
            <VStack
              align='center'
              onClick={handleClick}
            >
              <SongpyeonImg size={size} />
              <Text>눌러주세요</Text>
            </VStack>
          ) : (
            <VStack
              align='stretch'
              spacing={4}
            >
              <Text>To. {songpyeon.sender}</Text>
              <div>{songpyeon.content}</div>
              <Text>From. {songpyeon.receiver}</Text>
              <Spacer />
              <Link to='/'>
                <Button>글 쓰러가기</Button>
              </Link>
            </VStack>
          )}
        </div>
      )}
    </Center>
  );
};

export default SongpyeonPage;
