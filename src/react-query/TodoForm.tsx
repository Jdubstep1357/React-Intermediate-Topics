import { useRef } from "react";
import useAddTodo from "./hooks/useAddTodo";

const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null);

  // this is how input field gets cleared in backend rather than reflective of UI
  const addTodo = useAddTodo(() => {
    if (ref.current) ref.current.value = "";
  });

  return (
    <>
      {addTodo.error && (
        <div className="alert alert-danger">{addTodo.error.message}</div>
      )}
      <form
        className="row mb-3"
        onSubmit={(event) => {
          // stops the form from being submitted to server
          event.preventDefault();

          if (ref.current && ref.current.value)
            // all mutation objects have mutate for mutating data
            // pass todoobject that will be sent to mutation function
            addTodo.mutate({
              id: 0,
              title: ref.current?.value,
              completed: false,
              userId: 1,
            });
        }}
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          {/* Added loading button while waiting for data */}
          <button className="btn btn-primary" disabled={addTodo.isLoading}>
            {addTodo.isLoading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
