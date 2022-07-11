import { useState, useEffect } from "react";
import Axios from "axios";
import Coin from "./components/Coin";

import "./App.css";

function App() {
  const [coinlist, setCoinlist] = useState([]);
  const [filter, setFilter] = useState("");

  async function fetchData() {
    //fetch the coins data from api
    const response = await Axios.get(
      "https://api.coinstats.app/public/v1/coins?skip=0"
    );
    setCoinlist(response.data.coins);
  }

  const filteredCoins = coinlist.filter((coin) =>
    coin.name.toLowerCase().includes(filter)
  );

  useEffect(() => {
    //render the coins data
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="cryptoHeader">
        <h1>Crypto Price Tracker</h1>
        <input
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type="text"
          placeholder="Bitcoin..."
        />
      </div>
      <div className="cryptoDisplay">
        {filteredCoins.map((coin) => {
          return (
            <Coin
              name={coin.name}
              icon={coin.icon}
              price={coin.price}
              symbol={coin.symbol}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
