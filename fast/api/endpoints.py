from fastapi import APIRouter, UploadFile, File, HTTPException, Path
import os
import laspy
import open3d as o3d
import logging
from service.file_service import save_file_metadata

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

router = APIRouter()

@router.post("/api/files/upload")
async def upload_pointcloud(file: UploadFile = File(...)):
    allowed_ext = {".las", ".laz", ".ply", ".pcd"}
    filename = file.filename
    ext = os.path.splitext(filename)[1].lower()
    if ext not in allowed_ext:
        raise HTTPException(status_code=400, detail="不支持的点云文件格式")
    save_path = os.path.join(UPLOAD_DIR, filename)
    with open(save_path, "wb") as f:
        content = await file.read()
        f.write(content)

    # 解析点云文件，获取前1000个点
    points = []
    if ext in [".las", ".laz"]:
        import laspy
        with laspy.open(save_path) as f:
            las = f.read()
            num_points = min(len(las.x), 1000)
            for i in range(num_points):
                point = {
                    "x": float(las.x[i]),
                    "y": float(las.y[i]),
                    "z": float(las.z[i]),
                    "r": int(las.red[i]) if hasattr(las, "red") else 255,
                    "g": int(las.green[i]) if hasattr(las, "green") else 255,
                    "b": int(las.blue[i]) if hasattr(las, "blue") else 255,
                }
                points.append(point)
    elif ext == ".ply":
        import open3d as o3d
        pcd = o3d.io.read_point_cloud(save_path)
        xyz = pcd.points
        has_color = len(pcd.colors) > 0
        num_points = min(len(xyz), 1000)
        for i in range(num_points):
            pt = xyz[i]
            if has_color:
                color = pcd.colors[i]
                r = int(color[0] * 255)
                g = int(color[1] * 255)
                b = int(color[2] * 255)
            else:
                r = g = b = 255
            point = {
                "x": float(pt[0]),
                "y": float(pt[1]),
                "z": float(pt[2]),
                "r": r,
                "g": g,
                "b": b,
            }
            points.append(point)
    else:
        raise HTTPException(status_code=400, detail="暂不支持该格式")

    return {
        "filename": filename,
        "message": "上传成功",
        "points": points
    } 