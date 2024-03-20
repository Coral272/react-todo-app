import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

// [
//   {
//       "text": "5",
//       "id": 1710834155102,
//       "category": "TO_DO"
//   },
//   {
//       "text": "4",
//       "id": 1710834154303,
//       "category": "TO_DO"
//   },
//   {
//       "text": "3",
//       "id": 1710834153431,
//       "category": "TO_DO"
//   },
//   {
//       "text": "2",
//       "id": 1710834152263,
//       "category": "TO_DO"
//   },
//   {
//       "text": "1",
//       "id": 1710834150872,
//       "category": "TO_DO"
//   }
// ]
// 1) target의 경로를 알아야한다. (id기반으로 해당 to-do의 index를 찾는다)
// 2) target이 클릭된 카테고리를 가져야한다.
// 3) targetIndex에 있는 to-do를 newToDo로 바꿔주면 된다.

function ToDo({ text, id, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const changeCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    // 구조 분해구문 event.currentTarget.name
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      // toDo의 id와 props에서 온 id가 같은지 비교
      const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name as any }; // as any : type 체크 하지 말것
      console.log(oldToDo, newToDo);
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li key={id}>
      <span>{text}</span>
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={changeCategory}>
          {/* Button name은 숫자여선 안됨. string이어야 함 */}
          To Do
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={changeCategory}>
          Doing
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={changeCategory}>
          Done
        </button>
      )}
      {/* true && expression */}
      {/* true이면 보여주고 false면 숨긴다 */}
    </li>
  );
}

export default ToDo;
