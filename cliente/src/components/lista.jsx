import React from "react";

import Modal from "./modal";

import M from "materialize-css";

class ListaOperaciones extends React.Component {
  constructor() {
    super();
    this.state = {
      datos: [],
      Datosfiltrados: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  getOperations = () => {
    let QUOTE_SERVICE_URL = `http://localhost:8080/api/operations`;

    if (process.env.NODE_ENV === "production") {
      QUOTE_SERVICE_URL = `/api/operations`;
    }
    fetch(QUOTE_SERVICE_URL)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          datos: data,
          Datosfiltrados: data,
        })
      )
      .catch((err) => console.error(err));
  };

  delete = (_id) => {
    var operation = {
      _id,
    };
    let QUOTE_SERVICE_URL = `http://localhost:8080/api/operations/delete`;

    if (process.env.NODE_ENV === "production") {
      QUOTE_SERVICE_URL = `/api/operations/delete`;
    }
    fetch(QUOTE_SERVICE_URL, {
      method: "DELETE",
      body: JSON.stringify(operation),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        res.json();
        this.getOperations();
      })
      .catch((error) => console.error("Error:", error));
  };

  handleChange(event) {
    var value = event.target.value;
    var newDatos = this.state.datos;
    if (value === "Todos") {
      this.setState({ Datosfiltrados: this.state.datos });
    } else {
      var Datosfiltrados = newDatos.filter((opt) => opt.category === value);
      this.setState({ Datosfiltrados: Datosfiltrados });
    }
  }

  async componentDidMount() {
    await this.getOperations();
    M.FormSelect.init(this.FormSelect3);
    if (sessionStorage.getItem("UserName") === null) {
      alert(
        "Si registra operaciones sin registrarse. \nAparecerá como no registrado \nInicie sessión "
      );
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col m12">
            <h5>Lista de operaciones registradas</h5>
          </div>
          <div className="input-field col s12 m12">
            <select
              ref={(FormSelect3) => {
                this.FormSelect3 = FormSelect3;
              }}
              type="category"
              name="category"
              id="category"
              value={this.state.select}
              onChange={this.handleChange}
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled>
                Choose an option to sort table
              </option>
              <option value="Comida">Comida</option>
              <option value="Limpieza">Limpieza</option>
              <option value="Servicios">Servicios</option>
              <option value="Impuestos">Impuestos</option>
              <option value="Personal">Personal</option>
              <option value="Mercadería">Mercadería</option>
              <option value="Reparaciones">Reparaciones</option>
              <option value="Proveedores">Proveedores</option>
              <option value="Todos">Todos</option>
            </select>
            <label htmlFor="category">Category</label>
          </div>
        </div>
        <table className="highlight">
          <thead>
            <tr>
              <th>Registrado por</th>
              <th>Concepto</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Categoria</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {this.state.Datosfiltrados.map((dato, i) => {
              return (
                <tr key={i}>
                  <td>{dato.userName}</td>
                  <td>{dato.concept}</td>
                  <td>{dato.amount}</td>
                  <td>{dato.date.substr(0, 10)}</td>
                  <td>{dato.type}</td>
                  <td>{dato.category}</td>
                  <td className="inline">
                    <button
                      className="btn-floating red margin-right "
                      onClick={() => this.delete(dato._id)}
                    >
                      <i className="material-icons">delete</i>
                    </button>
                    <Modal
                      operation={dato._id}
                      clickHandler={this.getOperations}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Modal clickHandler={this.getOperations} />
      </div>
    );
  }
}

export default ListaOperaciones;
