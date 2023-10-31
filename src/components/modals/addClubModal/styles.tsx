import styled from 'styled-components';

export const Heading = styled.div`
  display: flex;
  margin-bottom: 16px;
  * {
    display: flex;
    margin: 0 auto;
    margin-bottom: 20px;
    font-weight: 700;
    font-size: 20px;
  }
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
  }
  input {
    height: 24px;
    font-size: 12px;
    :focus {
      outline-style: none;
    }
  }
  label {
    font-size: 14px;
    margin-bottom: 8px;
  }
  p {
    color: #f42e2e;
  }
`;

export const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding-right: 60px;
  > div {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
  }
`;

export const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  width: 50%;
  img {
    width: 280px;
    height: 220px;
    object-fit: cover;
  }
`;

export const BottomDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  > div {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
  }
`;

export const StyledCheckbox = styled.input`
  display: none;

  + label {
    color: gray;
  }

  &:checked + label {
    color: #0f62fe;
  }
`;

export const StyledLabel = styled.label<{ isSelected: boolean }>`
  color: ${props => (props.isSelected ? 'white' : '#535353')};
  background-color: ${props => (props.isSelected ? '#0F62FE' : '#E2DED5')};
  cursor: pointer;
  margin-right: 6px;
  display: inline-block;
  padding: 4px 6px;
  border-radius: 8px;
  font-size: 12px;
  &:hover {
    background-color: #0f62fe;
    color: white;
  }
`;

export const TagBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 15px;
`;

export const TextArea = styled.textarea`
  height: 150px;
  padding: 10px;
  border-radius: 4px;
  resize: vertical;
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

export const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
