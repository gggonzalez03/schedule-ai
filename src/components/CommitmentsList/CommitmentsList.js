import React, { Component } from "react";
import { connect } from "react-redux";
import { selectCommitmentAction } from "../../actions/taskview";
import CommitmentItem from "./CommitmentItem/CommitmentItem";

import "./CommitmentsList.css";

class CommitmentsList extends Component {
  render() {
    const { allCommitments, allPendingTasksCount, selectedCommitment } =
      this.props;
    const { selectCommitment } = this.props;

    return (
      <div id="commitmentslist-main">
        <div id="commitmentslist-header">
          <h4>Commitments</h4>
          <img id="list-select-plus-icon" src={require("./img/plus.png")} />
        </div>
        <div id="commitmentslist-aggregate">
          <CommitmentItem
            title={"All"}
            subtitle={allPendingTasksCount + " Task(s)"}
            onCommitmentSelect={selectCommitment}
            selected={selectedCommitment == null}
          ></CommitmentItem>
          {allCommitments &&
            allCommitments.map((item, index) => {
              return (
                <CommitmentItem
                  key={index}
                  id={index}
                  title={item.commitmentName}
                  subtitle={item.taskCount + " Task(s)"}
                  dotColor={item.colorScheme}
                  onCommitmentSelect={selectCommitment}
                  selected={selectedCommitment == index}
                ></CommitmentItem>
              );
            })}
        </div>
        <div id="commitmentslist-list"></div>
      </div>
    );
  }
}

const mapStateToProps = ({ taskview }) => {
  return {
    allPendingTasksCount: taskview.allPendingTasksCount,
    allCommitments: taskview.allCommitments,
    selectedCommitment: taskview.selectedCommitment,
  };
};

const mapDispatchToProps = {
  selectCommitment: selectCommitmentAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommitmentsList);
