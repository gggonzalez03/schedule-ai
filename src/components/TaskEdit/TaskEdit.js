import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addTaskAction,
  taskFormEditCommitmentAction,
  taskFormEditTaskNameAction,
  taskFormEditDueDateTimeAction,
  taskFormEditECTAction,
  taskEditFormHideAction,
} from "../../actions/taskview";

import "./TaskEdit.css";

class TaskEdit extends Component {
  render() {
    const {
      taskEditFormVisible,
      taskName,
      commitmentId,
      commitmentName,
      dueDateTime,
      estimatedTimeOfCompletion,
      allCommitments,
      taskEditFormHide,
      taskId,
      taskSectionId,
      taskIndex,
    } = this.props;

    return (
      <div
        id="taskedit_main"
        style={{ display: taskEditFormVisible ? "block" : "none" }}
      >
        <div id="taskedit_form_container">
          <div id="taskedit_hollow_circle"></div>
          <div id="taskedit_input_container">
            <h4 className="taskedit_input_label">Commitment Name</h4>
            <select
              id="taskedit_commitment_select"
              className="taskedit_input"
              value={commitmentId == null ? 0 : commitmentId}
              onChange={(e) => {
                this.props.taskFormEditCommitment({
                  id: e.target.value,
                  name: allCommitments[e.target.value].commitmentName,
                });
              }}
            >
              {allCommitments &&
                Object.keys(allCommitments).map((key, index) => {
                  return (
                    <option key={"commitment" + key} value={key}>
                      {allCommitments[key].commitmentName}
                    </option>
                  );
                })}
            </select>
            <h4 className="taskedit_input_label">Task Name</h4>
            <input
              className="taskedit_input"
              type="text"
              placeholder="Enter Task Name"
              value={taskName == null ? "" : taskName}
              onChange={(e) => {
                this.props.taskFormEditTaskName(e.target.value);
              }}
            ></input>
            <h4 className="taskedit_input_label">
              Due Date and Time (mm/dd/yyyy, hh:mm)
            </h4>
            <input
              className="taskedit_input"
              type="text"
              placeholder="mm/dd/yyyy, hh:mm"
              value={dueDateTime == null ? "" : dueDateTime}
              onChange={(e) => {
                this.props.taskFormEditDueDateTime(e.target.value);
              }}
            ></input>
            <h4 className="taskedit_input_label">
              Estimated Completion Time in Hours
            </h4>
            <input
              className="taskedit_input"
              type="number"
              placeholder="1"
              value={
                estimatedTimeOfCompletion == null
                  ? ""
                  : estimatedTimeOfCompletion
              }
              onChange={(e) => {
                this.props.taskFormEditECT(e.target.value);
              }}
            ></input>
            <div id="taskedit_buttons_container">
              <div id="taskedit_cancel_button" onClick={taskEditFormHide}>
                <h4 id="taskedit_cancel_button_text">Cancel</h4>
              </div>
              <div
                id="taskedit_save_button"
                onClick={() => {
                  this.props.addTask({
                    taskId,
                    taskSectionId,
                    taskIndex,
                    taskName,
                    commitmentName,
                    dueDateTime,
                    estimatedTimeOfCompletion,
                  });
                }}
                style={{ backgroundColor: "#8FF1AD" }}
              >
                <h4 id="taskedit_save_button_text" style={{ color: "#222222" }}>
                  Save
                </h4>
              </div>
            </div>
          </div>
          <div id="taskedit_extra_space"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ taskview }) => {
  return {
    taskEditFormVisible: taskview.taskEditFormVisible,
    allCommitments: taskview.allCommitments,
    taskId: taskview.taskEditContent.taskId,
    taskSectionId: taskview.taskEditContent.taskSectionId,
    taskIndex: taskview.taskEditContent.taskIndex,
    commitmentId: taskview.taskEditContent.commitmentId,
    commitmentName: taskview.taskEditContent.commitmentName,
    taskName: taskview.taskEditContent.taskName,
    estimatedTimeOfCompletion:
      taskview.taskEditContent.estimatedTimeOfCompletion,
    dueDateTime: taskview.taskEditContent.dueDateTime,
  };
};

const mapDispatchToProps = {
  addTask: addTaskAction,
  taskFormEditCommitment: taskFormEditCommitmentAction,
  taskFormEditTaskName: taskFormEditTaskNameAction,
  taskFormEditDueDateTime: taskFormEditDueDateTimeAction,
  taskFormEditECT: taskFormEditECTAction,
  taskEditFormHide: taskEditFormHideAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskEdit);
