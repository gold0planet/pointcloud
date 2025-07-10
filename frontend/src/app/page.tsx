"use client";
import Sidebar from './components/Sidebar'
import PointCloudViewer from './components/PointCloudViewer'
import { useState } from "react";

export default function Home() {
  const [fileId, setFileId] = useState<string | null>(null);

  return (
    <main className="flex flex-row h-[calc(100vh-4rem)]">
      <Sidebar onUploadSuccess={setFileId} />
      <section className="flex-1 flex items-center justify-center bg-gray-900 p-6">
        <div className="w-full h-full max-w-6xl max-h-[90vh] grid place-items-center border-2 border-dashed border-yellow-700 rounded-lg bg-gray-950/80 shadow-industrial">
          <PointCloudViewer fileId={fileId} />
        </div>
      </section>
    </main>
  );
}
