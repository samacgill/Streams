import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends Component {
  // state = { isSignedIn: null };
  componentDidMount() {
    //   Load google api library
    window.gapi.load("client:auth2", () => {
      // initialise library
      window.gapi.client
        .init({
          clientId:
            "232263590494-6q1rb4mebg553be5ldfplg4e6vj3tno5.apps.googleusercontent.com",
          scope: "email",
          prompt: "select_account",
        })
        .then(() => {
          // create instance of library to access methods
          this.auth = window.gapi.auth2.getAuthInstance();
          //   update local state with info from auth object. this causes rerender
          // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          // getting initial value from gapi, sent to redux store via onAuthChange
          this.onAuthChange(this.auth.isSignedIn.get());
          // wait for status to change
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign in with google
        </button>
      );
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}
const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
