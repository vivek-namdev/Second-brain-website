import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if (!username || !password) {
            console.error("Username or password is missing.");
            return;
        }

        try {
            const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
                username,
                password
            });

            if (response.data.token) {
                const jwt = response.data.token;
                localStorage.setItem("token", jwt);
                navigate("/dashboard");
            } else {
                console.error("No token received from server");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Signin failed:", error.response?.data || error.message);
                if (error.response?.status === 403) {
                    console.error("Forbidden: Incorrect username or password.");
                }
            } else {
                console.error("An unexpected error occurred:", error);
            }
        }
    }

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8">
                <Input reference={usernameRef} placeholder="Username" />
                <Input reference={passwordRef} placeholder="Password" />
                <div className="flex justify-center pt-4">
                    <Button onClick={signin} loading={false} variant="primary" text="Signin" fullWidth={true} />
                </div>
            </div>
        </div>
    );
}