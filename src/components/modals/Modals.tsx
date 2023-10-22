import React, { useContext } from 'react';
import { ModalsContext } from '../contexts/modalContext';
import ConfirmModal from './ConfirmModal';
import CompletionModal from './CompletionModal';
import AddClubModal from './addClubModal/AddClubModal';
import PostFeedModal from './postFeedModal/PostFeedModal';
import FeedModal from './feedModal/FeedModal';

export const modals = {
  ConfirmModal,
  CompletionModal,
  AddClubModal,
  PostFeedModal,
  FeedModal,
};

export default function Modals() {
  const { openedModals, close } = useContext(ModalsContext);

  return (
    <>
      {openedModals.map((modal, idx) => {
        const { Component, props } = modal;
        const onClose = () => {
          close(Component);
        };

        return <Component {...props} key={idx} onClose={onClose} />;
      })}
    </>
  );
}
