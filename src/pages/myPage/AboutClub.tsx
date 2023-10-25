import React from 'react';
import EditMyClubForm from '../../components/myPageComponents/editMyClubForm/EditMyClubForm';
import MyJoinedClubList from '../../components/myPageComponents/myJoinedClubList/MyJoinedClubList';
import UserList from '../../components/myPageComponents/awaitingList/UserList';

export default function AboutClub() {
  return (
    <div>
      <h2>내가 참여중인 독서모임</h2>
      <MyJoinedClubList />
      <h2>내가 운영중인 독서모임</h2>
      <UserList />
      <h3>독서모임 수정하기</h3>
      <EditMyClubForm />
    </div>
  );
}
