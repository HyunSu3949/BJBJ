import { Club } from '../../types';
import { Link } from 'react-router-dom';
import ClubImg from '../clubImg/ClubImg';
import * as S from './styles';

export default function ClubCard(club: Club) {
  return (
    <S.Wrapper>
      <ClubImg imgUrl={club.imgUrl} />
      <h3>{club.title}</h3>
      <p>{club.contents}</p>
      <div>
        <span data-testid="likes-count">{club.likes}</span>
      </div>
      <Link to={`/club/${club.clubId}`}>더 알아보기</Link>
    </S.Wrapper>
  );
}
