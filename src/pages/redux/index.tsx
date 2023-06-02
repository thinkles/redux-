import {RouteChildrenProps, RouterProps} from "react-router-dom";
import Container from "../../components/Container";
import TodoList from "../../components/redux/todoList";

const Redux = (props:RouterProps) => {
const {children} =props;

   return (
     <Container title="axios 测试" >
      <TodoList />
      {children}
    </Container>
   );
};

export default Redux;
