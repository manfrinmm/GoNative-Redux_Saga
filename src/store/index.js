import { createStore } from "redux";
const INITIAL_STATE = [
  { id: 1, text: "fazer cade", completed: true },
  { id: 2, text: "Estudar", completed: false },
  { id: 3, text: "fazer relatorio", completed: false }
];

//contem informação e manipulação(dados)
function reducer(state = INITIAL_STATE, action) {
  // console.log(state);
  // console.log(action);
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        { id: Math.random(), text: action.payload.text, completed: false }
      ];

    case "REMOVE_TODO":
      return state.filter(todo => {
        if (action.payload.id !== todo.id) todo;
      });

    case "MARK_AS_COMPLETED":
      return state.map(todo =>
        action.payload.id === todo.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    default:
      return state;
  }
}

//É necessario passar uma função que retorna um estado
const store = createStore(reducer);

export default store;
