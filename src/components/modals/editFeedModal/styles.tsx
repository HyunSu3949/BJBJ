import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    &:first-child {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  > div {
    display: flex;
  }

  input {
    border: 1px solid #d9d9d9;
    height: 24px;
    font-size: 12px;
    :focus {
      outline-style: none;
    }
    margin-bottom: 20px;

    &:last-of-type {
      border: none;
    }
  }

  label {
    font-size: 14px;
    margin-bottom: 8px;
  }

  p {
    color: #f42e2e;
  }

  textarea {
    border: 1px solid #d9d9d9;
    height: 300px;
    padding: 10px;
    border-radius: 4px;
    resize: vertical;
    margin-bottom: 20px;
  }
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 10px 20px;
  background-color: ${props =>
    props.variant === 'secondary' ? '#E2DED5' : '#0F62FE'};
  color: ${props => (props.variant === 'secondary' ? '#535353' : '#E2DED5')};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props =>
      props.variant === 'secondary' ? '#C0C0C0' : '#0056b3'};
  }

  :not(:last-child) {
    margin-right: 10px;
  }
`;

export const ImgBox = styled.div`
  position: relative;
  display: flex;
  width: fit-content;
`;

export const ButtonBox = styled.div`
  display: flex;
  margin: 0 auto;
  button {
    margin-right: 8px;
    border: none;
    background-color: #0f62fe;
    color: white;
    font-size: 16px;
    font-weight: 500;
    padding: 10px 20px;
    border-radius: 8px;
    &:last-child {
      background-color: #666666;
    }
  }
`;
export const CloseButtonBox = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
`;
