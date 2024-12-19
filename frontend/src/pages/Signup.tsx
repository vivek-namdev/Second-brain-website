import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    async function signup() {
        const username = usernameRef.current?.value?.trim();
        const password = passwordRef.current?.value?.trim();

        if (!username || !password) {
            setError("Username and password are required.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                username,
                password,
            });

            navigate("/signin");
            alert("You have signed up successfully!");
        } catch (err) {
            setError("Failed to sign up. Please try again.");
            console.error("Signup error:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8">
                <Input reference={usernameRef} placeholder="Username" />
                <Input reference={passwordRef} placeholder="Password" type="password" />
                {error && <p className="text-red-500 text-sm pt-2">{error}</p>}
                <div className="flex justify-center pt-4">
                    <Button
                        onClick={signup}
                        variant="primary"
                        text={loading ? "Signing up..." : "Signup"}
                    />
                </div>
            </div>
        </div>
    );
}