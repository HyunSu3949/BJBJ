import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const DropdownContainer = styled.div`
  position: relative;
`;

export const TextButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  color: inherit;
  font: inherit;
  cursor: pointer;
  outline: none;
  font-weight: 700;
  &:hover {
    text-decoration: underline;
  }
`;

export const ListContainer = styled.ul`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 30px;
  left: 0;
  width: 200px;
  border-radius: 8px;
  background-color: white;
  border: 1px solid #ccc;
  list-style-type: none;
  padding: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  li {
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: underline;
  }
`;
