import { Club } from '../../types';
import { Link } from 'react-router-dom';

export default function ClubCard(club: Club) {
  return (
    <>
      <img src={club.imgUrl} alt={`${club.title}의 배경 사진`} />
      <h3>{club.title}</h3>
      <p>{club.contents}</p>
      <div>
        <span data-testid="likes-count">{club.likes}</span>
      </div>
      <Link to={`/club/${club.clubId}`}>더 알아보기</Link>
    </>
  );
}
