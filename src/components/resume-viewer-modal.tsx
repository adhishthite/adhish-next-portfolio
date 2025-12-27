"use client";

import { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, ZoomIn, ZoomOut, Loader2 } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface ResumeViewerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ResumeViewerModal({
  open,
  onOpenChange,
}: ResumeViewerModalProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.5);
  const [loading, setLoading] = useState<boolean>(true);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
      setLoading(false);
    },
    [],
  );

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.25, 2.0));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setScale(1.5);
      setLoading(true);
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-[95vh] p-0 overflow-hidden flex flex-col gap-0">
        <div className="flex items-center justify-between p-4 border-b border-border/40 shrink-0">
          <DialogHeader className="flex-row items-center gap-4">
            <DialogTitle className="text-lg font-heading font-semibold">
              Resume
            </DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={zoomOut}
              disabled={scale <= 0.5}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground min-w-[4rem] text-center">
              {Math.round(scale * 100)}%
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={zoomIn}
              disabled={scale >= 2.0}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>

            <div className="w-px h-6 bg-border mx-2" />

            <Button variant="outline" size="sm" asChild>
              <a href="/resume.pdf" download="Adhish_Thite_Resume.pdf">
                <Download className="h-4 w-4 mr-2" />
                Download
              </a>
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto flex items-start justify-center p-4 bg-muted/30">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}
          <Document
            file="/resume.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            loading=""
            className="flex flex-col items-center gap-4"
          >
            {Array.from(new Array(numPages), (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                scale={scale}
                className="shadow-lg rounded-lg overflow-hidden"
                renderTextLayer={true}
                renderAnnotationLayer={true}
              />
            ))}
          </Document>
        </div>
      </DialogContent>
    </Dialog>
  );
}
