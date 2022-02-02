import React, { useState } from 'react';
import * as math from 'mathjs';
import './App.css';

let operator = '';
let canDelete = true;

function App() {
  const [input, setInput] = useState(0);
  const [decimalFlag, setDecimalFlag] = useState(false);
  const calcBtns = [];

  const addDigit = (e) => {
    if (operator.length > 0) {
      operator = '';
    }
    if (input === 0 && e.target.value === '0') {
      return input;
    }
    if (input === 0) {
      return e.target.value;
    }
    if (e.target.value === '.') {
      setDecimalFlag(true);
    }
    if (e.target.value === '.' && decimalFlag === true) {
      return input;
    }
    return input + e.target.value;
  };

  const isNegative = (e) => {
    if (
      e.target.value === '-' &&
      (input.charAt(input.length - 1) === '*' ||
        input.charAt(input.length - 1) === '/')
    ) {
      return false;
    } else {
      return true;
    }
  };

  const addOperator = (e) => {
    setDecimalFlag(false);
    let temp = input;
    if (operator.length > 0 && isNegative(e)) {
      temp = input.slice(0, input.length - 1);
    }

    operator = e.target.value;

    return temp + operator;
  };

  [
    [9, 'nine'],
    [8, 'eight'],
    [7, 'seven'],
    [6, 'six'],
    [5, 'five'],
    [4, 'four'],
    [3, 'three'],
    [2, 'two'],
    [1, 'one'],
    [0, 'zero'],
    ['.', 'decimal'],
    '%',
  ].forEach((item) => {
    calcBtns.push(
      <button
        id={item[1]}
        onClick={(e) => {
          setInput(addDigit(e));
        }}
        value={item[0]}
        key={item[0]}
      >
        {' '}
        {item[0]}
      </button>
    );
  });

  function deleteHandler() {
    if (canDelete === true && input.length > 0) {
      setInput(input.substr(0, input.length - 1));
    } else {
      return input;
    }
  }

  return (
    <div className="wrapper">
      {' '}
      <div className="show-input" id="display">
        {input}
      </div>
      <div className="digits flex">{calcBtns}</div>
      <div className="modifiers subgrid">
        <button onClick={deleteHandler}>DEL</button>
        <button
          id="clear"
          onClick={() => {
            canDelete = true;
            setInput(0);
            setDecimalFlag(false);
          }}
          value=""
        >
          AC
        </button>
      </div>
      <div className="operations subgrid">
        <button
          id="add"
          onClick={(e) => {
            setInput(addOperator(e));
          }}
          value="+"
        >
          +
        </button>
        <button
          id="subtract"
          onClick={(e) => {
            setInput(addOperator(e));
          }}
          value="-"
        >
          {' '}
          -{' '}
        </button>

        <button
          id="multiply"
          onClick={(e) => {
            setInput(addOperator(e));
          }}
          value="*"
        >
          {' '}
          *
        </button>

        <button
          id="divide"
          onClick={(e) => {
            setInput(addOperator(e));
          }}
          value="/"
        >
          {' '}
          /
        </button>
        <button
          id="equals"
          onClick={() => {
            try {
              setDecimalFlag(false);
              canDelete = false;
              operator = '';
              setInput(
                String(math.evaluate(input)).length > 3 &&
                  String(math.evaluate(input)).includes('.')
                  ? String(
                      math
                        .evaluate(input)
                        .toFixed(4)
                        .replace(/\.([^0]+)0+$/, '.$1')
                        .replace(/^(\d*\.?)|(\d*)\.?/g, '$1$2')
                    )
                  : String(math.evaluate(input))
              );
            } catch (e) {
              console.log(e);
            }
          }}
          value="="
        >
          =
        </button>
      </div>
    </div>
  );
}

export default App;
