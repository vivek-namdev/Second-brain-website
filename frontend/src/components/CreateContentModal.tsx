import { useRef, useState } from "react";
import { CrossIcon } from "../icons/Crossicon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
    Youtube = "Youtube",
    Twitter = "Twitter"
}

export function CreateContentModal({ open, onClose }) {
    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const [type, setType] = useState(ContentType.Youtube);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
    
        await axios.post(`${BACKEND_URL}/api/v1/content`, {  // Corrected URL string
            link,
            title,
            type
        }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}` // Corrected Authorization header
            }
        });
    }

    return (
        <div>
            {open && (
                <div className="w-screen h-screen bg-gray-500 bg-opacity-50 fixed top-0 left-0 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <div className="flex justify-end">
                            <div className="cursor-pointer" onClick={onClose}>
                                <CrossIcon />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <Input reference={titleRef} placeholder="Title" />
                            <Input reference={linkRef} placeholder="Link" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold mb-2">Type</h1>
                            <div className="flex gap-2">
                                <Button
                                    text="Youtube"
                                    variant={type === ContentType.Youtube ? "primary" : "secondary"}
                                    onClick={() => setType(ContentType.Youtube)}
                                    className="w-full"
                                />
                                <Button
                                    text="Twitter"
                                    variant={type === ContentType.Twitter ? "primary" : "secondary"}
                                    onClick={() => setType(ContentType.Twitter)}
                                    className="w-full"
                                />
                            </div>
                        </div>
                        <div className="flex justify-center mt-4">
                            <Button onClick={addContent} variant="primary" text="Submit" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}