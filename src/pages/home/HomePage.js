import React, { Component } from "react";
import { connect } from "react-redux";
import { incrementCountAction } from "../../actions/actions";

import "./HomePage.css";

class HomePage extends Component {
  render() {
    const { count, increment } = this.props;
    return (
      <div id="homepage-main">
        <button onClick={increment}>{count}</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count,
  };
};

const mapDispatchToProps = {
  increment: incrementCountAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
