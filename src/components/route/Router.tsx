import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './Layout';
import MainPage from '../../pages/mainPage/MainPage';
import MyPage from '../../pages/myPage/MyPage';
import SearchPage from '../../pages/searchPage/SearchPage';
import ClubDetailPage from '../../pages/clubDetailPage/ClubDetailPage';
import FeedPage from '../../pages/feedPage/FeedPage';
import NotFoundPage from '../../pages/notFoundPage/NotFoundPage';
import LoginRedirectPage from '../../pages/loginRedirectPage/LoginRedirectPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/club/:clubId" element={<ClubDetailPage />} />
          <Route path="/feed/:clubId" element={<FeedPage />} />
        </Route>
        <Route
          path="/oauth2/authorization/google"
          element={<LoginRedirectPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
