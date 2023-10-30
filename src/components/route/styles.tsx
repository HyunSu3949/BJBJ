import styled from 'styled-components';

export const LayoutWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 720px;
  }

  header,
  main,
  footer {
    width: 100%;
    box-sizing: border-box;
  }
`;
