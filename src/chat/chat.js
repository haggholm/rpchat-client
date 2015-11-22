'use strict';

import React from 'react';


class ChatWindow extends React.component {
  render() {
    return (
      <div>
        <MessagePanel />
        <Toolbar>
          <InputArea />
          <TargetButton />
          <SkillButton />
          <SendButton />
          <EndRoundButton />
        </Toolbar>
      </div>
    );
  }

  send() {
    server.send({
      type: '',
      targetId: '',
      skillId: '',
      message: '',
      params: {}
    });
  }
}
