import { ReactElement } from "react";

type Variants = "primary" | "secondary";
interface ButtonProps {
    variant: Variants;
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick: () => void;
}

const variantStyles = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-400 text-purple-600"
}

const sizeStyles = {
    "sm": "py-1 px-2",
    "md": "py-2 px-4",
    "lg": "py-4 px-6"
}

const defaultStyles = "rounded-md flex"

export const Button = (props: ButtonProps) => {
    return <button className={`${variantStyles[props.variant]} ${defaultStyles} 
    ${sizeStyles[props.size]}`}>{props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null} {props.text} {props.endIcon}</button>
}

<Button variant="primary" size="md" onClick={() => {}} text={"asd"}/>