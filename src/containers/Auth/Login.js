import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "../../assets/fontawesome-free-6.1.2/css/all.min.css";

import { handleLoginApi } from "../../services/userService";
// import { KeyCodeUtils, LanguageUtils } from "../utils";

// import userIcon from '../../src/assets/images/user.svg';
// import passIcon from '../../src/assets/images/pass.svg';
import "../Auth/Login.scss";
// import { FormattedMessage } from 'react-intl';

// import adminService from '../services/adminService';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPass: false,
      errMessage: "",
    };
  }
  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handeLogin = async () => {
    // console.log(this.state.username, this.state.password);
    // console.log(this.state);
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      //    console.log('DTM ', data);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log("login success");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
      console.log("DTM ", error.response);
    }
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPass: !this.state.isShowPass,
    });
  };
  //Hàm nhấn enter để login
  handleKeyDown = (event)=> {
    if(event.key === 'Enter'){
        this.handeLogin();
    }
  }

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 login-text">Login</div>
            <div className="col-12 form  login-input">
              <label>Username: </label>
              <input
                placeholder="Enter your username"
                type="text"
                className="form-control"
                value={this.state.username}
                onChange={(event) => this.handleOnChangeUsername(event)}
              />
            </div>
            <div className="col-12 form  login-input">
              <label>Password: </label>
              <div className="custom-input-pasword">
                <input
                  placeholder="Enter your password"
                  type={this.state.isShowPass ? "text" : "password"}
                  className="form-control"
                  value={this.state.password}
                  onChange={(event) => this.handleOnChangePassword(event)}
                  onKeyDown={(event) => this.handleKeyDown(event)}
                />
                <span
                  onClick={() => {
                    this.handleShowHidePassword();
                  }}
                >
                  <i
                    className={
                      this.state.isShowPass
                        ? "fa-solid fa-eye-slash"
                        : "fa-solid fa-eye"
                    }
                  ></i>
                </span>
              </div>

              <div className="col-12" style={{ color: "red" }}>
                {this.state.errMessage}
              </div>
            </div>

            <div className="col-12">
              <button
                className="btn-login"
                onClick={() => {
                  this.handeLogin();
                }}
              >
                Login
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password">Forgot your password</span>
            </div>
            <div className="col-12 text-center">
              <span className="text-other-login mt-3">Or Login with:</span>
            </div>
            <div className="col-12 social-login">
              <i className="fa-brands fa-google gg-icon"></i>
              <i className="fa-brands fa-facebook fb-icon"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    //adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
    //adminLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
