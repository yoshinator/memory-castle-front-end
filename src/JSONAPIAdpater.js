class JSONAPIAdapter {
  constructor(endpoint) {
    this.endpoint = `https://memory-castle.herokuapp.com/${endpoint}`;
    this.headers = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    };
  }
  getAll() {
    return fetch(this.endpoint,{
      method: "GET",
      headers: { ...this.headers, Authorization: localStorage.getItem('jwt') },
    }).then(response => response.json());
  }

  getSingle(id) {
    return fetch(`${this.endpoint}/${id}`, {
      headers: { ...this.headers, Authorization: localStorage.getItem('jwt') }
    })
    .then(response => {
      return response.json()
    })
  }
  // { key: 'value', key: { key: 'value', key: 'value'} }
  createItem(body, id="") {
    return fetch(`${this.endpoint}/${id}`, {
      method: "POST",
      headers: { ...this.headers, Authorization: localStorage.getItem('jwt')},
      body: JSON.stringify(body) // { key: 'value', key: { key: 'value', key: 'value'} }
    });
  }

  updateItem(body, id) {
    return fetch(`${this.endpoint}/${id}`, {
      method: "PATCH",
      headers: { ...this.headers, Authorization: localStorage.getItem('jwt') },
      body: JSON.stringify(body)
    });
  }

  deleteItem(id){
    return fetch(`${this.endpoint}/${id}`, {
      method: "DELETE", 
      headers: { ...this.headers, Authorization: localStorage.getItem('jwt') },
    })
      .then(response => response.json()); 
  }

}


export default JSONAPIAdapter;