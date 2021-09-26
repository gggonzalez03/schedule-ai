import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { userSignInAction, userSignOutAction } from "../../actions/user";

import "./HomePage.css";

class HomePage extends Component {
  showGoogleSignIn = () => {
    const { fullName, isUserSignedIn, googleSignIn, googleSignOut, history } =
      this.props;

    if (isUserSignedIn === null) {
      return null;
    } else if (isUserSignedIn) {
      return (
        <div
          id="homepage-login-button"
          onClick={() => {
            history.push("/main");
          }}
        >
          <img
            src={require("./img/gotoscheduleai.png")}
            alt="arrow-login-button-alt"
            width="35px"
            height="35px"
          />
          <p style={{ marginBottom: "0em" }}>Welcome, {fullName}</p>
          <div id="homepage-logout-button">
            <p onClick={googleSignOut}>Sign Out</p>
          </div>
        </div>
      );
    } else {
      return (
        <div id="homepage-login-button" onClick={googleSignIn}>
          <img
            src={require("./img/google.png")}
            alt="google-login-button-alt"
            width="35px"
            height="35px"
          />
          <p>login/signup</p>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="full-viewport-hv">
        <div id="homepage-main">
          <div id="homepage-login">
            <img
              id="homepage-logo"
              src={require("./img/scheduleailogo.png")}
              alt="homepage-logo"
            />
            {this.showGoogleSignIn()}
          </div>
          <div id="homepage-description">
            ScheduleAI is a web application that uses Artificial Intelligence
            (AI) to facilitate dynamic hour-by-hour scheduling for students.
            Automatically, ScheduleAI will allocate time for doing homework
            based on the student’s class scheedule, data, and feedback. It also
            provides flexibility by updating the schedule when a new meeting or
            assignment is added. ScheduleAI will change the definition of
            productivity and will be a stable companion for students around the
            world.
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    isUserSignedIn: user.isUserSignedIn,
    fullName: user.fullName,
  };
};

const mapDispatchToProps = {
  googleSignIn: userSignInAction,
  googleSignOut: userSignOutAction,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
