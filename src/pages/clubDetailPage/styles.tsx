import styled from 'styled-components';

export const BottomDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #d7d7d7;
  padding: 30px 0;

  h2 {
    margin-bottom: 20px;
  }
`;

export const ContentsDiv = styled.div`
  width: 1200px;
  @media (max-width: 768px) {
    width: 720px;
  }
  margin: 0 auto;
`;
