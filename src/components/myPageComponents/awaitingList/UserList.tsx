import React, { useCallback, useEffect, useState } from 'react';
import {
  getAwaitingApprovalList,
  getParticipantsList,
} from '../../../apis/clubApis';
import { useUserContext } from '../../contexts/userContext';
import AwaitngCard from './AwaitngCard';
import ParticipantCard from './ParticipantCard';
import * as S from './styles';

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

  const fetchList = useCallback(async () => {
    const awaitingData = await getAwaitingApprovalList(userProfile.userId, 1);
    setAwaitingList(awaitingData.memberList);
    const participantData = await getParticipantsList(userProfile.userId, 1);
    setParticipantList(participantData.memberList);
  }, [userProfile.userId]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <>
      <div>
        <h4>승인 대기자 목록</h4>
        <S.ListContainer>
          {awaitingList?.map((member, idx) => (
            <S.ListItem key={idx}>
              <AwaitngCard {...member} fetchList={fetchList} />
            </S.ListItem>
          ))}
        </S.ListContainer>
      </div>
      <div>
        <h4>참여자 목록</h4>
        <S.ListContainer>
          {participantList?.map((member, idx) => (
            <S.ListItem key={idx}>
              <ParticipantCard {...member} fetchList={fetchList} />
            </S.ListItem>
          ))}
        </S.ListContainer>
      </div>
    </>
  );
}
