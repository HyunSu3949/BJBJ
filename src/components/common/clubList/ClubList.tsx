import { getClubsSortedBy } from '../../../apis/clubApis';
import { Club, SortBy } from '../../types';
import ClubCard from '../../common/clubCard/ClubCard';
import { useEffect, useState } from 'react';
import * as S from './styles';

type Props = {
  sortBy: SortBy;
};

export default function ClubList({ sortBy }: Props) {
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getClubsSortedBy({ sortBy });
      setClubs(res.clubList);
    };
    fetchData();
  }, [sortBy]);

  return (
    <>
      <S.ListContainer>
        {clubs?.map(club => (
          <S.ListItem key={club.clubId}>
            <ClubCard key={club.clubId} {...club} />
          </S.ListItem>
        ))}
      </S.ListContainer>
    </>
  );
}
