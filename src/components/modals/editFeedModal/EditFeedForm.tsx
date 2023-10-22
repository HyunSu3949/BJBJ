import React, { useEffect, useState } from 'react';
import { useModalContext } from '../../contexts/modalContext';
import { useUserContext } from '../../contexts/userContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { modals } from '../Modals';
import { uploadImgToS3 } from '../../../apis/authApis';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { deleteFeed, getFeedDetail, putFeed } from '../../../apis/feedApis';
import EmptyImg from '../../../assets/image/empty_img.svg';

type Props = {
  onClose: () => void;
  feedId: string;
};

type FormValue = {
  title: string;
  img: FileList | null;
  contents: string;
};

type ConfirmModaltype = {
  onConfirm: () => void;
};

export default function EditFeedForm({ onClose, feedId }: Props) {
  const { clubId } = useParams();
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const { openModal } = useModalContext();
  const { userProfile } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValue>();

  useEffect(() => {
    const fetchInitialData = async (feedId: string) => {
      const initialData = await getFeedDetail(feedId);

      if (initialData) {
        setValue('title', initialData.title);
        setValue('contents', initialData.contents);
        setPreviewImg(initialData.imgUrl || null);
      }
    };

    fetchInitialData(feedId);
  }, [feedId, setValue]);

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
    setValue('img', null);
  };

  const onSubmit: SubmitHandler<FormValue> = async data => {
    let imgUrl = '';
    if (data.img?.length) {
      imgUrl = await uploadImgToS3(uuidv4() + data.img[0].name, data.img[0]);
    }

    const postData = {
      feedId,
      clubId: clubId as string,
      userId: userProfile.userId,
      title: data.title,
      contents: data.contents,
      imgUrl,
    };

    const { code } = await putFeed(postData);
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

  const handleDelete = () => {
    openModal<ConfirmModaltype>({
      Component: modals.ConfirmModal,
      props: {
        onConfirm: () => {
          deleteFeed(feedId);
        },
        message: '게시글을 삭제하시겠어요?',
        btnText: '확인',
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>title</label>
      <input {...register('title', { required: true, maxLength: 20 })} />
      {errors.title && errors.title.type === 'required' && (
        <div>제목을 입력해 주세요!</div>
      )}
      {errors.title && errors.title.type === 'maxLength' && (
        <div>최대 20자만 입력할 수 있습니다!</div>
      )}

      <label>contents</label>
      <textarea {...register('contents', { required: true, maxLength: 20 })} />
      {errors.contents && errors.contents.type === 'required' && (
        <div>내용을 입력해 주세요!</div>
      )}

      <label>img</label>
      {previewImg ? (
        <div style={{ position: 'relative' }}>
          <img
            src={previewImg}
            alt="Preview"
            style={{ width: '200px', height: '200px' }}
          />
          <button
            type="button"
            onClick={handleImageRemove}
            style={{ position: 'absolute', top: 0, right: 0 }}
          >
            X
          </button>
        </div>
      ) : (
        <EmptyImg style={{ width: '100px', height: '100px' }} />
      )}
      <input type="file" {...register('img')} onChange={handleImageChange} />

      <button type="submit">수정</button>
      <button type="button" onClick={handleDelete}>
        삭제
      </button>
    </form>
  );
}
