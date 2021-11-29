import React, { Component } from "react";
import { connect } from "react-redux";
import { commitmentFormShowAction } from "../../actions/taskview";
import { userSignOutAction } from "../../actions/user";
import CommitmentItem from "./CommitmentItem/CommitmentItem";
import { withRouter } from "react-router";

import "./CommitmentsList.css";

class CommitmentsList extends Component {
  render() {
    const { allCommitments, userSignOut, selectedCommitment, history } =
      this.props;

    return (
      <div id="commitmentslist-main">
        <div id="commitmentslist-header">
          <h4>Commitments</h4>
          <img
            id="list-select-plus-icon"
            src={require("./img/plus.png")}
            onClick={this.props.commitmentFormShow}
          />
        </div>
        <div id="commitmentslist-aggregate">
          {allCommitments &&
            Object.keys(allCommitments).map((key, index) => {
              return (
                <CommitmentItem
                  key={key}
                  id={key}
                  title={allCommitments[key].commitmentName}
                  subtitle={
                    (allCommitments[key].taskCount
                      ? allCommitments[key].taskCount
                      : 0) + " Task(s)"
                  }
                  dotColor={allCommitments[key].colorScheme}
                  selected={selectedCommitment == key}
                ></CommitmentItem>
              );
            })}
        </div>
        <div
          id="commitmentslist-logout-button"
          onClick={() => {
            userSignOut();
            history.push("/");
          }}
        >
          Logout
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
  userSignOut: userSignOutAction,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CommitmentsList)
);
