import React, { Component } from "react";
import { connect } from "react-redux";


class HomeFooter extends Component {
  render() {

    return (
      <div className="home-footer">
        <p>&copy; 2022 DTM. More infomation, please visit my youtube. 
            <a target="_blank" href="#"> &#8594; Click here &#8592;</a></p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
