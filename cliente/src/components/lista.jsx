import React from "react";

import Modal from "./modal";
import ModalUpdate from "./modalUpdate";

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
    fetch(`http://localhost:8080/api/operations`)
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
    fetch(`http://localhost:8080/api/operations/delete`, {
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
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col m12">
            <h4>Lista de operaciones registradas</h4>
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
              defaultValue={'DEFAULT'}
            >
              <option value="DEFAULT" disabled >
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
        <table className="responsive-table">
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
                  <td>{dato.date}</td>
                  <td>{dato.type}</td>
                  <td>{dato.category}</td>
                  <td>
                    <button
                      className="btn-floating red "
                      onClick={() => this.delete(dato._id)}
                    >
                      <i className="material-icons">delete</i>
                    </button>
                    <ModalUpdate
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
