import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchCommitmentsAction, fetchTasksAction } from "../../actions/taskview";

import "./TaskDashboard.css";

class TaskDashboard extends Component {
  
  fetchAndPrepCommitments = () => {
    this.props.fetchCommitments();
  }

  fetchAndPrepTasks = () => {
    this.props.fetchTasks();
  }

  render() {
    const { allPendingTasks, allCommitments } = this.props;

    console.log(allPendingTasks, allCommitments)

    return (
      <div id="template-main">
        <button onClick={this.fetchAndPrepTasks}></button>
      </div>
    );
  }
}

const mapStateToProps = ({ taskview }) => {
  return {
    allPendingTasks: taskview.allPendingTasks,
    allCommitments: taskview.allCommitments,
  };
};

const mapDispatchToProps = {
  fetchCommitments: fetchCommitmentsAction,
  fetchTasks: fetchTasksAction,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskDashboard));
