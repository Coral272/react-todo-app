import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { customCategoryState } from "../atoms";

interface IForm {
  newCategory: string;
}

function CreateCategory() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setCategories = useSetRecoilState(customCategoryState);

  const onValid = ({ newCategory }: IForm) => {
    setCategories((oldCategories) => [...oldCategories, newCategory]);
    setValue("newCategory", "");
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("newCategory")}
        placeholder="Add a new category"
      ></input>
      <button> ★ </button>
    </form>
  );
}

export default CreateCategory;
