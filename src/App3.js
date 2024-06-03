import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './css/styles.css';
import Table from "react-bootstrap/Table";

export default class Success extends React.Component {
  constructor(props) {
    super();

    let data = [
      {
        label: "0",
        label2: "test"
      },
      { label: "1", label2: "test1" },
      { label: "2", label2: "test2" },
      { label: "3", label2: "test3" },
      { label: "4", label2: "test4" },
      { label: "5", label2: "test5" },
      { label: "6", label2: "test6" }
    ];

    this.state = { data, labelFilter: null, textFilter: null };
  }

  RemoveEachRow = (index) => {
    console.log("-----", index);
    this.setState({
      data: this.state.data.filter((obj, idx) => idx !== index)
    });
  };

  render() {
    let filteredData = this.state.data;

    if (this.state.labelFilter) {
      filteredData = this.state.data.filter(
        (dt) => dt.label === this.state.labelFilter
      );
    }

    if (this.state.textFilter) {
      filteredData = this.state.data.filter(
        (dt) => dt.label2 === this.state.textFilter
      );
    }

    return (
      <div className="container">
        <div className="row">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>
                  Label
                  <br />
                  <input
                    type="text"
                    value={this.state.labelFilter}
                    onChange={(e) =>
                      this.setState({ labelFilter: e.target.value })
                    }
                  />
                </th>
                <th>
                  Text
                  <br />
                  <input
                    type="text"
                    value={this.state.textFilter}
                    onChange={(e) =>
                      this.setState({ textFilter: e.target.value })
                    }
                  />
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {filteredData.map((entry, index) => (
                <tr key={index}>
                    <td>{index}</td>
                    <td>{entry.label}</td>
                    <td>
                    {this.state.editingIndex === index ? (
                        <>
                        <input
                            type="text"
                            value={this.state.editedValue}
                            onChange={(e) =>
                            this.setState({ editedValue: e.target.value })
                            }
                        />
                        <button onClick={() => this.handleSave(index)}>Save</button>
                        </>
                    ) : (
                        entry.label2
                    )}
                    </td>
                    <td
                    style={{
                        backgroundColor: "#FFFF",
                        borderTopColor: "#FFFF"
                    }}
                    onClick={() => this.RemoveEachRow(index)}
                    >
                    Delete
                    </td>
                    <td>
                    <button onClick={() => this.handleEdit(index, entry.label2)}>
                        Edit
                    </button>
                    </td>
                    <td>
                    <button onClick={() => alert("Button clicked!")}>Custom Button</button>
                    </td>
                </tr>
            ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
