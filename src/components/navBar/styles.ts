import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1000px;
  margin: 0 auto;
`;

export const LeftDiv = styled.div`
  display: flex;
  align-items: center;
  & > *:not(:last-child) {
    margin-right: 15px;
  }
`;

export const CenterLogo = styled(Link)`
  img {
    width: 50px;
    height: 50px;
  }
`;

export const RightDiv = styled.div`
  display: flex;
  align-items: center;
  & > *:not(:last-child) {
    margin-right: 10px;
  }
`;

export const UnstyledLink = styled(Link)`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  color: inherit;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
