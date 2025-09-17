const root = ReactDOM.createRoot(document.querySelector("#root"));

function CommentSystem() {
    const [comments, setComments] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [form, setForm] = React.useState({
        name: "",
        email: "",
        body: "",
        id: "",
    });

    React.useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/comments?postId=1")
            .then((res) => res.json())
            .then((data) => setComments(data))
            .finally(() => setLoading(false));
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!form.name.trim() || !form.email.trim() || !form.body.trim()) {
            alert("Vui lòng điền đủ thông tin!");
            return;
        }

        const newComment = {
            ...form,
            id: comments.length + 1,
        };
        setComments([newComment, ...comments]);

        setForm({ name: "", email: "", body: "" });
    }

    return (
        <div className="container">
            <h1 className="heading">Comment System</h1>
            <ul className="comment-list">
                {loading && <li>Loading...</li>}
                {comments.map((comment) => (
                    <li key={comment.id}>
                        <div className="row">
                            <img
                                src={`https://ui-avatars.com/api/?name=${comment.name}&background=random`}
                                alt={comment.name}
                            />
                            <div className="info">
                                <p className="name">
                                    <strong>{comment.name}</strong>
                                </p>
                                <p className="email">Email: {comment.email}</p>
                                <p className="desc">{comment.body}</p>
                            </div>

                            <p className="time">2 phút trước</p>
                        </div>
                    </li>
                ))}
            </ul>
            <form className="form">
                <div className="form__row-wrapper">
                    <div className="form__row">
                        <label htmlFor="name">Name: </label>
                        <input
                            onChange={handleChange}
                            className="form__input"
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            placeholder="Enter your name..."
                        />
                    </div>
                    <div className="form__row">
                        <label htmlFor="email">Email: </label>
                        <input
                            onChange={handleChange}
                            className="form__input"
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            placeholder="Enter your email..."
                            required
                        />
                    </div>
                </div>
                <div className="form__row">
                    <label htmlFor="comment">Comment: </label>
                    <textarea
                        onChange={handleChange}
                        rows={3}
                        className="form__input"
                        name="body"
                        value={form.body}
                        placeholder="Enter your comment..."
                    ></textarea>
                </div>
                <div className="btn-wrapper">
                    <button className="btn" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

root.render(<CommentSystem />);
