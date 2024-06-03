import React from "react";
import Table_Smile from "./Table";

class Upload_Data extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null, url: "" };
  }

  Upload = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(uploading_data => {
        if (uploading_data !== undefined) {
          this.setState({ data: uploading_data });
        }
      });
  }

  handleInputChange = (e) => {
    this.setState({ url: e.target.value });
  }

  handleSubmit = () => {
    this.Upload(this.state.url);
  }

  render() {
    const { data, url } = this.state;

    return (
      <div>
        {data ? (
          <Table_Smile data={data} />
        ) : (
          <div>
            <input
              type="text"
              placeholder={"Input url"}
              className="input_url"
              value={url}
              onChange={this.handleInputChange}
            />
            <button  onClick={this.handleSubmit}>Submit</button>
          </div>
        )}
      </div>
    );
  }
}

export default Upload_Data;
