import { useReducer } from 'react';
import DigitButton from './DigitButton';
import OpButton from './OpButton';
import './App.css';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  DEL_DIGIT: 'del-digit',
  CHOOSE_OP: 'choose-op',
  CLEAR: 'clear',
  EVALUATE: 'evaluate',
  NEGATE: 'negate',
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currOperand: payload.digit,
          overwrite: false,
        }
      }

      if (payload.digit === "0" && state.currOperand === "0") {
        return state;
      }

      if (payload.digit === "." && state.currOperand.includes(".")) {
        return state;
      }

      return {
        ...state,
        currOperand: `${state.currOperand || ""}${payload.digit}`
      }
    case ACTIONS.DEL_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currOperand: payload.digit,
          overwrite: false,
        }
      }

      if (state.currOperand == null && state.prevOperand == null) {
        return state
      }

      if (state.currOperand.length === 1) {
        return {
          ...state,
          currOperand: null
        }
      }
  
      return {
        ...state,
        currOperand: state.currOperand.slice(0, -1)
      }
    case ACTIONS.CHOOSE_OP:
      if (state.currOperand == null && state.prevOperand == null) {
        return state
      }

      if (state.prevOperand == null) {
        return {
          ...state,
          op: payload.op,
          prevOperand: state.currOperand,
          currOperand: null,
        }
      }

      if (state.currOperand == null) {
        return {
          ...state,
          op: payload.op,
        }
      }
    
      return {
        ...state,
        prevOperand: evaluate(state),
        op: payload.op,
        currOperand: null,
      }
    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.EVALUATE:
      if (state.op == null || state.currOperand == null || state.prevOperand == null) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        prevOperand: null,
        op: null,
        currOperand: evaluate(state),
      }

    case ACTIONS.NEGATE:
      if (state.currOperand == null) {
        return state
      }

      return {
        ...state,
        currOperand: state.currOperand * -1,
      }
    default:
      return {}
  }
}

function evaluate({ currOperand, prevOperand, op }) {
  const prev = parseFloat(prevOperand)
  const curr = parseFloat(currOperand)

  if (isNaN(prev) || isNaN(curr)) {
    return ""
  }

  let computation = ""
  switch (op) {
    case "/":
      computation = prev / curr
      break
    case "*":
      computation = prev * curr
      break
    case "+":
      computation = prev + curr
      break
    case "-":
      computation = prev - curr
      break
    case "%":
      computation = prev % curr
  }

  return computation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigists: 0,
})

function formatOperand(operand) {
  if (operand == null) {
    return
  }

  const [integer, decimal] = operand.split('.')
  if (decimal == null) {
    return INTEGER_FORMATTER.format(integer)
  }

  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const [{ currOperand, prevOperand, op }, dispatch] = useReducer(reducer, {})

  return (
    <div className="calc-grid">
      <div className="output">
        <div className="prev-op">
          {prevOperand} {op}
        </div>
        <div className="curr-op">
          {currOperand} {op}
        </div>
      </div>

      <button 
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}>
        ac
      </button>
      <button 
        onClick={() => dispatch({ type: ACTIONS.DEL_DIGIT })}>
        del
      </button>
      <OpButton op="%" dispatch={dispatch} />
      <OpButton op="/" dispatch={dispatch} />

      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OpButton op="*" dispatch={dispatch} />

      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OpButton op="+" dispatch={dispatch} />

      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OpButton op="-" dispatch={dispatch} />

      <DigitButton digit="0" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <button 
        onClick={() => dispatch({ type: ACTIONS.NEGATE })}>
        +/-
      </button>
      <button 
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>
        =
      </button>
    </div>
  );
}

export default App;
