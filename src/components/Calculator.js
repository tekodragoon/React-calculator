import React, { Component } from "react";
import CalcButton from "./CalcButton";
import CalcScreen from "./CalcScreen";
import ResetButton from "./ResetButton";

export class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operandeA: "",
      operandeB: "",
      operandeC: "",
      operationAB: "",
      operationAC: "",
      inProgress: false,
    };
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

  renderResetBtn(key) {
    return (
      <ResetButton
        key={"key" + key}
        text={this.keyToString(key)}
        func={() => this.handleKey(key)}
      />
    );
  }

  addNumber(i) {
    let resetBtn = document.getElementById("reset-btn");
    let actualOperande =
      this.state.inProgress ||
      (this.state.operandeA === "0" && resetBtn.textContent === "AC")
        ? ""
        : this.state.operandeA;
    actualOperande += i.toString();
    this.setState({
      operandeA: actualOperande,
      inProgress: false,
    });
    resetBtn.textContent = "C";
  }

  handleKey(key) {
    switch (key) {
      case "coma":
        if (!this.state.operandeA.includes(".")) {
          let resetBtn = document.getElementById("reset-btn");
          resetBtn.textContent = "C";
          let c = this.state.inProgress || this.state.operandeA.length === 0 ? "0." : ".";
          this.addNumber(c);
        }
        return;
      case "egal":
        if (
          this.state.operandeB.length === 0 &&
          this.state.operandeC.length === 0
        )
          return;
        let result =
          this.state.operationAC !== ""
            ? this.getFullResult()
            : this.getOperationABResult();

        this.setState({
          operandeA: result,
          operandeB: "",
          operandeC: "",
          inProgress: true,
          operationAB: "egal",
          operationAC: "",
        });
        return;
      case "plus":
        if (this.state.inProgress && this.state.operationAB !== "egal") {
          this.setState({
            inProgress: true,
            operationAB: "plus",
          });
          return;
        }
        if (this.state.operandeB.length > 0 || this.state.operationAC !== "") {
          let result =
            this.state.operationAC !== ""
              ? this.getFullResult()
              : this.getOperationABResult();
          this.setState({
            operandeA: result,
            operandeB: result,
            operandeC: "",
            inProgress: true,
            operationAB: "plus",
            operationAC: "",
          });
          return;
        }
        this.setState({
          operandeB: this.state.operandeA,
          inProgress: true,
          operationAB: "plus",
        });
        return;
      case "min":
        if (this.state.inProgress && this.state.operationAB !== "egal") {
          this.setState({
            inProgress: true,
            operationAB: "min",
          });
          return;
        }
        if (this.state.operandeB.length > 0 || this.state.operationAC !== "") {
          let result =
            this.state.operationAC !== ""
              ? this.getFullResult()
              : this.getOperationABResult();
          this.setState({
            operandeA: result,
            operandeB: result,
            operandeC: "",
            inProgress: true,
            operationAB: "min",
            operationAC: "",
          });
          return;
        }
        this.setState({
          operandeB: this.state.operandeA,
          inProgress: true,
          operationAB: "min",
        });
        return;
      case "mult":
        if (this.state.inProgress && this.state.operationAB !== "egal") {
          this.setState({
            inProgress: true,
            operationAB: "",
            operationAC: "mult",
          });
          return;
        }
        if (this.state.operandeC.length > 0) {
          let result = this.getOperationACResult();
          this.setState({
            operandeA: result,
            operandeC: result,
            inProgress: true,
            operationAC: "mult",
          });
          return;
        }
        this.setState({
          operandeC: this.state.operandeA,
          inProgress: true,
          operationAC: "mult",
        });
        return;
      case "div":
        if (this.state.inProgress && this.state.operationAB !== "egal") {
          this.setState({
            inProgress: true,
            operationAB: "",
            operationAC: "div",
          });
          return;
        }
        if (this.state.operandeC.length > 0) {
          let result = this.getOperationACResult();
          this.setState({
            operandeA: result,
            operandeC: result,
            inProgress: true,
            operationAC: "div",
          });
          return;
        }
        this.setState({
          operandeC: this.state.operandeA,
          inProgress: true,
          operationAC: "div",
        });
        return;
      case "reset":
        let resetBtn = document.getElementById("reset-btn");
        if (resetBtn.textContent === "AC") {
          this.setState({
            operandeA: "",
            operandeB: "",
            operandeC: "",
            inProgress: false,
            operationAB: "",
            operationAC: "",
          });
        }
        if (resetBtn.textContent === "C") {
          this.setState({
            operandeA: "0",
          });
          resetBtn.textContent = "AC";
        }
        break;
      case "inv":
        if (this.state.operandeA[0] === "-") {
          this.setState({
            operandeA: this.state.operandeA.slice(1),
          });
        } else {
          this.setState({
            operandeA: "-" + this.state.operandeA,
          });
        }
        break;
      default:
        return;
    }
  }

  getOperationABResult() {
    let result;
    switch (this.state.operationAB) {
      case "plus":
        result = Number(this.state.operandeB) + Number(this.state.operandeA);
        return this.reduceFloat(result);
      case "min":
        result = Number(this.state.operandeB) - Number(this.state.operandeA);
        return this.reduceFloat(result);
      default:
        return "";
    }
  }

  getOperationACResult() {
    let result;
    switch (this.state.operationAC) {
      case "mult":
        result = Number(this.state.operandeC) * Number(this.state.operandeA);
        return this.reduceFloat(result);
      case "div":
        result = Number(this.state.operandeC) / Number(this.state.operandeA);
        return result;
      default:
        return "";
    }
  }

  getFullResult() {
    let fullResult;
    let resultAC = Number(this.getOperationACResult());
    switch (this.state.operationAB) {
      case "plus":
        fullResult = resultAC + Number(this.state.operandeB);
        break;
      case "min":
        fullResult = Number(this.state.operandeB) - resultAC;
        break;
      default:
        fullResult = resultAC;
        break;
    }
    return fullResult.toString();
  }

  reduceFloat(f) {
    let a = this.state.operandeA.split(".");
    let b = this.state.operandeB.split(".");
    let maxDecimal =
      (a.length > 1 ? a[1].length : 0) + (b.length > 1 ? b[1].length : 0);
    let res = f.toFixed(maxDecimal).toString();
    while (res[res.length - 1] === "0") {
      res = res.slice(0, -1);
    }
    return res;
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
      case "reset":
        return "AC";
      case "inv":
        return "+/-";
      default:
        return "";
    }
  }

  render() {
    return (
      <div className="calc">
        <CalcScreen text={this.state.operandeA} />
        <div>
          {this.renderResetBtn("reset")}
          {this.renderSpecialKey("inv")}
        </div>
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
