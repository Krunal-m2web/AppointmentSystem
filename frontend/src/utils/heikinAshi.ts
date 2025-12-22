/**
 * Heikin Ashi Chart Utilities
 * Converts regular OHLC data to Heikin Ashi candles for smoother trend visualization
 */

export interface HeikinAshiCandle {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  appointments: number;
  revenue: number;
}

export interface ChartDataPoint {
  date: string;
  appointments: number;
  revenue: number;
}

/**
 * Calculate Heikin Ashi candles from appointments and revenue data
 * For this use case, we'll treat revenue as the primary value for OHLC calculation
 */
export function calculateHeikinAshi(data: ChartDataPoint[]): HeikinAshiCandle[] {
  if (data.length === 0) return [];

  const heikinAshiData: HeikinAshiCandle[] = [];

  for (let i = 0; i < data.length; i++) {
    const current = data[i];
    const prev = i > 0 ? heikinAshiData[i - 1] : null;

    // For the first candle, use actual values
    // For subsequent candles, calculate Heikin Ashi values
    
    // Simulate OHLC from single revenue value
    // We'll add some variance to create realistic candles
    const variance = current.revenue * 0.1; // 10% variance
    const open = current.revenue - variance / 2;
    const close = current.revenue + variance / 2;
    const high = Math.max(open, close) + variance / 4;
    const low = Math.min(open, close) - variance / 4;

    let haOpen: number;
    let haClose: number;
    let haHigh: number;
    let haLow: number;

    if (prev === null) {
      // First candle: use actual values
      haOpen = open;
      haClose = (open + high + low + close) / 4;
      haHigh = high;
      haLow = low;
    } else {
      // Heikin Ashi calculations
      haOpen = (prev.open + prev.close) / 2;
      haClose = (open + high + low + close) / 4;
      haHigh = Math.max(high, haOpen, haClose);
      haLow = Math.min(low, haOpen, haClose);
    }

    heikinAshiData.push({
      date: current.date,
      open: Math.max(0, haOpen),
      high: Math.max(0, haHigh),
      low: Math.max(0, haLow),
      close: Math.max(0, haClose),
      appointments: current.appointments,
      revenue: current.revenue,
    });
  }

  return heikinAshiData;
}

/**
 * Determine candle color based on Heikin Ashi values
 */
export function getCandleColor(candle: HeikinAshiCandle): string {
  return candle.close >= candle.open ? '#10B981' : '#EF4444'; // Green for bullish, Red for bearish
}

/**
 * Calculate candle body and wick positions for rendering
 */
export function getCandlePositions(candle: HeikinAshiCandle) {
  const bodyTop = Math.max(candle.open, candle.close);
  const bodyBottom = Math.min(candle.open, candle.close);
  const bodyHeight = Math.abs(candle.close - candle.open);
  
  return {
    bodyTop,
    bodyBottom,
    bodyHeight,
    wickTop: candle.high,
    wickBottom: candle.low,
    upperWickHeight: candle.high - bodyTop,
    lowerWickHeight: bodyBottom - candle.low,
  };
}
