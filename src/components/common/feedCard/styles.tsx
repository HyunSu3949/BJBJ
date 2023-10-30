import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
  padding: 10px 20px;
  padding-bottom: 20px;
  height: fit-content;
  box-sizing: border-box;
  border: 1px solid #dde1e6;
  border-radius: 16px;
  cursor: pointer;
`;

export const TopBox = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  > * {
    margin-right: 10px;
  }
  > span {
    font-weight: 700;
  }
`;

export const Paragraph = styled.p`
  height: 60px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BottomBox = styled.div`
  display: flex;
  height: 25px;
  color: #536471;
  font-size: 16px;
  > div {
    display: flex;
    align-items: center;
    > * {
      margin-right: 6px;
    }
    margin-right: 20px;
  }
`;
