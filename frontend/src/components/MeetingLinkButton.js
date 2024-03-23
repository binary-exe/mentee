import React, { useState } from 'react';
import { Button } from 'antd';
import MeetingLinkModal from './MeetingLinkModal'; // Import Modal component

const MeetingLinkButton = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Button type="primary" onClick={handleOpenModal}>
        Create Meeting Link
      </Button>
      <MeetingLinkModal open={openModal} onClose={handleCloseModal} />
    </>
  );
};

export default MeetingLinkButton;