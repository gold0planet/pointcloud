from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# 替换为你的MySQL连接信息
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:123456@localhost:3306/point?charset=utf8mb4"

engine = create_engine(SQLALCHEMY_DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
