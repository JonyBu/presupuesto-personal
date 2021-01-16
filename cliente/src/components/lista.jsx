import React from "react";

import Modal from "./modal";
import ModalUpdate from "./modalUpdate";

class ListaOperaciones extends React.Component {
  constructor() {
    super();
    this.state = {
      datos: [],
    };
  }

  getOperations = () => {
    fetch(`http://localhost:8080/api/operations`)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          datos: data,
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

  async componentDidMount() {
    await this.getOperations();
  }

  render() {
    console.log(this.state);
    return (
      <div className="container">
        <h4>Lista de operaciones registradas</h4>
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Concepto</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Categoria</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {this.state.datos.map((dato, i) => {
              return (
                <tr key={i}>
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
                    <ModalUpdate operation={dato._id} clickHandler={this.getOperations}/>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Modal clickHandler={this.getOperations}/>
      </div>
    );
  }
}

export default ListaOperaciones;
