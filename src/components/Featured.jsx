import React, { useEffect, useState } from "react";
import "./featured.css";
import axios from "axios";
import { FiArrowUpRight, FiArrowDown } from "react-icons/fi";

const Featured = () => {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false&locale=en";

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!data) return null

  return (
    <div className="featured">
      <div className="container">
        {/* Left side */}

        <section className="left">
          <h2>Explore top Crypto's Like Bitcoin, Ethereum, and Dogecoin</h2>
          <p>See all available assets: Cryptocurrencies and NFT's</p>
          <button className="btn">See More Coins</button>
        </section>

        {/* Right side */}

        <section className="right">
          {data &&
            data.map((item) => (
              <div className="card" key={item.id}>
                <div className="img-top">
                  <img src={item.image} alt="/" />
                </div>
                <div>
                  <h5>{item.name}</h5>
                  <p>${item.current_price.toLocaleString()}</p>
                </div>

                {item.price_change_percentage_24h < 0 ? (
                  <span className="red">
                    <FiArrowDown className="icon" />
                    {item.price_change_percentage_24h.toFixed(2)}%
                  </span>
                ) : (
                  <span className="green">
                    <FiArrowUpRight className="icon" />
                    {item.price_change_percentage_24h.toFixed(2)}%
                  </span>
                )}
              </div>
            ))}
        </section>
      </div>
    </div>
  );
};

export default Featured;
