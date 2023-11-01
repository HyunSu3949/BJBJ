import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin: 0 auto;
  h2 {
    font-size: 24px;
    font-weight: 500;
    margin-top: 30px;
    margin-bottom: 30px;
  }
`;
export const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  > div {
    display: flex;
  }
`;

export const TopLeftDiv = styled.div`
  margin-right: 30px;
`;
export const TopRightDiv = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TextBox = styled.div`
  h3 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 20px;
  }
  p {
    margin-bottom: 20px;
    &:nth-child(2) {
      font-size: 500;
      font-size: 24px;
    }

    &:nth-child(3) {
      font-size: 16px;
    }
  }
`;

export const TagBox = styled.div`
  > div {
    color: white;
    background-color: #0f62fe;
    margin-right: 6px;
    display: inline-block;
    padding: 6px 14px;
    border-radius: 8px;
    font-size: 12px;
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  button {
    color: white;
    background-color: #0f62fe;
    padding: 8px 20px;
    border: 1px solid #d9d9d9;
    cursor: pointer;
    margin-right: 4px;
  }
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 2px;
    border: 1px solid #d9d9d9;
  }
`;

export const BottomBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  > div {
    display: flex;
    flex-direction: column;
    > div {
      display: flex;
      h3 {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 20px;
        width: 100px;
      }
      p {
      }
    }
  }
`;
