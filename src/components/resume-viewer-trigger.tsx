"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const ResumeViewerModal = dynamic(
  () =>
    import("@/components/resume-viewer-modal").then(
      (mod) => mod.ResumeViewerModal,
    ),
  { ssr: false },
);

export function ResumeViewerTrigger() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="inline-flex items-center justify-center px-8 py-3 border border-border rounded-lg text-sm font-medium hover:bg-muted/50 transition-colors"
      >
        View Resume
      </button>
      <ResumeViewerModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
