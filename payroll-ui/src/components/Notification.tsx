import "./Notification.css";

interface Props {
    message: string;
    type: "success" | "error";
}

export default function Notification({
    message,
    type
}: Props) {
    return (
        <div className={`notification ${type}`}>
            {message}
        </div>
    );
}