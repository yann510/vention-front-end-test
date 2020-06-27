import React from "react"
import "./Button.css"

interface Props {
    type: "button" | "submit"
    onClick?: () => void
    className?: string
}

function Button(props: React.PropsWithChildren<Props>) {
    const { onClick, children, className, type } = props

    return (
        <button type={type} className={`button ${className}`} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button
