import React from "react";
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      datos: [],
    };
  }

  sendLogin = () => {
    let QUOTE_SERVICE_URL = `http://localhost:8080/api/user/login`;

    if (process.env.NODE_ENV === "production") {
      QUOTE_SERVICE_URL = `/api/user/login`;
    }
    fetch(QUOTE_SERVICE_URL, {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.text())
      .then((text) => {
        sessionStorage.setItem("UserName", text);
        alert("Bienvenido " + text);
        this.props.history.push("/");
      })
      .catch((error) => console.error("Error:", error));
  };

  onChange = (e) => {
    var state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  render() {
    return (
      <div className="margin-top">
        <div className="row max">
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
                <label htmlFor="email">Email</label>
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
                <label htmlFor="password">Password</label>
              </div>
            </div>

            <button className="btn" onClick={this.sendLogin.bind(this)}>
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
