import React, { Component } from "react";
import { connect } from "react-redux";
import { taskEditFormShowAction } from "../../actions/taskview";

import "./AddTaskBar.css";

class AddTaskBar extends Component {
  render() {
    const { taskEditFormShow, allCommitments } = this.props;

    let defaultCommitmentId = "0";
    let defaultCommitmentname = "General";
    let commitments = Object.keys(allCommitments)

    if (commitments.length > 0) {
      defaultCommitmentId = commitments[0].toString()
      defaultCommitmentname = allCommitments[defaultCommitmentId].commitmentName
    }
    
    return (
      <div
        id="addtaskbar-main"
        onClick={() => {
          taskEditFormShow({
            taskName: "",
            commitmentId: defaultCommitmentId,
            commitmentName: defaultCommitmentname,
            dueDate: new Date().toDateString(),
            dueTime: "00:00",
            estimatedTimeOfCompletion: "",
          });
        }}
      >
        Add a Task
      </div>
    );
  }
}

const mapStateToProps = ({ taskview }) => {
  return {
    allCommitments: taskview.allCommitments,
  };
};

const mapDispatchToProps = {
  taskEditFormShow: taskEditFormShowAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskBar);
