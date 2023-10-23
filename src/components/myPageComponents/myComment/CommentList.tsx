import React, { useEffect, useState } from 'react';
import { getMyCommentList } from '../../../apis/feedApis';
import { useUserContext } from '../../contexts/userContext';
import Comment from './Comment';

type Comment = {
  feedId: string;
  contents: string;
};

export default function CommentList() {
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const { userProfile } = useUserContext();
  useEffect(() => {
    const fetchData = async () => {
      const res = await getMyCommentList(userProfile.userId, 1);

      setCommentList(res.commentList);
    };

    fetchData();
  }, [userProfile.userId]);
  return (
    <ul>
      {commentList.map((comment, idx) => (
        <li key={idx}>
          <Comment
            imgUrl={userProfile.imgUrl}
            contents={comment.contents}
            feedId={comment.feedId}
          />
        </li>
      ))}
    </ul>
  );
}
