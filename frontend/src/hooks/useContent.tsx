import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";


export function useContent() {
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function refresh() {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("No token found. Please log in.");
            setLoading(false);
            return;
        }

        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                "Authorization": `Bearer ${token}`  // Corrected to include 'Bearer ' before the token
            }
        })
            .then((response) => {
                setContents(response.data.content);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.response ? err.response.data.message : err.message); // Show error message from the server or generic message
                setLoading(false);
            });
    }

    useEffect(() => {
        refresh();
        const interval = setInterval(() => {
            refresh();
        }, 10 * 1000); // Refresh every 10 seconds

        return () => {
            clearInterval(interval);
        };
    }, []);

    return { contents, refresh, loading, error };
}