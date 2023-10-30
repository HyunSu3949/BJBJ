import FeedCardSmall from '../../common/feedCard/FeedCardSmall';
import { getMainFeedListSortBy } from '../../../apis/feedApis';
import { useEffect, useState } from 'react';
import { FeedCardSmallType } from '../../types';
import * as S from './styles';

type Props = {
  sortBy: 'likes' | 'createdAt';
};

export default function FeedList({ sortBy }: Props) {
  const [feeds, setFeeds] = useState<FeedCardSmallType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMainFeedListSortBy({ sortBy });
      setFeeds(res.feedList);
    };

    fetchData();
  }, [sortBy]);

  return (
    <S.ListContainer style={{ display: 'flex' }}>
      {feeds?.map(feed => (
        <S.ListItem key={feed.feedId}>
          <FeedCardSmall key={feed.feedId} {...feed} />
        </S.ListItem>
      ))}
    </S.ListContainer>
  );
}
