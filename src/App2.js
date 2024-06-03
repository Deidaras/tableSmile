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

    index_detect = (column) => {
      if (["Object", "Integer", "Datetime"].includes(column.type)) {
        return (
          <li>
            <button className="dropdown-item filters" type="button">
              <input
                type="checkbox"
                value="Select as index"
                checked={(this.state.is_data_index === column.name) ? true : false}
                onChange={(e) => {
                  if (this.state.is_data_index !== column.name) {
                    this.setState({ is_data_index: column.name });
                  }
                }}
              />
              <span>  Select as index</span>
            </button>
          </li>
        );
      }
    }
  }

  render() {
    
    
   
    return (
      <div className="container">
        <div className="row">
          <div>
            <button onClick={Download} className="download_file"> 
              Файл data.csv
            </button>
          </div>
          <Table  bordered hover className="bordered_table">
            <thead> 
              <tr>
                {this.state.data.map((column, i) => 
                  <th className={(this.state.is_data_index === column.name)? "index_column" :  (this.state.is_data_target === column.name)? "target_column" : "header_cell"}>
                    {column.name}
                    <div className="dropdown">
                    
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                      
                      <li>{this.index_detect(column)}</li>
                    </ul>
                  </div>
                  </th>
                )}
                <th>
                  del
                </th>
              </tr>
            </thead>
            <tbody>
              
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default Table_Smile;