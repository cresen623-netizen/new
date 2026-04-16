import { useEffect, useState } from "react";

export default function App() {
  const [price, setPrice] = useState(0);

  // WebSocket
  useEffect(() => {
    const ws = new WebSocket(window.location.origin.replace("http", "ws"));

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "price") setPrice(data.price);
    };

    return () => ws.close();
  }, []);

  // TradingView
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
    <div style={{ background: "#0b0e11", color: "white", minHeight: "100vh" }}>
      
      {/* NAVBAR */}
      <div style={{ padding: 15, borderBottom: "1px solid #222" }}>
        <h2 style={{ color: "#f0b90b" }}>TradeX</h2>
      </div>

      <div style={{ display: "flex" }}>
        
        {/* SIDEBAR */}
        <div style={{ width: 200, padding: 20, borderRight: "1px solid #222" }}>
          <p>Dashboard</p>
          <p>Markets</p>
          <p>Trade</p>
          <p>Wallet</p>
        </div>

        {/* MAIN */}
        <div style={{ flex: 1, padding: 20 }}>
          
          {/* TOP CARDS */}
          <div style={{ display: "flex", gap: 20 }}>
            <div style={{ background: "#161a1e", padding: 15, borderRadius: 10 }}>
              <h4>Price</h4>
              <h2>${price}</h2>
            </div>

            <div style={{ background: "#161a1e", padding: 15, borderRadius: 10 }}>
              <h4>24h Change</h4>
              <h2 style={{ color: "lime" }}>+2.3%</h2>
            </div>

            <div style={{ background: "#161a1e", padding: 15, borderRadius: 10 }}>
              <h4>Balance</h4>
              <h2>$12,540</h2>
            </div>
          </div>

          {/* CHART */}
          <div style={{ marginTop: 20, background: "#161a1e", padding: 10, borderRadius: 10 }}>
            <div id="chart"></div>
          </div>

          {/* ORDER SECTION */}
          <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
            
            {/* BUY */}
            <div style={{ flex: 1, background: "#161a1e", padding: 15, borderRadius: 10 }}>
              <h3 style={{ color: "lime" }}>Buy BTC</h3>
              <input placeholder="Amount" style={{ width: "100%", marginTop: 10 }} />
              <button style={{ width: "100%", marginTop: 10, background: "green" }}>
                Buy
              </button>
            </div>

            {/* SELL */}
            <div style={{ flex: 1, background: "#161a1e", padding: 15, borderRadius: 10 }}>
              <h3 style={{ color: "red" }}>Sell BTC</h3>
              <input placeholder="Amount" style={{ width: "100%", marginTop: 10 }} />
              <button style={{ width: "100%", marginTop: 10, background: "red" }}>
                Sell
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
