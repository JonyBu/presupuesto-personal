import React from "react";

class Signin extends React.Component {
    constructor(){
        super()
        this.state={

        }
    }
    
    sendSignin = () => {
      
          let QUOTE_SERVICE_URL = `http://localhost:8080/api/user/signin`
      
          if (process.env.NODE_ENV === "production") {
            QUOTE_SERVICE_URL = `/api/user/signin`
          }

        fetch(QUOTE_SERVICE_URL, {
            method: 'POST',
            body: JSON.stringify(this.state), 
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => {
              alert("registrado")
              this.props.history.push("/login")
          });

      };

      onChange = (e) => {
        var state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
      };
    

  render() {
    return (
      <div className="margin-top">
        <div className="row max ">
          <form className="col s12 ">
            <div className="row">
              <div className="input-field col s12">
                <input name="name" id="name" type="text" className="validate" onChange={this.onChange.bind(this)}></input>
                <label htmlFor="name">Name</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input name="email" id="email" type="email" className="validate" onChange={this.onChange.bind(this)}></input>
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
          <button className="btn" onClick={this.sendSignin.bind(this) }>Send</button>
          </form>

        </div>

      </div>
    );
  }
}

export default Signin;
