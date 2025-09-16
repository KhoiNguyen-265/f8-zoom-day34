const root = ReactDOM.createRoot(document.querySelector("#root"));

let uniqId = 0;

function TodoApp() {
    const [inputValue, setInputValue] = React.useState("");
    const [todos, setTodos] = React.useState([]);

    // Lấy dữ liệu từ Input
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // Xử lý submit (Add task)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            setTodos([
                ...todos,
                {
                    id: ++uniqId,
                    text: inputValue,
                    completed: false,
                },
            ]);

            setInputValue("");
        }
    };

    // Xóa task
    function deleteTask(id) {
        setTodos(todos.filter((task) => task.id !== id));
    }

    // Complete task
    function completeTask(id) {
        setTodos(
            todos.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    }

    // Kiểm tra số nhiều để thêm (s)
    function checkPlural(item) {
        return item > 1 ? `${item} tasks` : `${item} task`;
    }

    const total = todos.length;
    const done = todos.filter((task) => task.completed).length;
    const remaining = total - done;

    return (
        <div className="container">
            <h1 className="heading">Todo App</h1>
            <form className="form" onSubmit={handleSubmit}>
                <input
                    placeholder="Nhập task mới..."
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button className="btn">Thêm</button>
            </form>

            {!total ? (
                <p className="desc">
                    Chưa có task nào. Hãy thêm task đầu tiên!
                </p>
            ) : (
                <>
                    <ul className="tasks-list">
                        {todos.map((task) => (
                            <li className="tasks-item" key={task.id}>
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => completeTask(task.id)}
                                />
                                <p
                                    style={{
                                        textDecoration: task.completed
                                            ? "line-through"
                                            : "none",
                                    }}
                                >
                                    {task.text}
                                </p>
                                <button
                                    className="btn btn--delete"
                                    onClick={() => deleteTask(task.id)}
                                >
                                    Xóa
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div>
                        <p className="desc">
                            Tổng: {checkPlural(total)}, Hoàn thành:{" "}
                            {checkPlural(done)}, Còn lại:{" "}
                            {checkPlural(remaining)}{" "}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}

root.render(<TodoApp />);
