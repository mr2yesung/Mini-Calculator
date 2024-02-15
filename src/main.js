import "./style.css";
import { Calculator } from "./Class/Calculator";

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const equalsButton = document.querySelector("[data-equals]");

const previousDisplayElement = document.getElementById("previous-display");
const currentDisplayElement = document.getElementById("current-display");

const calculator = new Calculator(
  previousDisplayElement,
  currentDisplayElement
);

numberButtons.forEach((button) => {
  addCalculatorEventListener(button, () => {
    calculator.appendNumber(button.innerText);
  });
});

operationButtons.forEach((button) => {
  addCalculatorEventListener(button, () => {
    calculator.selectOperation(button.innerText);
  });
});

addCalculatorEventListener(allClearButton, () => calculator.allClear());

addCalculatorEventListener(deleteButton, () => calculator.delete());

addCalculatorEventListener(equalsButton, () => calculator.calculate());

function addCalculatorEventListener(button, callback) {
  button.addEventListener("click", () => {
    callback();
    calculator.updateDisplay();
  });
}
