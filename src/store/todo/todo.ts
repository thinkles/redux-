import { todoItem } from "../../components/redux/todoList";

const intialState: todoItem[] = [
  {
    id: "1",
    content: "work 1",
    status: "pending"
  },
  {
    id: "2",
    content: "work 2",
    status: "pending"
  },
  {
    id: "3",
    content: "work 3",
    status: "pending"
  },
  {
    id: "4",
    content: "work 4",
    status: "pending"
  },
  {
    id: "5",
    content: "work 4",
    status: "pending"
  },
  {
    id: "6",
    content: "work 4",
    status: "pending"
  }
];

export default function (state = intialState, action: actionType) {
  switch (action.type) {
    case "ADD_TODO":
      return [action.payload, ...state];
    case "DELETE_TODO":
      state.splice(action.payload, 1);
      return [...state];
    default:
      return state;
  }
}

type actionType = {
  type: string;
  payload: any;
};
