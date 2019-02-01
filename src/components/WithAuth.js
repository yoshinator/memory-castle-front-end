import React from "react";
import { fetchCurrentUser } from "../actions/user";

const withAuth = WrappedComponent => {
  class AuthorizedComponent extends React.Component {
    componentDidMount() {
      console.log(
        "%c INSIDE COMPONENT DID MOUNT FOR AUTH HOC",
        "color: purple"
      );
      // POTENTIAL SECURITY FLAW!!! my tokens don't expire
      if (localStorage.getItem("jwt") && !this.props.loggedIn)
        this.props.fetchCurrentUser();
      // if i have a token but don't know who it belongs to, ask the server for that user's data
    }

    render() {
      console.log("%c INSIDE RENDER FOR HOC", "color: green");
      if (localStorage.getItem("jwt") && this.props.loggedIn) {
        //i have a token and i'm logged in
        // wrapped component in our case is Profile
        return <WrappedComponent />;
      } else if (
        localStorage.getItem("jwt") &&
        (this.props.authenticatingUser || !this.props.loggedIn)
      ) {
        //we're currently fetching, show a loading spinner
        return <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      } else {
        //user is not AUTHORIZED to see this component
        return <Redirect to="/login" />;
      }
    }
  }

};

export default withAuth;