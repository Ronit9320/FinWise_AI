import { useState } from 'react';
import { Fab, Webchat } from '@botpress/webchat';

const clientId = "8e3bc69f-74ff-42d7-9874-8678354aeeca";

export default function BotpressChat() {
  const [isWebchatOpen, setIsWebchatOpen] = useState(false);

  const toggleWebchat = () => {
    setIsWebchatOpen((prevState) => !prevState);
  };

  return (
    <>
      <Webchat
        clientId={clientId}
        style={{
          width: '400px',
          height: '600px',
          display: isWebchatOpen ? 'flex' : 'none',
          position: 'fixed',
          bottom: '90px',
          right: '20px',
        }}
      />
      <Fab
        onClick={toggleWebchat}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '64px',
          height: '64px'
        }}
      />
    </>
  );
}