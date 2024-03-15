import { IToDo } from "../atoms";

function ToDo({ id, text }: IToDo) {
  return <li key={id}>{text}</li>;
}

export default ToDo;
