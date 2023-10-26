import styled from 'styled-components';

export const TextButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  color: inherit;
  font: inherit;
  cursor: pointer;
  outline: none;

  &:hover {
    text-decoration: underline;
  }
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100px;
`;
