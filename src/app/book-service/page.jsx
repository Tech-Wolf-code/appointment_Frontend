"use client";

import BookServiceWizard from "@/components/BookService/BookServiceWizard";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function BookPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto">
        <ProtectedRoute>
        <BookServiceWizard />
        </ProtectedRoute>
      </div>
    </div>
  );
}
