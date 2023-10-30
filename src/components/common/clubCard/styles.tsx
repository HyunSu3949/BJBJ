import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
  height: fit-content;
  box-sizing: border-box;
  border: 1px solid #dde1e6;
  > img {
    border-bottom: 1px solid #dde1e6;
  }
`;

export const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;

  h3 {
    margin-bottom: 20px;
    font-weight: 700;
  }

  p {
    margin-bottom: 40px;
  }

  a {
    display: flex;
    line-height: 24px;
    align-items: center;
    text-decoration: none;
    color: #0f62fe;
    &:visited {
      color: #0f62fe;
    }
  }
`;
