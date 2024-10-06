import React from "react";
import Table_Smile from "./Table";
import './css/styles.css';

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
              placeholder="Вставьте ссылку на данные"
              className="input_url"
              value={url}
              onChange={this.handleInputChange}
            />
          <button className="button-submit" onClick={this.handleSubmit}>Отправить</button>
            
          </div>
        )}
      </div>
    );
  }
}

export default Upload_Data;
