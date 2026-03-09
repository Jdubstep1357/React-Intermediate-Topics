import useTodos from "./hooks/useTodos";

// state hook - declares state variables
const TodoList = () => {
  // concerned with markup
  const { data: todos, error, isLoading } = useTodos();

  // Loading Icon
  if (isLoading) return <p>Loading</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <ul className="list-group">
      {/* data comes from const { data } */}
      {todos?.map((todo) => (
        <li key={todo.id} className="list-group-item">
          {todo.title}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
