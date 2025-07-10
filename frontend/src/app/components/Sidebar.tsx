"use client";
import { useRef, useState } from "react";

export default function Sidebar({ onUploadSuccess }: { onUploadSuccess?: (fileId: string) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  // 上传文件到后端
  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setStatus("请选择点云文件");
      return;
    }
    setUploading(true);
    setStatus("正在上传...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/files/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.file_id) {
        setStatus("上传成功！");
        onUploadSuccess?.(data.file_id); // 通知父组件加载点云
      } else {
        setStatus(data.message || "上传失败");
      }
    } catch (err) {
      setStatus("上传失败：" + (err as any).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <aside className="w-72 min-w-60 h-full bg-gray-800 border-r border-gray-700 flex flex-col p-6 gap-8 shadow-industrial">
      <h2 className="text-lg font-semibold text-yellow-300 mb-4">点云文件上传</h2>
      <input
        type="file"
        ref={fileInputRef}
        accept=".las,.laz,.ply,.pcd"
        className="mb-4 block w-full text-sm text-gray-300 file:bg-yellow-400 file:text-gray-900 file:rounded file:px-3 file:py-1"
        disabled={uploading}
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded shadow-industrial transition"
      >
        {uploading ? "上传中..." : "上传并预览"}
      </button>
      {status && <div className="mt-4 text-sm text-gray-400">{status}</div>}
    </aside>
  );
}
