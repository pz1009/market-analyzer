<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SMC & Active Momentum Engine</title>
    
    <!-- PWA Meta Tags & Manifest -->
    <link rel="manifest" href="./manifest.json">
    <meta name="theme-color" content="#111827">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <link rel="apple-touch-icon" href="https://cdn-icons-png.flaticon.com/512/4256/4256900.png">

    <style>
        :root {
            --bg-color: #080b11;
            --card-bg: #111827;
            --card-header-bg: #1f2937;
            --text-primary: #f9fafb;
            --text-secondary: #9ca3af;
            --accent-green: #10b981;
            --accent-red: #f43f5e;
            --accent-blue: #3b82f6;
            --accent-purple: #8b5cf6;
            --border-color: #1f2937;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-primary);
            padding: 15px;
            padding-bottom: 60px;
        }

        header {
            text-align: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid var(--border-color);
        }

        h1 {
            font-size: 1.3rem;
            margin-bottom: 5px;
            letter-spacing: 0.5px;
        }

        .subtitle {
            color: var(--text-secondary);
            font-size: 0.8rem;
        }

        .settings-card {
            background-color: var(--card-bg);
            border: 1px dashed var(--accent-blue);
            border-radius: 10px;
            padding: 12px;
            margin-bottom: 15px;
        }

        .settings-card h3 {
            font-size: 0.85rem;
            margin-bottom: 8px;
            color: var(--accent-blue);
        }

        .api-input {
            width: 100%;
            padding: 8px;
            border-radius: 6px;
            border: 1px solid var(--border-color);
            background-color: var(--bg-color);
            color: white;
            font-size: 0.8rem;
            margin-bottom: 8px;
        }

        .selectors-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 12px;
            margin-bottom: 15px;
        }

        select {
            width: 100%;
            padding: 12px;
            border-radius: 8px;
            background-color: var(--card-bg);
            color: white;
            border: 1px solid var(--border-color);
            font-size: 0.95rem;
            font-weight: bold;
        }

        .grid-container {
            display: grid;
            grid-template-columns: 1fr;
            gap: 15px;
        }

        .card {
            background-color: var(--card-bg);
            border-radius: 12px;
            border: 1px solid var(--border-color);
            overflow: hidden;
        }

        .card-header {
            background-color: var(--card-header-bg);
            padding: 12px 15px;
            font-size: 0.9rem;
            font-weight: bold;
            color: var(--text-primary);
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--border-color);
        }

        .card-body {
            padding: 15px;
        }

        .price-val {
            font-size: 2.2rem;
            font-weight: 800;
            margin: 5px 0;
            letter-spacing: -0.5px;
        }

        .signal-box {
            border-radius: 8px;
            padding: 15px;
            border: 1px solid var(--border-color);
        }

        .signal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: bold;
            font-size: 1.1rem;
            margin-bottom: 10px;
        }

        .signal-buy {
            background-color: rgba(16, 185, 129, 0.08);
            border-color: var(--accent-green);
            color: var(--accent-green);
        }

        .signal-sell {
            background-color: rgba(244, 63, 94, 0.08);
            border-color: var(--accent-red);
            color: var(--accent-red);
        }

        .signal-none {
            background-color: rgba(156, 163, 175, 0.05);
            border-color: var(--border-color);
            color: var(--text-secondary);
        }

        .signal-error {
            background-color: rgba(244, 63, 94, 0.1);
            border-color: var(--accent-red);
            color: var(--accent-red);
        }

        .signal-params {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 10px;
            margin-top: 12px;
            border-top: 1px dashed rgba(255,255,255,0.08);
            padding-top: 12px;
        }

        .param-col {
            text-align: center;
        }

        .param-label {
            font-size: 0.7rem;
            color: var(--text-secondary);
            margin-bottom: 4px;
        }

        .param-val {
            font-weight: bold;
            font-size: 0.9rem;
            color: var(--text-primary);
        }

        .stat-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid rgba(255,255,255,0.04);
            font-size: 0.85rem;
        }
        .stat-row:last-child { border: none; }
        .stat-label { color: var(--text-secondary); display: flex; align-items: center; gap: 5px; }
        .stat-value { font-weight: bold; }

        .direction-badge {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: bold;
            text-transform: uppercase;
        }

        .badge-bullish { background-color: rgba(16, 185, 129, 0.15); color: var(--accent-green); }
        .badge-bearish { background-color: rgba(244, 63, 94, 0.15); color: var(--accent-red); }
        .badge-neutral { background-color: rgba(59, 130, 246, 0.15); color: var(--accent-blue); }

        .btn-refresh {
            width: 100%;
            background-color: var(--accent-blue);
            color: white;
            border: none;
            padding: 12px;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: bold;
            margin-top: 15px;
            cursor: pointer;
        }

        .disclaimer {
            font-size: 0.68rem;
            color: var(--text-secondary);
            text-align: center;
            margin-top: 25px;
            line-height: 1.4;
        }

        .pill {
            display: inline-block;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 0.7rem;
            font-weight: bold;
        }
        .pill-green { background-color: rgba(16, 185, 129, 0.2); color: var(--accent-green); }
        .pill-red { background-color: rgba(244, 63, 94, 0.2); color: var(--accent-red); }
        .pill-purple { background-color: rgba(139, 92, 246, 0.2); color: var(--accent-purple); }
    </style>
</head>
<body>

    <header>
        <h1>SMC & Active Momentum Engine</h1>
        <div class="subtitle">Dynamic ATR Volatility Execution Panel</div>
    </header>

    <!-- Twelve Data API Configuration -->
    <div class="settings-card">
        <h3>🔑 Forex & Spot Gold API Settings</h3>
        <input type="password" id="api-key" class="api-input" placeholder="Enter Twelve Data API Key" onchange="saveKey()">
        <p style="font-size: 0.72rem; color: var(--text-secondary);">
            Get a free API key at <a href="https://twelvedata.com/" target="_blank" style="color: var(--accent-blue); text-decoration: none;">twelvedata.com</a>
        </p>
    </div>

    <!-- Dropdowns Grid -->
    <div class="selectors-grid">
        <!-- Asset Selector -->
        <div>
            <select id="asset-select" onchange="handleSelectChange()">
                <option value="BINANCE:BTCUSDT">Bitcoin (BTC/USDT) [Free]</option>
                <option value="BINANCE:ETHUSDT">Ethereum (ETH/USDT) [Free]</option>
                <option value="BINANCE:PAXGUSDT">Gold Proxy (PAXG/USDT) [Free]</option>
                <option value="TD:EUR/USD">EUR/USD (Forex) [Requires Key]</option>
                <option value="TD:GBP/USD">GBP/USD (Forex) [Requires Key]</option>
                <option value="TD:XAU/USD">Spot Gold (XAU/USD) [Requires Key]</option>
            </select>
        </div>
        <!-- Timeframe Selector -->
        <div>
            <select id="timeframe-select" onchange="handleSelectChange()">
                <option value="1m">1-Minute (Scalping)</option>
                <option value="5m">5-Minute (Fast Intraday)</option>
                <option value="15m" selected>15-Minute (Intraday)</option>
                <option value="30m">30-Minute (Standard Intraday)</option>
                <option value="1h">1-Hour (Hourly/Swing)</option>
            </select>
        </div>
        <!-- Strategy Mode Selector -->
        <div>
            <select id="strategy-select" onchange="handleSelectChange()">
                <option value="SMC">Strict SMC Setup (Selective/Rare)</option>
                <option value="ACTIVE" selected>Active Momentum Setup (Frequent Signals)</option>
            </select>
        </div>
        <!-- Target Style Selector -->
        <div>
            <select id="target-style-select" onchange="handleSelectChange()">
                <option value="SCALPER" selected>Scalper (Very Tight Targets)</option>
                <option value="DAYTRADER">Day Trader (Standard Targets)</option>
                <option value="STRUCTURAL">SMC Structural (Wide High-Low Targets)</option>
            </select>
        </div>
    </div>

    <div class="grid-container">
        <!-- Live Price Card -->
        <div class="card">
            <div class="card-header">
                <span>Live Tracker</span>
                <span id="asset-tag" style="color: var(--accent-blue);">BTC/USDT</span>
            </div>
            <div class="card-body">
                <div class="price-val" id="asset-price">Loading...</div>
                <div id="market-badge" class="direction-badge badge-neutral">Initializing...</div>
            </div>
        </div>

        <!-- SMC & ICT Signals Panel -->
        <div class="card">
            <div class="card-header">
                <span>🤖 Trade Execution Panel</span>
            </div>
            <div class="card-body" id="signal-display">
                <div class="signal-box signal-none">
                    <div class="signal-header">Evaluating Framework...</div>
                    Loading indicators. Run a refresh to begin scanning.
                </div>
            </div>
        </div>

        <!-- Market Structure & Liquidity Pool Data -->
        <div class="card">
            <div class="card-header">
                <span>📊 Smart Money Matrix</span>
            </div>
            <div class="card-body">
                <div class="stat-row">
                    <span class="stat-label">Buy-side Liquidity (BSL) <span class="pill pill-purple">resistance</span></span>
                    <span id="val-bsl" class="stat-value">-</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Sell-side Liquidity (SSL) <span class="pill pill-purple">support</span></span>
                    <span id="val-ssl" class="stat-value">-</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Fair Value Gap (FVG) Status</span>
                    <span id="val-fvg" class="stat-value">-</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Market Structure State</span>
                    <span id="val-mss" class="stat-value">-</span>
                </div>
            </div>
        </div>

        <!-- Classic S/R & Indicators -->
        <div class="card">
            <div class="card-header">
                <span>📈 Traditional Technical Matrix</span>
            </div>
            <div class="card-body">
                <div class="stat-row">
                    <span class="stat-label">Strong Support Zone</span>
                    <span id="val-supp" class="stat-value">-</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Strong Resistance Zone</span>
                    <span id="val-res" class="stat-value">-</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">RSI (14-period)</span>
                    <span id="val-rsi" class="stat-value">-</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">SMA (100-period Trend)</span>
                    <span id="val-sma100" class="stat-value">-</span>
                </div>
            </div>
        </div>
    </div>

    <button class="btn-refresh" onclick="fetchData()">Evaluate & Calculate Patterns</button>

    <div class="disclaimer">
        Disclaimer: This dashboard operates using localized mechanical quantitative rules to evaluate patterns. It is automated, but trading carries capital risk. No algorithm can guarantee positive performance.
    </div>

    <script>
        document.getElementById('api-key').value = localStorage.getItem('twelve_data_key') || '';

        function saveKey() {
            const key = document.getElementById('api-key').value.trim();
            localStorage.setItem('twelve_data_key', key);
            fetchData();
        }

        function handleSelectChange() {
            fetchData();
        }

        // Professional Decimal Precision Formatter
        function formatPrice(val, symbol) {
            if (symbol.includes("EUR") || symbol.includes("GBP")) {
                return val.toFixed(5);
            }
            return val.toFixed(2);
        }

        function calculateSMA(prices, period) {
            if (!prices || prices.length < period) return 0;
            let sum = prices.slice(-period).reduce((a, b) => a + b, 0);
            return (sum / period);
        }

        function calculateRSI(closes, period = 14) {
            if (!closes || closes.length <= period) return 50;
            let changes = [];
            for (let i = 1; i < closes.length; i++) {
                changes.push(closes[i] - closes[i - 1]);
            }
            let gains = changes.slice(-period).filter(v => v > 0).reduce((a, b) => a + b, 0) / period;
            let losses = changes.slice(-period).filter(v => v < 0).reduce((a, b) => a - b, 0) / period;
            if (losses === 0) return 100;
            let rs = gains / losses;
            return Math.round(100 - (100 / (1 + rs)));
        }

        // --- DYNAMIC VOLATILITY MEASUREMENT (ATR) ---
        function calculateATR(candles, period = 14) {
            if (!candles || candles.length < period + 1) return 0;
            let sumTR = 0;
            for (let i = candles.length - period; i < candles.length; i++) {
                const c = candles[i];
                const prev = candles[i - 1];
                const tr = Math.max(
                    c.h - c.l,
                    Math.abs(c.h - prev.c),
                    Math.abs(c.l - prev.c)
                );
                sumTR += tr;
            }
            return sumTR / period;
        }

        // --- INSTITUTIONAL VOLUME Confirmation Filter ---
        // Verifies if the volume is above at least 80% of the last 10 candles average volume
        function isVolumeHealthy(candles) {
            if (!candles || candles.length < 11) return true; 
            const currentVol = candles[candles.length - 1].v;
            const recentCandles = candles.slice(-11, -1);
            const sumVol = recentCandles.reduce((acc, c) => acc + c.v, 0);
            const avgVol = sumVol / 10;
            if (avgVol === 0) return true; // Fail-safe for low data markets
            return currentVol >= (avgVol * 0.8);
        }

        function extractSupportResistance(candles) {
            let supports = [];
            let resistances = [];
            if (!candles || candles.length < 10) {
                return { support: 0, resistance: 0 };
            }
            for (let i = 5; i < candles.length - 5; i++) {
                let isHigh = true;
                let isLow = true;
                for (let j = -5; j <= 5; j++) {
                    if (j === 0) continue;
                    if (candles[i].h < candles[i+j].h) isHigh = false;
                    if (candles[i].l > candles[i+j].l) isLow = false;
                }
                if (isHigh) resistances.push(candles[i].h);
                if (isLow) supports.push(candles[i].l);
            }
            if (supports.length === 0) supports.push(Math.min(...candles.map(c => c.l)));
            if (resistances.length === 0) resistances.push(Math.max(...candles.map(c => c.h)));
            return {
                support: supports[supports.length - 1] || 0,
                resistance: resistances[resistances.length - 1] || 0
            };
        }

        function findFairValueGaps(candles) {
            let bullishFVG = null;
            let bearishFVG = null;
            if (!candles || candles.length < 15) return { bullishFVG, bearishFVG };
            
            for (let i = candles.length - 2; i > candles.length - 15; i--) {
                const c1 = candles[i-2];
                const c2 = candles[i-1];
                const c3 = candles[i];
                if (!c1 || !c2 || !c3) continue;

                if (c1.h < c3.l && c2.c > c2.o) {
                    bullishFVG = { bottom: c1.h, top: c3.l, price: (c1.h + c3.l) / 2 };
                    break;
                }
                if (c1.l > c3.h && c2.c < c2.o) {
                    bearishFVG = { top: c1.l, bottom: c3.h, price: (c1.l + c3.h) / 2 };
                    break;
                }
            }
            return { bullishFVG, bearishFVG };
        }

        function identifyLiquidityPools(candles) {
            if (!candles || candles.length < 41) return { bsl: 0, ssl: 0 };
            const lookback = candles.slice(-41, -1);
            const bsl = Math.max(...lookback.map(c => c.h)); 
            const ssl = Math.min(...lookback.map(c => c.l)); 
            return { bsl, ssl };
        }

        async function fetchBinanceData(symbol, tf) {
            const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${tf}&limit=100`);
            if (!response.ok) throw new Error("BINANCE_NETWORK_ERROR");
            const data = await response.json();
            if (!Array.isArray(data) || data.length === 0) throw new Error("INVALID_BINANCE_DATA");
            return data.map(d => ({
                o: parseFloat(d[1]),
                h: parseFloat(d[2]),
                l: parseFloat(d[3]),
                c: parseFloat(d[4]),
                v: parseFloat(d[5])
            }));
        }

        async function fetchTwelveData(symbol, tf, key) {
            if (!key) throw new Error("API_KEY_MISSING");
            const response = await fetch(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${tf}&outputsize=100&apikey=${key}`);
            if (!response.ok) throw new Error("TWELVE_DATA_CONNECTION_FAILED");
            const data = await response.json();
            
            if (data.status === 'error') {
                throw new Error(data.message || "TWELVE_DATA_API_ERROR");
            }
            if (!data.values || !Array.isArray(data.values) || data.values.length === 0) {
                throw new Error("EMPTY_DATASET_RETURNED");
            }
            
            return data.values.map(d => ({
                o: parseFloat(d.open),
                h: parseFloat(d.high),
                l: parseFloat(d.low),
                c: parseFloat(d.close),
                v: parseFloat(d.volume || 0)
            })).reverse();
        }

        async function fetchMarketData() {
            const selectVal = document.getElementById('asset-select').value;
            const [source, symbol] = selectVal.split(':');
            const apiKey = document.getElementById('api-key').value.trim();
            const selectedTF = document.getElementById('timeframe-select').value;
            const strategyMode = document.getElementById('strategy-select').value;
            const targetStyle = document.getElementById('target-style-select').value;
            
            document.getElementById('asset-tag').innerText = `${symbol} (${selectedTF})`;

            try {
                document.getElementById('asset-price').innerText = "Loading...";
                document.getElementById('market-badge').innerText = "Analyzing...";
                document.getElementById('market-badge').className = "direction-badge badge-neutral";

                let candles = [];
                if (source === 'BINANCE') {
                    candles = await fetchBinanceData(symbol, selectedTF);
                } else {
                    let twelveDataTF = selectedTF;
                    if (selectedTF === '1m') twelveDataTF = '1min';
                    else if (selectedTF === '5m') twelveDataTF = '5min';
                    else if (selectedTF === '15m') twelveDataTF = '15min';
                    else if (selectedTF === '30m') twelveDataTF = '30min';
                    else if (selectedTF === '1h') twelveDataTF = '1h';
                    candles = await fetchTwelveData(symbol, twelveDataTF, apiKey);
                }

                if (!candles || candles.length < 50) {
                    throw new Error("INSUFFICIENT_HISTORICAL_CANDLES");
                }

                const len = candles.length;
                const c1 = candles[len - 1]; 
                const c2 = candles[len - 2]; 
                const currentPrice = c1.c;
                
                document.getElementById('asset-price').innerText = formatPrice(currentPrice, symbol);

                const closes = candles.map(c => c.c);
                const rsi = calculateRSI(closes, 14);
                const sma100 = calculateSMA(closes, 100) || calculateSMA(closes, 50); // Fallback if fewer candles
                const sma7 = calculateSMA(closes, 7);
                const sma25 = calculateSMA(closes, 25);
                const atr = calculateATR(candles, 14);
                const volumeOK = isVolumeHealthy(candles);

                document.getElementById('val-rsi').innerText = rsi;
                document.getElementById('val-sma100').innerText = formatPrice(sma100, symbol);

                const liquidity = identifyLiquidityPools(candles);
                const srZones = extractSupportResistance(candles);
                const fvgData = findFairValueGaps(candles);

                document.getElementById('val-bsl').innerText = `$${formatPrice(liquidity.bsl, symbol)}`;
                document.getElementById('val-ssl').innerText = `$${formatPrice(liquidity.ssl, symbol)}`;
                document.getElementById('val-supp').innerText = `$${formatPrice(srZones.support, symbol)}`;
                document.getElementById('val-res').innerText = `$${formatPrice(srZones.resistance, symbol)}`;

                let fvgStatusText = "None Detected";
                let fvgStatusClass = "";
                if (fvgData.bullishFVG) {
                    fvgStatusText = `Bullish Imbalance ($${formatPrice(fvgData.bullishFVG.price, symbol)})`;
                    fvgStatusClass = "pill-green";
                } else if (fvgData.bearishFVG) {
                    fvgStatusText = `Bearish Imbalance ($${formatPrice(fvgData.bearishFVG.price, symbol)})`;
                    fvgStatusClass = "pill-red";
                }
                document.getElementById('val-fvg').innerHTML = fvgStatusText ? `<span class="pill ${fvgStatusClass}">${fvgStatusText}</span>` : "-";

                let mssState = "CHoCH / Neutral";
                let mssClass = "badge-neutral";
                let sweptLiquidity = false;
                let sweptType = ""; 

                if (c1.l < liquidity.ssl && currentPrice > liquidity.ssl) {
                    sweptLiquidity = true;
                    sweptType = "SSL";
                } else if (c1.h > liquidity.bsl && currentPrice < liquidity.bsl) {
                    sweptLiquidity = true;
                    sweptType = "BSL";
                }

                if (currentPrice > srZones.resistance) {
                    mssState = "BOS (Bullish Shift)";
                    mssClass = "pill-green";
                } else if (currentPrice < srZones.support) {
                    mssState = "BOS (Bearish Shift)";
                    mssClass = "pill-red";
                }
                document.getElementById('val-mss').innerHTML = `<span class="pill ${mssClass}">${mssState}</span>`;

                let signal = "NONE";
                let triggerReason = "";

                if (strategyMode === "SMC") {
                    triggerReason = "Scanning order blocks. Waiting for institutional liquidity sweeps.";
                    if (sweptLiquidity && sweptType === "SSL" && fvgData.bullishFVG && volumeOK) {
                        signal = "BUY";
                        triggerReason = "SMC Setup: Swept Sell-side Liquidity (SSL) followed by bullish structure shift and volume confirmation.";
                    } else if (sweptLiquidity && sweptType === "BSL" && fvgData.bearishFVG && volumeOK) {
                        signal = "SELL";
                        triggerReason = "SMC Setup: Swept Buy-side Liquidity (BSL) followed by bearish structure shift and volume confirmation.";
                    } else if (!volumeOK && sweptLiquidity) {
                        triggerReason = "SMC Blocked: Liquidity sweep identified, but rejected due to lack of institutional volume (Dry Market).";
                    }
                } else {
                    // --- HIGHLY ACCURATE TREND CONFLUENCE MECHANIC ---
                    // Major Trend filter: Buys only allowed if above SMA 100, Sells only if below SMA 100.
                    triggerReason = "Scanning active trend indicators. Fast EMA and SMA limits are current neutral.";
                    
                    const isBullishTrend = currentPrice > sma100;
                    const isBearishTrend = currentPrice < sma100;

                    if (isBullishTrend && sma7 > sma25 && currentPrice > sma25 && rsi > 51 && volumeOK) {
                        signal = "BUY";
                        triggerReason = "Active Momentum: Exponential 7 crossed above 25 average. Aligned with a major Bullish Trend (above SMA 100) and supported by healthy volume.";
                    } else if (isBearishTrend && sma7 < sma25 && currentPrice < sma25 && rsi < 49 && volumeOK) {
                        signal = "SELL";
                        triggerReason = "Active Momentum: Exponential 7 crossed below 25 average. Aligned with a major Bearish Trend (below SMA 100) and supported by healthy volume.";
                    } else if (!volumeOK && (sma7 > sma25 || sma7 < sma25)) {
                        triggerReason = "Momentum Blocked: Trend crossing detected, but rejected due to low intraday trading volume.";
                    } else if (isBullishTrend && rsi <= 25 && volumeOK) {
                        signal = "BUY";
                        triggerReason = "Active Reversion: Deep oversold conditions reached inside an overarching major uptrend. High-probability structural correction buy.";
                    } else if (isBearishTrend && rsi >= 75 && volumeOK) {
                        signal = "SELL";
                        triggerReason = "Active Reversion: Deep overbought conditions reached inside an overarching major downtrend. High-probability structural correction sell.";
                    }
                }

                let signalHTML = "";
                if (signal === "NONE") {
                    signalHTML = `
                        <div class="signal-box signal-none">
                            <div class="signal-header">
                                <span>MARKET STATUS: WAIT</span>
                            </div>
                            <p style="font-size: 0.85rem; line-height: 1.4;">${triggerReason}</p>
                        </div>
                    `;
                } else {
                    let entry = currentPrice;
                    let sl = 0;
                    let tp = 0;

                    if (targetStyle === "SCALPER") {
                        if (signal === "BUY") {
                            sl = entry - (0.5 * atr); 
                            tp = entry + (1.0 * atr); 
                        } else {
                            sl = entry + (0.5 * atr); 
                            tp = entry - (1.0 * atr); 
                        }
                    } else if (targetStyle === "DAYTRADER") {
                        if (signal === "BUY") {
                            sl = entry - (1.0 * atr); 
                            tp = entry + (2.0 * atr); 
                        } else {
                            sl = entry + (1.0 * atr); 
                            tp = entry - (2.0 * atr); 
                        }
                    } else { // SMC STRUCTURAL WIDE HIGH-LOW SWEEPS
                        if (signal === "BUY") {
                            sl = Math.min(srZones.support, liquidity.ssl) * 0.999; 
                            const risk = entry - sl;
                            tp = entry + (risk * 2.0); 
                        } else {
                            sl = Math.max(srZones.resistance, liquidity.bsl) * 1.001; 
                            const risk = sl - entry;
                            tp = entry - (risk * 2.0); 
                        }
                    }

                    signalHTML = `
                        <div class="signal-box ${signal === 'BUY' ? 'signal-buy' : 'signal-sell'}">
                            <div class="signal-header">
                                <span>⚡ ${signal} SIGNAL ACTIVATED</span>
                                <span style="font-size:0.75rem; background:rgba(255,255,255,0.15); padding:2px 8px; border-radius:10px;">
                                    ${targetStyle === 'STRUCTURAL' ? 'R:R 1:2.0' : targetStyle === 'SCALPER' ? 'R:R 1:2.0 (Tight)' : 'R:R 1:2.0 (Day)'}
                                </span>
                            </div>
                            <p style="font-size: 0.85rem; line-height: 1.4; margin-bottom: 12px;">${triggerReason}</p>
                            
                            <div class="signal-params">
                                <div class="param-col">
                                    <div class="param-label">LIMIT ENTRY</div>
                                    <div class="param-val">$${formatPrice(entry, symbol)}</div>
                                </div>
                                <div class="param-col">
                                    <div class="param-label" style="color:var(--accent-red);">STOP LOSS</div>
                                    <div class="param-val" style="color:var(--accent-red);">$${formatPrice(sl, symbol)}</div>
                                </div>
                                <div class="param-col">
                                    <div class="param-label" style="color:var(--accent-green);">TAKE PROFIT</div>
                                    <div class="param-val" style="color:var(--accent-green);">$${formatPrice(tp, symbol)}</div>
                                </div>
                            </div>
                        </div>
                    `;
                }

                document.getElementById('signal-display').innerHTML = signalHTML;
                
                let trendVerdict = "Consolidating";
                let trendClass = "badge-neutral";
                if (currentPrice > sma50) { trendVerdict = "Bullish Phase"; trendClass = "badge-bullish"; }
                else if (currentPrice < sma50) { trendVerdict = "Bearish Phase"; trendClass = "badge-bearish"; }
                
                document.getElementById('market-badge').innerText = trendVerdict;
                document.getElementById('market-badge').className = `direction-badge ${trendClass}`;

            } catch (error) {
                console.error("DIAGNOSTICS ERROR: ", error);
                
                document.getElementById('asset-price').innerText = "Error";
                document.getElementById('market-badge').innerText = "Failed";
                document.getElementById('market-badge').className = "direction-badge badge-bearish";
                
                let errorMessageText = error.message;

                if (errorMessageText === "API_KEY_MISSING") {
                    document.getElementById('signal-display').innerHTML = `
                        <div class="signal-box signal-error">
                            <div class="signal-header">🔑 API Key Missing</div>
                            <p style="font-size: 0.8rem; line-height: 1.4;">To fetch Forex indices or Spot Gold (XAU/USD), you must register a free API Key on <strong>twelvedata.com</strong> and paste it into the key configuration field above.</p>
                        </div>`;
                } else if (errorMessageText.includes("rate limit") || errorMessageText.includes("credits")) {
                    document.getElementById('signal-display').innerHTML = `
                        <div class="signal-box signal-error">
                            <div class="signal-header">⏳ API Rate Limit Hit</div>
                            <p style="font-size: 0.8rem; line-height: 1.4;">Twelve Data restricts free accounts to 8 requests per minute. Wait 60 seconds and try clicking 'Evaluate & Calculate' again.</p>
                        </div>`;
                } else {
                    document.getElementById('signal-display').innerHTML = `
                        <div class="signal-box signal-error">
                            <div class="signal-header">❌ System Error</div>
                            <p style="font-size: 0.8rem; line-height: 1.4; margin-bottom: 5px;">A connection or validation error occurred:</p>
                            <code style="font-size: 0.72rem; background: rgba(0,0,0,0.3); padding: 2px 5px; border-radius: 4px; display: block;">${errorMessageText}</code>
                            <p style="font-size: 0.75rem; margin-top: 5px; color: var(--text-secondary);">If you selected Gold/Forex, double check your Twelve Data API key is pasted correctly.</p>
                        </div>`;
                }
            }
        }

        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./sw.js')
                    .then(reg => console.log('Service Worker Registered'))
                    .catch(err => console.log('Service Worker Failed: ', err));
            });
        }

        function fetchData() {
            fetchMarketData();
        }

        fetchData();
    </script>
</body>
</html>
