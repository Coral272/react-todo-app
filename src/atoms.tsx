import { atom } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
  // 카테고리를 할일, 하고있는 일, 완료된 일 세가지로 나눔
  // typescript는 데이터 타입 말고도 어떤 내용이 들어가야하는 지도 명시할수 있음
}

export const toDoState = atom<IToDo[]>({
  key: "toDos",
  default: [],
});
