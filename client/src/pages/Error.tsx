import styled from 'styled-components';
import { MdErrorOutline } from 'react-icons/md';
import Button from '@/components/Button';

const Error = () => {
  return (
    <ErrorStyle>
      <ErrorContentStyle>
        <MdErrorOutline size="60" />
        <p className="error__text">잘못된 접근입니다.</p>
      </ErrorContentStyle>
      <Button size="large" color="blue">
        메인페이지로 이동하기
      </Button>
    </ErrorStyle>
  );
};

const ErrorStyle = styled.div`
  position: absolute;
  top: 30%;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  gap: 30px;
`;

const ErrorContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;

  .error__text {
    font-size: ${({ theme }) => theme.font.xlarge};
  }

  svg {
    color: ${({ theme }) => theme.color.coral};
  }
`;

export default Error;
