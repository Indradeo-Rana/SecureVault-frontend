
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import SharedCredentialCard from "../../components/SharedCredentialCard";

function ReceivedShares() {

    const [shares, setShares] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchShares();
    }, []);

    const fetchShares = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:8080/api/shares/received",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to fetch shared credentials"
                );
            }

            const data = await response.json();

            setShares(data);

        } catch (error) {

            console.error(error);

            alert(
                "Failed to load shared credentials"
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <Layout>

            <div className="mb-6">

                <h1 className="text-3xl font-bold text-slate-800">
                    Shared With Me
                </h1>

                <p className="text-slate-500 mt-1">
                    Credentials shared with you by other users.
                </p>

            </div>

            {loading ? (

                <div className="text-center py-20">
                    Loading...
                </div>

            ) : shares.length === 0 ? (

                <div className="bg-white border rounded-xl p-10 text-center">

                    <p className="text-slate-500">
                        No credentials have been shared with you.
                    </p>

                </div>

            ) : (

                <div className="space-y-4">

                    {shares.map((share) => (

                        <SharedCredentialCard
                            key={share.id}
                            share={share}
                        />

                    ))}

                </div>

            )}

        </Layout>
    );
}

export default ReceivedShares;