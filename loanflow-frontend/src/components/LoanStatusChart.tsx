import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell,
} from "recharts";

type LoanStatusChartProps = {
    approved: number;
    pending: number;
    rejected: number;
};

function LoanStatusChart({
                             approved,
                             pending,
                             rejected,
                         }: LoanStatusChartProps) {

    const data = [
        {
            status: "Approved",
            count: approved,
            color: "#16a34a",
        },
        {
            status: "Pending",
            count: pending,
            color: "#f59e0b",
        },
        {
            status: "Rejected",
            count: rejected,
            color: "#dc2626",
        },
    ];

    return (
        <div className="chart-card">
            <h3>Loan Status Overview</h3>

            <ResponsiveContainer width="100%" height={260}>
                <BarChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        left: 10,
                        bottom: 10,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="status" />

                    <YAxis allowDecimals={false} />

                    <Tooltip />

                    <Bar
                        dataKey="count"
                        radius={[8, 8, 0, 0]}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={entry.color}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default LoanStatusChart;