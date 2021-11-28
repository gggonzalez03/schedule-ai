import React, { Component } from "react";
import { connect } from "react-redux";
import TaskItem from "../TaskItem/TaskItem";

import "./TaskListSection.css";

class TaskListSection extends Component {
  render() {
    const { sectionName, tasks, sectionId } = this.props;
    return (
      <div className="tasklistsection-main">
        <div className="tasklistsection-header">
          <div className="tasklistsection-left">
            <div className="tasklistsection-dot"></div>
            <div className="tasklistsection-title">{sectionName}</div>
            {/* <img
              className="tasklistsection-arrow"
              src={require("./img/arrow.png")}
            /> */}
            {tasks.length == 0 ? <div style={{ fontSize: "0.8em", fontWeight: "300" }}>No Tasks</div>: ""}
          </div>
          <div className="tasklistsection-right">
            {/* <img
              className="tasklistsection-plus"
              src={require("./img/plus.png")}
            /> */}
          </div>
        </div>
        <div className="tasklistsection-tasks">
          {tasks &&
            tasks.map((task, index) => {
              return (
                <TaskItem
                  key={sectionId + " " + index}
                  taskSectionId={sectionId}
                  taskIndex={index}
                  task={task}
                ></TaskItem>
              );
            })}
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
