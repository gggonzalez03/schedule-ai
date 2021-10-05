import React, { Component } from "react";
import { connect } from "react-redux";

import "./DashboardBar.css";

class DashboardBar extends Component {
  render() {
    const { completedTasksCount, dueThisWeekCount, todoASAPCount } = this.props;
    return (
      <div id="dashboardbar-main">
        <div className="dashboardbar-info">
          <h2 className="dashboardbar-info-number">{dueThisWeekCount}</h2>
          <p className="dashboardbar-info-label">Tasks due this week</p>
        </div>
        <div className="dashboardbar-info">
          <h2 className="dashboardbar-info-number">{todoASAPCount}</h2>
          <p className="dashboardbar-info-label">Tasks to do ASAP</p>
        </div>
        <div className="dashboardbar-info">
          <h2 className="dashboardbar-info-number">{completedTasksCount}</h2>
          <p className="dashboardbar-info-label">Completed Tasks</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ taskview }) => {
  return {
    completedTasksCount: taskview.dashboard && taskview.dashboard.completedTasksCount,
    dueThisWeekCount: taskview.dashboard && taskview.dashboard.dueThisWeekCount,
    todoASAPCount: taskview.dashboard && taskview.dashboard.todoASAPCount,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardBar);
