import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import './css/styles.css';
import { render } from "react-dom";
// import Table from "react-bootstrap/Table";

export function Sort (props) { 

    return(
        <>
            <li className="dropdown-item">
                Sort
            </li>
            <li><button className="dropdown-item filters" type="button">
            <input
                type="button"
                name="sort"
                value={" Sort by " + props.column.name}
                onClick={(e) => {
                if (this.state.sort_field != props.column.name) {
                    this.setState({ sort_field:props.column.name })
                } else {this.setState({ sort_field:null })}
                }}
            />
            </button></li>
            <li><button className="dropdown-item filters" type="button">
            <input
                type="button"
                value=" Change sort order"
                disabled = {(this.state.sort_field != column.name)? "disabled" : ""}
                onClick={(e) => {
                this.setState({ sort_order:!this.state.sort_order })
                }}
            />
            </button></li>
        </>
    )
    
}