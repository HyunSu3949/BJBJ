import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  background-color: white;
  margin: 0 auto;
  padding-bottom: 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #dde1e6;

  > h2 {
    font-size: 16px;
    margin: 20px 0;
    font-weight: 400;
  }

  > a {
    display: flex;
    width: fit-content;
    margin: 0 auto;
    color: white;
    background-color: #0f62fe;
    padding: 20px;
    text-decoration: none;
  }
  @media (max-width: 1200px) {
    max-width: 720px;
    h2 {
      margin-left: 20px;
    }
  }
`;
