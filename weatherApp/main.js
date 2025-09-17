function WeatherApp() {
    const [city, setCity] = React.useState("");

    const [data, setData] = React.useState({
        hanoi: { city: "Hà Nội", temp: 28, weather: "Nắng", humidity: 65 },
        hcm: { city: "Hồ Chí Minh", temp: 32, weather: "Có mây", humidity: 78 },
        danang: { city: "Đà Nẵng", temp: 30, weather: "Mưa nhẹ", humidity: 82 },
    });

    function handleRefresh() {
        if (!city) return;

        setData((prev) => {
            const newData = { ...prev };
            newData[city] = {
                ...newData[city],
                temp: newData[city].temp + Math.floor(Math.random() * 11 - 5),
                humidity:
                    newData[city].humidity + Math.floor(Math.random() * 11 - 5),
            };
            return newData;
        });
    }

    return (
        <div className="container">
            <h1>Weather App</h1>
            <div className="dropdown">
                <h2>Chọn thành phố:</h2>
                <select
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                >
                    <option></option>
                    <option value="hanoi">Hà Nội</option>
                    <option value="hcm">Hồ Chí Minh</option>
                    <option value="danang">Đà Nẵng</option>
                </select>
            </div>
            {city && (
                <div className="display">
                    <div className="info">
                        <h2 className="name">{data[city].city}</h2>
                        <p className="temp">{data[city].temp}°C</p>
                        <p className="weather">
                            {data[city].weather}{" "}
                            {data[city].weather === "Nắng"
                                ? "🌤"
                                : data[city].weather === "Có mây"
                                ? "☁"
                                : "🌧"}
                        </p>
                        <p className="humidity">{data[city].humidity}%</p>
                    </div>
                    <button className="btn" onClick={handleRefresh}>
                        Làm mới
                    </button>
                </div>
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(<WeatherApp />);
