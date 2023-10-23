import React, { useEffect, useState } from 'react';
import {
  getAwaitingApprovalList,
  getParticipantsList,
} from '../../../apis/clubApis';
import { useUserContext } from '../../contexts/userContext';
import AwaitngCard from './AwaitngCard';
import ParticipantCard from './ParticipantCard';

type MemberType = {
  memberId: string;
  clubId: string;
  user: {
    userId: string;
    userName: string;
    imgUrl: string;
  };
  Status: string;
};

export default function UserList() {
  const [awaitingList, setAwaitingList] = useState<MemberType[]>([]);
  const [participantList, setParticipantList] = useState<MemberType[]>([]);
  const { userProfile } = useUserContext();

  const fetchList = async () => {
    const awaitingData = await getAwaitingApprovalList(userProfile.userId, 1);
    setAwaitingList(awaitingData.memberList);
    const participantData = await getParticipantsList(userProfile.userId, 1);
    setParticipantList(participantData.memberList);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <h3>승인 대기자 목록</h3>
      {awaitingList.map((member, idx) => (
        <li key={idx}>
          <AwaitngCard {...member} fetchList={fetchList} />
        </li>
      ))}
      <h3>참여자 목록</h3>
      {participantList.map((member, idx) => (
        <li key={idx}>
          <ParticipantCard {...member} fetchList={fetchList} />
        </li>
      ))}
    </>
  );
}
