import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import {ToastContainer, toast } from "react-toastify";
import API_BASE_URL from "../../config/api";

const SecurityReports = () => {

    const [range, setRange] = useState("TODAY");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [report, setReport] = useState(null);

    const [loading, setLoading] = useState(true);

    const fetchReport = async () => {

        try {

            setLoading(true);

            const token =
                localStorage.getItem("token");

            const body = {
                range
            };

            if (range === "CUSTOM") {

                if (!startDate || !endDate) {
                    toast.error(
                        "Please select both dates"
                    );
                    return;
                }

                if (startDate > endDate) {
                    toast.error(
                        "Start date cannot be after end date"
                    );
                    return;
                }

                body.startDate = startDate;
                body.endDate = endDate;
            }

            const response = await fetch(
                `${API_BASE_URL}/api/reports/security`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(body)
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to load security report"
                );
            }

            const data =
                await response.json();

            setReport(data);

        } catch (error) {

            console.error(error);

            toast.error(
                "Failed to load security report"
            );

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {

        if (
            range === "TODAY" ||
            range === "LAST_7_DAYS"
        ) {
            fetchReport();
        }

    }, [range]);

    const exportCSV = () => {

        if (!report) {
            return;
        }

        const rows = [
            ["Security Report"],
            [],
            ["Start Date", report.startDate],
            ["End Date", report.endDate],
            [],
            ["Metric", "Value"],

            [
                "Successful Logins",
                report.successfulLogins
            ],

            [
                "Failed Logins",
                report.failedLogins
            ],

            [
                "Suspicious Activities",
                report.suspiciousActivities
            ],

            [
                "Active Security Alerts",
                report.activeSecurityAlerts
            ],

            [
                "Total Passwords",
                report.totalPasswords
            ],

            [
                "Strong Passwords",
                report.strongPasswords
            ],

            [
                "Medium Passwords",
                report.mediumPasswords
            ],

            [
                "Weak Passwords",
                report.weakPasswords
            ],

            [
                "Reused Password Groups",
                report.reusedPasswordGroups
            ]
        ];

        const csv = rows
            .map(row =>
                row
                    .map(value =>
                        `"${String(value ?? "")
                            .replace(/"/g, '""')}"`
                    )
                    .join(",")
            )
            .join("\n");

        const blob =
            new Blob(
                [csv],
                {
                    type: "text/csv;charset=utf-8;"
                }
            );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            `securevault-security-report-${report.startDate}-to-${report.endDate}.csv`;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);

        toast.success(
            "Security report exported successfully"
        );
    };

    if (loading) {

        return (
            <Layout>

                <div className="p-6">

                    <p className="text-slate-500">
                        Loading security report...
                    </p>

                </div>

            </Layout>
        );
    }

    return (
        <Layout>

            <div className="mb-6">

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                    <div>

                        <h1 className="text-3xl font-bold text-slate-800">
                            Security Reports
                        </h1>

                        <p className="mt-1 text-slate-500">
                            Review your security activity and password health.
                        </p>

                    </div>

                    <button
                        onClick={exportCSV}
                        className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
                    >
                        Export CSV
                    </button>

                </div>

            </div>


            {/* DATE FILTER */}

            <div className="mb-6 rounded-xl border bg-white p-5">

                <div className="flex flex-wrap gap-2">

                    <button
                        onClick={() =>
                            setRange("TODAY")
                        }
                        className={`rounded-lg px-4 py-2 text-sm ${
                            range === "TODAY"
                                ? "bg-slate-900 text-white"
                                : "border text-slate-600"
                        }`}
                    >
                        Today
                    </button>

                    <button
                        onClick={() =>
                            setRange("LAST_7_DAYS")
                        }
                        className={`rounded-lg px-4 py-2 text-sm ${
                            range === "LAST_7_DAYS"
                                ? "bg-slate-900 text-white"
                                : "border text-slate-600"
                        }`}
                    >
                        Last 7 Days
                    </button>

                    <button
                        onClick={() =>
                            setRange("CUSTOM")
                        }
                        className={`rounded-lg px-4 py-2 text-sm ${
                            range === "CUSTOM"
                                ? "bg-slate-900 text-white"
                                : "border text-slate-600"
                        }`}
                    >
                        Custom
                    </button>

                </div>


                {range === "CUSTOM" && (

                    <div className="mt-5 grid gap-4 md:grid-cols-3">

                        <div>

                            <label className="mb-1 block text-sm font-medium">
                                Start Date
                            </label>

                            <input
                                type="date"
                                value={startDate}
                                onChange={e =>
                                    setStartDate(e.target.value)
                                }
                                className="w-full rounded-lg border px-3 py-2"
                            />

                        </div>


                        <div>

                            <label className="mb-1 block text-sm font-medium">
                                End Date
                            </label>

                            <input
                                type="date"
                                value={endDate}
                                onChange={e =>
                                    setEndDate(e.target.value)
                                }
                                className="w-full rounded-lg border px-3 py-2"
                            />

                        </div>


                        <div className="flex items-end">

                            <button
                                onClick={fetchReport}
                                className="w-full rounded-lg bg-slate-900 px-4 py-2 text-white"
                            >
                                Apply
                            </button>

                        </div>

                    </div>
                )}

            </div>


            {report && (

                <>

                    {/* LOGIN */}

                    <div className="mb-6">

                        <h2 className="mb-4 text-xl font-bold text-slate-800">
                            Login Activity
                        </h2>

                        <div className="grid gap-4 md:grid-cols-2">

                            <ReportCard
                                title="Successful Logins"
                                value={report.successfulLogins}
                                description="Successful authentication attempts"
                                className="text-green-600"
                            />

                            <ReportCard
                                title="Failed Logins"
                                value={report.failedLogins}
                                description="Failed authentication attempts"
                                className="text-red-600"
                            />

                        </div>

                    </div>


                    {/* SECURITY */}

                    <div className="mb-6">

                        <h2 className="mb-4 text-xl font-bold text-slate-800">
                            Security Monitoring
                        </h2>

                        <div className="grid gap-4 md:grid-cols-2">

                            <ReportCard
                                title="Suspicious Activities"
                                value={report.suspiciousActivities}
                                description="Detected suspicious events"
                                className="text-orange-600"
                            />

                            <ReportCard
                                title="Active Security Alerts"
                                value={report.activeSecurityAlerts}
                                description="Unread security alerts"
                                className="text-purple-600"
                            />

                        </div>

                    </div>


                    {/* PASSWORD */}

                    <div className="mb-6">

                        <h2 className="mb-4 text-xl font-bold text-slate-800">
                            Password Health
                        </h2>

                        <div className="grid gap-4 md:grid-cols-4">

                            <ReportCard
                                title="Total"
                                value={report.totalPasswords}
                                description="Stored passwords"
                            />

                            <ReportCard
                                title="Strong"
                                value={report.strongPasswords}
                                description="Strong passwords"
                                className="text-green-600"
                            />

                            <ReportCard
                                title="Medium"
                                value={report.mediumPasswords}
                                description="Medium strength passwords"
                                className="text-yellow-600"
                            />

                            <ReportCard
                                title="Weak"
                                value={report.weakPasswords}
                                description="Weak passwords"
                                className="text-red-600"
                            />

                        </div>

                    </div>


                    {/* REUSE */}

                    <div className="rounded-xl border bg-white p-5">

                        <h2 className="text-xl font-bold text-slate-800">
                            Password Reuse
                        </h2>

                        <p className="mt-2 text-slate-500">

                            {report.reusedPasswordGroups === 0
                                ? "No password reuse detected."
                                : `${report.reusedPasswordGroups} reused password group(s) detected.`}

                        </p>

                    </div>

                </>
            )}

        </Layout>
    );
};


const ReportCard = ({
    title,
    value,
    description,
    className = ""
}) => {

    return (

        <div className="rounded-xl border bg-white p-5">

            <p className="text-sm text-slate-500">
                {title}
            </p>

            <p
                className={`mt-2 text-3xl font-bold ${className}`}
            >
                {value}
            </p>

            <p className="mt-2 text-xs text-slate-400">
                {description}
            </p>
             < ToastContainer />

        </div>
    );
};


export default SecurityReports;