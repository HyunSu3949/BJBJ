import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  cancleRequestParticipation,
  getJoinedClubs,
  requestParticipation,
} from '../../apis/clubApis';

type JoinedClub = {
  userId: string;
  clubId: string;
  status: string;
};
type UserInfoType = {
  userId: string;
  userName: string;
  userImgUrl: string;
  joinedClubs: JoinedClub[];
};
type UserContextType = {
  isLogedin: boolean;
  userInfo: UserInfoType;
  setIsLogedin: React.Dispatch<React.SetStateAction<boolean>>;
  setJoinedClubList: () => void;
};

// mocking data
const initialUserInfo: UserInfoType = {
  userId: '0',
  userName: '현수',
  userImgUrl: 'hs.png',
  joinedClubs: [],
};

const initialValue: UserContextType = {
  userInfo: initialUserInfo,
  isLogedin: true,
  setIsLogedin: () => {},
  setJoinedClubList: () => {},
};
export const UserContext = createContext<UserContextType>(initialValue);

export function useUserContext() {
  const value = useContext(UserContext);

  return value;
}

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [isLogedin, setIsLogedin] = useState(true); //mocking을 위해 true 설정
  const [userInfo, setUserInfo] = useState(initialUserInfo);

  const setJoinedClubList = async () => {
    const joinedClubData = await getJoinedClubs(userInfo.userId);
    setUserInfo(userInfo => ({
      ...userInfo,
      joinedClubs: joinedClubData.joinedClubList,
    }));
  };

  const fetchUserInfo = async () => {
    if (isLogedin) {
      setJoinedClubList();
    } else {
      setUserInfo(initialUserInfo);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [isLogedin]);

  const value = { userInfo, isLogedin, setIsLogedin, setJoinedClubList };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
