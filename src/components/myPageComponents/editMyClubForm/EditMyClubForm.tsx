import React, { useEffect, useState } from 'react';
import { useModalContext } from '../../contexts/modalContext';
import { Tag, Tags } from '../../../mocks/types';
import { useUserContext } from '../../contexts/userContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { modals } from '../../modals/Modals';
import { uploadImgToS3 } from '../../../apis/authApis';
import {
  deleteClub,
  getUsersClubInfo,
  putUsersClubInfo,
} from '../../../apis/clubApis';
import { v4 as uuidv4 } from 'uuid';
import EmptyImg from '../../../assets/image/empty_img.svg';
import { domains } from '../../../constants/constants';
import * as S from './styles';
import ClubImg from '../../common/clubImg/ClubImg';

type FormValue = {
  title: string;
  img: FileList | null;
  contents: string;
  maxPersonnel: number;
  description: string;
  bookTitle: string;
  author: string;
  publisher: string;
  tags: TagType;
};

type TagType = {
  [key in Tag]: boolean;
};

export default function EditMyClubForm() {
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
    const fetchInitialData = async (userId: string) => {
      const initialData = await getUsersClubInfo(userId);

      if (initialData) {
        setValue('title', initialData.title);
        setValue('contents', initialData.contents);
        setValue('maxPersonnel', initialData.maxPersonnel);
        setValue('description', initialData.description);
        setValue('bookTitle', initialData.bookTitle);
        setValue('author', initialData.author);
        setValue('publisher', initialData.publisher);
        setPreviewImg(domains.imgUrl + initialData.imgUrl || null);
        initialData.tags?.split(',').forEach((tag: string) => {
          setValue(`tags.${tag as Tag}`, true);
        });
      }
    };

    fetchInitialData(userProfile.userId);
  }, [setValue, userProfile.userId]);

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

  const [tagsState, setTagsState] = useState<TagType>({
    소모임: false,
    오프라인: false,
    온라인: false,
    수도권: false,
    지방: false,
  });

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setValue(`tags.${value as Tag}`, checked);
    setTagsState(prev => ({ ...prev, [value]: checked }));
  };

  const getTagString = (obj: TagType) => {
    return Object.entries(obj)
      .filter(([_, val]) => val)
      .map(([key, _]) => key)
      .join(',') as Tags;
  };

  const onSubmit: SubmitHandler<FormValue> = async data => {
    let imgUrl = '';
    if (data.img?.length) {
      const imageName = uuidv4() + data.img[0].name;
      const file: File = data.img[0];
      const fileType: string = file.type;

      imgUrl = await uploadImgToS3(imageName, file, fileType);
    }

    const postData = {
      userId: userProfile.userId,
      title: data.title,
      contents: data.contents,
      maxPersonnel: data.maxPersonnel,
      description: data.description,
      tags: getTagString(data.tags),
      bookTitle: data.bookTitle,
      author: data.author,
      publisher: data.publisher,
      imgUrl,
    };

    await putUsersClubInfo(userProfile.userId, postData);

    openModal({
      Component: modals.CompletionModal,
      props: {
        message: '수정이 완료되었습니다',
        btnText: '확인',
      },
    });
  };
  const handleDeleteClub = async () => {
    await deleteClub({ userId: userProfile.userId });
  };
  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <S.LeftDiv>
          <div>
            <label>모임 이름</label>
            <input {...register('title', { required: true, maxLength: 20 })} />
            {errors.title && errors.title.type === 'required' && (
              <p>모임 제목을 입력해 주세요!</p>
            )}
            {errors.title && errors.title.type === 'maxLength' && (
              <p>최대 20자만 입력할 수 있습니다!</p>
            )}
          </div>

          <div>
            <label>모임 인원</label>
            <input
              {...register('maxPersonnel', {
                required: true,
                pattern: /^[0-9]+$/,
                max: 100,
              })}
              type="number"
            />
            {errors.maxPersonnel && errors.maxPersonnel.type === 'required' && (
              <p>최대 참여 인원을 입력해 주세요!</p>
            )}
            {errors.maxPersonnel && errors.maxPersonnel.type === 'pattern' && (
              <p>숫자만 입력 가능합니다!</p>
            )}
            {errors.maxPersonnel && errors.maxPersonnel.type === 'max' && (
              <p>최대 100명까지 입력할 수 있습니다!</p>
            )}
          </div>
          <div>
            <label>태그</label>
            <S.TagBox>
              {(
                ['소모임', '오프라인', '온라인', '수도권', '지방'] as Tag[]
              ).map(tag => (
                <S.StyledLabel key={tag} isSelected={tagsState[tag]}>
                  <S.StyledCheckbox
                    type="checkbox"
                    value={tag}
                    {...register(`tags.${tag}`)}
                    onChange={handleTagChange}
                  />
                  {tag}
                </S.StyledLabel>
              ))}
            </S.TagBox>
          </div>
          <div>
            <label>책 제목</label>
            <input {...register('bookTitle', { required: true })} />
            {errors.bookTitle && errors.bookTitle.type === 'required' && (
              <p>책 제목을 입력해 주세요!</p>
            )}
          </div>
          <div>
            <label>작가</label>
            <input {...register('author', { required: true })} />
            {errors.author && errors.author.type === 'required' && (
              <p>저자 이름을 입력해 주세요!</p>
            )}
          </div>

          <div>
            <label>출판사 (선택사항)</label>
            <input {...register('publisher')} />
          </div>
        </S.LeftDiv>
        <S.RightDiv>
          <label>이미지</label>
          {previewImg ? (
            <img src={previewImg} alt="Preview" />
          ) : (
            <ClubImg imgUrl={previewImg || ''} />
          )}
          <input
            type="file"
            {...register('img')}
            onChange={handleImageChange}
          />
        </S.RightDiv>
      </div>
      <div>
        <S.BottomDiv>
          <div>
            <label>모임 한 줄 소개</label>
            <input
              {...register('contents', { required: true, maxLength: 20 })}
            />
            {errors.contents && errors.contents.type === 'required' && (
              <p>한줄 소개를 입력해 주세요!</p>
            )}
            {errors.contents && errors.contents.type === 'maxLength' && (
              <p>최대 20자만 입력할 수 있습니다!</p>
            )}
          </div>
          <div>
            <label>모임 상세 설명</label>
            <S.TextArea
              {...register('description', { required: true, maxLength: 200 })}
            />
            {errors.description && errors.description.type === 'required' && (
              <p>모임 상세 설명을 입력해주세요!</p>
            )}
            {errors.description && errors.description.type === 'maxLength' && (
              <p>최대 200자까지만 입력할 수 있습니다!</p>
            )}
          </div>
        </S.BottomDiv>
      </div>
      <S.ButtonBox>
        <S.Button variant="primary">등록</S.Button>
        <S.Button onClick={handleDeleteClub} type="button">
          독서모임 삭제
        </S.Button>
      </S.ButtonBox>
    </S.Form>
  );
}
