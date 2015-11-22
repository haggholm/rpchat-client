'use strict';

import React from 'react';


class SceneParticipants extends React.Component {
  render() {
    return (
      <div>
        {this.props.participants.map((participant) => {
          <SceneParticipant {...participant} />
        })}
      </div>
    );
  }
}
