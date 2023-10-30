import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0px auto;
  padding: 10px;
  border-bottom: 1px solid #dde1e6;

  @media (max-width: 1200px) {
    max-width: 720px;
  }

  > div,
  > a {
    flex: 1;
  }
`;

export const LeftDiv = styled.div`
  display: flex;
  align-items: center;
  & > *:not(:last-child) {
    margin-right: 15px;
  }
  flex: 1;
`;

export const CenterLogo = styled(Link)`
  display: flex;
  justify-content: center;
  img {
    width: 70px;
    height: 70px;
  }
  flex: 1;
`;

export const RightDiv = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  & > *:not(:last-child) {
    margin-right: 10px;
  }
  flex: 1;
`;

export const UnstyledLink = styled(Link)`
  font-weight: 700;
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
