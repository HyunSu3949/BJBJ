import { useState } from 'react';
import { useUserContext } from '../../contexts/userContext';

import * as S from './styles';

export default function JoinedClubDropdown() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { joinedClubs } = useUserContext();
  const onClick = () => {
    setIsExpanded(prevState => !prevState);
  };

  return (
    <S.DropdownContainer>
      <S.TextButton onClick={onClick}>피드</S.TextButton>

      {isExpanded && (
        <S.ListContainer aria-label="독서모임 피드 페이지 목록">
          {joinedClubs?.map(club => (
            <li key={club.clubId}>
              <S.StyledLink to={`/feed/${club.clubId}`} onClick={onClick}>
                {club.title}
              </S.StyledLink>
            </li>
          ))}
        </S.ListContainer>
      )}
    </S.DropdownContainer>
  );
}
