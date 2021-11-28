import React, { Component } from "react";
import { connect } from "react-redux";

import "./DashboardBar.css";

class DashboardBar extends Component {
  render() {
    const { dueTomorrowCount, dueThisWeekCount, dueTodayCount } = this.props;
    return (
      <div id="dashboardbar-main">
        <div className="dashboardbar-info">
          <h2 className="dashboardbar-info-number">{dueThisWeekCount}</h2>
          <p className="dashboardbar-info-label">Due this week</p>
        </div>
        <div className="dashboardbar-info">
          <h2 className="dashboardbar-info-number">{dueTodayCount}</h2>
          <p className="dashboardbar-info-label">Due today</p>
        </div>
        <div className="dashboardbar-info">
          <h2 className="dashboardbar-info-number">{dueTomorrowCount}</h2>
          <p className="dashboardbar-info-label">Due Tomorrow</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ taskview }) => {
  return {
    dueTomorrowCount: taskview.dashboard && taskview.dashboard.dueTomorrowCount,
    dueThisWeekCount: taskview.dashboard && taskview.dashboard.dueThisWeekCount,
    dueTodayCount: taskview.dashboard && taskview.dashboard.dueTodayCount,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardBar);
