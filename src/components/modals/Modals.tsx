import React, { useContext } from 'react';
import { ModalsContext } from '../contexts/modalContext';
import ConfirmModal from './ConfirmModal';
import CompletionModal from './CompletionModal';

export const modals = {
  ConfirmModal,
  CompletionModal,
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
