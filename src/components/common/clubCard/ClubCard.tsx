import { Club } from '../../types';
import { Link } from 'react-router-dom';
import ClubImg from '../clubImg/ClubImg';
import RightArrow from '../../../assets/image/arrow.svg';
import * as S from './styles';

export default function ClubCard(club: Club) {
  return (
    <S.Wrapper>
      <ClubImg imgUrl={club.imgUrl} />
      <S.InfoBox>
        <h3>{club.title}</h3>
        <p>{club.contents}</p>
        <Link to={`/club/${club.clubId}`}>
          <span>더 알아보기</span>
          <RightArrow />
        </Link>
      </S.InfoBox>
    </S.Wrapper>
  );
}
