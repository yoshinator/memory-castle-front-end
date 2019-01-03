import React, { Component } from 'react'

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId:
          "389495129041-p4kq18b7qqeh0nceiccj3pjcs4lhrkh8.apps.googleusercontent.com",
        scope: "email"
      });
    });
  }
  render() {
    return (
      <div>
        Google Auth 
      </div>
    )
  }
}

export default GoogleAuth;