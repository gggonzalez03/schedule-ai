import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { userSignUpAction, userSignInAction, userSignOutAction } from "../../actions/user";

import "./HomePage.css";

class HomePage extends Component {
  state = {
    username: null,
    password: null,
    repeatPassword: null,
    isFormLogin: true,
  };

  switchForm = () => {
    this.setState({
      username: null,
      password: null,
      isFormLogin: !this.state.isFormLogin,
    });
  };

  showSignInForm = () => {
    const {
      fullName,
      isUserSignedIn,
      userSignUp,
      userSignIn,
      userSignOut,
      history,
    } = this.props;

    if (isUserSignedIn === null) {
      return null;
    } else if (isUserSignedIn === true) {
      return (
        <div id="homepage-login-button">
          <img
            src={require("./img/gotoscheduleai.png")}
            alt="arrow-login-button-alt"
            width="35px"
            height="35px"
            onClick={() => {
              history.push("/taskdashboard");
            }}
          />
          <p style={{ marginBottom: "0em" }}>Welcome, {fullName}</p>
          <div id="homepage-logout-button">
            <p onClick={userSignOut}>Sign Out</p>
          </div>
        </div>
      );
    } else {
      return (
        <div id="homepage-login-form">
          <input
            id="homepage-login-form-input"
            type="text"
            placeholder="Username"
            onChange={(e) => {
              this.setState({
                username: e.target.value,
              });
            }}
          ></input>
          <input
            id="homepage-login-form-input"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              this.setState({
                password: e.target.value,
              });
            }}
          ></input>
          {this.state.isFormLogin ? (
            ""
          ) : (
            <input
              id="homepage-login-form-input"
              type="password"
              placeholder="Repeat Password"
              onChange={(e) => {
                this.setState({
                  repeatPassword: e.target.value,
                });
              }}
            ></input>
          )}
          <div id="homepage-login-form-button" onClick={() => {
            if (this.state.isFormLogin) {
              userSignIn(this.state)
            }
            else {
              userSignUp(this.state)
            }
          }}>
            <h4 id="homepage-login-form-button-text">
              {this.state.isFormLogin ? "Login" : "Signup"}
            </h4>
          </div>
          <p id="homepage-login-form-form" onClick={this.switchForm}>
            {this.state.isFormLogin ? "Signup" : "Login"}
          </p>
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
            {this.showSignInForm()}
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
  userSignUp: userSignUpAction,
  userSignIn: userSignInAction,
  userSignOut: userSignOutAction,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomePage)
);
