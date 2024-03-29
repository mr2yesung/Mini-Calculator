class Calculator {
  constructor(previousDisplayElement, currentDisplayElement) {
    this.previousDisplayElement = previousDisplayElement;
    this.currentDisplayElement = currentDisplayElement;
    this.allClear();
  }

  allClear() {
    this.previousDisplay = "";
    this.currentDisplay = "";
    this.operation = "";
  }

  delete() {
    this.currentDisplay = this.currentDisplay.toString().slice(0, -1);
    if (this.currentDisplay === "-") this.currentDisplay = "";
  }

  appendNumber(number) {
    const currentDisplayString = this.currentDisplay.toString();
    if (number === "." && currentDisplayString.includes(".")) return;
    this.currentDisplay = this.currentDisplay + number.toString();
  }

  selectOperation(operation) {
    if (!this.currentDisplay || this.currentDisplay === ".") return;
    if (this.previousDisplay) this.calculate();
    this.operation = operation;
    this.previousDisplay = this.currentDisplay;
    this.currentDisplay = "";
  }

  calculate() {
    const prevNumber = parseFloat(this.previousDisplay);
    const currNumber = parseFloat(this.currentDisplay);
    if (isNaN(prevNumber) || isNaN(currNumber)) return;

    let computeResult = 0;
    switch (this.operation) {
      case "+":
        computeResult = prevNumber + currNumber;
        break;
      case "-":
        computeResult = prevNumber - currNumber;
        break;
      case "*":
        computeResult = prevNumber * currNumber;
        break;
      case "/":
        if (currNumber === 0) return;
        computeResult = prevNumber / currNumber;
        break;
      default:
        return;
    }

    this.operation = "";
    this.currentDisplay = computeResult.toString();
    this.previousDisplay = "";
  }

  updateDisplay() {
    this.currentDisplayElement.innerText = this.getDisplayNumber(
      this.currentDisplay
    );

    this.previousDisplayElement.innerText = this.operation
      ? `${this.getDisplayNumber(this.previousDisplay)} ${this.operation}`
      : "";
  }

  getDisplayNumber(number) {
    const numberString = number.toString();
    const [integerString, decimalString] = numberString.split(".");

    const integerNumber = parseFloat(integerString);
    const integerDisplay = isNaN(integerNumber)
      ? ""
      : integerNumber.toLocaleString("en", {
          maximumFractionDigits: 0,
        });

    const decimalDisplay = numberString.includes(".")
      ? `.${decimalString}`
      : "";

    return `${integerDisplay}${decimalDisplay}`;
  }
}

export { Calculator };
