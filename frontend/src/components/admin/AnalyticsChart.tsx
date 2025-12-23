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
} from 'recharts';

interface ChartDataPoint {
    date: string;
    appointments: number;
    revenue: number;
}

interface AnalyticsChartProps {
    data: ChartDataPoint[];
}

// Custom tooltip for clean display
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                <p className="font-semibold text-gray-800 mb-2">{label}</p>
                <div className="space-y-1 text-sm">
                    <div className="flex justify-between gap-4">
                        <span className="text-blue-600">Appointments:</span>
                        <span className="font-medium">{payload.find((p: any) => p.dataKey === 'appointments')?.value || 0}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                        <span className="text-green-600">Revenue:</span>
                        <span className="font-medium">${(payload.find((p: any) => p.dataKey === 'revenue')?.value || 0).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export function AnalyticsChart({ data }: AnalyticsChartProps) {
    // Calculate max values for proper axis scaling
    const maxAppointments = Math.max(...data.map(d => d.appointments), 1);
    const maxRevenue = Math.max(...data.map(d => d.revenue), 100);
    
    // Round up to nice numbers for axis
    const appointmentAxisMax = Math.ceil(maxAppointments / 5) * 5 || 10;
    const revenueAxisMax = Math.ceil(maxRevenue / 100) * 100 || 500;

    return (
        <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />

                <XAxis
                    dataKey="date"
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    tickLine={{ stroke: '#9CA3AF' }}
                />

                {/* Left Y-Axis for Revenue */}
                <YAxis
                    yAxisId="left"
                    orientation="left"
                    label={{ value: 'Revenue ($)', angle: -90, position: 'insideLeft', style: { fill: '#10B981', fontWeight: 600 } }}
                    tick={{ fill: '#10B981', fontSize: 12 }}
                    domain={[0, revenueAxisMax]}
                    tickFormatter={(value) => `$${value}`}
                />

                {/* Right Y-Axis for Appointments */}
                <YAxis
                    yAxisId="right"
                    orientation="right"
                    label={{ value: 'Appointments', angle: 90, position: 'insideRight', style: { fill: '#3B82F6', fontWeight: 600 } }}
                    tick={{ fill: '#3B82F6', fontSize: 12 }}
                    domain={[0, appointmentAxisMax]}
                    allowDecimals={false}
                />

                <Tooltip content={<CustomTooltip />} />

                <Legend
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="rect"
                />

                {/* Revenue as Bars */}
                <Bar
                    yAxisId="left"
                    dataKey="revenue"
                    fill="#10B981"
                    name="Revenue ($)"
                    radius={[4, 4, 0, 0]}
                    opacity={0.8}
                    isAnimationActive={true}
                    animationDuration={500}
                />

                {/* Appointments as Line */}
                <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="appointments"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', r: 5, strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 7, stroke: '#3B82F6', strokeWidth: 2, fill: '#fff' }}
                    name="Appointments"
                    isAnimationActive={true}
                    animationDuration={500}
                />
            </ComposedChart>
        </ResponsiveContainer>
    );
}
