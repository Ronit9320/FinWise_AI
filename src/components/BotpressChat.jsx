import { useState } from 'react';
import { Fab, useWebchat } from '@botpress/webchat';

const clientId = "8e3bc69f-74ff-42d7-9874-8678354aeeca";

export default function BotpressChat() {
  const [isWebchatOpen, setIsWebchatOpen] = useState(false);

  const webchat = useWebchat({ clientId });

  const toggleWebchat = () => {
    setIsWebchatOpen((prevState) => !prevState);
  };

  return (
    <>
      <Fab onClick={toggleWebchat} />
      {isWebchatOpen && <webchat.Webchat />}
    </>
  );
}