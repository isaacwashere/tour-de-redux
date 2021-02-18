import { useEffect, useState } from "react";
import "./styles.css";

function counterReducer(state = 0, action: any) {
  switch (action.type) {
    case "INCREMENT": {
      return state + 1;
    }
    case "INCREMENT_BY": {
      return state + action.payload;
    }
    case "DECREMENT": {
      return state - 1;
    }
    default: {
      return state;
    }
  }
}

function createStore(reducer: any) {
  let state: any;
  let listeners: any[] = [];

  const getState = () => state;

  const dispatch = (action: any) => {
    state = reducer(state, action);
    listeners.forEach((listener: any) => listener());
  };

  const subscribe = (listener: any) => {
    listeners.push(listener);
  };

  dispatch({});

  return {
    dispatch,
    getState,
    subscribe
  };
}

const store = createStore(counterReducer);

const increment = () => ({ type: "INCREMENT" });
const decrement = () => ({ type: "DECREMENT" });
const incrementBy = (amount: number) => ({ type: "INCREMENT_BY", payload: 10 });

export default function App() {
  const [counter, setCounter] = useState(store.getState());

  const updateHandler = () => {
    setCounter(store.getState());
  };

  useEffect(() => {
    store.subscribe(updateHandler);
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>{counter}</h2>
      <button onClick={() => store.dispatch(decrement())}>-</button>
      <button onClick={() => store.dispatch(incrementBy(10))}>+ 10</button>
      <button onClick={() => store.dispatch(increment())}>+</button>
    </div>
  );
}
