import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  fetchCommitmentsAction,
  fetchTasksAction,
} from "../../actions/taskview";
import { getSession } from "../../actions/user";
import AddTaskBar from "../../components/AddTaskBar/AddTaskBar";
import CommitmentsList from "../../components/CommitmentsList/CommitmentsList";
import DashboardBar from "../../components/DashboardBar/DashboardBar";
import TaskEdit from "../../components/TaskEdit/TaskEdit";
import TaskList from "../../components/TaskList/TaskList";
import CommitmentEdit from "../../components/CommitmentEdit/CommitmentEdit";

import "./TaskDashboard.css";

class TaskDashboard extends Component {
  componentDidMount = () => {
    let username = getSession('username');
    
    this.props.fetchCommitments(username);
    setTimeout(() => {
      this.props.fetchTasks(username);
    }, 500);
  };

  render() {
    let today = new Date().toDateString();
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
            <h1 id="taskdashboard-today">{today}</h1>
            <DashboardBar></DashboardBar>
            <AddTaskBar></AddTaskBar>
            <TaskList></TaskList>
          </div>
        </div>
        <div id="taskdashboard-right-column">
          <div id="taskdashboard_taskedit_section">
            <TaskEdit></TaskEdit>
            <CommitmentEdit></CommitmentEdit>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ taskview, user }) => {
  return {
    userId: user.userId,
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
