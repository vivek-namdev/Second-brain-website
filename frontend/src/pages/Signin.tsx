import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signin() {
    // Using refs to access input values
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    // Async function to handle sign-in
    async function signin() {
        try {
            // Extract values from input fields
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;

            if (!username || !password) {
                alert("Please fill in both username and password.");
                return;
            }

            // Make API request to backend
            const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                username,
                password,
            });

            // Handle successful response
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);

            // Navigate to dashboard
            navigate("/dashboard");
        } catch (error) {
            // Handle error
            if (axios.isAxiosError(error)) {
                console.error("Axios error: ", error.response?.data || error.message);
                alert(error.response?.data?.message || "Sign-in failed. Please try again.");
            } else {
                console.error("Unexpected error: ", error);
                alert("An unexpected error occurred. Please try again.");
            }
        }
    }

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8">
                {/* Username input */}
                <Input reference={usernameRef} placeholder="Username" />
                {/* Password input */}
                <Input reference={passwordRef} type="password" placeholder="Password" />
                <div className="flex justify-center pt-4">
                    {/* Sign-in button */}
                    <Button onClick={signin} variant="primary" text="Signin" />
                </div>
            </div>
        </div>
    );
}