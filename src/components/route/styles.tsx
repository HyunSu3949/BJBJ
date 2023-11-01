import styled from 'styled-components';

export const LayoutWrapper = styled.div`
  width: 100%;
  margin: 0 auto;

  @media (max-width: 1200px) {
    max-width: 720px;
  }
  @media (max-width: 768px) {
    max-width: 720px;
  }

  header,
  main,
  footer {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
  }
`;
