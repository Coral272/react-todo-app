import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { categoryState, toDoState, customCategoryState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(customCategoryState);
  const currentCategory = useRecoilValue(categoryState);
  const [category, setCategory] = useRecoilState(categoryState);
  const sortCategory = (event: React.FormEvent<HTMLSelectElement>) => {
    // console.log(event.currentTarget.value);
    // 이 value를 categoryState atom과 연결해야함
    setCategory(event.currentTarget.value as any);
  };

  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    // console.log("add to do", { toDo });
    setToDos((oldeToDos) => [
      { text: toDo, id: Date.now(), category: currentCategory },
      ...oldeToDos,
    ]);
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      ></input>
      <select value={category} onInput={sortCategory}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <button> ADD </button>
    </form>
  );
}

export default CreateToDo;
