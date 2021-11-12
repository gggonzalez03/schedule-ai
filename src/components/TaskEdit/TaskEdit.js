import React, { Component } from "react";
import { connect } from "react-redux";
import { incrementCountAction } from "../../actions/taskedit";

import "./TaskEdit.css";

class TaskEdit extends Component {
  render() {
    return (
      <div id="taskedit_main">
        <div id="taskedit_form_container">
          <div id="taskedit_hollow_circle"></div>
          <div id="taskedit_input_container">
            <h4 className="taskedit_input_label">Task Name</h4>
            <input
              className="taskedit_input"
              type="text"
              placeholder="Enter Task Name"
            ></input>
            <h4 className="taskedit_input_label">Due Date (mm/dd/yyyy)</h4>
            <input
              className="taskedit_input"
              type="text"
              placeholder="mm/dd/yyyy"
            ></input>
            <h4 className="taskedit_input_label">
              Estimated Completion Time in Hours
            </h4>
            <input
              className="taskedit_input"
              type="text"
              placeholder="1 hour"
            ></input>
            <div id="taskedit_buttons_container">
              <div id="taskedit_cancel_button">
                <h4 id="taskedit_cancel_button_text">Cancel</h4>
              </div>
              <div id="taskedit_save_button">
                <h4 id="taskedit_save_button_text">Save</h4>
              </div>
            </div>
          </div>
          <div id="taskedit_extra_space"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TaskEdit);
