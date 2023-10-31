import styled from 'styled-components';

export const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`;

export const ListItem = styled.li`
  background-color: white;
  border: 1px solid #dde1e6;
  display: flex;
  padding: 12px 24px;
  margin-bottom: 8px;
  align-items: center;
`;

export const ItemWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  > div {
    &:first-child {
      margin-right: 20px;
    }
  }

  p {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  button {
    margin-left: auto;
    background-color: #0f62fe;
    color: white;
    padding: 8px 26px;
    border-radius: 6px;
    border: #dde1e6;
    cursor: pointer;
    :hover {
      background-color: #004cd8;
    }
  }
`;
