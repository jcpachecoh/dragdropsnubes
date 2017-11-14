import { Draggable, Droppable } from "react-drag-and-drop";
import React, { Component } from "react";
import logo from "../logo.svg";
import { data } from "../constants/content";
import * as reactBootstrap from "react-bootstrap";
import PropTypes from "prop-types";
import * as _ from "lodash";
import {
  Button,
  ControlLabel,
  FormControl,
  FormGroup,
  Alert
} from "react-bootstrap";

var carriages = [];
var train = {};

export default class DropComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      train: {
        trainId: props.trainId,
        locomotive: null,
        carriages: [],
        departure: null,
        arrival: null
      },
      message: null,
      departure: null,
      arrival: null,
      trainsNumber: null
    };
    this.onDrop = this.onDrop.bind(this);
    this.handleArrival = this.handleArrival.bind(this);
    this.handleDepature = this.handleDepature.bind(this);
  }

  onDrop(data) {
    if (data.locomotive) {
      console.log(this.state.train);
      if (_.isEmpty(this.state.train.locomotive)) {
        train = {
          trainId: this.props.trainId,
          locomotive: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Mogul_steam_locomotive_icon.svg/2000px-Mogul_steam_locomotive_icon.svg.png",
          carriages: []
        };
      } else {
        this.setState({
          message: data.locomotiveMsn
        });
      }
    }

    if (data.carriage) {
      let carriage = data.carriage + carriages.length;
      carriages.push("https://cdn.iconscout.com/public/images/icon/premium/png-512/carriage-passenger-railroad-railway-train-transport-3c58b2a70d33854f-512x512.png");
      train = {
        trainId: this.props.trainId,
        locomotive: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Mogul_steam_locomotive_icon.svg/2000px-Mogul_steam_locomotive_icon.svg.png",
        carriages: carriages
      };
    }
    this.setState({
      train: train
    });
  }

  handleDepature(e) {
    let trainState = this.state.train;

    trainState.departure = e.target.value;
    console.log(trainState);
  }

  handleArrival(e) {
    let trainState = this.state.train;

    trainState.arrival = e.target.value;
    console.log(trainState);
  }

  render() {
    return (
      <div className="dropDiv">
        {this.state.message && (
          <Alert bsStyle="danger">{this.state.message}</Alert>
        )}
        <h1>Train No. {this.state.train.trainId}</h1>
        <Droppable
          types={["locomotive", "carriage"]} // <= allowed drop types
          onDrop={this.onDrop.bind(this)}
          id="train1"
        >
          <ul>
            <li><img src={this.state.train.locomotive} height="42" width="42"/></li>
            {this.state.train.carriages.map((el) => {
              return <li key={el}><img src={el} height="42" width="42"/></li>;
            })}
          </ul>
        </Droppable>

        <FormGroup>
          <ControlLabel>Depature Time</ControlLabel>
          <FormControl
            id="departure"
            type="text"
            onChange={this.handleDepature}
            value={this.state.departure}
            placeholder="Enter departure time"
          />
          <ControlLabel>Arrival Time</ControlLabel>
          <FormControl
            id="arrival"
            type="text"
            onChange={this.handleArrival}
            value={this.state.arrival}
            placeholder="Enter arrival time"
          />
        </FormGroup>
      </div>
    );
  }
}

DropComponent.propTypes = {
  trainId: PropTypes.number.isRequired
};
