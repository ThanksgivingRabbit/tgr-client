/* eslint no-return-assign: "error" */

import { Button, Center, Stack } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { shareMessage } from '../utils/index';

const ResultPage = () => {
  const { id, sender } = useParams();
  const [height, setHeight] = useState(0);
  const [image] = useState(new Image());
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleShareToKakao = () => {
    shareMessage(sender!, id!);
  };
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
  }, [canvasRef]);

  useEffect(() => {
    if (canvasRef.current === null) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx === null) return;
    ctx.clearRect(0, 0, window.screen.width, window.screen.height);
    ctx.drawImage(image, 0, height, image.width, image.height);
  }, [canvasRef, height]);

  return (
    <Center h='100vh'>
      <Stack>
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
        />
        <Button onClick={handleShareToKakao}>카카오톡으로 공유하기</Button>
      </Stack>
    </Center>
  );
};

export default ResultPage;
