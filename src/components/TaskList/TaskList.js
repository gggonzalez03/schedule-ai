import React, { Component } from "react";
import { connect } from "react-redux";

import "./TaskList.css";
import TaskListSection from "./TaskListSection/TaskListSection";

class TaskList extends Component {
  render() {
    const { allPendingTasks } = this.props;
    
    return (
      <div id="tasklist-main">
        {allPendingTasks &&
          allPendingTasks.map((tasksByDate, index) => (
            <TaskListSection
              key={index}
              sectionId={index}
              tasks={tasksByDate.tasks}
              sectionName={tasksByDate.date}
            ></TaskListSection>
          ))}
      </div>
    );
  }
}

const mapStateToProps = ({ taskview }) => {
  return {
    allPendingTasks: taskview.allPendingTasks,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
