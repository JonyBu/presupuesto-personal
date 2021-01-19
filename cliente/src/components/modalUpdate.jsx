import React, { Component } from "react";
import M from "materialize-css";

class ModalUpdate extends Component {
  constructor() {
    super();
    this.state = {
      userName : sessionStorage.getItem('UserName')
    };
  }

  componentDidMount() {
    const options = {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%",
    };
    M.Modal.init(this.ModalUpdate, options);
    M.Datepicker.init(this.datepicker);
    M.FormSelect.init(this.FormSelect);
    M.FormSelect.init(this.FormSelect2);
  }

  onChange = (e) => {
    var state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  update = () => {
    fetch(
      `http://localhost:8080/api/operations/update/${this.props.operation}`,
      {
        method: "PUT",
        body: JSON.stringify(this.state),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        res.json();
        this.props.clickHandler();
      })
      .catch((error) => console.error("Error:", error));
  };

  render() {
    return (
      <>
        <div className="margin-top ">
        <button
              className="btn btn-floating blue modal-trigger"
              data-target="modalUpdate"
            >
              <i className="material-icons">edit</i>
            </button>
        </div>
        <div
          ref={(ModalUpdate1) => {
            this.ModalUpdate = ModalUpdate1;
          }}
          id="modalUpdate"
          className="modal"
        >
          <div className="modal-content">
            <div className="margin-top">
              <div className="row container">
                <form className="col s12">
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        name="concept"
                        type="text"
                        className="validate"
                        onChange={this.onChange.bind(this)}
                      ></input>
                      <label htmlFor="concept">Concept</label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        name="amount"
                        type="number"
                        className="validate"
                        onChange={this.onChange.bind(this)}
                      ></input>
                      <label htmlFor="amount">Amount</label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <select
                        ref={(FormSelect) => {
                          this.FormSelect = FormSelect;
                        }}
                        type="type"
                        name="type"
                        value={this.state.select}
                        onChange={this.onChange.bind(this)}
                      >
                        <option value="" disabled >
                          Choose your option
                        </option>
                        <option value="Ingreso">Ingreso</option>
                        <option value="Egreso">Egreso</option>
                      </select>
                      <label htmlFor="type">Tipo</label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <select
                        ref={(FormSelect2) => {
                          this.FormSelect2 = FormSelect2;
                        }}
                        type="category"
                        name="category"
                        value={this.state.select}
                        onChange={this.onChange.bind(this)}
                        defaultValue={'DEFAULT'}
                      >
                        <option value="DEFAULT" disabled>
                          Choose your option
                        </option>
                        <option value="Comida">Comida</option>
                        <option value="Limpieza">Limpieza</option>
                        <option value="Servicios">Servicios</option>
                        <option value="Impuestos">Impuestos</option>
                        <option value="Personal">Personal</option>
                        <option value="Mercadería">Mercadería</option>
                        <option value="Reparaciones">Reparaciones</option>
                        <option value="Proveedores">Proveedores</option>
                      </select>
                      <label htmlFor="category">Category</label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              className="modal-close btn blue"
              onClick={this.update.bind(this)}
            >
              Agree
            </button>
            <button className="modal-close btn red margin-left">
              Disagree
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default ModalUpdate;
