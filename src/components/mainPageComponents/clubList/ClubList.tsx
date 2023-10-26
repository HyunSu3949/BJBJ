import { getClubsSortedBy } from '../../../apis/clubApis';
import { Club, SortBy } from '../../types';
import ClubCard from '../../common/clubCard/ClubCard';
import { useEffect, useState } from 'react';

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
      <ul style={{ display: 'flex' }}>
        {clubs?.map(club => <ClubCard key={club.clubId} {...club} />)}
      </ul>
    </>
  );
}
