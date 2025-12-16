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

function DashboardCharts({ allUsers = [], allProducts = [] }) {

    /* -------- PRODUCTS GROUPING -------- */
    const productChartData = useMemo(() => {
        const map = {};

        allProducts.forEach((product) => {
            if (!product?.createdAt) return;

            const date = new Date(product.createdAt)
                .toISOString()
                .split("T")[0];

            map[date] = (map[date] || 0) + 1;
        });

        return Object.entries(map)
            .sort(([a], [b]) => new Date(a) - new Date(b))
            .map(([date, count]) => ({ date, count }));
    }, [allProducts]);

    /* -------- USERS GROUPING -------- */
    const userChartData = useMemo(() => {
        const map = {};

        allUsers.forEach((user) => {
            if (!user?.registrationTime) return;

            const date = new Date(user.registrationTime)
                .toISOString()
                .split("T")[0];

            map[date] = (map[date] || 0) + 1;
        });

        return Object.entries(map)
            .sort(([a], [b]) => new Date(a) - new Date(b))
            .map(([date, count]) => ({ date, count }));
    }, [allUsers]);

    return (
        <div className="max-w-[1440px] mt-10 mx-auto px-4 py-10 gap-5 space-y-10 flex flex-col lg:flex-row">

            {/* -------- PRODUCTS CHART -------- */}
            <div className="bg-white flex-1 rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-black">
                    Products Created Per Day
                </h2>

                {productChartData.length === 0 ? (
                    <p className="text-gray-500 text-center mt-10">
                        No product data available
                    </p>
                ) : (
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
                )}
            </div>

            {/* -------- USERS CHART -------- */}
            <div className="bg-white h-fit flex-1 rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-black">
                    User Registrations Per Day
                </h2>

                {userChartData.length === 0 ? (
                    <p className="text-gray-500 text-center mt-10">
                        No user registration data available
                    </p>
                ) : (
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={userChartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    strokeWidth={3}
                                    dot={{ r: 5 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DashboardCharts;
