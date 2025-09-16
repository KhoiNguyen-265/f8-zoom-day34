const root = ReactDOM.createRoot(document.querySelector("#root"));

function ProfileCard() {
    const [users, setUser] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users/1")
            .then((res) => res.json())
            .then((users) => setUser(users))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <h1>Profile Card</h1>
            <ul>
                {loading ? (
                    <li>Loading...</li>
                ) : (
                    <>
                        <li>Name: {users.name}</li>
                        <li>Username: {users.username}</li>
                        <li>Email: {users.email}</li>
                        <li>Phone: {users.phone}</li>
                        <li>Website: {users.website}</li>
                        <li>
                            Address: {users.address.street} -{" "}
                            {users.address.city}
                        </li>
                    </>
                )}
            </ul>
        </>
    );
}

root.render(<ProfileCard />);
