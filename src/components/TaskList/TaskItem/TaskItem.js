import React, { Component } from "react";
import { connect } from "react-redux";
import { taskEditFormShowAction } from "../../../actions/taskview";

import "./TaskItem.css";

class TaskItem extends Component {
  render() {
    const { task } = this.props;
    const { taskEditFormShow } = this.props;
    return (
      <div
        className="taskitem-main"
        onClick={() => {
          taskEditFormShow({
            taskName: task.taskName,
            commitmentName: task.commitmentName,
            dueDateTime: task.dueDateTime,
            estimatedTimeOfCompletion: task.estimatedTimeOfCompletion,
          });

          console.log(task.taskName, task.dueDateTime, task.estimatedTimeOfCompletion);
        }}
      >
        <div className="taskitem-left">
          <div
            className="taskitem-hollow-dot"
            style={{ borderColor: task.colorScheme }}
          ></div>
          <div className="taskitem-details">
            <div className="taskitem-first-line">
              <h4 className="taskitem-task-title">{task.taskName}</h4>
              <div
                className="taskitem-dot"
                style={{ backgroundColor: task.colorScheme }}
              ></div>
              <h4 className="taskitem-commitment">{task.commitmentName}</h4>
            </div>
            <div className="taskitem-second-line">
              <h5 className="taskitem-due">
                Due in {task.dueInXDays} day{task.dueInXDays == 1 ? "" : "s"}
              </h5>
            </div>
          </div>
        </div>
        <div className="taskitem-right">
          <h4 className="taskitem-time" style={{ color: task.colorScheme }}>
            {task.time}
          </h4>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ taskview }) => {
  return {};
};

const mapDispatchToProps = {
  taskEditFormShow: taskEditFormShowAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
