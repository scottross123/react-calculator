import './App.css';

function App() {
  return (
    <div className="calc-grid">
      <div className="output">
        <div className="prev-op">

        </div>
        <div className="curr-op">

        </div>
      </div>

      <button className="span-two">ac</button>
      <button>del</button>
      <button>/</button>

      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>*</button>

      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>+</button>

      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>-</button>

      <button className="span-two">0</button>
      <button>.</button>
      <button>=</button>
    </div>
  );
}

export default App;
