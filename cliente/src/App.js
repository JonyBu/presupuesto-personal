import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "materialize-css/dist/css/materialize.css";

import Home from "./components/home";
import ListaOperaciones from "./components/lista";
import Login from "./components/login";
import Signin from "./components/signin";

function App() {
  return (
    <Router>
      <nav className="light-blue accent-4">
      <div className="nav-wrapper">      
          <ul className="left">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/list">Listado de operaciones</Link>
            </li>
          </ul>
          {sessionStorage.getItem("UserName") === null ? (
          <ul id="nav-mobile" className="right">
            <li>
              <Link to="/signin">Registrarse</Link>
            </li>
            <li>
              <Link to="/login">Loguearse</Link>
            </li>
          </ul>
        ) : (
          <button
            onClick={sessionStorage.removeItem("UserName")}
            classNAme="brand-logo right"
          >
            {sessionStorage.getItem("UserName")}{" "}
          </button>
        )}
        </div>
      </nav>

      <Switch>
        <Route path="/list" component={ListaOperaciones} />
        <Route path="/login" component={Login} />
        <Route path="/signin" component={Signin} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
