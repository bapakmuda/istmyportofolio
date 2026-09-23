"use client";

import { FormEvent, ReactNode } from "react";

interface DeleteFormProps {
  action: (formData: FormData) => void;
  id: string;
  children: ReactNode;
  className?: string;
  confirmMessage?: string;
}

export default function DeleteForm({ action, id, children, className = "", confirmMessage = "Are you sure you want to delete this?" }: DeleteFormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!window.confirm(confirmMessage)) {
      e.preventDefault();
    }
  };

  return (
    <form action={action} onSubmit={handleSubmit} className={className}>
      <input type="hidden" name="id" value={id} />
      {children}
    </form>
  );
}
