import { Box, Button, Heading, Image, Link, Text } from '@chakra-ui/react';
import styled from 'styled-components';

const LogoImage = styled(Image)`
  position: absolute;
  top: 0;
  left: calc(50% - 150px);
`;

const MainBox = styled(Box)`
  height: 16rem;
  width: 32rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 10px;
  box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.1), 0px 4px 4px 4px rgba(0, 0, 0, 0.1);

  position: absolute;
  left: calc(50% - 16rem);
  top: 200px;
`;

const MainPage = () => (
  <Box
    position='relative'
    backgroundImage='./test_image.png'
    backgroundSize='100% 100%'
    minWidth='900px'
    minHeight='600px'
    width='100vw'
    height='100vh'
  >
    <MainBox bg='yellow.200'>
      <Heading marginTop='2rem'>친구에게 송편을 선물하세요</Heading>
      <Text
        margin='1rem 0'
        fontSize='2xl'
      >
        선물주는 토끼
      </Text>
      <Link
        margin='0.5rem 0'
        href='/edit'
      >
        <Button
          size='lg'
          colorScheme='red'
          variant='outline'
        >
          작성하기
        </Button>
      </Link>
    </MainBox>
    <LogoImage
      width='300px'
      src='./thanksgivingrabbit.png'
    />
  </Box>
);

export default MainPage;
