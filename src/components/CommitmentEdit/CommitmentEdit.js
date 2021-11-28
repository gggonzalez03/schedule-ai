import React, { Component } from "react";
import { connect } from "react-redux";
import {
  commitmentFormEditCommitmentAction,
  commitmentFormSubmitAction,
  commitmentFormHideAction,
} from "../../actions/taskview";
import { getSession } from "../../actions/user";

import "./CommitmentEdit.css";

const colors = [
  "#E3F18F",
  "#FF6949",
  "#86FF49",
  "#49FFCB",
  "#49CDFF",
  "#496DFF",
  "#DB49FF",
  "#FF49A7",
];

export const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

class CommitmentEdit extends Component {

  render() {
    const {
      commitmentEditFormVisible,
      commitmentName,
      commitmentFormEditCommitment,
      commitmentFormSubmit,
      commitmentFormHide,
    } = this.props;

    return (
      <div
        id="taskedit_main"
        style={{ display: commitmentEditFormVisible ? "block" : "none" }}
      >
        <div id="taskedit_form_container">
          <div id="taskedit_hollow_circle"></div>
          <div id="taskedit_input_container">
            <h4 className="taskedit_input_label">Commitment Name</h4>
            <input
              className="taskedit_input"
              type="text"
              placeholder="Enter Commitment Name"
              value={commitmentName == null ? "" : commitmentName}
              onChange={(e) => {
                commitmentFormEditCommitment(e.target.value);
              }}
            ></input>
            <div id="taskedit_buttons_container">
              <div id="taskedit_cancel_button" onClick={commitmentFormHide}>
                <h4 id="taskedit_cancel_button_text">Cancel</h4>
              </div>
              <div
                id="taskedit_save_button"
                onClick={() => {
                  let username = getSession("username");
                  commitmentFormSubmit({
                    username: username,
                    commitmentName: commitmentName,
                    colorScheme: getRandomColor(),
                  });
                }}
                style={{ backgroundColor: "#8FF1AD" }}
              >
                <h4 id="taskedit_save_button_text" style={{ color: "#222222" }}>
                  Save
                </h4>
              </div>
            </div>
          </div>
          <div id="taskedit_extra_space"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ taskview }) => {
  return {
    commitmentEditFormVisible: taskview.commitmentEditFormVisible,
    commitmentName: taskview.commitmentEditContent.commitmentName,
  };
};

const mapDispatchToProps = {
  commitmentFormEditCommitment: commitmentFormEditCommitmentAction,
  commitmentFormSubmit: commitmentFormSubmitAction,
  commitmentFormHide: commitmentFormHideAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommitmentEdit);
