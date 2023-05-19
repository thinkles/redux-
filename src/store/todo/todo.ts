import undoable from 'redux-undo'

type listType={
   key: string;
   text: string; 
   status: "done" | "pending" 
}
interface TodoType {
  list: listType[];
  obj: {
    name: string;
    age: string;
  };
}


type actionType = {
  type: string;
  payload: any;
};


const initialState: TodoType = {
  list: [],
  obj: {name:"",age:""}
};

// TODO:补充redux类型 = initialState

 const todo= (state=initialState , action: actionType) =>{
  switch (action.type) {
    case "INIT_DATA":
      return {
        ...state,
        list: [...action.payload],
      };
    case "ADD_TODO_LIST":
      return {
        ...state,
        list: [action.payload, ...state.list],
      };
    case "DELETE_TODO_LIST":
      state.list.splice(action.payload, 1);
      return {
        ...state,
        list: [...state.list],
      };
    case "DONE_TODO_LIST":
      return {
        ...state,
        list: state.list.map((it) => {
          if (it.key === action.payload.key) {
            // it.status = action.payload.status
            return {
              ...it, 
              status:action.payload.status
            }
          }
          return it;
        }),
      };
    default:
      return state;
  }
}

export default undoable(todo);
