import { useEffect, useState } from "react";

export default function App() {
  const [price, setPrice] = useState(0);

  // WebSocket connection
  useEffect(() => {
    const ws = new WebSocket(
      window.location.origin.replace("http", "ws")
    );

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "price") setPrice(data.price);
    };

    return () => ws.close();
  }, []);

  // TradingView chart
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";

    script.onload = () => {
      new window.TradingView.widget({
        width: "100%",
        height: 400,
        symbol: "BINANCE:BTCUSDT",
        interval: "1",
        theme: "dark",
        container_id: "chart",
      });
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>TradeX Platform</h1>

      <h2>BTC Price: ${price}</h2>

      <div id="chart"></div>

      <div style={{ marginTop: 20 }}>
        <button style={{ marginRight: 10 }}>Buy</button>
        <button>Sell</button>
      </div>
    </div>
  );
}