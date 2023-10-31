import styled from 'styled-components';

export const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px 0px;
  border-bottom: 2px solid #e2ded5;
  background-color: white;
`;

export const ContentsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

export const ToggleButton = styled.button<{ isActive: boolean }>`
  color: ${props => (props.isActive ? '#0f62fe' : '#535353')};
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.1s;
  margin-right: 10px;
  border: none;
  background-color: transparent;
  border-bottom: 2px solid
    ${props => (props.isActive ? '#0f62fe' : 'transparent')};

  font-weight: 700;
  &:hover {
    color: #0f62fe;
  }

  &:last-child {
    margin-right: 0;
  }
`;
