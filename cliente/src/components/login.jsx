import React from "react";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      datos: [],
    };
  }

  sendLogin = () => {
    fetch(`http://localhost:8080/api/user/login`,{
        method: 'POST',
        body: JSON.stringify(this.state), 
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
          alert("Welcome "+response.name);
          sessionStorage.setItem('name', response.name);
      });
    }

  onChange = (e) => {
    var state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
    console.log(this.state)
  };

  render() {
    return (
      <div className="margin-top">
        <div className="row container">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input
                name="email"
                  id="email"
                  type="email"
                  className="validate"
                  onChange={this.onChange.bind(this)}
                ></input>
                <label for="email">Email</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                name="password"
                  id="password"
                  type="password"
                  className="validate"
                  onChange={this.onChange.bind(this)}
                ></input>
                <label for="password">Password</label>
              </div>
            </div>
          </form>

          <button className="btn" onClick={this.sendLogin.bind(this)}>
            Send
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
