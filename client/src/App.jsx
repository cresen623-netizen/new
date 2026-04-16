import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  CandlestickChart,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  Search,
  CircleDollarSign,
  BarChart3,
  Settings,
  User,
  CreditCard,
  ChevronDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const chartData = [
  { t: "00:00", v: 70210 },
  { t: "02:00", v: 70880 },
  { t: "04:00", v: 70620 },
  { t: "06:00", v: 71420 },
  { t: "08:00", v: 71810 },
  { t: "10:00", v: 71260 },
  { t: "12:00", v: 72110 },
  { t: "14:00", v: 72640 },
  { t: "16:00", v: 72380 },
  { t: "18:00", v: 73020 },
  { t: "20:00", v: 73480 },
  { t: "22:00", v: 73120 },
];

const assets = [
  { symbol: "BTC", name: "Bitcoin", price: "$73,836.00", change: "+2.41%", up: true },
  { symbol: "ETH", name: "Ethereum", price: "$3,584.21", change: "+1.17%", up: true },
  { symbol: "SOL", name: "Solana", price: "$182.42", change: "-0.64%", up: false },
  { symbol: "BNB", name: "BNB", price: "$612.55", change: "+0.82%", up: true },
];

const orderBookBids = [
  [73831.2, 0.421],
  [73828.6, 0.193],
  [73824.1, 0.512],
  [73819.8, 0.275],
  [73814.4, 0.884],
];

const orderBookAsks = [
  [73840.9, 0.142],
  [73845.3, 0.268],
  [73849.7, 0.388],
  [73854.1, 0.731],
  [73861.5, 0.255],
];

const trades = [
  { time: "14:05:11", price: "73,836.0", amount: "0.018", side: "buy" },
  { time: "14:05:09", price: "73,834.4", amount: "0.051", side: "sell" },
  { time: "14:05:07", price: "73,835.3", amount: "0.009", side: "buy" },
  { time: "14:05:02", price: "73,832.7", amount: "0.140", side: "sell" },
];

function StatCard({ icon: Icon, label, value, sub, positive = true }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className="rounded-2xl border border-zinc-800 bg-zinc-950/90 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm text-zinc-400">{label}</span>
        <Icon className="h-5 w-5 text-amber-400" />
      </div>
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className={`mt-2 text-sm ${positive ? "text-emerald-400" : "text-rose-400"}`}>{sub}</div>
    </motion.div>
  );
}

export default function App() {
  const [side, setSide] = useState("buy");
  const [price, setPrice] = useState("73836.00");
  const [amount, setAmount] = useState("0.0100");
  const [tab, setTab] = useState("spot");

  useEffect(() => {
    const id = setInterval(() => {
      setPrice((p) => {
        const n = parseFloat(p);
        const next = Math.max(70000, n + (Math.random() - 0.5) * 40);
        return next.toFixed(2);
      });
    }, 1500);
    return () => clearInterval(id);
  }, []);

  const total = useMemo(() => {
    const p = parseFloat(price || "0");
    const a = parseFloat(amount || "0");
    return (p * a).toFixed(2);
  }, [price, amount]);

  return (
    <div className="min-h-screen bg-[#0b0e11] text-zinc-100">
      <header className="sticky top-0 z-20 border-b border-zinc-800 bg-[#0b0e11]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3">
          <div className="flex items-center gap-8">
            <div className="text-3xl font-bold tracking-tight text-amber-400">TradeX</div>
            <nav className="hidden gap-5 text-sm text-zinc-300 md:flex">
              <span className="cursor-pointer text-white">Buy Crypto</span>
              <span className="cursor-pointer hover:text-white">Markets</span>
              <span className="cursor-pointer hover:text-white">Trade</span>
              <span className="cursor-pointer hover:text-white">Futures</span>
              <span className="cursor-pointer hover:text-white">Wallet</span>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 md:flex">
              <Search className="h-4 w-4 text-zinc-500" />
              <input className="w-44 bg-transparent text-sm outline-none placeholder:text-zinc-600" placeholder="Search coins" />
            </div>
            <Bell className="h-5 w-5 text-zinc-400" />
            <div className="rounded-xl bg-amber-400 px-4 py-2 text-sm font-semibold text-black">Deposit</div>
            <div className="rounded-xl border border-zinc-700 px-4 py-2 text-sm">Wallet</div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-4 px-4 py-4 xl:grid-cols-[260px_minmax(0,1fr)_360px]">
        <aside className="space-y-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-amber-400/15 p-2 text-amber-400"><User className="h-5 w-5" /></div>
              <div>
                <div className="font-medium">Main Account</div>
                <div className="text-sm text-zinc-500">VIP 0</div>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              {[
                [Wallet, "Overview"],
                [CandlestickChart, "Spot"],
                [BarChart3, "Markets"],
                [CreditCard, "Funding"],
                [Settings, "Settings"],
              ].map(([Icon, label], i) => (
                <div key={label} className={`flex items-center gap-3 rounded-xl px-3 py-2 ${i === 1 ? "bg-zinc-900 text-white" : "text-zinc-400 hover:bg-zinc-900 hover:text-white"}`}>
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            <StatCard icon={CircleDollarSign} label="Total Balance" value="$128,452.90" sub="+3.21% today" />
            <StatCard icon={ArrowUpRight} label="Today's PnL" value="+$2,843.11" sub="+1.82%" />
            <StatCard icon={Wallet} label="Available USDT" value="$18,640.22" sub="Ready to trade" />
          </div>
        </aside>

        <main className="space-y-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="mb-4 flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
              <div>
                <div className="flex items-center gap-2 text-2xl font-semibold">
                  BTC/USDT
                  <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-sm font-medium text-emerald-400">+2.41%</span>
                </div>
                <div className="mt-1 text-sm text-zinc-500">Bitcoin / TetherUS · Spot Market</div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ["Last Price", `$${price}`],
                  ["24h High", "$74,769.90"],
                  ["24h Low", "$73,165.30"],
                  ["24h Volume", "18,932 BTC"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-zinc-900 p-3">
                    <div className="text-xs text-zinc-500">{k}</div>
                    <div className="mt-1 text-sm font-medium text-white">{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4 flex gap-2 text-sm">
              {[
                ["spot", "Spot"],
                ["margin", "Margin"],
                ["futures", "Futures"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => setTab(value)}
                  className={`rounded-xl px-4 py-2 ${tab === value ? "bg-amber-400 font-semibold text-black" : "bg-zinc-900 text-zinc-300"}`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
              <div className="rounded-2xl bg-[#111418] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-sm text-zinc-400">Portfolio Performance</div>
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <span className="rounded-lg bg-zinc-900 px-2 py-1">1D</span>
                    <span className="rounded-lg px-2 py-1">1W</span>
                    <span className="rounded-lg px-2 py-1">1M</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
                <div className="h-[320px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#f0b90b" stopOpacity={0.35} />
                          <stop offset="100%" stopColor="#f0b90b" stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="t" stroke="#52525b" />
                      <YAxis stroke="#52525b" domain={[70000, 74000]} />
                      <Tooltip contentStyle={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 12 }} />
                      <Area type="monotone" dataKey="v" stroke="#f0b90b" fill="url(#grad)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-2xl bg-[#111418] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-sm text-zinc-400">Watchlist</div>
                  <div className="text-xs text-zinc-500">Top movers</div>
                </div>
                <div className="space-y-3">
                  {assets.map((asset) => (
                    <motion.div whileHover={{ x: 4 }} key={asset.symbol} className="flex items-center justify-between rounded-xl bg-zinc-900 p-3">
                      <div>
                        <div className="font-medium">{asset.symbol}</div>
                        <div className="text-xs text-zinc-500">{asset.name}</div>
                      </div>
                      <div className="text-right">
                        <div>{asset.price}</div>
                        <div className={`text-xs ${asset.up ? "text-emerald-400" : "text-rose-400"}`}>{asset.change}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
              <div className="mb-4 text-sm text-zinc-400">Open Orders / Position History</div>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis dataKey="t" stroke="#52525b" />
                    <YAxis stroke="#52525b" domain={[70000, 74000]} />
                    <Tooltip contentStyle={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 12 }} />
                    <Line type="monotone" dataKey="v" stroke="#0ecb81" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
              <div className="mb-4 text-sm text-zinc-400">Recent Market Trades</div>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-3 text-zinc-500">
                  <span>Price</span>
                  <span>Amount</span>
                  <span>Time</span>
                </div>
                {trades.map((trade, i) => (
                  <div key={i} className="grid grid-cols-3 rounded-lg bg-zinc-900/70 px-3 py-2">
                    <span className={trade.side === "buy" ? "text-emerald-400" : "text-rose-400"}>{trade.price}</span>
                    <span>{trade.amount}</span>
                    <span className="text-zinc-400">{trade.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-lg font-semibold">Order Book</div>
              <div className="text-xs text-zinc-500">Depth 0.1</div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 text-zinc-500"><span>Ask Price</span><span className="text-right">Amount</span></div>
              {orderBookAsks.map(([p, a], i) => (
                <div key={i} className="grid grid-cols-2 rounded-lg bg-rose-500/5 px-3 py-2 text-rose-300">
                  <span>{p}</span><span className="text-right">{a}</span>
                </div>
              ))}
              <div className="rounded-xl bg-zinc-900 px-3 py-3 text-center text-xl font-semibold text-white">{price}</div>
              <div className="grid grid-cols-2 text-zinc-500"><span>Bid Price</span><span className="text-right">Amount</span></div>
              {orderBookBids.map(([p, a], i) => (
                <div key={i} className="grid grid-cols-2 rounded-lg bg-emerald-500/5 px-3 py-2 text-emerald-300">
                  <span>{p}</span><span className="text-right">{a}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="mb-4 text-lg font-semibold">Place Order</div>
            <div className="mb-4 grid grid-cols-2 gap-2">
              <button onClick={() => setSide("buy")} className={`rounded-xl px-4 py-3 font-semibold ${side === "buy" ? "bg-emerald-500 text-black" : "bg-zinc-900 text-zinc-300"}`}>Buy</button>
              <button onClick={() => setSide("sell")} className={`rounded-xl px-4 py-3 font-semibold ${side === "sell" ? "bg-rose-500 text-black" : "bg-zinc-900 text-zinc-300"}`}>Sell</button>
            </div>

            <div className="space-y-3">
              <div>
                <div className="mb-1 text-xs text-zinc-500">Limit Price</div>
                <input value={price} onChange={(e) => setPrice(e.target.value)} className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none" />
              </div>
              <div>
                <div className="mb-1 text-xs text-zinc-500">Amount BTC</div>
                <input value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none" />
              </div>
              <div className="rounded-xl bg-zinc-900 p-3 text-sm">
                <div className="mb-2 flex justify-between text-zinc-400"><span>Total</span><span className="text-white">${total}</span></div>
                <div className="flex justify-between text-zinc-400"><span>Fee</span><span>0.10%</span></div>
              </div>
              <button className={`w-full rounded-xl px-4 py-3 font-semibold ${side === "buy" ? "bg-emerald-500 text-black hover:bg-emerald-400" : "bg-rose-500 text-black hover:bg-rose-400"}`}>
                {side === "buy" ? "Buy BTC" : "Sell BTC"}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
