const root = ReactDOM.createRoot(document.querySelector("#root"));

function ProductList() {
    const [blogs, setBlogs] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [modal, setModal] = React.useState(null);

    React.useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts?_limit=12")
            .then((res) => res.json())
            .then((blogs) => setBlogs(blogs))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            {/* Render giao diện */}
            <div className="container">
                <h1>Product List</h1>
                <ul className="blog-list">
                    {loading && <li>Loading...</li>}
                    {blogs.map((blog) => (
                        <li className="blog-items" key={blog.id}>
                            <ul>
                                <li>
                                    <span className="bold">ID:</span> {blog.id}
                                </li>
                                <li>
                                    <span className="bold">Title:</span>{" "}
                                    {blog.title[0].toUpperCase() +
                                        blog.title.slice(1)}
                                </li>
                                <li>
                                    <span className="bold">Body:</span>{" "}
                                    {blog.body.length > 100
                                        ? blog.body.slice(0, 100).concat("...")
                                        : blog.body}
                                </li>
                            </ul>
                            <button
                                className="btn"
                                onClick={() => setModal(blog)}
                            >
                                Xem chi tiết
                            </button>
                        </li>
                    ))}
                </ul>
                {modal && (
                    <div
                        className="modal"
                        onClick={(e) => {
                            const modalActive =
                                document.querySelector(".modal");
                            if (e.target === modalActive) {
                                return setModal(null);
                            }
                        }}
                    >
                        <div className="modal-content">
                            <div
                                className="icon-wrapper"
                                onClick={() => setModal(null)}
                            >
                                ❌
                            </div>
                            <p className="modal-desc">ID: {modal.id}</p>
                            <h1 className="modal-title">{modal.title}</h1>
                            <p className="modal-desc">{modal.body}</p>
                        </div>
                    </div>
                )}{" "}
                {document.addEventListener("keydown", (e) => {
                    if (e.key === "Escape") {
                        return setModal(null);
                    }
                })}
            </div>
        </>
    );
}

root.render(<ProductList />);
