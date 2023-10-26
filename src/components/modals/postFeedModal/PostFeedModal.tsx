import React from 'react';
import FeedForm from './FeedForm';
import ReactModal from 'react-modal';

type Props = {
  onClose: () => void;
  message: string;
  btnText: string;
};

export default function PostFeedModal({ onClose, message, btnText }: Props) {
  return (
    <ReactModal
      isOpen
      ariaHideApp={false}
      onRequestClose={onClose}
      className="Modal"
      overlayClassName="Overlay"
    >
      <h1>{message}</h1>
      <FeedForm onClose={onClose} />
    </ReactModal>
  );
}
