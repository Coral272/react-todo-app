import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "todoLocal",
  storage: localStorage,
});

export enum Categories {
  "TO_DO" = "TO_DO", // (enum member) Categories["TO_DO"] = 0
  "DOING" = "DOING", // (enum member) Categories["DOING"] = 1
  "DONE" = "DONE", // (enum member) Categories["DONE"] = 2
  // enum은 프로그래머를 도와주기위해서
  // 일련의 숫자를 문자로 표현해줌
}
// type categories = "TO_DO" | "DOING" | "DONE";

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
  // 카테고리를 할일, 하고있는 일, 완료된 일 세가지로 나눔
  // typescript는 데이터 타입 말고도 어떤 내용이 들어가야하는 지도 명시할수 있음
}

// (기존 + 커스텀)카테고리 목록
export const customCategoryState = atom<string[]>({
  key: "customCategory",
  default: [Categories.TO_DO, Categories.DOING, Categories.DONE],
  effects_UNSTABLE: [persistAtom],
});

// toDo의 카테고리 속성
export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDos",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    // category에 따라 하나의 배열만 반환할 것임
    // if (category === "TO_DO")
    //   return toDos.filter((toDo) => toDo.category === "TO_DO");
    // else if (category === "DOING")
    //   return toDos.filter((toDo) => toDo.category === "DOING");
    // else if (category === "DONE")
    //   return toDos.filter((toDo) => toDo.category === "DONE");
    return toDos.filter((toDo) => toDo.category === category);
  },
  // get function이 있어야 atom을 받을 수 있다
});
