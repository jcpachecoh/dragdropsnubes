import { Draggable } from "react-drag-and-drop";
import React, { Component } from "react";
import logo from "./logo.svg";
import { data } from "./constants/content";
import "./main.css";
import {
  Button,
  ControlLabel,
  FormControl,
  FormGroup,
  Alert
} from "react-bootstrap";
import * as _ from "lodash";
import DropComponent from "./components/DropComponent";

var carriages = [];
var train = {};

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      train: { locomotive: null, carriages: [] },
      message: null,
      departure: null,
      trainsNumber: null,
      trainsNumberArray: []
    };
    this.buildTrains = this.buildTrains.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderDropComponent = this.renderDropComponent.bind(this);
  }

  handleChange(e) {
    let nTrains = e.target.value;

    this.setState({
      trainsNumber: nTrains,
      message: ""
    });
  }

  renderDropComponent(val) {
    return <DropComponent trainId={val} />;
  }

  buildTrains() {
    let nTrains = _.range(this.state.trainsNumber);
    console.log(nTrains);
    this.setState({
      trainsNumberArray: nTrains
    });
    console.log(this.state.trainsNumberArray);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{data.welcomeMessage}</h1>
        </header>
        <div id="left-side">
          <ul>
            <Draggable type="locomotive" data="locomotive">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Mogul_steam_locomotive_icon.svg/2000px-Mogul_steam_locomotive_icon.svg.png"
                id="locomotive"
                width="150"
                height="80"
              />
            </Draggable>
            <Draggable type="carriage" data="carriage">
              <img
                src="https://cdn.iconscout.com/public/images/icon/premium/png-512/carriage-passenger-railroad-railway-train-transport-3c58b2a70d33854f-512x512.png"
                id="carriage"
                width="150"
                height="80"
              />
            </Draggable>
          </ul>
          {this.state.message && (
            <Alert bsStyle="danger">{this.state.message}</Alert>
          )}
          <ControlLabel>Trains Number to schedule</ControlLabel>
          <FormControl
            id="trainNumber"
            type="text"
            onChange={this.handleChange}
            value={this.state.trainsNumber}
            placeholder="Enter Number of trains "
          />
          <Button bsStyle="primary" onClick={this.buildTrains}>
            Build Trains
          </Button>
          <Button bsStyle="primary" disabled>
            {" "}
            Calculate Tracks!
          </Button>
        </div>
        <div id="right-side">
          {this.state.trainsNumberArray.map(item => {
            return <DropComponent trainId={item} trainObject={this._trainObject} />;
          })}
        </div>
      </div>
    );
  }
}
