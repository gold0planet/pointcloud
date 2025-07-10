from utils.db import SessionLocal
from models.pointcloud_file import PointCloudFile

def save_file_metadata(filename, storage_type, storage_path, size):
    db = SessionLocal()
    file_record = PointCloudFile(
        filename=filename,
        storage_type=storage_type,
        storage_path=storage_path,
        size=size
    )
    db.add(file_record)
    db.commit()
    db.refresh(file_record)
    db.close()
    return file_record
