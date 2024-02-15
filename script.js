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
