import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
`;
export const IconDiv = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  cursor: pointer;
`;

export const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    font-weight: 700;
  }
  > div {
    display: flex;
    align-items: center;
    * {
      margin-right: 8px;
    }
  }
  button {
    border: none;
    background-color: transparent;
    color: #666666;
    cursor: pointer;
  }
`;

export const MidDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  h2 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 40px;
  }
  p {
    margin-bottom: 40px;
  }
  img {
    margin-bottom: 20px;
  }
  > div {
    display: flex;

    > div {
      * {
        margin-right: 8px;
      }
    }
  }
`;
export const ButtonDiv = styled.div`
  margin-bottom: 20px;
`;

export const BottomDiv = styled.div`
  display: flex;
  width: 100%;
  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 20px;
  }

  li {
    margin-bottom: 10px;
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  padding: 10px;
  width: 100%;
  background-color: #ebebeb;
  align-items: center;

  input {
    flex: 1;
    border: #d3d4d4;
    border-radius: 8px;
    height: 36px;
    margin-right: 10px;
  }

  button {
    border: none;
    background-color: #0f62fe;
    color: white;
    font-size: 16px;
    font-weight: 500;
    padding: 10px 20px;
    border-radius: 8px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex: 1;
  align-items: center;
`;

export const CommentWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  > div:first-child {
    display: flex;
    align-items: center;
  }
  .user-image-wrapper {
    display: flex;
    align-items: center;
    margin-right: 8px;
  }

  .comment-content-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .user-info-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .user-name {
        font-weight: bold;
      }

      .delete-button {
        color: #666666;
        border: none;
        background-color: transparent;
        cursor: pointer;
      }
    }

    .comment-text {
      margin-top: 5px;
    }
  }
`;
