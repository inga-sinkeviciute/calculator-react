import "./App.css";
import { useState, useEffect } from "react";
import { NumberFormatBase } from "react-number-format";

function App() {
	const [preState, setPreState] = useState("");
	const [curState, setCurState] = useState("");
	const [input, setInput] = useState("0");
	const [operator, setOperator] = useState(null);
	const [total, setTotal] = useState(false);

	const inputNum = (e) => {
		if (curState.includes(".") && e.target.innerText === ".") return;

		if (total) {
			setPreState("");
		}

		curState
			? setCurState((pre) => pre + e.target.innerText)
			: setCurState(e.target.innerText);
		setTotal(false);
	};

	useEffect(() => {
		setInput(curState);
	}, [curState]);

	useEffect(() => {
		setInput("0");
	}, []);
	const operatorType = (e) => {
		setTotal(false);
		setOperator(e.target.innerText);
		if (curState === "") return;
		if (preState !== "") {
			equals();
		} else {
			setPreState(curState);
			setCurState("");
		}
	};

	const equals = (e) => {
		if (e?.target.innerText === "=") {
			setTotal(true);
		}
		let cal;
		switch (operator) {
			case "/":
				cal = String(parseFloat(preState) / parseFloat(curState));
				break;

			case "+":
				cal = String(parseFloat(preState) + parseFloat(curState));
				break;
			case "X":
				cal = String(parseFloat(preState) * parseFloat(curState));
				break;
			case "-":
				cal = String(parseFloat(preState) - parseFloat(curState));
				break;
			default:
				return;
		}
		setInput("");
		setPreState(cal);
		setCurState("");
	};

	const percent = () => {
		preState
			? setCurState(String((parseFloat(curState) / 100) * preState))
			: setCurState(String(parseFloat(curState) / 100));
	};

	const reset = () => {
		setPreState("");
		setCurState("");
		setInput("0");
	};
	return (
		<div className="calculator-grid">
			<div className="output">
				<div className="previous-operand">{preState}</div>
				<div className="current-operand">
					{input !== "" || input === "0" ? (
						<NumberFormatBase
							value={input}
							displayType={"text"}
							thousandseparator={"true"}
						/>
					) : (
						<NumberFormatBase
							value={preState}
							displayType={"text"}
							thousandseparator={"true"}
						/>
					)}
				</div>
			</div>
			<button className="span-two" onClick={reset}>
				AC
			</button>
			<button onClick={percent}>%</button>
			<button onClick={operatorType}>÷</button>
			<button onClick={inputNum}>1</button>
			<button onClick={inputNum}>2</button>
			<button onClick={inputNum}>3</button>
			<button onClick={operatorType}>*</button>
			<button onClick={inputNum}>4</button>
			<button onClick={inputNum}>5</button>
			<button onClick={inputNum}>6</button>
			<button onClick={operatorType}>+</button>
			<button onClick={inputNum}>7</button>
			<button onClick={inputNum}>8</button>
			<button onClick={inputNum}>9</button>
			<button onClick={operatorType}>-</button>
			<button onClick={inputNum}>.</button>
			<button onClick={inputNum}>0</button>
			<button onClick={equals} className="span-two">
				=
			</button>
		</div>
	);
}

export default App;
