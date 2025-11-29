import React, { useEffect } from "react";

/**
 * Drop-in Botpress webchat integration.
 * Steps:
 * 1. In Botpress Cloud, open your bot.
 * 2. Go to Webchat → Settings, choose "Embedded" or "Full page".
 * 3. Copy your botId, clientId and (optionally) custom elementId.
 * 4. Replace BOT_ID, CLIENT_ID, and WEBCHAT_ID below.
 */

const BOT_ID = "YOUR_BOTPRESS_BOT_ID";
const CLIENT_ID = "YOUR_BOTPRESS_CLIENT_ID";
const WEBCHAT_ID = "retirewise-webchat"; // can match element ID from Botpress

const BotpressChat = () => {
  useEffect(() => {
    // Inject the Botpress webchat script
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (!window.botpressWebChat) return;

      window.botpressWebChat.init({
        botId: BOT_ID,
        clientId: CLIENT_ID,
        hostUrl: "https://cdn.botpress.cloud/webchat/v1",
        messagingUrl: "https://messaging.botpress.cloud",
        lazySocket: true,
        botName: "RetireWise AI",
        containerElement: `#${WEBCHAT_ID}`,
        // Customize for macroglide-style UI
        themeName: "prism",
        theme: "prism",
        hideWidget: false,
        layoutWidth: "400px",
        enableReset: true,
        showCloseButton: true,
        enableConversationDeletion: true,
        // you can also pass custom user attributes for advanced mode flows
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      {/* Floating launcher (if you want): the widget will handle its own button if hideWidget=false */}
      {/* Embedded container (e.g., bottom-right) */}
      <div
        id={WEBCHAT_ID}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 40,
        }}
      />
    </>
  );
};

export default BotpressChat;
