import styled from 'styled-components';

export const Wrapper = styled.div<{ big?: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${props => (props.big ? '600px' : '280px')};
  padding: ${props => (props.big ? '' : '10px 10px')};
  height: fit-content;
  box-sizing: border-box;
  border: 1px solid #dde1e6;
  border-radius: 16px;
  cursor: pointer;
  background-color: white;
  overflow: hidden;
  margin-bottom: ${props => (props.big ? '60px' : '0')};
`;

export const BigWrapper = styled.div`
  padding: 10px 10px;
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

export const FormWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  background-color: #ebebeb;
  align-items: center;
  padding: 10px;
  input {
    flex: 1;
    border: #d3d4d4;
    border-radius: 8px;
    height: 36px;
    margin-right: 10px;
  }

  button {
    border: none;
    background-color: #0f62fe;
    color: white;
    font-size: 16px;
    font-weight: 500;
    padding: 10px 20px;
    border-radius: 8px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex: 1;
  align-items: center;
`;
