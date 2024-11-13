// src/components/ui/toast.ts

import * as React from "react";

// Define the type for a toast action element
export type ToastActionElement = React.ReactNode;

// Define the properties for a toast
export interface ToastProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

// Example component (optional)
export const Toast: React.FC<ToastProps> = ({ title, description, action, open, onOpenChange }) => {
  return (
    <div className={`toast ${open ? 'open' : ''}`}>
      <div className="toast-header">
        {title}
        {action && <div className="toast-action">{action}</div>}
      </div>
      {description && <div className="toast-body">{description}</div>}
    </div>
  );
};