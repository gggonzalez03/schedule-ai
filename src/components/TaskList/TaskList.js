import React, { Component } from "react";
import { connect } from "react-redux";

import "./TaskList.css";
import TaskListSection from "./TaskListSection/TaskListSection";

class TaskList extends Component {
  render() {
    return (
      <div id="tasklist-main">
        <TaskListSection></TaskListSection>
        <TaskListSection></TaskListSection>
      </div>
    );
  }
}

const mapStateToProps = ({ taskview }) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
