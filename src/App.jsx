import { useState } from "react";
import Chart from "./components/Chart.jsx";
import Data from "./components/Data.jsx";
import Pagination from "./components/pagination.jsx";
import DarkModeToggle from "./components/DarkModeToggle.jsx";
import calculateCompletePriceChange from "./priceChange.js";
import Chart2 from "./components/Chart2.jsx";

function App() {
  const [priceHistory, setPriceHistory] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [address, setAddress] = useState(""); // New state for the address
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [chain, setChain] = useState("ethereum");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = priceHistory.slice(indexOfFirstData, indexOfLastData);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        'x-chain': `${chain}`,
        "X-API-KEY": "36cc95840e8844408a9ba21af7fc3c28",
      },
    };

    try {
      const res = await fetch(
        `https://public-api.birdeye.so/defi/history_price?address=${address}&address_type=token&type=15m&time_from=${fromUnix}&time_to=${toUnix}`,
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

  const price = priceHistory.map((item) => item.value);
  const time = priceHistory.map((item) =>
    new Date(item.unixTime * 1000).toLocaleString('en-US', {
      // weekday: 'short', // e.g., 'Mon'
      year: 'numeric',  // e.g., '2021'
      month: 'short',   // e.g., 'Nov'
      day: 'numeric',   // e.g., '30'
      hour: '2-digit',  // e.g., '12'
      minute: '2-digit',// e.g., '00'
      second: '2-digit',// e.g., '00'
    })
  );


  function priceChange() {
    if (priceHistory.length > 0) {
      return calculateCompletePriceChange(priceHistory);
    }
  }

  return (
    <>

      <main className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white px-4 py-8">
        <div className="flex justify-between">
          <h1 className="text-center">APP</h1>
          <DarkModeToggle />

        </div>
    
        {/* Date and Address Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchApi();
          }}
        >
          <label>
            Select Chain:
            <select
              name="chain"
              value={chain}
              onChange={(e) => setChain(e.target.value)}
              className="font-[inter] block mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-[#40403f] "
            >
              <option value="ethereum">Ethereum</option>
              <option value="solana">Solana</option>
              <option value="bsc">Binance Smart Chain</option>
              <option value="polygon">Polygon</option>
              <option value="avalanche">Avalanche</option>
              <option value="arbitrum">Arbitrum</option>
              <option value="base">Base</option>
              <option value="zksync">Zksync</option>
              <option value="sui">Sui</option>
            </select>
          </label>
          <label>
            From Date:
            <input
              type="datetime-local"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="block mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  dark:text-[#40403f]"
            />
          </label>
          <br />
          <label>
            To Date:
            <input
              type="datetime-local"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="block mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  dark:text-[#40403f]"
            />
          </label>
          <br />
          <label>
            Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="block mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  dark:text-[#40403f]"
              placeholder="Enter address"
            />
          </label>
          <br />
          <button
            type="button"
            onClick={fetchApi}
            disabled={loading}
            className="block mt-1 py-2 px-3 border-none border-gray-300 bg-indigo-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
          >
            {loading ? "Fetching..." : "Fetch Data"}
          </button>
        </form>

        {/* Table to Display Price History */}
        
        <div className="my-8 h-[400px]">
          <Chart2 />
        </div>
        {priceHistory.length > 0 ? 
        <div className="text-center font-medium tracking-wide text-[#9b9c9c]">
          Price Change: {priceChange().change}</div> : null}
        <div className="my-8">
          {priceHistory.length > 0 ?  <Chart time={time} price={price} /> : null}
        </div>
        {priceHistory.length ?
          <>
            <Data formatTimestamp={formatTimestamp} currentData={currentData} />
            <Pagination dataPerPage={dataPerPage} totalData={priceHistory.length} paginate={paginate} currentPage={currentPage} />
          </>
          : <div className="text-center font-medium tracking-wide text-[#9b9c9c]">search to see results here</div>}
      </main>
    </>
  );
}

export default App;
