import { useState } from "react";

function App() {
  const [priceHistory, setPriceHistory] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [address, setAddress] = useState(""); // New state for the address
  const [loading, setLoading] = useState(false); // State to manage loading status

  const formatTimestamp = (unixTime) => {
    const date = new Date(unixTime * 1000);
    return date.toLocaleString();
  };

  // Function to convert date and time to UNIX time and log it
  const convertToUnixFrom = (dateString) => {
    const date = new Date(dateString);
    const unixTime = Math.floor(date.getTime() / 1000); // Get UNIX timestamp in seconds
    return unixTime;
  };

  const convertToUnixTo = (dateString) => {
    const date = new Date(dateString);
    const unixTime = Math.floor(date.getTime() / 1000); // Get UNIX timestamp in seconds
    return unixTime;
  };

  const fetchApi = async () => {
    if (!address || !fromDate || !toDate) {
      alert("Please fill in all fields (From, To, and Address).");
      return;
    }

    setLoading(true);
    const fromUnix = convertToUnixFrom(fromDate);
    const toUnix = convertToUnixTo(toDate);

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-KEY": "36cc95840e8844408a9ba21af7fc3c28",
      },
    };

    try {
      const res = await fetch(
        `https://public-api.birdeye.so/defi/history_price?address=${address}&address_type=pair&type=15m&time_from=${fromUnix}&time_to=${toUnix}`,
        options
      );
      const data = await res.json();
      setPriceHistory(data.data.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(priceHistory)

  return (
    <>
      <main>
        {/* Date and Address Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchApi();
          }}
        >
          <label>
            From Date:
            <input
              type="datetime-local"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </label>
          <br />
          <label>
            To Date:
            <input
              type="datetime-local"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </label>
          <br />
          <label>
            Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
            />
          </label>
          <br />
          <button type="button" onClick={fetchApi} disabled={loading}>
            {loading ? "Fetching..." : "Fetch Data"}
          </button>
        </form>

        {/* Table to Display Price History */}
        <table>
          <thead>
            <tr>
              <th>Address</th>
              <th>Price</th>
              <th>Date and Time</th>
            </tr>
          </thead>
          <tbody>
            {priceHistory.map((item) => (
              <tr key={item.unixTime}>
                <td>{item.address}</td>
                <td>{item.value}</td>
                <td>{formatTimestamp(item.unixTime)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}

export default App;
