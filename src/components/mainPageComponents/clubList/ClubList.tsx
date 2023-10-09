import React, { useEffect, useState } from 'react';

import { getClubsSortedByLikes } from '../../../apis/mainPage';
import { Club, ClubSort } from '../../types';
import ClubCard from '../../common/clubCard/ClubCard';

export default function ClubList({ sortBy }: ClubSort) {
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { clubList } = await getClubsSortedByLikes(sortBy);
      setClubs(clubList);
    };

    fetchData();
  }, [sortBy]);

  return (
    <ul>
      {clubs.map(club => (
        <ClubCard key={club.id} {...club} />
      ))}
    </ul>
  );
}
