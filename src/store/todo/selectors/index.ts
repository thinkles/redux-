import {createSelector} from "reselect";
import {RootState} from "../../..";
import {listType} from "../todo";



const getTodo = (list:listType[]) => list

export const getCompletedTodoCount = createSelector(
    [getTodo],
    (list) => (
        list.reduce((count, todo) =>
        todo.status ==="done" ? count + 1 : count,
        0
      )
    )
  )
