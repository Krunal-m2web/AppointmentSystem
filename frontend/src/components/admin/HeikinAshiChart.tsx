import React from 'react';
import {
    ResponsiveContainer,
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Cell,
} from 'recharts';
import { calculateHeikinAshi, getCandleColor, type ChartDataPoint, type HeikinAshiCandle } from '../../utils/heikinAshi';

interface HeikinAshiChartProps {
    data: ChartDataPoint[];
}

// Custom shape for Heikin Ashi candles
const HeikinAshiCandle = (props: any) => {
    const { x, y, width, height, fill, payload } = props;

    if (!payload) return null;

    const candle = payload as HeikinAshiCandle;
    const candleWidth = Math.max(width * 0.6, 8); // Minimum width of 8px
    const wickWidth = 2;
    const centerX = x + width / 2;

    // Calculate positions
    const bodyTop = y;
    const bodyHeight = height;
    const wickTop = y - ((candle.high - candle.close) / (candle.close - candle.low)) * height;
    const wickBottom = y + height + ((candle.open - candle.low) / (candle.close - candle.low)) * height;

    // Determine if bullish (green) or bearish (red)
    const isBullish = candle.close >= candle.open;
    const color = isBullish ? '#10B981' : '#EF4444';

    return (
        <g>
            {/* Upper wick */}
            <line
                x1={centerX}
                y1={wickTop}
                x2={centerX}
                y2={bodyTop}
                stroke={color}
                strokeWidth={wickWidth}
            />

            {/* Candle body */}
            <rect
                x={centerX - candleWidth / 2}
                y={bodyTop}
                width={candleWidth}
                height={Math.max(bodyHeight, 1)} // Minimum height of 1px
                fill={color}
                stroke={color}
                strokeWidth={1}
                opacity={isBullish ? 0.8 : 1}
            />

            {/* Lower wick */}
            <line
                x1={centerX}
                y1={bodyTop + bodyHeight}
                x2={centerX}
                y2={wickBottom}
                stroke={color}
                strokeWidth={wickWidth}
            />
        </g>
    );
};

// Custom tooltip
const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload as HeikinAshiCandle;
        const isBullish = data.close >= data.open;

        return (
            <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                <p className="font-semibold text-gray-800 mb-2">{data.date}</p>
                <div className="space-y-1 text-sm">
                    <div className="flex justify-between gap-4">
                        <span className="text-gray-600">Appointments:</span>
                        <span className="font-medium">{data.appointments}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                        <span className="text-gray-600">Revenue:</span>
                        <span className="font-medium">${data.revenue}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="text-xs text-gray-500">
                        <div className="flex justify-between gap-4">
                            <span>Open:</span>
                            <span>${data.open.toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                            <span>High:</span>
                            <span>${data.high.toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                            <span>Low:</span>
                            <span>${data.low.toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                            <span>Close:</span>
                            <span>${data.close.toFixed(0)}</span>
                        </div>
                        <div className={`flex justify-between gap-4 font-medium mt-1 ${isBullish ? 'text-green-600' : 'text-red-600'}`}>
                            <span>Trend:</span>
                            <span>{isBullish ? '↑ Bullish' : '↓ Bearish'}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export function HeikinAshiChart({ data }: HeikinAshiChartProps) {
    const heikinAshiData = calculateHeikinAshi(data);

    // Calculate min and max for Y-axis domain
    const allValues = heikinAshiData.flatMap(d => [d.high, d.low]);
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);
    const padding = (maxValue - minValue) * 0.1;

    return (
        <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={heikinAshiData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <defs>
                    <linearGradient id="appointmentsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />

                <XAxis
                    dataKey="date"
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    tickLine={{ stroke: '#9CA3AF' }}
                />

                <YAxis
                    yAxisId="left"
                    orientation="left"
                    label={{ value: 'Revenue ($)', angle: -90, position: 'insideLeft', style: { fill: '#6B7280' } }}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    domain={[minValue - padding, maxValue + padding]}
                />

                <YAxis
                    yAxisId="right"
                    orientation="right"
                    label={{ value: 'Appointments', angle: 90, position: 'insideRight', style: { fill: '#6B7280' } }}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                />

                <Tooltip content={<CustomTooltip />} />

                <Legend
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="line"
                />

                {/* Heikin Ashi Candles */}
                <Bar
                    yAxisId="left"
                    dataKey="close"
                    fill="#8884d8"
                    shape={<HeikinAshiCandle />}
                    name="Revenue (Heikin Ashi)"
                    isAnimationActive={true}
                    animationDuration={800}
                />

                {/* Appointments Line */}
                <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="appointments"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Appointments"
                    isAnimationActive={true}
                    animationDuration={800}
                />
            </ComposedChart>
        </ResponsiveContainer>
    );
}
