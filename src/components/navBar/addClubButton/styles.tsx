import styled from 'styled-components';

export const Button = styled.button`
  border: none;
  border-radius: 8px;
  background-color: #0f62fe;
  font-size: 16px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  color: white;
  *:not(:nth-child(2)) {
    margin-right: 16px;
  }
  &:hover {
    background-color: #0050e6;
  }
`;
