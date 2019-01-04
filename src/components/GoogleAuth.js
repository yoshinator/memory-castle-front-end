import React, { Component } from 'react'

class GoogleAuth extends Component {

  state ={
    isSignedIn: null
  }

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId:
          "389495129041-p4kq18b7qqeh0nceiccj3pjcs4lhrkh8.apps.googleusercontent.com",
        scope: "email"
      }).then(()=>{
        this.auth = window.gapi.auth2.getAuthInstance();
        this.setState({isSignedIn: this.auth.isSignedIn.get()});
        this.auth.isSignedIn.listen(this.onAuthChange)
      });
    });
  }


  onAuthChange = () => {
    this.setState({
      isSignedIn: this.auth.isSignedIn.get()
    })
  }


  renderAuthButton() {
    if (this.state.isSignedIn === null){
      return null
    }
    else if (this.state.isSignedIn){
      return <button className="loginBtn loginBtn--google" >Log in with Google</button>;
    }else {
      return <div>You are not signed in</div>
    }
  }


  render() {
    return (
      <div>
        {this.renderAuthButton()}
      </div>
    )
  }
}

export default GoogleAuth;