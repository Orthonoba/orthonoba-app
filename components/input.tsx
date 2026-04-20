"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-gray-600">{label}</label>}

      <input
        className={`border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black ${className}`}
        {...props}
      />
    </div>
  );
}
