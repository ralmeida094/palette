import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

import React, { Component } from "react";
import WebFont from "webfontloader";
import axios from "axios";
import { ReactComponent as ReloadIcon } from "./reload.svg";
import Spinner from "react-bootstrap/Spinner";
import Card from "./Card";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: [],
      fonts: [],
      loading: false,
      error: false
    };

    this.handleReload = this.handleReload.bind(this);
  }

  genFiveRandFonts(families) {
    var fonts = [];
    var idx;

    for (let i = 0; i < 5; i++) {
      idx = Math.floor(Math.random() * families.length - 1);
      fonts.push(families[idx].family);
    }

    return fonts;
  }

  async fetchData() {
    const API_URL = "/api";

    let colors;
    let fonts;

    this.setState({
      ...this.state,
      loading: true
    });

    await axios(API_URL)
      .then(res => res.data)
      .then(data => {
        if (!data.colors || !data.fonts) throw new Error("SERVER ERROR");

        colors = data.colors;
        fonts = this.genFiveRandFonts(data.fonts);

        WebFont.load({
          google: {
            families: [...fonts]
          }
        });
      })
      .catch(e => {
        console.log(e);

        this.setState({
          ...this.state,
          error: true
        });
      });

    this.setState({
      colors,
      fonts,
      loading: false
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  handleReload() {
    this.fetchData();
  }

  render() {
    return (
      <div className="app">
        {this.state.loading || this.state.error ? (
          <Spinner
            className="spinner"
            animation="border"
            role="status"
            variant="success"
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <div className="wrapper">
            <h1 className="title">Palette</h1>
            <button className="btn--reload" onClick={this.handleReload}>
              <ReloadIcon className="icon--reload" />
            </button>
            <div className="cards">
              {this.state.colors.map((color, idx) => (
                <Card
                  key={idx}
                  fontFamily={this.state.fonts[idx]}
                  bgColor={this.state.colors[idx]}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}
