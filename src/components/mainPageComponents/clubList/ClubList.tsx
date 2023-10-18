import React, { useEffect, useState } from 'react';

import { getClubsSortedBy } from '../../../apis/clubApis';
import { Club, ClubSort } from '../../types';
import ClubCard from '../../common/clubCard/ClubCard';

export default function ClubList({ sortBy }: ClubSort) {
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { clubList } = await getClubsSortedBy(sortBy);
      setClubs(clubList);
    };

    fetchData();
  }, [sortBy]);

  return (
    <ul>
      {clubs.map(club => (
        <ClubCard key={club.clubId} {...club} />
      ))}
    </ul>
  );
}
