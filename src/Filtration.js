import React from "react";


class Filtration extends React.Component {
  constructor(props) {
    super(props);

    let data = props.data.data
    let filters_eq = {}
    let filters_more = {}
    let filters_less = {}

    data.forEach((entry, i) =>{
        filters_eq[entry.name] = null
        filters_more[entry.name] = null
        filters_less[entry.name] = null
      })
    this.state = { 
        data,
        filters_eq,
        filters_less,
        filters_more 
    };
  }

  

  render() {
    
    let result_data = [];
    this.state.data[0].values.forEach((_, i) => {
      result_data.push({}),
      this.state.data.forEach((entry, j) => 
        result_data[i][entry.name] = entry.values[i]
      )
    })

    

    for (let [key, value] of Object.entries(this.state.filters_eq)) {
      if (value) {
        result_data = result_data.filter(
          (x) => x[key].toString() === value
        );
    }}

    for (let [key, value] of Object.entries(this.state.filters_more)) {
      if (value){
        let t = this.state.data.filter((x) => x.name === key)[0].type
        if (t === "Object") {
          result_data = result_data.filter(
            (x) => x[key].toString().toLowerCase().includes(value.toLowerCase())
          )
        }
        if (["Integer", "Float", "Datetime", "Timedelta", "Categorical"].includes(t)) {
          result_data = result_data.filter(
            (x) => x[key] >= value
          )
        }
        if (t === "Boolean") {
          result_data = result_data.filter(
            (x) => x[key] === true
          )
        }
      }
    }

    for (let [key, value] of Object.entries(this.state.filters_less)) {
      if (value){
        let t = this.state.data.filter((x) => x.name === key)[0].type
        if (["Integer", "Float", "Datetime", "Timedelta", "Categorical", "Object"].includes(t)) {
          result_data = result_data.filter(
            (x) => x[key] <= value
          )
        }
        if (t === "Boolean") {
          result_data = result_data.filter(
            (x) => x[key] === false
          )
        }
      }
    }

    return (
      <div>
        <li><button className="dropdown-item filters" type="button">
            <input
                // type="number"
                value={this.state.filters_eq[column.name]}
                placeholder={"Значение для ф-ии по равному объекту"}
                className="input_filter"
                onChange={(e) => {
                let fil = this.state.filters_eq
                fil[column.name] = e.target.value 
                this.setState({ filters_eq:fil })
                }}
            />
            </button></li>
            <li><button className="dropdown-item filters" type="button">
            <input
                // type="number"
                value={this.state.filters_more[column.name]}
                placeholder={"Значение для ф-ии по меньшему объекту"}
                className="input_filter"
                onChange={(e) => {
                let fi = this.state.filters_more
                fi[column.name] = e.target.value
                this.setState({ filters_more:fi })
                }}
            />
            </button></li>
            <li><button className="dropdown-item filters" type="button">
            <input
                // type="number"
                value={this.state.filters_less[column.name]}
                placeholder={"Значение для ф-ии по большему объекту"}
                className="input_filter"
                onChange={(e) => {
                let fi = this.state.filters_less
                fi[column.name] = e.target.value
                this.setState({ filters_less:fi })
                }}
            />
            </button></li>
      </div>
    );
  }
}

export default Filtration;
