import React from 'react';
import EditMyClubForm from '../../components/myPageComponents/editMyClubForm/EditMyClubForm';
import MyFeedList from '../../components/myPageComponents/myFeedList/MyFeedList';

export default function MyPage() {
  return (
    <>
      <h1>마이페이지</h1>
      <EditMyClubForm />
      <MyFeedList />
    </>
  );
}
