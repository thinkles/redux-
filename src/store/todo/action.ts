export const toggleTodo = (key:string,status:string) => ({
    type: "DONE_TODO_LIST",
      payload: {
        key,
        status: status === "pending" ? "done" : "pending",
      },
  })
