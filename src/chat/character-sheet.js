'use strict';

import React from 'react';

class CharacterSheet extends React.Component {
  render() {
    return (
      <div>
        <Properties {...this.props.primary} />
        <Properties {...this.props.skills} />
      </div>
    );
  }
}
