import React, { useMemo } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";

/* ------------------ DUMMY DATA ------------------ */

const PRODUCTS = [
    { createdAt: "2025-12-16T16:02:21.193Z" },
    { createdAt: "2025-12-16T05:34:30.554Z" },
    { createdAt: "2025-12-16T05:11:22.058Z" },
    { createdAt: "2025-12-15T10:06:11.081Z" },
    { createdAt: "2025-12-15T10:05:39.768Z" },
    { createdAt: "2025-12-15T10:01:50.806Z" },
    { createdAt: "2025-12-15T10:00:34.577Z" },
    { createdAt: "2025-12-15T09:59:59.304Z" },
    { createdAt: "2025-12-13T14:39:29.300Z" },
    { createdAt: "2025-12-12T11:03:23.752Z" },
    { createdAt: "2025-12-07T14:32:22.279Z" },
    { createdAt: "2025-12-07T14:29:23.930Z" },
];

const USERS = [
    { registrationTime: "2025-12-16T06:17:13.132Z" },
    { registrationTime: "2025-12-16T06:15:38.124Z" },
    { registrationTime: "2025-12-11T20:04:17.266Z" },
    { registrationTime: "2025-12-07T08:43:44.989Z" },
    { registrationTime: "2025-12-07T08:30:42.434Z" },
];

/* ------------------ HELPERS ------------------ */

const groupByDate = (items, dateKey) => {
    const map = {};

    items.forEach((item) => {
        const date = new Date(item[dateKey]).toISOString().split("T")[0];
        map[date] = (map[date] || 0) + 1;
    });

    return Object.entries(map).map(([date, count]) => ({
        date,
        count,
    }));
};

/* ------------------ COMPONENT ------------------ */

const DashboardCharts = () => {
    const productChartData = useMemo(
        () => groupByDate(PRODUCTS, "createdAt"),
        []
    );

    const userChartData = useMemo(
        () => groupByDate(USERS, "registrationTime"),
        []
    );

    return (
        <div className="max-w-[1440px] mt-10 mx-auto px-4 py-10 gap-5 space-y-10 flex flex-col lg:flex-row">
            <div className="bg-white flex-1 rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-black">
                    Products Created Per Day
                </h2>

                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={productChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="count" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white h-fit flex-1 rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-black">
                    User Registrations Per Day
                </h2>

                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={userChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Line type="monotone" dataKey="count" strokeWidth={3} dot={{ r: 5 }}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardCharts;
