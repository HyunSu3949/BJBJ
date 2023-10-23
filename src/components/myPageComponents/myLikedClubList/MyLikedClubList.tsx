import React, { useEffect, useState } from 'react';

import {
  getClubsSortedBy,
  getMyLikedClubList,
  getlikedClubs,
} from '../../../apis/clubApis';
import { Club, ClubSort } from '../../types';
import ClubCard from '../../common/clubCard/ClubCard';
import { useUserContext } from '../../contexts/userContext';

export default function MyLikedClubList() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const { userProfile } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      const { clubList } = await getMyLikedClubList(userProfile.userId, 1);
      setClubs(clubList);
    };

    fetchData();
  }, [userProfile.userId]);

  return (
    <ul>
      {clubs.map(club => (
        <ClubCard key={club.clubId} {...club} />
      ))}
    </ul>
  );
}
