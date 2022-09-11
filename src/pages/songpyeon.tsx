/* eslint no-return-assign: "error" */

import { Center, VStack, Input, Text, Box, Button, Spacer } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { authenticate, getSongpyeon } from '../api';
import useConfetti from '../hook/useConfetti';
import { useSongpyeon } from '../hook/useSongPyeon';

const SongpyeonPage = () => {
  const { id } = useParams();
  const [height, setHeight] = useState(0);
  const [size, setSize] = useState(0);
  const [isAuth, setIsAuth] = useState(false);
  const [image] = useState(new Image());

  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hint, setHint] = useState('');
  const { songpyeon, handleSetSongpyeon } = useSongpyeon();

  useConfetti(size === 1);

  const UpAndDown = () => {
    const time = Date.now() / 200;
    const t = Math.abs(Math.cos(time)) * 10;

    setHeight(t);
  };
  useEffect(() => {
    setInterval(UpAndDown, 0);
  });

  useEffect(() => {
    if (canvasRef.current === null) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx === null) return;
    image.src = '/songpyeon.png';
    image.onload = function () {
      ctx.drawImage(image, 0, height, image.width, image.height);
    };
  }, [isAuth, canvasRef]);

  useEffect(() => {
    if (canvasRef.current === null) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx === null) return;
    ctx.clearRect(0, 0, window.screen.width, window.screen.height);
    ctx.drawImage(image, 0, height, image.width, image.height);
  }, [isAuth, canvasRef, height]);

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
    setSize((prev) => Math.min(prev + 1, 1));
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
          {size < 1 ? (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
            <VStack
              align='center'
              onClick={handleClick}
            >
              <canvas
                ref={canvasRef}
                width={400}
                height={300}
              />
              <Text>눌러주세요</Text>
            </VStack>
          ) : (
            <VStack
              align='stretch'
              spacing={4}
            >
              <Text>To. {songpyeon.receiver}</Text>
              <div>{songpyeon.content}</div>
              <Text>From. {songpyeon.sender}</Text>
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
