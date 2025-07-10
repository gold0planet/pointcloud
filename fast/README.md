 # 煤山点云文件上传渲染网站

## 产品背景
煤山点云数据是煤矿数字化、智能化的重要基础。为便于用户上传、管理和可视化煤山点云文件，需开发一套支持点云文件上传、渲染和管理的Web平台。

## 目标用户
- 煤矿企业技术人员
- 三维数据分析师
- 相关管理人员

## 核心功能
1. **用户注册与登录**
   - 支持邮箱/手机号注册、登录、找回密码
   - 支持权限管理（普通用户/管理员）
2. **点云文件上传**
   - 支持多种点云格式（如.las、.laz、.ply、.pcd等）
   - 支持大文件分片上传、断点续传
   - 上传进度显示
3. **点云文件管理**
   - 文件列表、搜索、排序、删除、重命名、下载
   - 支持文件夹管理
4. **点云渲染与可视化**
   - 在线三维点云浏览（缩放、旋转、平移）
   - 支持多种渲染模式（RGB/高度/强度等）
   - 支持测量、标注、截图
5. **数据分析与导出**
   - 点云基本属性统计（点数、范围、密度等）
   - 支持导出分析报告
6. **系统管理**
   - 用户管理、权限分配
   - 日志审计
   - 存储空间统计

## 主要接口设计

### 1. 用户相关
- `POST /api/register` 用户注册
- `POST /api/login` 用户登录
- `POST /api/logout` 用户登出
- `GET /api/user/profile` 获取用户信息
- `PUT /api/user/profile` 修改用户信息

### 2. 点云文件管理
- `POST /api/files/upload` 上传点云文件（支持分片）
- `GET /api/files/list` 获取文件列表
- `GET /api/files/{file_id}` 获取文件详情
- `DELETE /api/files/{file_id}` 删除文件
- `PUT /api/files/{file_id}/rename` 重命名文件
- `GET /api/files/{file_id}/download` 下载文件

### 3. 点云渲染与可视化
- `GET /api/pointcloud/{file_id}/view` 获取点云渲染数据
- `POST /api/pointcloud/{file_id}/measure` 点云测量
- `POST /api/pointcloud/{file_id}/annotate` 点云标注
- `GET /api/pointcloud/{file_id}/screenshot` 获取点云截图

### 4. 数据分析
- `GET /api/pointcloud/{file_id}/stats` 获取点云统计信息
- `POST /api/pointcloud/{file_id}/report` 导出分析报告

### 5. 系统管理
- `GET /api/admin/users` 用户管理
- `PUT /api/admin/users/{user_id}/role` 修改用户权限
- `GET /api/admin/logs` 日志审计
- `GET /api/admin/storage` 存储空间统计

## 技术选型建议
- 前端：React/Vue + Three.js/Deck.gl（点云渲染）
- 后端：Python（FastAPI/Django）或Node.js
- 存储：对象存储（如阿里云OSS、MinIO等）
- 数据库：PostgreSQL/MySQL

## 未来可扩展方向
- 支持多用户协作与评论
- 点云AI智能分析
- 移动端适配