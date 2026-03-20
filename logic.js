class LogicEngine {
  constructor() {
    this.operators = {
      "¬": { precedence: 4, type: "unary" },
      "∧": { precedence: 3, type: "binary" },
      "∨": { precedence: 2, type: "binary" },
      "→": { precedence: 1, type: "binary" },
      "↔": { precedence: 0, type: "binary" },
    };
  }

  tokenize(expression) {
    const tokens = [];
    const chars = expression.replace(/\s+/g, "").split("");

    for (let char of chars) {
      if (
        /[A-Z]/.test(char) ||
        this.operators[char] ||
        char === "(" ||
        char === ")"
      ) {
        tokens.push(char);
      }
    }
    return tokens;
  }

  toPostfix(tokens) {
    const outputQueue = [];
    const operatorStack = [];

    for (let token of tokens) {
      if (/[A-Z]/.test(token)) {
        outputQueue.push(token);
      } else if (this.operators[token]) {
        while (
          operatorStack.length > 0 &&
          operatorStack[operatorStack.length - 1] !== "(" &&
          this.operators[operatorStack[operatorStack.length - 1]].precedence >=
            this.operators[token].precedence
        ) {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.push(token);
      } else if (token === "(") {
        operatorStack.push(token);
      } else if (token === ")") {
        while (
          operatorStack.length > 0 &&
          operatorStack[operatorStack.length - 1] !== "("
        ) {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.pop();
      }
    }

    while (operatorStack.length > 0) {
      outputQueue.push(operatorStack.pop());
    }

    return outputQueue;
  }

  evaluatePostfix(postfix, variableValues) {
    const stack = [];
    const steps = [];

    for (let token of postfix) {
      if (/[A-Z]/.test(token)) {
        stack.push({ text: token, val: variableValues[token] });
      } else if (this.operators[token]) {
        if (this.operators[token].type === "unary") {
          const a = stack.pop();
          const newText = `¬${a.text}`;
          const newVal = !a.val;

          steps.push({ text: newText, val: newVal });
          stack.push({ text: newText, val: newVal });
        } else {
          const b = stack.pop();
          const a = stack.pop();
          let newVal;

          switch (token) {
            case "∧":
              newVal = a.val && b.val;
              break;
            case "∨":
              newVal = a.val || b.val;
              break;
            case "→":
              newVal = !a.val || b.val;
              break;
            case "↔":
              newVal = a.val === b.val;
              break;
          }

          const newText = `(${a.text} ${token} ${b.text})`;
          steps.push({ text: newText, val: newVal });
          stack.push({ text: newText, val: newVal });
        }
      }
    }
    return { result: stack[0].val, steps: steps };
  }

  analyzeProposition(expression) {
    try {
      const tokens = this.tokenize(expression);
      const postfix = this.toPostfix(tokens);
      const variables = [
        ...new Set(tokens.filter((t) => /[A-Z]/.test(t))),
      ].sort();

      const rows = [];
      const numRows = Math.pow(2, variables.length);

      let allTrue = true;
      let allFalse = true;
      let stepHeaders = [];

      for (let i = 0; i < numRows; i++) {
        const variableValues = {};

        for (let j = 0; j < variables.length; j++) {
          variableValues[variables[j]] =
            ((numRows - 1 - i) >> (variables.length - 1 - j)) & 1
              ? true
              : false;
        }

        const evalData = this.evaluatePostfix(postfix, variableValues);

        if (i === 0) {
          stepHeaders = evalData.steps.map((s) => s.text);
          if (stepHeaders.length > 0) stepHeaders.pop();
        }

        const stepVals = {};
        evalData.steps.forEach((s) => {
          stepVals[s.text] = s.val;
        });

        rows.push({
          values: variableValues,
          steps: stepVals,
          result: evalData.result,
        });

        if (evalData.result) allFalse = false;
        if (!evalData.result) allTrue = false;
      }

      let type = "Contingency";
      if (allTrue) type = "Tautology";
      if (allFalse) type = "Contradiction";

      return {
        success: true,
        variables: variables,
        stepHeaders: stepHeaders,
        tableData: rows,
        classification: type,
      };
    } catch (error) {
      return { success: false, error: "Invalid Proposition Format" };
    }
  }
}
