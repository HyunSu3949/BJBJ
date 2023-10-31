import { getMyCommentList } from '../../../apis/feedApis';
import { useUserContext } from '../../contexts/userContext';
import Comment from './Comment';
import usePagination from '../../../hooks/usePagination';
import Pagination from '../../common/pagination/Pagination';
import * as S from './styles';

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
      <S.ListContainer>
        {commentList?.map((comment, idx) => (
          <S.ListItem key={idx}>
            <Comment
              imgUrl={userProfile.imgUrl}
              contents={comment.contents}
              feedId={comment.feedId}
            />
          </S.ListItem>
        ))}
      </S.ListContainer>
      <Pagination maxPage={maxPage} setPage={setPage} />
    </>
  );
}
