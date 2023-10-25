import { getMyCommentList } from '../../../apis/feedApis';
import { useUserContext } from '../../contexts/userContext';
import Comment from './Comment';
import usePagination from '../../../hooks/usePagination';
import Pagination from '../../common/pagination/Pagination';

type GetData = {
  feedId: string;
  contents: string;
};

type FetchParams = {
  userId: string;
  page: number;
};

export default function CommentList() {
  const { userProfile } = useUserContext();
  const {
    data: commentList,
    setPage,
    maxPage,
  } = usePagination<GetData, FetchParams>({
    fetchData: getMyCommentList,
    fetchParams: {
      page: 1,
      userId: userProfile.userId,
    },
    itemsPerPage: 4,
    dataKey: 'commentList',
  });

  return (
    <>
      <ul>
        {commentList?.map((comment, idx) => (
          <li key={idx}>
            <Comment
              imgUrl={userProfile.imgUrl}
              contents={comment.contents}
              feedId={comment.feedId}
            />
          </li>
        ))}
      </ul>
      <Pagination maxPage={maxPage} setPage={setPage} />
    </>
  );
}
