import React from "react";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      datos: [],
      totalIngresos: [],
      totalEgresos: [],
      primeros: [],
    };
  }

  async componentDidMount() {
    await this.getOperations();
  }

  getOperations = () => {
    let QUOTE_SERVICE_URL = `http://localhost:8080/api/operations`
      
    if (process.env.NODE_ENV === "production") {
      QUOTE_SERVICE_URL = `/api/operations`
    }
    fetch(QUOTE_SERVICE_URL)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          datos: data,
        });
        this.contar();
        this.ordenar();
      })
      .catch((err) => console.error(err));
  };

  contar() {
    var ingresos = Object.values(this.state.datos).filter(
      (item) => item.type === "Ingreso"
    );
    var egresos = Object.values(this.state.datos).filter(
      (item) => item.type === "Egreso"
    );
    var totalIngresos = 0;
    var totalEgresos = 0;

    ingresos.forEach((item) => {
      totalIngresos += item.amount;
    });

    egresos.forEach((item) => {
      totalEgresos += item.amount;
    });

    this.setState({
      totalIngresos: totalIngresos,
      totalEgresos: totalEgresos,
    });
  }

  ordenar() {
    var obj = this.state.datos;
    var ordenado = Object.values(obj).sort((a, b) => a.date > b.date);
    var losDiez = [];
    var largo = 10;

    if (ordenado.length < largo) {
      largo = ordenado.length
    }

    for (let index = 0; index < largo ; index++) {
      const element = ordenado[index];
      losDiez.push(element);
    }
    this.setState({
      primeros: losDiez,
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <h4>Balance actual</h4>
          <table className="responsive-table">
            <thead>
              <tr>
                <th>Ingresos</th>
                <th>Egresos</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{this.state.totalIngresos}</td>
                <td>{this.state.totalEgresos}</td>
                <td>{this.state.totalIngresos - this.state.totalEgresos}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="container">
          <h4>Últimos 10 registrados</h4>
          <table className="responsive-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Monto</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {this.state.primeros.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item.date}</td>
                    <td>{item.type}</td>
                    <td>{item.amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Home;
