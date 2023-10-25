import { useForm, SubmitHandler } from 'react-hook-form';
import { uploadImgToS3 } from '../../../apis/authApis';
import { v4 as uuidv4 } from 'uuid';
import { useUserContext } from '../../contexts/userContext';
import { postClub } from '../../../apis/clubApis';
import { Tag, Tags } from '../../../mocks/types';
import { useState } from 'react';
import { useModalContext } from '../../contexts/modalContext';
import { modals } from '../Modals';
import EmptyImg from '../../../assets/image/empty_img.svg';

type Props = {
  handleClose: () => void;
};
type FormValue = {
  title: string;
  img: FileList;
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
export default function ClubForm({ handleClose }: Props) {
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const { openModal } = useModalContext();
  const { userProfile } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setValue(`tags.${value as Tag}`, checked);
  };

  const handleAddClubResponse = (code: number) => {
    if (code != 1) {
      openModal({
        Component: modals.CompletionModal,
        props: {
          message: '등록이 실패되었습니다. 다시 시도해주세요',
          btnText: '확인',
        },
      });
    } else {
      openModal({
        Component: modals.CompletionModal,
        props: {
          message: '등록이 완료되었습니다!',
          btnText: '확인',
        },
      });
    }
    handleClose();
  };

  const getTagString = (obj: TagType) => {
    return Object.entries(obj)
      .filter(([_, val]) => val)
      .map(([key, _]) => key)
      .join(',') as Tags;
  };
  const onSubmit: SubmitHandler<FormValue> = async data => {
    let imgUrl = '';
    if (data.img.length) {
      imgUrl = await uploadImgToS3(uuidv4() + data.img[0].name, data.img[0]);
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
    console.log('클럽 등록 데이터: ', postData);

    const { code } = await postClub(postData);

    handleAddClubResponse(code);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <label>title</label>
      <input {...register('title', { required: true, maxLength: 20 })} />
      {errors.title && errors.title.type === 'required' && (
        <div>모임 제목을 입력해 주세요!</div>
      )}
      {errors.title && errors.title.type === 'maxLength' && (
        <div>최대 20자만 입력할 수 있습니다!</div>
      )}

      <label>contents</label>
      <input {...register('contents', { required: true, maxLength: 20 })} />
      {errors.contents && errors.contents.type === 'required' && (
        <div>한줄 소개를 입력해 주세요!</div>
      )}
      {errors.contents && errors.contents.type === 'maxLength' && (
        <div>최대 20자만 입력할 수 있습니다!</div>
      )}

      <label>img</label>
      {previewImg ? (
        <img
          src={previewImg}
          alt="Preview"
          style={{ width: '200px', height: '200px' }}
        />
      ) : (
        <EmptyImg style={{ width: '100px', height: '100px' }} />
      )}
      <input type="file" {...register('img')} onChange={handleImageChange} />

      <label>maxPersonnel</label>
      <input
        {...register('maxPersonnel', {
          required: true,
          pattern: /^[0-9]+$/,
          max: 100,
        })}
        type="number"
      />
      {errors.maxPersonnel && errors.maxPersonnel.type === 'required' && (
        <div>최대 참여 인원을 입력해 주세요!</div>
      )}
      {errors.maxPersonnel && errors.maxPersonnel.type === 'pattern' && (
        <div>숫자만 입력 가능합니다!</div>
      )}
      {errors.maxPersonnel && errors.maxPersonnel.type === 'max' && (
        <div>최대 100명까지 입력할 수 있습니다!</div>
      )}

      <label>description</label>
      <input {...register('description', { required: true, maxLength: 200 })} />
      {errors.description && errors.description.type === 'required' && (
        <div>모임 상세 설명을 입력해주세요!</div>
      )}
      {errors.description && errors.description.type === 'maxLength' && (
        <div>최대 200자까지만 입력할 수 있습니다!</div>
      )}

      <div>
        {(['소모임', '오프라인', '온라인', '수도권', '지방'] as Tag[]).map(
          tag => (
            <label key={tag}>
              <input
                type="checkbox"
                value={tag}
                {...register(`tags.${tag}`)}
                onChange={handleTagChange}
              />
              {tag}
            </label>
          ),
        )}
      </div>

      <label>bookTitle</label>
      <input {...register('bookTitle', { required: true })} />
      {errors.bookTitle && errors.bookTitle.type === 'required' && (
        <div>책 제목을 입력해 주세요!</div>
      )}

      <label>author</label>
      <input {...register('author', { required: true })} />
      {errors.author && errors.author.type === 'required' && (
        <div>저자 이름을 입력해 주세요!</div>
      )}

      <label>publisher</label>
      <input {...register('publisher')} />
      <button>등록</button>
    </form>
  );
}
