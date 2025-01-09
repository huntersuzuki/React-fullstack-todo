const TodoItem = ({
  title,
  description,
  isCompleted,
  handleToggle,
  handleDelete,
  id,
}) => {
  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-6 my-6 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
      <div className="flex flex-col space-y-3">
        <h3
          className={`text-2xl font-semibold tracking-tight ${
            isCompleted ? "line-through text-gray-500" : "text-gray-800"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-sm ${
            isCompleted ? "line-through text-gray-400" : "text-gray-600"
          }`}
        >
          {description}
        </p>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => handleToggle(id)}
            className="w-6 h-6 rounded-full bg-gray-200 checked:bg-green-500 focus:ring-2 focus:ring-green-300 transition-all"
          />
          <span
            className={`text-sm font-medium ${
              isCompleted ? "text-gray-500" : "text-gray-800"
            }`}
          >
            {isCompleted ? "Completed" : "Mark as done"}
          </span>
        </div>

        <button
          onClick={() => handleDelete(id)}
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
