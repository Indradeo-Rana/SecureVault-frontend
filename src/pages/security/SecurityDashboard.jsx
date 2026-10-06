import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import {ToastContainer, toast } from "react-toastify";
import API_BASE_URL from "../../config/api";


const SecurityDashboard = () => {
    const [range, setRange] = useState("TODAY");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [analytics, setAnalytics] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // --------------------------------------------------
    // Fetch Analytics
    // --------------------------------------------------

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("You are not logged in.");
            }

            const requestBody = {
                range: range,
            };

            if (range === "CUSTOM") {
                if (!startDate || !endDate) {
                    setLoading(false);
                    setError("Please select both start date and end date.");
                    return;
                }

                requestBody.startDate = startDate;
                requestBody.endDate = endDate;
            }

            const response = await fetch(
                `${API_BASE_URL}/api/analytics/security`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(requestBody),
                }
            );

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error(
                        "Your session has expired. Please login again."
                    );
                }

                if (response.status === 403) {
                    throw new Error(
                        "You are not authorized to view security analytics."
                    );
                }

                throw new Error("Failed to load security analytics.");
            }

            const data = await response.json();

            setAnalytics(data);
        } catch (err) {
            console.error("Security analytics error:", err);
            toast.error(
                err.message || "Something went wrong while loading analytics."
            );

            setError(
                err.message || "Something went wrong while loading analytics."
            );

            setAnalytics(null);
        } finally {
            setLoading(false);
        }
    };

    // --------------------------------------------------
    // Initial load + Today / Last 7 Days change
    // --------------------------------------------------

    useEffect(() => {
        if (range === "TODAY" || range === "LAST_7_DAYS") {
            fetchAnalytics();
        }
    }, [range]);

    // --------------------------------------------------
    // Custom Date Apply
    // --------------------------------------------------

    const handleCustomDateApply = () => {
        if (!startDate || !endDate) {
            setError("Please select both start date and end date.");
            return;
        }

        if (startDate > endDate) {
            setError("Start date cannot be after end date.");
            return;
        }

        setError("");
        fetchAnalytics();
    };

    // --------------------------------------------------
    // Range Button
    // --------------------------------------------------

    const handleRangeChange = (selectedRange) => {
        setRange(selectedRange);
        setError("");
    };

    // --------------------------------------------------
    // Activity Icon
    // --------------------------------------------------

    const getActivityIcon = (type) => {
        switch (type) {
            case "LOGIN_SUCCESS":
                return (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                        ✓
                    </div>
                );

            case "LOGIN_FAILURE":
                return (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                        !
                    </div>
                );

            case "SECURITY_ALERT":
                return (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                        ⚠
                    </div>
                );

            case "AUDIT":
                return (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        ⓘ
                    </div>
                );

            default:
                return (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                        •
                    </div>
                );
        }
    };

    // --------------------------------------------------
    // Activity Label
    // --------------------------------------------------

    const getActivityLabel = (type) => {
        switch (type) {
            case "LOGIN_SUCCESS":
                return "Successful Login";

            case "LOGIN_FAILURE":
                return "Failed Login";

            case "SECURITY_ALERT":
                return "Security Alert";

            case "AUDIT":
                return "Audit Activity";

            default:
                return "Security Activity";
        }
    };

    // --------------------------------------------------
    // Loading
    // --------------------------------------------------

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="mx-auto max-w-7xl">

                    <div className="mb-8">
                        <div className="h-8 w-64 animate-pulse rounded bg-gray-200"></div>
                        <div className="mt-3 h-4 w-96 animate-pulse rounded bg-gray-200"></div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="h-32 animate-pulse rounded-2xl bg-white shadow-sm"
                            ></div>
                        ))}
                    </div>

                    <div className="mt-8 h-96 animate-pulse rounded-2xl bg-white shadow-sm"></div>
                </div>
            </div>
        );
    }

    // --------------------------------------------------
    // Main UI
    // --------------------------------------------------

    return (
        <Layout >
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

            <div className="mx-auto max-w-7xl">

                {/* =====================================================
                    HEADER
                ====================================================== */}

                <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                            Security Dashboard
                        </h1>

                        <p className="mt-2 text-sm text-gray-500 sm:text-base">
                            Monitor your account security and recent activity.
                        </p>

                        {analytics && (
                            <p className="mt-2 text-xs text-gray-400">
                                Showing data from{" "}
                                <span className="font-medium text-gray-500">
                                    {analytics.startDate}
                                </span>{" "}
                                to{" "}
                                <span className="font-medium text-gray-500">
                                    {analytics.endDate}
                                </span>
                            </p>
                        )}
                    </div>

                    {/* Range Selector */}

                    <div className="rounded-xl border border-gray-200 bg-white p-1 shadow-sm">

                        <div className="flex flex-wrap gap-1">

                            <button
                                onClick={() =>
                                    handleRangeChange("TODAY")
                                }
                                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                                    range === "TODAY"
                                        ? "bg-gray-900 text-white shadow"
                                        : "text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                Today
                            </button>

                            <button
                                onClick={() =>
                                    handleRangeChange("LAST_7_DAYS")
                                }
                                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                                    range === "LAST_7_DAYS"
                                        ? "bg-gray-900 text-white shadow"
                                        : "text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                Last 7 Days
                            </button>

                            <button
                                onClick={() =>
                                    handleRangeChange("CUSTOM")
                                }
                                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                                    range === "CUSTOM"
                                        ? "bg-gray-900 text-white shadow"
                                        : "text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                Custom
                            </button>

                        </div>
                    </div>
                </div>


                {/* =====================================================
                    ERROR
                ====================================================== */}

                {error && (
                    <div className="mb-6 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">

                        <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-red-600">
                                !
                            </div>

                            <p className="text-sm font-medium text-red-700">
                                {error}
                            </p>

                        </div>

                        <button
                            onClick={fetchAnalytics}
                            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                        >
                            Retry
                        </button>

                    </div>
                )}


                {/* =====================================================
                    CUSTOM DATE RANGE
                ====================================================== */}

                {range === "CUSTOM" && (
                    <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                        <div className="mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Select Date Range
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Choose the period you want to analyze.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Start Date
                                </label>

                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) =>
                                        setStartDate(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    End Date
                                </label>

                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) =>
                                        setEndDate(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                                />
                            </div>

                            <div className="flex items-end">

                                <button
                                    onClick={handleCustomDateApply}
                                    className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                                >
                                    Apply Date Range
                                </button>

                            </div>

                        </div>
                    </div>
                )}


                {/* =====================================================
                    ANALYTICS CARDS
                ====================================================== */}

                {analytics && (
                    <>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                            {/* Successful Logins */}

                            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

                                <div className="flex items-start justify-between">

                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            Successful Logins
                                        </p>

                                        <h2 className="mt-3 text-3xl font-bold text-gray-900">
                                            {analytics.successfulLogins}
                                        </h2>

                                        <p className="mt-2 text-xs text-gray-500">
                                            Login attempts completed successfully
                                        </p>
                                    </div>

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-xl text-green-600">
                                        ✓
                                    </div>

                                </div>

                            </div>


                            {/* Failed Logins */}

                            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

                                <div className="flex items-start justify-between">

                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            Failed Logins
                                        </p>

                                        <h2 className="mt-3 text-3xl font-bold text-gray-900">
                                            {analytics.failedLogins}
                                        </h2>

                                        <p className="mt-2 text-xs text-gray-500">
                                            Unsuccessful login attempts
                                        </p>
                                    </div>

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-xl text-red-600">
                                        !
                                    </div>

                                </div>

                            </div>


                            {/* Suspicious Activities */}

                            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

                                <div className="flex items-start justify-between">

                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            Suspicious Activities
                                        </p>

                                        <h2 className="mt-3 text-3xl font-bold text-gray-900">
                                            {analytics.suspiciousActivities}
                                        </h2>

                                        <p className="mt-2 text-xs text-gray-500">
                                            Security events detected
                                        </p>
                                    </div>

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-600">
                                        ⚠
                                    </div>

                                </div>

                            </div>


                            {/* Active Alerts */}

                            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

                                <div className="flex items-start justify-between">

                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            Active Security Alerts
                                        </p>

                                        <h2 className="mt-3 text-3xl font-bold text-gray-900">
                                            {analytics.activeSecurityAlerts}
                                        </h2>

                                        <p className="mt-2 text-xs text-gray-500">
                                            Unread security alerts
                                        </p>
                                    </div>

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-xl text-purple-600">
                                        🔔
                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* =====================================================
                            RECENT ACTIVITY
                        ====================================================== */}

                        <div className="mt-8 rounded-2xl border border-gray-200 bg-white shadow-sm">

                            <div className="border-b border-gray-100 px-5 py-5 sm:px-6">

                                <div className="flex items-center justify-between">

                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            Recent Security Activity
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Latest security-related events from your account.
                                        </p>
                                    </div>

                                </div>

                            </div>


                            {/* Activity List */}

                            {analytics.recentSecurityActivity &&
                            analytics.recentSecurityActivity.length > 0 ? (

                                <div className="divide-y divide-gray-100">

                                    {analytics.recentSecurityActivity.map(
                                        (activity, index) => (

                                            <div
                                                key={`${activity.type}-${activity.timestamp}-${index}`}
                                                className="flex items-center gap-4 px-5 py-4 transition hover:bg-gray-50 sm:px-6"
                                            >

                                                {/* Icon */}

                                                {getActivityIcon(activity.type)}


                                                {/* Content */}

                                                <div className="min-w-0 flex-1">

                                                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

                                                        <div>

                                                            <p className="truncate text-sm font-semibold text-gray-900">
                                                                {activity.description}
                                                            </p>

                                                            <p className="mt-1 text-xs text-gray-500">
                                                                {getActivityLabel(
                                                                    activity.type
                                                                )}
                                                            </p>

                                                        </div>

                                                        <p className="whitespace-nowrap text-xs text-gray-400">
                                                            {new Date(
                                                                activity.timestamp
                                                            ).toLocaleString()}
                                                        </p>

                                                    </div>

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>

                            ) : (

                                /* Empty State */

                                <div className="px-6 py-16 text-center">

                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl text-gray-400">
                                        ✓
                                    </div>

                                    <h3 className="mt-4 text-base font-semibold text-gray-900">
                                        No security activity
                                    </h3>

                                    <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                                        There is no security activity recorded
                                        for the selected date range.
                                    </p>

                                </div>

                            )}

                        </div>


                        {/* =====================================================
                            SECURITY STATUS
                        ====================================================== */}

                        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                <div>

                                    <h2 className="text-base font-semibold text-gray-900">
                                        Security Overview
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Current activity summary for the selected period.
                                    </p>

                                </div>

                                <div className="flex items-center gap-2">

                                    <span
                                        className={`h-2.5 w-2.5 rounded-full ${
                                            analytics.activeSecurityAlerts > 0
                                                ? "bg-orange-500"
                                                : "bg-green-500"
                                        }`}
                                    ></span>

                                    <span className="text-sm font-medium text-gray-700">

                                        {analytics.activeSecurityAlerts > 0
                                            ? "Attention required"
                                            : "No active alerts"}

                                    </span>

                                </div>

                            </div>

                        </div>

                    </>
                )}

            </div>
        </div>
         < ToastContainer />
        </Layout>
    );
};

export default SecurityDashboard;