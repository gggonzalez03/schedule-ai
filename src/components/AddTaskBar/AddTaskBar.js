import React, { Component } from "react";
import { connect } from "react-redux";

import "./AddTaskBar.css";

class AddTaskBar extends Component {
  render() {
    return (
      <div id="addtaskbar-main">Add a Task</div>
    );
  }
}

const mapStateToProps = ({ taskview }) => {
  return {

  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskBar);
