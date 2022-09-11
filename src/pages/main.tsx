import { Button, Center, Heading, Image, Link, Stack, Text } from '@chakra-ui/react';
import styled from 'styled-components';

const Container = styled(Center)`
  height: 100%;
  width: 100%;
  background: url('./test_image.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const MainBox = styled(Stack)`
  height: 16rem;
  width: 28rem;
  max-width: 80%;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 10px;
  box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.1), 0px 4px 4px 4px rgba(0, 0, 0, 0.1);
`;

const MainPage = () => (
  <Container h='100vh'>
    <Image
      width='300px'
      src='./thanksgivingrabbit.png'
    />
    <MainBox bg='yellow.200'>
      <Heading
        fontSize='3xl'
        marginTop='2rem'
      >
        송편을 선물하세요
      </Heading>
      <Text
        margin='1rem 0'
        fontSize='xl'
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
  </Container>
);

export default MainPage;
