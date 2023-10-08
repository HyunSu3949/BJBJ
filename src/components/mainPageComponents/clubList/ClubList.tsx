import React, { useEffect, useState } from 'react';
import { getClubsSortedByLikes } from '../../../apis/mainPage';
import { Club, ClubSort } from '../types';

export default function ClubList({ sortBy }: ClubSort) {
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { clubList } = await getClubsSortedByLikes(sortBy);
      setClubs(clubList);
    };

    fetchData();
  }, []);

  return (
    <ul>
      {clubs.map(club => (
        <li key={club.id}>
          <img src={club.imgUrl} alt={club.title} />
          <h3>{club.title}</h3>
          <p>{club.contents}</p>
          <p>Likes: {club.likes}</p>
        </li>
      ))}
    </ul>
  );
}
