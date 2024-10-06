import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import './css/styles.css';
import Table from "react-bootstrap/Table";
// import { data } from "autoprefixer";
import FileSaver from "file-saver";
import { Parser } from '@json2csv/plainjs';


class Table_Smile extends React.Component {
  constructor(props) {
    super(props);

    let data = props.data.data

    let filters_eq = {}
    let filters_more = {}
    let filters_less = {}

    data.forEach((entry, i) => {
      filters_eq[entry.name] = null
      filters_more[entry.name] = null
      filters_less[entry.name] = null
    })

    let sort_field = null
    let sort_order = false

    let is_data_index = NaN
    let is_data_target = NaN
    data.forEach((entry, j) => {
      if (entry.properties.is_index) {
        is_data_index = entry.name
      }
      if (entry.properties.is_target) {
        is_data_target = entry.name
      }
    })

    data.forEach((entry, i) => {
      if (entry.type === "Boolean") {
        entry.values.forEach((j, index) => {
          if (JSON.stringify(j) === '{}') {
            entry.values[index] = 0;
          }
        });
      }
    });

    this.state = {
      data,
      filters_eq,
      sort_field,
      sort_order,
      filters_more,
      filters_less,
      is_data_index,
      is_data_target,
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
        let t = this.state.data.filter((x) => x.name === key)[0].type;
        if (["Integer", "Float", "Timedelta"].includes(t)) {
          result_data = result_data.filter(
            (x) => Math.abs(x[key] - parseFloat(value)) < 0.0001
          );
        }
        if (t === "Datetime" ) {
          const inputValue = new Date(value).getTime();
          result_data = result_data.filter(
            (x) => new Date(x[key]).getTime() === inputValue
          );
        }
        if (["Categorical", "Object"].includes(t)) {
          result_data = result_data.filter(
            (x) => x[key].toString().toLowerCase().includes(value.toLowerCase())
          );
        }
        if (t === "Boolean") {
          result_data = result_data.filter(
            (x) => x[key] === 0
          );
        }
      }
    }
    

    for (let [key, value] of Object.entries(this.state.filters_more)) {
      if (value) {
        let t = this.state.data.filter((x) => x.name === key)[0].type
        if (["Integer", "Float", "Datetime", "Timedelta"].includes(t)) {
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
      if (value) {
        let t = this.state.data.filter((x) => x.name === key)[0].type
        if (["Integer", "Float", "Datetime", "Timedelta"].includes(t)) {
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


    result_data.sort((a, b) => {
      if (a[this.state.sort_field] > b[this.state.sort_field])
        return this.state.sort_order ? -1 : 1;
      if (a[this.state.sort_field] < b[this.state.sort_field])
        return this.state.sort_order ? 1 : -1;
      return 0;
    });

    function Download() {
      // let copy_result_data = Object.assign({}, result_data)
      // copy_result_data.map(entry =>{
      //   console.log(entry.column_int)
      //   if (entry.column_boolean === 0) {
      //     entry.column_boolean = "NaN"
      //   }
      // }
      const parser = new Parser({ delimiter: ';' });
      const csv = parser.parse(result_data);
      var blob = new Blob([csv], {
        type: "text/csv;charset=utf-8"
      });
      FileSaver.saveAs(blob, "data.csv");
    }

    return (
      <div className="table-container">
        <div className="row">
          <div>
            <span className="file-name">
              Файл "data.csv"
            </span>
            <button className="button-download button-all" onClick={Download} >
              <img  className="download_file" src="/images/button-download.jpg" />
            </button>
          </div>
          <Table bordered hover className="bordered_table">
            <thead>
              <tr>
                {this.state.data.map((column, i) =>
                  <th className={
                    (this.state.is_data_index === column.name) ? "index_column" :
                      (this.state.is_data_target === column.name) ? "target_column" : "header_column"}
                  >
                    <div className="dropdown">
                      <div className="header-name">{column.name}</div>
                      <button className="btn dropdown-bs-toggle button-menu"
                        type="button"
                        id="dropdownMenu2"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <img className="img-button" src='/images/table_button.png' />
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <li className="dropdown-item">
                          Фильтрация
                        </li>
                        {!["Datetime", "Boolean"].includes(column.type) && (
                          <li><button className="dropdown-item filters" type="button">
                            <input
                              // type="number"
                              value={this.state.filters_eq[column.name]}
                              placeholder={"Значение для ф-ии по равному объекту"}
                              className="input_filter"
                              onChange={(e) => {
                                let fi = this.state.filters_eq
                                fi[column.name] = e.target.value
                                this.setState({ filters_eq: fi })
                              }}
                            />
                          </button></li>
                        )}
                        {!["Datetime", "Object", "Categorical", "Boolean"].includes(column.type) && (
                          <li><button className="dropdown-item filters" type="button">
                            <input
                              value={this.state.filters_more[column.name]}
                              placeholder={"Значение для ф-ии по меньшему объекту"}
                              className="input_filter"
                              onChange={(e) => {
                                let fi = this.state.filters_more
                                fi[column.name] = e.target.value
                                this.setState({ filters_more: fi })
                              }}
                            />
                          </button></li>
                        )}
                        {!["Datetime", "Object", "Categorical", "Boolean"].includes(column.type) && (
                          <li><button className="dropdown-item filters" type="button">
                            <input
                              value={this.state.filters_less[column.name]}
                              placeholder={"Значение для ф-ии по большему объекту"}
                              className="input_filter"
                              onChange={(e) => {
                                let fi = this.state.filters_less
                                fi[column.name] = e.target.value
                                this.setState({ filters_less: fi })
                              }}
                            />
                          </button></li>
                        )}
                        {["Boolean"].includes(column.type) && (
                          <li>
                            <button className="dropdown-item filters" type="button">
                              <input
                                type="checkbox"
                                value="NaN"
                                checked={this.state.filters_eq[column.name]}
                                onChange={(e) => {
                                  let fil = this.state.filters_eq;
                                  fil[column.name] = e.target.checked;
                                  this.setState({ filters_eq: fil })
                                }}
                              />
                              <span>  NaN</span>
                            </button>
                          </li>
                        )}
                        {["Boolean"].includes(column.type) && (
                          <li>
                            <button className="dropdown-item filters" type="button">
                              <input
                                type="checkbox"
                                value="True"
                                checked={this.state.filters_more[column.name]}
                                onChange={(e) => {
                                  let fil = this.state.filters_more;
                                  fil[column.name] = e.target.checked;
                                  this.setState({ filters_more: fil })
                                }}
                              />
                              <span>  True</span>
                            </button>
                          </li>
                        )}
                        {["Boolean"].includes(column.type) && (
                          <li>
                            <button className="dropdown-item filters" type="button">
                              <input
                                type="checkbox"
                                value="False"
                                checked={this.state.filters_less[column.name]}
                                onChange={(e) => {
                                  let fil = this.state.filters_less;
                                  fil[column.name] = e.target.checked;
                                  this.setState({ filters_less: fil })
                                }}
                              />
                              <span>  False</span>
                            </button>
                          </li>
                        )}
                        {["Datetime"].includes(column.type) && (
                          <>
                            <li className="dropdown-item">  Значение для ф-ии по равной дате</li>
                            <li><button className="dropdown-item filters" type="button">
                              <input
                                value={this.state.filters_eq[column.name]}
                                type="date"
                                placeholder={"Значение для ф-ии по равному объекту"}
                                className="input_filter"
                                onChange={(e) => {
                                  let fil = this.state.filters_eq
                                  fil[column.name] = e.target.value
                                  this.setState({ filters_eq: fil })
                                }}
                              />
                            </button></li>
                          </>
                        )}
                        {["Datetime"].includes(column.type) && (
                          <>
                            <li className="dropdown-item">  Значение для ф-ии по ранней дате</li>
                            <li><button className="dropdown-item filters" type="button">
                              <input
                                value={this.state.filters_more[column.name]}
                                type="date"
                                placeholder={"Значение для ф-ии по равному объекту"}
                                onfocus="(this.type='date')" onblur="(this.type='text')"
                                className="input_filter"
                                onChange={(e) => {
                                  let fil = this.state.filters_more
                                  fil[column.name] = e.target.value
                                  this.setState({ filters_more: fil })
                                }}
                              />
                            </button></li>
                          </>
                        )}
                        {["Datetime"].includes(column.type) && (
                          <>
                            <li className="dropdown-item">  Значение для ф-ии по поздней дате</li>
                            <li><button className="dropdown-item filters" type="button">
                              <input
                                value={this.state.filters_less[column.name]}
                                type="date"
                                placeholder={"Значение для ф-ии по равному объекту"}
                                onfocus="(this.type='date')" onblur="(this.type='text')"
                                className="input_filter"
                                onChange={(e) => {
                                  let fil = this.state.filters_less
                                  fil[column.name] = e.target.value
                                  this.setState({ filters_less: fil })
                                }}
                              />
                            </button></li>
                          </>
                        )}
                        <li className="dropdown-item">
                          Сортировка
                        </li>
                        <li><button className="dropdown-item filters" type="button">
                          <input
                            type="button"
                            name="sort"
                            className="button-all"
                            value="Отсортировать"
                            onClick={(e) => {
                              if (this.state.sort_field != column.name) {
                                this.setState({ sort_field: column.name })
                              } else { this.setState({ sort_field: null }) }
                            }}
                          />
                        </button></li>
                        <li>
                          <button className="dropdown-item filters" type="button">
                            <input
                              type="button"
                              className="button-all"
                              value="Поменять порядок сортировки"
                              disabled={(this.state.sort_field != column.name) ? "disabled" : ""}
                              onClick={(e) => {
                                this.setState({ sort_order: !this.state.sort_order })
                              }}
                            />
                          </button>
                        </li>
                        {["Object", "Integer", "Datetime"].includes(column.type) && (
                          <li>
                            <button className="dropdown-item filters" type="button">
                              <input
                                type="checkbox"
                                value="Select as index"
                                checked={this.state.is_data_index === column.name}
                                onChange={(e) => {
                                  if (this.state.is_data_index !== column.name && column.name !== this.state.is_data_target) {
                                    this.setState({ is_data_index: column.name });
                                  }
                                }}
                              />
                              <span>  Установить как index столбец</span>
                            </button>
                          </li>
                        )}
                        {["Integer", "Float", "Datetime", "Timedelta", "Categorical", "Object"].includes(column.type) && (
                          <li>
                            <button className="dropdown-item filters" type="button">
                              <input
                                type="checkbox"
                                className="input-checkbox"
                                value="Select as target"
                                checked={this.state.is_data_target === column.name}
                                onChange={(e) => {
                                  if (this.state.is_data_target !== column.name && this.state.is_data_index !== column.name) {
                                    this.setState({ is_data_target: column.name });
                                  }
                                }}
                              />
                              <span>  Установить как целевой столбец</span>
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                  </th>
                )}
                <th>
                  
                </th>
              </tr>
            </thead>
            <tbody>
              {result_data.map((entry, i) =>
                <tr >
                  {this.state.data.map((column) =>
                    <td style={
                      (this.state.is_data_index === column.name) ? { background: "#A9A9A9" } :
                        (this.state.is_data_target === column.name) ? { background: "#E5ECF6" } : { background: "#FFFFFF01" }
                    }>
                      {["Boolean"].includes(column.type) && (entry[column.name] === 0) ? (
                        <div className="text-table">NaN</div>
                      ) : <div className="text-table">
                        {entry[column.name].toString()}
                      </div>}
                    </td>
                  )}
                  <td style={{textAlign: "center"}}>
                    <input
                      className="icon_delete"
                      type="button"
                      name="delete"
                      // value="*"
                      onClick={(e) => {
                        let new_data = this.state.data.map((column, j) => {
                          column.values = column.values.filter((obj, idx) => idx !== i)
                          return column
                        })
                        this.setState({ data: new_data })
                      }}
                    />
                  </td>
                </tr>
              )}
              <tr>
                {this.state.data.map((column, i) =>
                  <td style={{textAlign: "center"}}>
                    <input
                      className="icon_delete"
                      type="button"
                      name="delete"
                      // value="*"
                      onClick={(e) => {
                        let new_data = this.state.data.filter((obj, idx) => idx !== i)
                        this.setState({ data: new_data })
                      }}
                    />
                  </td>
                )}
                <td></td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default Table_Smile;