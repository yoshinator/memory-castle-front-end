import React, { Component } from "react";
class CreateCastle extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: "",
      user_id: this.props.user.id,
      castle_image: null
    }
  }

  createCastle = (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("castle_image", this.state.castle_image, this.state.castle_image.name);
    formData.append('name', this.state.name)
    formData.append("user_id", localStorage.getItem("id"))
    return fetch(`https://memory-castle.herokuapp.com//api/v1/castles`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Authorization": localStorage.getItem("jwt")
      },
      body: formData
    })
    .then(resp => resp.json())
    .then(newCastleData => {
        let newUser = this.props.user
        newUser.castles = this.props.user.castles.concat(newCastleData)
        this.props.updateCurrentUser(newUser)
        this.setState({
          name: "",
          user_id: this.props.user.id,
          castle_image: null
        })
      })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onFileChange = (e) => {
    this.setState({castle_image: e.target.files[0]})
  }

  signOut = () => {
    this.props.updateCurrentUser({})
    localStorage.clear()
  }
  render(){
    return <>
    <div className="create-castle-form">
    <button onClick={this.signOut}>Sign out</button>
        <form onSubmit={this.createCastle}>
          <input type="text" onChange={this.handleChange} placeholder="castle name" name="name" value={this.state.name} />
          <label className="custom-file-upload" htmlFor="file-upload">
            {this.state.castle_image ? this.state.castle_image.name : "Upload Image"}
            <input type="file" id="file-upload" onChange={this.onFileChange}></input>
          </label>
          <button type="submit">Create Castle</button>
        </form>
      </div>
      </>

  }
}


export default CreateCastle;