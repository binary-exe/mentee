import React, { useState } from 'react';
import { Modal, Input, Tooltip, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

const MeetingLinkModal = ({ open, onClose }) => {
  const [link, setLink] = useState('');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link);
  };

  return (
    <Modal
      title="Meeting Link"
      open={open} // Use open prop instead of visible
      onCancel={onClose}
      footer={null}
    >
      <Input.TextArea value={link} onChange={(e) => setLink(e.target.value)} />
      <Tooltip title="Copy Link">
        <Button type="link" onClick={handleCopyLink} icon={<CopyOutlined />}>
          Copy
        </Button>
      </Tooltip>
    </Modal>
  );
};

export default MeetingLinkModal;