import { SubmitHandler, useForm } from 'react-hook-form';
import { useUserContext } from '../../contexts/userContext';
import * as S from './styles';
import UserImg from './../../common/userImg/UserImg';

type FormValue = {
  contents: string;
};
type Props = {
  feedId: string;
  handlePostComment: ({
    feedId,
    userId,
    contents,
  }: {
    feedId: string;
    userId: string;
    contents: string;
  }) => void;
};

export default function CommentForm({ feedId, handlePostComment }: Props) {
  const { userProfile } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const onSubmit: SubmitHandler<FormValue> = async data => {
    const postData = {
      contents: data.contents,
      userId: userProfile.userId,
      feedId,
    };

    handlePostComment(postData);
  };
  return (
    <S.FormWrapper>
      <UserImg imgUrl={userProfile.imgUrl} />
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register('contents', { required: true })} />
        {errors.contents && errors.contents.type === 'required' && (
          <div>댓글을 입력해주세요!</div>
        )}
        <button type="submit">등록</button>
      </S.Form>
    </S.FormWrapper>
  );
}
