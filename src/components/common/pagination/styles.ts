import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  margin: 20px auto;
  font-size: 16px;
`;
export const List = styled.ol`
  display: flex;
  margin: 0 auto;
  list-style: none;
`;

export const Item = styled.li<{ isActive?: boolean }>`
  margin-right: 10px;
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? '#0f62fe' : 'black')};
  &:hover {
    text-decoration: underline;
  }
`;
