import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  fetchCommitmentsAction,
  fetchTasksAction,
} from "../../actions/taskview";
import AddTaskBar from "../../components/AddTaskBar/AddTaskBar";
import CommitmentsList from "../../components/CommitmentsList/CommitmentsList";
import DashboardBar from "../../components/DashboardBar/DashboardBar";
import TaskEdit from "../../components/TaskEdit/TaskEdit";
import TaskList from "../../components/TaskList/TaskList";

import "./TaskDashboard.css";

class TaskDashboard extends Component {
  componentDidMount = () => {
    this.props.fetchTasks();
    this.props.fetchCommitments();
  };

  render() {
    return (
      <div id="taskdashboard-main" className="full-viewport-hv">
        <div id="taskdashboard-left-column">
          <img
            id="taskdashboard-logo"
            src={require("./img/scheduleailogo.png")}
            alt="taskdashboard-logo"
          />
          <div style={{ width: "20em" }}>
            <CommitmentsList></CommitmentsList>
          </div>
        </div>
        <div id="taskdashboard-center-column">
          <div style={{ width: "100%" }}>
            <DashboardBar></DashboardBar>
            <AddTaskBar></AddTaskBar>
            <TaskList></TaskList>
          </div>
        </div>
        <div id="taskdashboard-right-column">
          <div id="taskdashboard_taskedit_section">
            <TaskEdit></TaskEdit>
          </div>
        </div>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TaskDashboard)
);
