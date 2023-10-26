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
  getLikedClubIdList,
} from '../../apis/clubApis';
import { getUserProfile } from '../../apis/authApis';
import { getLikedFeedIdList } from '../../apis/feedApis';

const initialStatus: InitialStatus = {
  login: false,
  userProfile: {
    userId: '',
    userName: '',
    userEmail: '',
    imgUrl: '',
  },
  appliedClubs: [],
  joinedClubs: [],
  likedClubs: [],
  likedFeedIds: [],
};

const initialValue: UserContextType = {
  appliedClubs: [],
  joinedClubs: [],
  likedClubs: [],
  likedFeedIds: [],
  userProfile: initialStatus.userProfile,
  isLogedin: true,
  fetchAppliedClubs: () => {},
  fetchLikedClubs: () => {},
  fetchLikedFeedIds: () => {},
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
  const [likedFeedIds, setLikedFeedIds] = useState(initialStatus.likedFeedIds);

  const checkToken = () => {
    if (localStorage.getItem('Access_Token')) return true;
    else return false;
  };

  const storeTokenInLocalStorage = (queryPrams: URLSearchParams) => {
    const Access_Token = queryPrams.get('Access_Token');
    const Refresh_Toke = queryPrams.get('Refresh_Token');
    if (Access_Token) localStorage.setItem('Access_Token', Access_Token);
    if (Refresh_Toke) localStorage.setItem('Refresh_Token', Refresh_Toke);

    setIsTokenExist(checkToken());
  };

  const fetchUserProfile = async () => {
    const userProfile = await getUserProfile();
    console.log('유저 프로필:', userProfile);

    setUserProfile(userProfile);
    return userProfile;
  };

  const fetchAppliedClubs = async (userId: string) => {
    const appliedClubData = await getAppliedClubs(userId);
    setAppliedClubs(appliedClubData.memberList);
  };
  const fetchLikedClubs = async (userId: string) => {
    const likedClubData = await getLikedClubIdList(userId);
    setLikedClubs(likedClubData.likedClubList);
  };
  const fetchJoinedClubs = async (userId: string) => {
    const joinedClubData = await getJoinedClubs({ userId, page: 1 });
    setJoinedClubs(joinedClubData.clubList);
  };
  const fetchLikedFeedIds = async (userId: string) => {
    const likedFeedData = await getLikedFeedIdList(userId);
    setLikedFeedIds(likedFeedData.feedList);
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
    likedFeedIds,
    fetchLikedFeedIds,
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
type LikedFeed = {
  user: UserProfile;
  feedId: string;
  contents: string;
  likes: number;
  commentCount: number;
};
type UserProfile = {
  userId: string;
  userEmail: string;
  userName: string;
  imgUrl: string;
};
type UserContextType = {
  isLogedin: boolean;
  userProfile: UserProfile;
  joinedClubs: JoinedClub[];
  likedClubs: LikedClub[];
  likedFeedIds: LikedFeed[];
  appliedClubs: AppliedClub[];
  fetchJoinedClubs: (userId: string) => void;
  fetchLikedClubs: (userId: string) => void;
  fetchLikedFeedIds: (userId: string) => void;
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
  likedFeedIds: LikedFeed[];
  appliedClubs: AppliedClub[];
};
