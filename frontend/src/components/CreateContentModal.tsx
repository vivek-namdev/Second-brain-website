import { useRef, useState } from "react";
import { CrossIcon } from "../icons/Crossicon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

// controlled component
export function CreateContentModal({ open, onClose }) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);
    const [error, setError] = useState<string | null>(null);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        const token = localStorage.getItem("token");

        // Check if token exists
        if (!token) {
            setError("No token found. Please log in.");
            return;
        }

        try {
            await axios.post(
                `${BACKEND_URL}/api/v1/content`,
                {
                    link,
                    title,
                    type,
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );
            onClose(); // Close modal on success
        } catch (err: any) {
            // Handle 401 error or any other error
            if (err.response?.status === 401) {
                setError("Unauthorized. Please log in again.");
            } else {
                setError(err.message || "An error occurred.");
            }
        }
    }

    return (
        <div>
            {open && (
                <div>
                    <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"></div>
                    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
                        <div className="flex flex-col justify-center">
                            <span className="bg-white opacity-100 p-4 rounded fixed">
                                <div className="flex justify-end">
                                    <div onClick={onClose} className="cursor-pointer">
                                        <CrossIcon />
                                    </div>
                                </div>
                                <div>
                                    <Input reference={titleRef} placeholder={"Title"} />
                                    <Input reference={linkRef} placeholder={"Link"} />
                                </div>
                                <div>
                                    <h1>Type</h1>
                                    <div className="flex gap-1 justify-center pb-2">
                                        <Button
                                            text="Youtube"
                                            variant={type === ContentType.Youtube ? "primary" : "secondary"}
                                            onClick={() => {
                                                setType(ContentType.Youtube);
                                            }}
                                        />
                                        <Button
                                            text="Twitter"
                                            variant={type === ContentType.Twitter ? "primary" : "secondary"}
                                            onClick={() => {
                                                setType(ContentType.Twitter);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <Button onClick={addContent} variant="primary" text="Submit" />
                                </div>
                                {error && <div className="text-red-500 mt-4">{error}</div>} {/* Display error */}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}