import React, { Component } from "react";
import { connect } from "react-redux";

import "./CommitmentItem.css";

class CommitmentItem extends Component {
  render() {
    return (
      <div
        className={"commitmentitem"}
      >
        <div className="commitmentitem-icon-container">
          {this.props.dotColor ? (
            <div
              className="commitmentitem-icon"
              style={{ backgroundColor: this.props.dotColor }}
            ></div>
          ) : (
            <img
              className="commitmentitem-icon"
              src={require("./img/star.png")}
            />
          )}
        </div>
        <div
          className="commitmentitem-title-container"
          style={{ overflow: "auto" }}
        >
          <h4>{this.props.title}</h4>
          <p>{this.props.subtitle}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CommitmentItem);
