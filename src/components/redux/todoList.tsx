import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../..";
import "./style.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Input,
  List,
  Radio,
  RadioChangeEvent,
  Row,
} from "antd";
import { getDelayData } from "../../utils/api";
import {toggleTodo} from "../../store/todo/action";
import { ActionCreators } from 'redux-undo'


const options = [
  { label: "进行中", value: "pending" },
  { label: "已完成", value: "done" },
];

const ReduxTest = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const dataSource = useSelector((state: RootState) => state.todo.present.list);
  const past = useSelector((state: RootState) => state.todo.past);
  const future =  useSelector((state: RootState) => state.todo.future);
  const todo = useSelector((state: RootState) => state.todo);
  console.log("🐺 ~ file: todoList.tsx:31 ~ ReduxTest ~ future:", todo)
  
  const [value4, setValue4] = useState("pending");

  const todoList = useMemo(
    () => dataSource.filter((it) => it.status === value4),
    [dataSource, value4]
  );

  const getDataSource = useCallback(() => {
    getDelayData().then((data) => {
      dispatch({ type: "INIT_DATA", payload: data });
    });
  }, []);

  useEffect(() => {
    getDataSource();
  }, []);
 

  const handlePress = () => {
    dispatch({ type: "ADD_TODO_LIST", payload: { key: input, text: input } });
    setInput("");
  };

  /**
   * * actionCreator 的意义，简化
   */
  const handleDone = (key: string, status: string) => {
    dispatch(toggleTodo(key,status));
  };
  const onChange4 = ({ target: { value } }: RadioChangeEvent) => {
    setValue4(value);
  };

  return (
    <>
      <Card title="基本使用" style={{ marginBottom: 25 }}>
        <Row justify={"space-between"}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPressEnter={handlePress}
            style={{ width: "80%" }}
          />
          <Radio.Group
            options={options}
            onChange={onChange4}
            value={value4}
            optionType="button"
            buttonStyle="solid"
          />
        </Row>

        <List
          itemLayout="horizontal"
          dataSource={todoList}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  key="delete"
                  onClick={() => handleDone(item.key, item.status)}
                >
                  {item.status === "pending" ? "done" : "todo"}
                </Button>,
              ]}
            >
              <List.Item.Meta title={item.text} />
            </List.Item>
          )}
        />
        <Button onClick={()=>dispatch(ActionCreators.undo())} type="primary" disabled={past.length === 0}>
          undo
        </Button>
        <Button onClick={()=>dispatch(ActionCreators.redo())}  disabled={future.length === 0}>
          redo
        </Button>
      </Card>
      <Card title="其他">
        <div>1231231</div>
      </Card>
    </>
  );
};

export default ReduxTest;
