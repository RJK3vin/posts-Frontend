import React from "react";

interface ToastProps {
    message: string;
    show: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, show}) => {
    if (!show) return null;

    return (
        <div className="toast">
          {message}
        </div>
      );
}

export default Toast