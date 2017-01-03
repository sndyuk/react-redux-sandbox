import React from 'react';
import { connect } from 'react-redux';
import { requestPing } from '../duck/pingWidget';

const Ping = ({ isPinging, ping }) => (
  <div>
    <h1>is pinging: {isPinging.toString()}</h1>
    <button onClick={ping}>Start PING</button>
  </div>
);

const mapStateToProps = state => ({
  isPinging: state.isPinging,
});

const mapDispatchToProps = ({
  ping: requestPing,
});

Ping.propTypes = {
  isPinging: React.PropTypes.boolean.isRequired,
  ping: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Ping);
