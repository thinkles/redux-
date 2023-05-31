import {RouteChildrenProps, RouterProps} from "react-router-dom";
import Container from "../../components/Container";
import TodoList from "../../components/redux/todoList";

const Test = (props:RouterProps) => {
const {children} =props;

  console.log("🐺 ~ file: index.tsx:6 ~ Test ~ props:", props)
  return (
    <Container title="axios 测试">
      <TodoList />
      {children}
    </Container>
  );
};

export default Test;
