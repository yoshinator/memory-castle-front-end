class JSONAPIAdapter {
  constructor(endpoint) {
    this.endpoint = `http://localhost:3000/${endpoint}`;
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
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(body)
    });
  }
}

export default JSONAPIAdapter;