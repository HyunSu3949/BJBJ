import styled from 'styled-components';

export const SearchFormWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: white;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 750px;
  margin-bottom: 20px;

  label {
    margin-bottom: 10px;
  }
  > div {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    &:first-child {
      > div {
        flex-direction: row;
      }
    }
    &:last-child {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

export const Input = styled.input`
  padding: 10px;
  width: 70%;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
`;

export const Button = styled.button`
  padding: 9px 14px;
  background-color: #1976d2;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 10px;

  &:hover {
    background-color: #1565c0;
  }
`;

export const TagBox = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

export const Checkbox = styled.input`
  display: none;

  + label {
    color: gray;
  }

  &:checked + label {
    color: blue;
  }
`;

export const Label = styled.label<{ isSelected: boolean }>`
  color: ${props => (props.isSelected ? 'white' : '#535353')};
  background-color: ${props => (props.isSelected ? '#0F62FE' : '#E2DED5')};
  cursor: pointer;
  margin-right: 6px;
  display: inline-block;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 16px;
  &:hover {
    background-color: #0f62fe;
    color: white;
  }
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
`;

export const ResultContainer = styled.div`
  width: 100%;
`;

export const SearchResultTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const ListContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: fit-content;
  list-style: none;
  padding: 0;
  margin: 0 auto;
  > li {
    margin: 8px;
  }
`;
