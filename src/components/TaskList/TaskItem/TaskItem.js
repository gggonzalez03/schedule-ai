import React, { Component } from "react";
import { connect } from "react-redux";

import "./TaskItem.css";

class TaskItem extends Component {
  render() {
    return (
      <div className="taskitem-main">
        <div className="taskitem-left">
          <div className="taskitem-hollow-dot"></div>
          <div className="taskitem-details">
            <div className="taskitem-first-line">
              <h4 className="taskitem-task-title">Homework #1</h4>
              <div className="taskitem-dot"></div>
              <h4 className="taskitem-commitment">CMPE 195A</h4>
            </div>
            <div className="taskitem-second-line">
              <h5 className="taskitem-due">Due in 3 days</h5>
            </div>
          </div>
        </div>
        <div className="taskitem-right">
          <h4 className="taskitem-time">3:00PM-4:30PM</h4>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ taskview }) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
