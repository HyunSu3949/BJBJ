import React, { useEffect, useState } from 'react';
import {
  cancleRequestParticipation,
  requestParticipation,
} from '../../../apis/clubApis';

import { useUserContext } from '../../contexts/userContext';
import { ClubDetailsStatus } from '../../types';
import { useModalContext } from '../../contexts/modalContext';
import { modals } from '../../modals/Modals';

type JoinStatus = ClubDetailsStatus | '승인됨' | '대기중';

type ConfirmModaltype = {
  onConfirm: () => void;
};

export default function useJoinClub({
  clubId,
  status,
}: {
  status: ClubDetailsStatus;
  clubId: string;
}) {
  const [joinStatus, setJoinStatus] = useState<JoinStatus>(status);
  const { userInfo, userProfile, fetchJoiedLikedClubData } = useUserContext();
  const { openModal } = useModalContext();

  useEffect(() => {
    setButtonText();
  }, [userInfo.joinedClubs]);

  const setButtonText = () => {
    const joinedClubs = userInfo.joinedClubs;
    joinedClubs.forEach(info => {
      if (info.clubId == clubId && info.status == '승인됨') {
        setJoinStatus('승인됨');
      } else if (info.clubId == clubId && info.status == '대기중') {
        setJoinStatus('대기중');
      } else {
        setJoinStatus(status);
      }
    });
  };

  const joinClub = async (clubId: string) => {
    await requestParticipation({ clubId, userId: userProfile.userId });
    fetchJoiedLikedClubData();
  };

  const cancleJoinClub = async (clubId: string) => {
    await cancleRequestParticipation({ clubId, userId: userProfile.userId });
    fetchJoiedLikedClubData();
  };

  const onClickWithRecuiting = async () => {
    joinClub(clubId);
    openModal({
      Component: modals.CompletionModal,
      props: {
        message: '참여 신청이 완료되었습니다.',
        btnText: '확인',
      },
    });
  };
  const onClickWithClosed = async () => {
    openModal({
      Component: modals.CompletionModal,
      props: {
        message: '참여인원 초과로 마감되었습니다.',
        btnText: '확인',
      },
    });
  };
  const onClickWithPending = async () => {
    openModal<ConfirmModaltype>({
      Component: modals.ConfirmModal,
      props: {
        onConfirm: () => {
          cancleJoinClub(clubId);
        },
        message: '참여 신청을 취소 하시겠어요?',
        btnText: '확인',
      },
    });
  };
  const onClickWithApproved = async () => {
    openModal({
      Component: modals.CompletionModal,
      props: {
        message: '이미 참여중인 독서모임입니다.',
        btnText: '확인',
      },
    });
  };

  const buttonTable = {
    모집중: {
      onClick: onClickWithRecuiting,
      text: '참여신청',
    },
    마감됨: {
      onClick: onClickWithClosed,
      text: '모집마감',
    },
    승인됨: {
      onClick: onClickWithApproved,
      text: '참여중',
    },
    대기중: {
      onClick: onClickWithPending,
      text: '신청완료',
    },
  };
  const buttonStatus = buttonTable[joinStatus];
  return { buttonStatus, setButtonText };
}
