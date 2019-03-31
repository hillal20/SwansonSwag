import React, { Component } from "react";
import "./App.css";

import axios from "axios";
import SwansonSwag from "./pictures/SwansonSwag.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wisdom: "",
      pictureClicked: false
    };
  }
  componentWillMount() {
    this.fetchingWisdom();
  }
  getWisdom = () => {
    this.setState({ pictureClicked: !this.state.pictureClicked });
    this.fetchingWisdom();
  };
  fetchingWisdom = async () => {
    const promise = await axios.get(
      "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
    );
    this.setState({ wisdom: promise.data[0] });
  };

  render() {
    console.log(this.state.wisdom);
    return (
      <div className="App">
        <h1>+++++ SWonSWang Wisdom ++++++</h1>
        <img src={SwansonSwag} onClick={this.getWisdom} width="400" />
        {this.state.pictureClicked && (
          <div className="wisdom">{this.state.wisdom}</div>
        )}
      </div>
    );
  }
}

export default App;
