"use client";
// src/app/components/PointCloudParams.tsx
import { useState } from 'react'

export default function PointCloudParams() {
  const [pointSize, setPointSize] = useState(1)
  const [colorMode, setColorMode] = useState('rgb')

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label className="block text-sm mb-1">点大小</label>
        <input
          type="range"
          min={1}
          max={10}
          value={pointSize}
          onChange={e => setPointSize(Number(e.target.value))}
          className="w-full accent-yellow-400"
        />
        <span className="text-xs text-gray-400">{pointSize}</span>
      </div>
      <div>
        <label className="block text-sm mb-1">颜色模式</label>
        <select
          value={colorMode}
          onChange={e => setColorMode(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-gray-100"
        >
          <option value="rgb">RGB</option>
          <option value="height">高度</option>
          <option value="intensity">强度</option>
        </select>
      </div>
      {/* 可扩展更多参数 */}
    </div>
  )
}
