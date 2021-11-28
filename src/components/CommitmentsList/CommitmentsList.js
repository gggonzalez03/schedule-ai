import React, { Component } from "react";
import { connect } from "react-redux";
import { commitmentFormShowAction } from "../../actions/taskview";
import CommitmentItem from "./CommitmentItem/CommitmentItem";

import "./CommitmentsList.css";

class CommitmentsList extends Component {
  render() {
    const { allCommitments, allPendingTasksCount, selectedCommitment } =
      this.props;

    return (
      <div id="commitmentslist-main">
        <div id="commitmentslist-header">
          <h4>Commitments</h4>
          <img id="list-select-plus-icon" src={require("./img/plus.png")} onClick={this.props.commitmentFormShow}/>
        </div>
        <div id="commitmentslist-aggregate">
          <CommitmentItem
            title={"All"}
            subtitle={allPendingTasksCount + " Task(s)"}
            selected={selectedCommitment == null}
          ></CommitmentItem>
          {allCommitments &&
            Object.keys(allCommitments).map((key, index) => {
              return (
                <CommitmentItem
                  key={key}
                  id={key}
                  title={allCommitments[key].commitmentName}
                  subtitle={allCommitments[key].taskCount + " Task(s)"}
                  dotColor={allCommitments[key].colorScheme}
                  selected={selectedCommitment == key}
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
  commitmentFormShow: commitmentFormShowAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommitmentsList);
