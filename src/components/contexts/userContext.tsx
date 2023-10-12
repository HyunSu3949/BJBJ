import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getJoinedClubs, getlikedClubs } from '../../apis/clubApis';

type JoinedClub = {
  userId: string;
  clubId: string;
  status: string;
};
type LikedClub = {
  id: string;
  userId: string;
  clubId: string;
};
type UserInfo = {
  joinedClubs: JoinedClub[];
  likedClubs: string[];
};
type UserProfile = {
  userId: string;
  userName: string;
  userImgUrl: string;
};
type UserContextType = {
  isLogedin: boolean;
  userProfile: UserProfile;
  userInfo: UserInfo;
  setIsLogedin: React.Dispatch<React.SetStateAction<boolean>>;
  fetchJoiedLikedClubData: () => void;
};

// mocking data
const initialUserInfo: UserInfo = {
  joinedClubs: [],
  likedClubs: [],
};

const initialUserProfile: UserProfile = {
  userId: '0',
  userName: '현수',
  userImgUrl: 'hs.png',
};

const initialValue: UserContextType = {
  userInfo: initialUserInfo,
  userProfile: initialUserProfile,
  isLogedin: true,
  setIsLogedin: () => {},
  fetchJoiedLikedClubData: () => {},
};

export const UserContext = createContext<UserContextType>(initialValue);

export function useUserContext() {
  const value = useContext(UserContext);

  return value;
}

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [isLogedin, setIsLogedin] = useState(true); //mocking을 위해 true 설정
  const [userProfile, setUserProfile] = useState(initialUserProfile);
  const [userInfo, setUserInfo] = useState(initialUserInfo);

  const fetchUserProfile = async () => {};

  const fetchJoiedLikedClubData = async () => {
    const joinedClubData = await getJoinedClubs(userProfile.userId);
    const likedClubData = await getlikedClubs(userProfile.userId);
    setUserInfo(userInfo => ({
      ...userInfo,
      joinedClubs: joinedClubData.joinedClubList,
      likedClubs: likedClubData.LikedClubList.map(
        (obj: LikedClub) => obj.clubId,
      ),
    }));
  };

  const fetchUserInfo = async () => {
    if (isLogedin) {
      fetchJoiedLikedClubData();
    } else {
      setUserInfo(initialUserInfo);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [isLogedin]);

  const value = {
    userInfo,
    userProfile,
    isLogedin,
    setIsLogedin,
    fetchJoiedLikedClubData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
