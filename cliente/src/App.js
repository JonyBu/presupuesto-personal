import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";

import Home from "./components/home";
import ListaOperaciones from "./components/lista";
import Login from "./components/login";
import Signin from "./components/signin";

function App() {
  return (
    <Router>
      <div>
        <nav className=" light-blue accent-4">
          <div className="nav-wrapper">
            <ul id="nav-mobile" class="left hide-on-med-and-down">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/list">Listado de operaciones</Link>
              </li>
            </ul>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <Link to="/signin">Registrarse</Link>
              </li>
              <li>
                <Link to="/login">Loguearse</Link>
              </li>
            </ul>
          </div>
        </nav>

        <Switch>
          <Route path="/list">
            <ListaOperaciones />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function About() {
  return <h2>Listado de operaciones</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default App;
