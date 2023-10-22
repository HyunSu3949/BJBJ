import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../contexts/userContext';
import {
  deleteComment,
  deleteFeed,
  deleteLikeFeed,
  getFeedCommentList,
  getFeedDetail,
  likeFeed,
  postComment,
  putFeed,
  putFeedComment,
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
  commentId: string;
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
  const [feedDetails, setFeedDetails] = useState<FeedDetail | undefined>();
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [isLiked, setIsLiked] = useState(false);

  const { openModal } = useModalContext();
  const { likedFeeds, userProfile } = useUserContext();
  useEffect(() => {
    fetchFeedDetails(feedId);
    fetchCommentList(feedId, 1);
    setIsLiked(likedFeeds.some(feed => feed.feedId == feedId));
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

  const handleDeleteComment = async (commentId: string) => {
    openModal<ConfirmModaltype>({
      Component: modals.ConfirmModal,
      props: {
        onConfirm: async () => {
          await deleteComment(commentId);
          await fetchCommentList(feedId, 1);
        },
        message: '댓글을 삭제하시겠어요?',
        btnText: '확인',
      },
    });
  };

  const handleLikeFeed = async (feedId: string) => {
    await likeFeed(feedId, userProfile.userId);
    setIsLiked(true);
  };
  const handleDeleteLikeFeed = async (feedId: string) => {
    await deleteLikeFeed(feedId, userProfile.userId);
    setIsLiked(false);
  };

  return {
    isLiked,
    feedDetails,
    commentList,
    handlePostComment,
    openEditFeedModal,
    handleDeleteComment,
    handleLikeFeed,
    handleDeleteLikeFeed,
  };
}
