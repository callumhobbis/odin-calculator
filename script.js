function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(a, op, b) {
  const ops = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide,
  };
  return ops[op](a, b);
}

let num1 = null;
let op = null;
let num2 = null;
let scratch = "0";

const screen = document.getElementById("screen-text");

for (btn of document.querySelectorAll("#buttons .num")) {
  btn.addEventListener("click", (e) => {
    char = e.target.textContent;
    if (char == "." && scratch.includes(".")) return;
    if (scratch.length >= 10) return;
    if (scratch === "0" && char >= "0" && char <= "9") {
      scratch = char;
    } else if (scratch === "" && char == ".") {
      scratch = "0.";
    } else {
      scratch += char;
    }
    screen.textContent = scratch;
  });
}

for (btn of document.querySelectorAll("#buttons .op")) {
  btn.addEventListener("click", (e) => {
    if (num1 === null) {
      // if nothing has been entered, do nothing
      if (scratch === "") return;
      // we want to do scratch opped with whatever's typed next
      num1 = Number(scratch);
    } else if (scratch !== "") {
      // we have chained operations - resolve the previous op to make room for
      // the new one
      res = operate(num1, op, Number(scratch));
      screen.textContent = res.toString();
      num1 = res;
    }
    // in the case where num1 !== null and scratch === null, we treat this as
    // changing the op
    const id = e.target.id;
    if (id == "btn-add") {
      op = "+";
    } else if (id == "btn-sub") {
      op = "-";
    } else if (id == "btn-mul") {
      op = "*";
    } else if (id == "btn-div") {
      op = "/";
    }
    scratch = "";
    num2 = null;
  });
}

document.getElementById("btn-eq").addEventListener("click", (e) => {
  if (num1 === null || op === null) return;
  if (num2 === null) {
    num2 = scratch === "" ? num1 : scratch;
  }
  res = operate(num1, op, num2);
  screen.textContent = res.toString();
  num1 = res;
  scratch = "";
});

document.getElementById("btn-c").addEventListener("click", (e) => {
  num1 = op = num2 = null;
  scratch = "0";
  screen.textContent = scratch;
});
