import React, { useState } from 'react';
import { useModalContext } from '../../contexts/modalContext';
import { useUserContext } from '../../contexts/userContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { modals } from '../Modals';
import { uploadImgToS3 } from '../../../apis/authApis';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { postFeed } from '../../../apis/feedApis';
import EmptyImg from '../../../assets/image/empty_img.svg';

type Props = {
  onClose: () => void;
};

type FormValue = {
  title: string;
  img: FileList;
  contents: string;
};

export default function FeedForm({ onClose }: Props) {
  const { clubId } = useParams();
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const { openModal } = useModalContext();
  const { userProfile } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImg(null);
    }
  };

  const handleImageRemove = () => {
    setPreviewImg(null);
  };

  const onSubmit: SubmitHandler<FormValue> = async data => {
    let imgUrl = '';
    if (data.img.length) {
      const imageName = uuidv4() + data.img[0].name;
      const file: File = data.img[0];
      const fileType: string = file.type;

      imgUrl = await uploadImgToS3(imageName, file, fileType);
    }

    const postData = {
      clubId: clubId as string,
      userId: userProfile.userId,
      title: data.title,
      contents: data.contents,
      imgUrl,
    };

    const { code } = await postFeed(postData);
    if (code != 1) {
      openModal({
        Component: modals.CompletionModal,
        props: {
          message: '등록에 실패했습니다. 잠시후 다시 시도해주세요.',
          btnText: '확인',
        },
      });
    }
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <label htmlFor="title">title</label>
      <input
        {...register('title', { required: true, maxLength: 20 })}
        placeholder="제목을 입력해주세요"
      />
      {errors.title && errors.title.type === 'required' && (
        <div>제목을 입력해 주세요!</div>
      )}
      {errors.title && errors.title.type === 'maxLength' && (
        <div>최대 20자만 입력할 수 있습니다!</div>
      )}

      <label htmlFor="contents">contents</label>
      <textarea {...register('contents', { required: true, maxLength: 20 })} />
      {errors.contents && errors.contents.type === 'required' && (
        <div>내용을 입력해 주세요!</div>
      )}

      <label htmlFor="img">img</label>
      {previewImg ? (
        <div>
          <img
            src={previewImg}
            alt="Preview"
            style={{ width: '200px', height: '200px' }}
          />
          <button onClick={handleImageRemove} type="button">
            X
          </button>
        </div>
      ) : (
        <EmptyImg style={{ width: '200px', height: '200px' }} />
      )}
      <input type="file" {...register('img')} onChange={handleImageChange} />

      <button type="submit">글 쓰기</button>
    </form>
  );
}
