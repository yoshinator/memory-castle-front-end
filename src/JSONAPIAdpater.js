class JSONAPIAdapter {
  constructor(endpoint) {
    this.endpoint = `http://localhost/memorycastleapi/memorycastleapi${endpoint}`;
    this.headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
  }
  getAll() {
    return fetch(this.endpoint).then(response => response.json());
  }
  getSingle(id) {
    return fetch(`${this.endpoint}/${id}`).then(response => response.json());
  }
  // { key: 'value', key: { key: 'value', key: 'value'} }
  createItem(body) {
    return fetch(this.endpoint, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body) // { key: 'value', key: { key: 'value', key: 'value'} }
    });
  }

  updateItem(body, id) {
    return fetch(`${this.endpoint}/${id}`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(body)
    });
  }

  deleteItem(id){
    return fetch(`${this.endpoint}/${id}`, {
      method: "DELETE", 
      headers: this.headers
    })
      .then(response => response.json()); 
  }

  
}


export default JSONAPIAdapter;