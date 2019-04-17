import React, { Component } from "react";
import "./App.css";

import axios from "axios";
import SwansonSwag from "./pictures/SwansonSwag.png";
const ip = require("ip");
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wisdom: "",
      allQuotes: [],
      pictureClicked: false,
      wisdomSize: "any",
      rating: "",
      ratedQuote: "",
      realRating: 0,
      realQuote: ""
    };
  }
  componentDidMount() {
    this.fetchingWisdom();
  }
  getWisdom = () => {
    this.setState({ pictureClicked: !this.state.pictureClicked });
    this.fetchingWisdom();
  };
  fetchingWisdom = async () => {
    const promise = await Promise.all([
      axios.get("https://ron-swanson-quotes.herokuapp.com/v2/quotes"),
      axios.get("https://ron-swanson-quotes.herokuapp.com/v2/quotes/100")
    ]);

    console.log("==> promise", promise);
    this.setState({
      wisdom: promise[0].data[0],
      allQuotes: promise[1].data
    });
  };
  wisdomSize = e => {
    switch (e.target.value) {
      case "Small":
        this.setState({ wisdomSize: "small" });
        break;
      case "Large":
        this.setState({ wisdomSize: "large" });
        break;
      case "Medium":
        this.setState({ wisdomSize: "medium" });
        break;
      case "Any":
        this.setState({ wisdomSize: "any" });
        break;
      default:
        break;
    }
  };
  allQuotes = size => {
    let splitWords;

    switch (size) {
      case "small":
        splitWords = this.state.allQuotes.filter(e => {
          return e.split(" ").length <= 4;
        });
        break;
      case "medium":
        splitWords = this.state.allQuotes.filter(e => {
          return e.split(" ").length >= 5 && e.split(" ").length <= 12;
        });
        break;
      case "large":
        splitWords = this.state.allQuotes.filter(e => {
          return e.split(" ").length >= 13;
        });
        break;
      default:
        break;
    }

    return splitWords.map(e => {
      console.log("e ==> ", e);

      return (
        <div key={e} className="wisdom">
          {e}
          <div>
            Rate:{" "}
            <input
              placeholder="enter your rating from 5"
              name="rating"
              value={this.state.value}
              onChange={this.eventHandler}
            />
            <button onClick={() => this.sendingRating(e, this.state.rating)}>
              send
            </button>
            <h3>
              total rating :
              {e === this.state.realQuote ? this.state.realRating : 0}
            </h3>
          </div>
        </div>
      );
    });
  };
  eventHandler = e => {
    this.setState({ rating: e.target.value });
  };

  sendingRating = (q, r) => {
    console.log("rq", q, r);
    const obj = {
      rating: r,
      quote: q,
      ip: ip.address()
    };
    const promise = axios.post("http://localhost:4000/ratings", obj);
    promise
      .then(msg => {
        msg.data.msg1
          ? this.setState({
              realRating: msg.data.msg1.rating,
              realQuote: msg.data.msg1.quote
            })
          : this.setState({
              realRating: msg.data.msg2.rating,
              realQuote: msg.data.msg2.quote
            });
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    console.log(ip.address());
    console.log("r", this.state.rating);

    return (
      <div className="App">
        <h1>+++++ Swanson Wisdom ++++++</h1>
        <h3>Select the size of the wisdom: </h3>
        <select onChange={this.wisdomSize}>
          <option>Any</option>
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
        </select>
        <img src={SwansonSwag} onClick={this.getWisdom} width="300" />
        {this.state.pictureClicked && this.state.wisdomSize === "any" && (
          <div className="wisdom">{this.state.wisdom}</div>
        )}
        {this.state.pictureClicked &&
          this.state.wisdomSize === "small" &&
          this.allQuotes("small")}
        {this.state.pictureClicked &&
          this.state.wisdomSize === "large" &&
          this.allQuotes("large")}
        {this.state.pictureClicked &&
          this.state.wisdomSize === "medium" &&
          this.allQuotes("medium")}
      </div>
    );
  }
}

export default App;
