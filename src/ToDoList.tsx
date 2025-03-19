import { useState } from "react";

function ToDoList() {
  const [toDo, setToDo] = useState("");
  const ChangeValue = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDo(value);
  };
  const SummitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(toDo);
  };
  return (
    <div>
      <form onSubmit={SummitForm}>
        <input
          onChange={ChangeValue}
          value={toDo}
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
