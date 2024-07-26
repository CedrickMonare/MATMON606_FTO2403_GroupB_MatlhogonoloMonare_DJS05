// Action types
const ADD = 'ADD';
const SUBTRACT = 'SUBTRACT';
const RESET = 'RESET';

// Reducer function
const reducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case ADD:
      return { count: state.count + 1 };
    case SUBTRACT:
      return { count: state.count - 1 };
    case RESET:
      return { count: 0 };
    default:
      return state;
  }
};

// Store implementation
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  // Initialize the state
  dispatch({});

  return {
    getState,
    dispatch,
    subscribe,
  };
};

// Usage
const store = createStore(reducer);

// Subscribe to state changes
const unsubscribe = store.subscribe(() => {
  console.log('State changed:', store.getState());
});

// Dispatching actions
store.dispatch({ type: ADD });
store.dispatch({ type: ADD });
store.dispatch({ type: SUBTRACT });
store.dispatch({ type: RESET });

// Unsubscribe from state changes
unsubscribe();
