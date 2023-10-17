import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getJoinedClubs, getlikedClubs } from '../../apis/clubApis';
import { getUserProfile } from '../../apis/authApis';

const initialStatus: InitialStatus = {
  login: false,
  userProfile: {
    userId: '',
    userName: '',
    imgUrl: '',
  },
  userInfo: { joinedClubs: [], likedClubs: [] },
};

const initialValue: UserContextType = {
  userInfo: initialStatus.userInfo,
  userProfile: initialStatus.userProfile,
  isLogedin: true,
  fetchJoiedLikedClubData: () => {},
  storeTokenInLocalStorage: () => {},
  handleLogin: () => new Promise(() => {}),
  handleLogout: () => {},
};

export const UserContext = createContext<UserContextType>(initialValue);

export function useUserContext() {
  const value = useContext(UserContext);

  return value;
}

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [isTokenExist, setIsTokenExist] = useState(false);
  const [isLogedin, setIsLogedin] = useState(initialStatus.login);
  const [userProfile, setUserProfile] = useState(initialStatus.userProfile);
  const [userInfo, setUserInfo] = useState(initialStatus.userInfo);

  const checkToken = () => {
    if (localStorage.getItem('Access_Token')) return true;
    else return false;
  };

  const storeTokenInLocalStorage = (queryPrams: URLSearchParams) => {
    const Access_Token = queryPrams.get('Access_Token')?.slice(7);
    const Refresh_Toke = queryPrams.get('Refresh_Toke')?.slice(7);
    if (Access_Token) localStorage.setItem('Access_Token', Access_Token);
    if (Refresh_Toke) localStorage.setItem('Refresh_Token', Refresh_Toke);
    setIsTokenExist(checkToken());
  };

  const fetchUserProfile = async () => {
    const userProfile = await getUserProfile();
    setUserProfile(userProfile);
    return userProfile;
  };

  const fetchJoiedLikedClubData = async (userId: string) => {
    const joinedClubData = await getJoinedClubs(userId);
    const likedClubData = await getlikedClubs(userId);
    setUserInfo({
      joinedClubs: joinedClubData.joinedClubList,
      likedClubs: likedClubData.likedClubList.map(
        (club: LikedClub) => club.clubId,
      ),
    });
  };

  const removeAllState = () => {
    setIsLogedin(false);
    setUserInfo(initialStatus.userInfo);
    setUserProfile(initialStatus.userProfile);
    localStorage.removeItem('Access_Token');
    localStorage.removeItem('Refresh_Token');
    setIsTokenExist(checkToken());
  };

  const handleLogout = () => {
    removeAllState();
  };

  const handleLogin = async () => {
    const { userId } = await fetchUserProfile();
    await fetchJoiedLikedClubData(userId);
    setIsLogedin(true);
  };

  useEffect(() => {
    if (isTokenExist) handleLogin();
  }, [isTokenExist]);

  const value = {
    userInfo,
    userProfile,
    isLogedin,
    storeTokenInLocalStorage,
    fetchJoiedLikedClubData,
    handleLogin,
    handleLogout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

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
  imgUrl: string;
};
type UserContextType = {
  isLogedin: boolean;
  userProfile: UserProfile;
  userInfo: UserInfo;
  fetchJoiedLikedClubData: (userId: string) => void;
  storeTokenInLocalStorage: (queryParams: URLSearchParams) => void;
  handleLogin: () => Promise<void>;
  handleLogout: () => void;
};
type InitialStatus = {
  login: boolean;
  userProfile: UserProfile;
  userInfo: UserInfo;
};
