import React, { Component } from "react";
import CalcButton from "./CalcButton";
import CalcScreen from "./CalcScreen";

export class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operandeA: "",
      operandeB: "",
      operation: "",
      inProgress: false,
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
    let actualOperande = this.state.inProgress ? "" : this.state.operandeA;
    actualOperande += i.toString();
    this.setState({
      operandeA: actualOperande,
      inProgress: false,
    });
  }

  handleKey(key) {
    switch (key) {
      case "coma":
        if (!this.state.operandeA.includes(".")) {
          this.addNumber(".");
        }
        return;
      case "egal":
        if (this.state.operandeB.length === 0) return;
        let result = this.getOperationResult();
        this.setState({
          operandeA: result,
          operandeB: "",
          inProgress: true,
          operation: "",
        })
        return;
      case "plus":
        if (this.state.inProgress) {
          this.setState({
            inProgress: true,
            operation: "plus",
          })
          return;
        }
        if (this.state.operandeB.length > 0) {
          let result = this.getOperationResult();
          this.setState({
            operandeA: result,
            operandeB: result,
            inProgress: true,
            operation: "plus",
          })
          return;
        }
        this.setState({
          operandeB: this.state.operandeA,
          inProgress: true,
          operation: "plus",
        });
        return;
        case "min":
          if (this.state.inProgress) {
            this.setState({
              inProgress: true,
              operation: "min",
            })
            return;
          }
          if (this.state.operandeB.length > 0) {
            let result = this.getOperationResult();
            this.setState({
              operandeA: result,
              operandeB: result,
              inProgress: true,
              operation: "min",
            })
            return;
          }
          this.setState({
            operandeB: this.state.operandeA,
            inProgress: true,
            operation: "min",
          });
          return;
      default:
        return;
    }
  }

  getOperationResult() {
    let result;
    switch (this.state.operation) {
      case "plus":
        result = parseFloat(this.state.operandeB) + parseFloat(this.state.operandeA);
        return result.toString();
      case "min":
        result = parseFloat(this.state.operandeB) - parseFloat(this.state.operandeA);
        return result.toString();
      default:
        return "";
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
