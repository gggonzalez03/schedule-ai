import React, { Component } from "react";
import { connect } from "react-redux";
import TaskItem from "../TaskItem/TaskItem";

import "./TaskListSection.css";

class TaskListSection extends Component {
  render() {
    return (
      <div className="tasklistsection-main">
        <div className="tasklistsection-header">
          <div className="tasklistsection-left">
            <div className="tasklistsection-dot"></div>
            <div className="tasklistsection-title">Today</div>
            <img
              className="tasklistsection-arrow"
              src={require("./img/arrow.png")}
            />
          </div>
          <div className="tasklistsection-right">
            <img
              className="tasklistsection-plus"
              src={require("./img/plus.png")}
            />
          </div>
        </div>
        <div className="tasklistsection-tasks">
          <TaskItem></TaskItem>
          <TaskItem></TaskItem>
          <TaskItem></TaskItem>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ taskview }) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TaskListSection);
