import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../contexts/userContext';
import {
  deleteFeed,
  getFeedCommentList,
  getFeedDetail,
  postComment,
  putFeed,
} from '../../../apis/feedApis';
import { useModalContext } from '../../contexts/modalContext';
import { modals } from '../Modals';

type Props = {
  feedId: string;
};
type FeedDetail = {
  clubId: string;
  user: {
    userId: string;
    userName: string;
    imgUrl: string;
  };
  title: string;
  contents: string;
  imgUrl: string;
  likes: string;
  created_at: string;
  updated_at: string;
};
type Comment = {
  userId: string;
  userName: string;
  imgUrl: string;
  contents: string;
};
type EditFeedModalType = {
  feedId: string;
  handleDelete: () => void;
  handleEdit: (PutData: PutFeedType) => void;
};
type ConfirmModaltype = {
  onConfirm: () => void;
};
type PutFeedType = {
  feedId: string;
  clubId: string;
  userId: string;
  title: string;
  contents: string;
  imgUrl: string;
};

export default function useFeed({ feedId }: Props) {
  // 좋아요, 취소
  // 댓글 지우기, 수정
  const [feedDetails, setFeedDetails] = useState<FeedDetail | undefined>();
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const { openModal } = useModalContext();
  useEffect(() => {
    fetchFeedDetails(feedId);
    fetchCommentList(feedId, 1);
  }, [feedId]);

  const fetchFeedDetails = async (feedId: string) => {
    const res = await getFeedDetail(feedId);
    setFeedDetails(res);
  };

  const fetchCommentList = async (feedId: string, page: number) => {
    const res = await getFeedCommentList(feedId, page);
    setCommentList(() => res.commentList);
  };

  const handlePostComment = async ({
    feedId,
    userId,
    contents,
  }: {
    feedId: string;
    userId: string;
    contents: string;
  }) => {
    await postComment({ feedId, userId, contents });
    fetchCommentList(feedId, 1);
  };

  const handleDelete = () => {
    openModal<ConfirmModaltype>({
      Component: modals.ConfirmModal,
      props: {
        onConfirm: async () => {
          await deleteFeed(feedId);
          await fetchFeedDetails(feedId);
          window.location.reload();
        },
        message: '게시글을 삭제하시겠어요?',
        btnText: '확인',
      },
    });
  };

  const handleEdit = async (postData: PutFeedType) => {
    await putFeed(postData);
    fetchFeedDetails(feedId);
  };

  const openEditFeedModal = async () => {
    openModal<EditFeedModalType>({
      Component: modals.EditFeedModal,
      props: {
        message: '피드 수정하기',
        btnText: '',
        handleDelete,
        handleEdit,
        feedId,
      },
    });
  };
  return { feedDetails, commentList, handlePostComment, openEditFeedModal };
}
