import React, { useEffect, useState } from 'react';
import {
  cancleRequestParticipation,
  requestParticipation,
} from '../../../apis/clubApis';

import { useUserContext } from '../../contexts/userContext';
import { ClubDetailsStatus } from '../../types';
import { useModalContext } from '../../contexts/modalContext';
import { modals } from '../../modals/Modals';

type ApplyStatus = ClubDetailsStatus | '승인됨' | '대기중';

type ConfirmModaltype = {
  onConfirm: () => void;
};

export default function useApplyClub({
  clubId,
  status,
}: {
  status: ClubDetailsStatus;
  clubId: string;
}) {
  const [applyStatus, setApplyStatus] = useState<ApplyStatus>(status);
  const { appliedClubs, userProfile, fetchAppliedClubs } = useUserContext();
  const { openModal } = useModalContext();

  useEffect(() => {
    setButtonText();
  }, [appliedClubs]);

  const setButtonText = () => {
    setApplyStatus(status);
    if (
      appliedClubs.length &&
      appliedClubs?.some(
        member => member.clubId == clubId && member.status == '승인됨',
      )
    )
      setApplyStatus('승인됨');

    if (
      appliedClubs.length &&
      appliedClubs?.some(
        member => member.clubId == clubId && member.status == '대기중',
      )
    )
      setApplyStatus('대기중');
  };

  const joinClub = async (clubId: string) => {
    await requestParticipation({ clubId, userId: userProfile.userId });
    fetchAppliedClubs(userProfile.userId);
  };

  const cancleJoinClub = async (clubId: string) => {
    await cancleRequestParticipation({ clubId, userId: userProfile.userId });
    fetchAppliedClubs(userProfile.userId);
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
  const buttonStatus = buttonTable[applyStatus];

  return { buttonStatus, setButtonText };
}
