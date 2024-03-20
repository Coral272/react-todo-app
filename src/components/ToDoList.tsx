import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import CreateCategory from "./CreateCategory";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 15vh;
  padding: 10px 10px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 400;
  text-align: center;
  color: ${(props) => props.theme.accentColor};
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  return (
    <Container>
      <Header>
        <Title>To do</Title>
      </Header>
      <hr />
      <CreateCategory />
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </Container>
  );
}

export default ToDoList;
