"use client";

import { useEffect, useRef } from 'react'

type PointCloudViewerProps = {
  fileId?: string | null;
};

export default function PointCloudViewer({ fileId }: PointCloudViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 这里假设你已在 public 目录下集成 Potree 静态资源
    // 或通过 npm/yarn 安装 Potree 并引入
    // 这里只做容器，实际 Potree 初始化需根据你的集成方式调整
    // 示例：window.Potree.init(viewerRef.current, ...)
  }, [])

  return (
    <iframe
      src="/potree/viewer.html"
      className="w-full h-full border-0 rounded-lg shadow-industrial"
      style={{ minHeight: 600 }}
      title="点云三维视图"
    />
  );
}