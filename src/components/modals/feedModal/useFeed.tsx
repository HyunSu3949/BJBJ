import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../contexts/userContext';
import {
  getFeedCommentList,
  getFeedDetail,
  postComment,
} from '../../../apis/feedApis';

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
export default function useFeed({ feedId }: Props) {
  //피드 내용 불러오기
  // 좋아요, 취소
  // 댓글 불러오기
  // 댓글 작성
  // 댓글 지우기, 수정
  const { userProfile } = useUserContext();
  const [feedDetails, setFeedDetails] = useState<FeedDetail | undefined>();
  const [commentList, setCommentList] = useState<Comment[]>([]);

  useEffect(() => {
    console.log(feedId);

    fetchFeedDetails(feedId);
    fetchCommentList(feedId, 1);
  }, [feedId]);

  const fetchFeedDetails = async (feedId: string) => {
    const res = await getFeedDetail(feedId);
    setFeedDetails(res);
  };

  const fetchCommentList = async (feedId: string, page: number) => {
    const res = await getFeedCommentList(feedId, page);
    setCommentList(res.commentList);
  };

  const handlePostComment = async (
    feedId: string,
    userId: string,
    contents: string,
  ) => {
    await postComment(feedId, userId, contents);
  };

  return { feedDetails, commentList };
}
