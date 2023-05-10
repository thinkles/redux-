import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../..";

import "./style.css";

type STATUS = "done" | "pending";

export type todoItem = {
  id: string;
  content: string;
  status: STATUS;
};

interface TodoListProp {
  dataSource: todoItem[];
}

const Item = ({ text, status }: { text: string; status: STATUS }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    // eslint-disable-next-line no-debugger


    // dispatch({ type: "USER_FETCH_REQUESTED", payload: "11223" });
    // dispatch({ type: "INCREMENT_ASYNC", payload: "111" });
    dispatch({ type: "REQUEST1", payload: 3000 });
  };
  
  return (
    <div className="list">
      <span>{text}</span>
      <span className={"circle " + status} onClick={handleClick}>
        {status === "pending" ? null : <i className="fas fa-check fa-2x" />}
      </span>
    </div>
  );
};

 const  ComComponent =() => {
  const dataSource = useSelector((state: RootState) => state.todo);

  return (
    <>
      {dataSource.map((it) => (
        <Item key={it.id} text={it.content} status={it.status} />
      ))}
    </>
  );
};

export default ComComponent;
