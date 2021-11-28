import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addTaskAction,
  taskFormEditCommitmentAction,
  taskFormEditTaskNameAction,
  taskFormEditDueDateAction,
  taskFormEditDueTimeAction,
  taskFormEditECTAction,
  taskEditFormHideAction,
} from "../../actions/taskview";
import { getSession } from "../../actions/user";

import "./TaskEdit.css";

class TaskEdit extends Component {
  render() {
    const {
      taskEditFormVisible,
      taskName,
      commitmentId,
      commitmentName,
      dueDate,
      dueTime,
      estimatedTimeOfCompletion,
      allCommitments,
      taskEditFormHide,
      taskId,
      taskSectionId,
      taskIndex,
      taskEditFormPartDisabled,
    } = this.props;

    let today = new Date();
    let dueDateOptions = new Array(7).fill().map((_, i) => {
      let dateString = today.toDateString();
      today.setDate(today.getDate() + 1);
      return dateString;
    });

    let hour = 0;
    let dueTimeOptions = new Array(24).fill().map((_, i) => {
      let hourString = hour < 10 ? "0" + hour + ":00" : hour + ":00";
      hour = hour + 1;
      return hourString;
    });

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
            {/* <input
              className="taskedit_input"
              type="text"
              placeholder="mm/dd/yyyy, hh:mm"
              value={dueDateTime == null ? "" : dueDateTime}
              onChange={(e) => {
                this.props.taskFormEditDueDateTime(e.target.value);
              }}
            ></input> */}
            <div id="taskedit_date_time_select">
              <select
                disabled={taskEditFormPartDisabled}
                id="taskedit_date_select"
                className="taskedit_input"
                value={dueDate == null ? 0 : dueDate}
                onChange={(e) => {
                  this.props.taskFormEditDueDate(e.target.value);
                }}
              >
                {dueDateOptions &&
                  dueDateOptions.map((duedate, index) => {
                    return (
                      <option key={"duedate" + duedate} value={duedate}>
                        {duedate}
                      </option>
                    );
                  })}
              </select>
              <select
                disabled={taskEditFormPartDisabled}
                id="taskedit_time_select"
                className="taskedit_input"
                value={dueTime == null ? 0 : dueTime}
                onChange={(e) => {
                  this.props.taskFormEditDueTime(e.target.value);
                }}
              >
                {dueTimeOptions &&
                  dueTimeOptions.map((duetime, index) => {
                    return (
                      <option key={"duetime" + duetime} value={duetime}>
                        {duetime}
                      </option>
                    );
                  })}
              </select>
            </div>
            <h4 className="taskedit_input_label">
              Estimated Completion Time in Hours
            </h4>
            <input
              disabled={taskEditFormPartDisabled}
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
                  let username = getSession("username");
                  this.props.addTask({
                    username,
                    taskId,
                    taskSectionId,
                    taskIndex,
                    taskName,
                    commitmentId,
                    commitmentName,
                    dueDate,
                    dueTime,
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
    dueDate: taskview.taskEditContent.dueDate,
    dueTime: taskview.taskEditContent.dueTime,
    taskEditFormPartDisabled: taskview.taskEditContent.taskEditFormPartDisabled,
  };
};

const mapDispatchToProps = {
  addTask: addTaskAction,
  taskFormEditCommitment: taskFormEditCommitmentAction,
  taskFormEditTaskName: taskFormEditTaskNameAction,
  taskFormEditDueDate: taskFormEditDueDateAction,
  taskFormEditDueTime: taskFormEditDueTimeAction,
  taskFormEditECT: taskFormEditECTAction,
  taskEditFormHide: taskEditFormHideAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskEdit);
