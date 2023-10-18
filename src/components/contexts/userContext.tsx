import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  getAppliedClubs,
  getJoinedClubs,
  getlikedClubs,
} from '../../apis/clubApis';
import { getUserProfile } from '../../apis/authApis';

const initialStatus: InitialStatus = {
  login: false,
  userProfile: {
    userId: '',
    userName: '',
    imgUrl: '',
  },
  appliedClubs: [],
  joinedClubs: [],
  likedClubs: [],
};

const initialValue: UserContextType = {
  appliedClubs: [],
  joinedClubs: [],
  likedClubs: [],
  userProfile: initialStatus.userProfile,
  isLogedin: true,
  fetchAppliedClubs: () => {},
  fetchLikedClubs: () => {},
  fetchJoinedClubs: () => {},
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
  const [joinedClubs, setJoinedClubs] = useState(initialStatus.joinedClubs);
  const [appliedClubs, setAppliedClubs] = useState(initialStatus.appliedClubs);
  const [likedClubs, setLikedClubs] = useState(initialStatus.likedClubs);

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

  const fetchAppliedClubs = async (userId: string) => {
    const appliedClubData = await getAppliedClubs(userId);
    setAppliedClubs(appliedClubData.memberList);
  };
  const fetchLikedClubs = async (userId: string) => {
    const likedClubData = await getlikedClubs(userId);
    setLikedClubs(likedClubData.likedClubList);
  };
  const fetchJoinedClubs = async (userId: string) => {
    const joinedClubData = await getJoinedClubs(userId, '1');
    setJoinedClubs(joinedClubData.clubList);
  };

  const removeAllState = () => {
    setIsLogedin(false);
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
    await fetchJoinedClubs(userId);
    await fetchLikedClubs(userId);
    await fetchAppliedClubs(userId);
    setIsLogedin(true);
  };

  useEffect(() => {
    if (isTokenExist) handleLogin();
  }, [isTokenExist]);

  const value = {
    userProfile,
    isLogedin,
    joinedClubs,
    appliedClubs,
    likedClubs,
    fetchAppliedClubs,
    fetchLikedClubs,
    fetchJoinedClubs,
    storeTokenInLocalStorage,
    handleLogin,
    handleLogout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
type JoinedClub = {
  clubId: string;
  title: string;
  contents: string;
  imgUrl: string;
  likes: string;
};
type AppliedClub = {
  userId: string;
  clubId: string;
  status: string;
};
type LikedClub = {
  id: string;
  userId: string;
  clubId: string;
};
type UserProfile = {
  userId: string;
  userName: string;
  imgUrl: string;
};
type UserContextType = {
  isLogedin: boolean;
  userProfile: UserProfile;
  joinedClubs: JoinedClub[];
  likedClubs: LikedClub[];
  appliedClubs: AppliedClub[];
  fetchJoinedClubs: (userId: string) => void;
  fetchLikedClubs: (userId: string) => void;
  fetchAppliedClubs: (userId: string) => void;
  storeTokenInLocalStorage: (queryParams: URLSearchParams) => void;
  handleLogin: () => Promise<void>;
  handleLogout: () => void;
};

type InitialStatus = {
  login: boolean;
  userProfile: UserProfile;
  joinedClubs: JoinedClub[];
  likedClubs: LikedClub[];
  appliedClubs: AppliedClub[];
};
