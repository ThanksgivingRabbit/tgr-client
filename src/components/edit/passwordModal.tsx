/* eslint no-return-assign: "error" */
import { Button, Flex, Checkbox, Text, Input } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import styled from 'styled-components';

import { makeSongpyeon } from '../../api';
import { SongpyeonType } from '../../hook/useSongPyeon';

interface PasswordModalType {
  handleClickPrevPage: () => void;
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
  justify-content: space-between;
  gap: 2rem;
`;
const Title = styled(Text)`
  white-space: nowrap;
  min-width: 6rem;
`;
export const PasswordModal = ({ songpyeon, handleClickPrevPage }: PasswordModalType) => {
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const password = useRef(null);
  const hint = useRef(null);

  const handleCheckPassword = () => setIsPassword((checked) => !checked);

  const handleSubmit = async () => {
    if (isPassword && password.current?.value === '') return;
    const result = await makeSongpyeon({
      ...songpyeon,
      password: password.current?.value,
      hint: hint.current?.value,
    });
    console.log(result);
  };

  return (
    <Container>
      <Wrapper minWidth='200px'>
        <Title>비밀번호 여부</Title>
        <Checkbox
          size='lg'
          colorScheme='green'
          onChange={handleCheckPassword}
        />
      </Wrapper>
      {isPassword && (
        <Wrapper
          direction='column'
          gap='1rem'
        >
          <Wrapper>
            <Title>비밀번호</Title>
            <Input ref={(el) => (password.current = el)} />
          </Wrapper>
          <Wrapper>
            <Title>힌트</Title>
            <Input ref={(el) => (hint.current = el)} />
          </Wrapper>
        </Wrapper>
      )}
      <Wrapper>
        <Button onClick={handleClickPrevPage}>이전</Button>
        <Button onClick={handleSubmit}>만들기</Button>
      </Wrapper>
    </Container>
  );
};
