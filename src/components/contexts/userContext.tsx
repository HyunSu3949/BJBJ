import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getJoinedClubs } from '../../apis/clubDetailPage';

type JoinedClub = {
  userId: string;
  clubId: string;
  status: string;
};
type UserContextType = {
  isLogedin: boolean;
  userInfo: {
    userId: string;
    userName: string;
    userImgUrl: string;
    joinedClubs: JoinedClub[];
  };
};

const UserContext = createContext<UserContextType>({
  isLogedin: false,
  userInfo: {
    userId: '',
    userName: '',
    userImgUrl: '',
    joinedClubs: [],
  },
});

export function useUserContext() {
  const value = useContext(UserContext);

  if (!value) {
    throw new Error('context Error');
  }
  return value;
}
// mocking data
const initialUserInfo = {
  userId: '0',
  userName: '현수',
  userImgUrl: 'hs.png',
  joinedClubs: [],
};

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [isLogedin, setIsLogedin] = useState(true); //mocking을 위해 true 설정
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  useEffect(() => {
    const getJoinedClubData = async () => {
      const joinedClubData = await getJoinedClubs(userInfo.userId);
      setUserInfo({ ...userInfo, joinedClubs: joinedClubData });
    };

    if (isLogedin) {
      getJoinedClubData();
    } else {
      setUserInfo(initialUserInfo);
    }
  }, [isLogedin]);

  const value = { userInfo, isLogedin, setIsLogedin };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
