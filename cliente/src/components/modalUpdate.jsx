import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class ModalUpdate extends Component {
  constructor() {
    super();
    this.state = {};
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
    M.Modal.init(this.Modal, options);
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
      `http://localhost:8080/api/operations/update/${this.props.operation._id}`,
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
      })
      .catch((error) => console.error("Error:", error));
  };

  render() {
    return (
      <>
        <div className="margin-top ">
        <button
              className="btn btn-floating blue modal-trigger"
              data-target="modal1"
            >
              <i className="material-icons">edit</i>
            </button>
        </div>
        <div
          ref={(Modal) => {
            this.Modal = Modal;
          }}
          id="modal1"
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
                        id="concept"
                        type="text"
                        className="validate"
                        onChange={this.onChange.bind(this)}
                      ></input>
                      <label for="concept">Concept</label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        name="amount"
                        id="amount"
                        type="number"
                        className="validate"
                        onChange={this.onChange.bind(this)}
                      ></input>
                      <label for="amount">Amount</label>
                    </div>
                  </div>

                  <div className="row">
                    <div class="input-field col s12">
                      <select
                        ref={(FormSelect) => {
                          this.FormSelect = FormSelect;
                        }}
                        type="type"
                        name="type"
                        id="type"
                        value={this.state.select}
                        onChange={this.onChange.bind(this)}
                      >
                        <option value="" disabled selected>
                          Choose your option
                        </option>
                        <option value="Ingreso">Ingreso</option>
                        <option value="Egreso">Egreso</option>
                      </select>
                      <label for="type">Tipo</label>
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
                        id="category"
                        value={this.state.select}
                        onChange={this.onChange.bind(this)}
                      >
                        <option value="" disabled selected>
                          Choose your option
                        </option>
                        <option value="Comida">Comida</option>
                        <option value="Limpieza">Limpieza</option>
                        <option value="Servicios">Servicios</option>
                        <option value="Impuestos">Impuestos</option>
                        <option value="Personal">Personal</option>
                        <option value="Mercadería">Mercadería</option>
                      </select>
                      <label for="category">Category</label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div class="modal-footer">
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
