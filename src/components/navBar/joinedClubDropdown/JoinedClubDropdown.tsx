import { useState } from 'react';
import { useUserContext } from '../../contexts/userContext';
import { Link } from 'react-router-dom';

export default function JoinedClubDropdown() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { joinedClubs } = useUserContext();
  const onClick = () => {
    setIsExpanded(prevState => !prevState);
  };

  return (
    <>
      <button onClick={onClick}>피드</button>
      {isExpanded ? (
        <ul aria-label="독서모임 피드 페이지 목록">
          {joinedClubs.map(club => (
            <li key={club.clubId}>
              <Link to={`/feed/${club.clubId}`} onClick={onClick}>
                {club.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </>
  );
}
