import React, { Component } from "react";
import CalcButton from "./CalcButton";
import CalcScreen from "./CalcScreen";

export class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operandeA: "",
      operandeB: "",
      operation: null,
    }
  }

  renderNumber(i) {
    return (
      <CalcButton
        key={"btn" + i}
        text={i}
        func={() => this.addNumber(i)}
        isFunc={false}
      />
    );
  }

  renderSpecialKey(key) {
    return (
      <CalcButton
        key={"key" + key}
        text={this.keyToString(key)}
        func={() => this.handleKey(key)}
        isFunc={true}
      />
    );
  }

  addNumber(i) {
    let actualOperande = this.state.operation ? "" : this.state.operandeA;
    actualOperande += i.toString();
    this.setState({
      operandeA: actualOperande,
      operation: null,
    });
  }

  handleKey(key) {
    switch (key) {
      case "coma":
        if (!this.state.operandeA.includes(".")) {
          this.addNumber(".");
        }
        break;
    
      default:
        break;
    }
  }

  keyToString(key) {
    switch (key) {
      case "coma":
        return ".";
      case "egal":
        return "=";
      case "div":
        return "÷";
      case "mult":
        return "×";
      case "min":
        return "-";
      case "plus":
        return "+";
      default:
        return "";
    }
  }

  render() {
    return (
      <div className="calc">
        <CalcScreen 
          text={this.state.operandeA}
        />
        <div>
          {this.renderNumber(7)}
          {this.renderNumber(8)}
          {this.renderNumber(9)}
          {this.renderSpecialKey("div")}
        </div>
        <div>
          {this.renderNumber(4)}
          {this.renderNumber(5)}
          {this.renderNumber(6)}
          {this.renderSpecialKey("mult")}
        </div>
        <div>
          {this.renderNumber(1)}
          {this.renderNumber(2)}
          {this.renderNumber(3)}
          {this.renderSpecialKey("min")}
        </div>
        <div>
          {this.renderNumber(0)}
          {this.renderSpecialKey("coma")}
          {this.renderSpecialKey("egal")}
          {this.renderSpecialKey("plus")}
        </div>
      </div>
    );
  }
}

export default Calculator;
