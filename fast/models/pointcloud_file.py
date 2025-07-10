from sqlalchemy import Column, Integer, String, DateTime, BigInteger
from sqlalchemy.ext.declarative import declarative_base
import datetime

Base = declarative_base()

class PointCloudFile(Base):
    __tablename__ = 'pointcloud_files'
    id = Column(Integer, primary_key=True, autoincrement=True)
    filename = Column(String(255), nullable=False)
    storage_type = Column(String(32), default='local')  # local/oss
    storage_path = Column(String(512), nullable=False)
    upload_time = Column(DateTime, default=datetime.datetime.now(datetime.timezone.utc))
    size = Column(BigInteger)
