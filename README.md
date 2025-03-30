# env-mcp

获取当前环境的 MCP 工具包。

## 安装

```bash
npm install @zhijianren/env-mcp
```

## 使用方法

### 基础使用

```typescript
import { getSystemInfo } from '@zhijianren/env-mcp';

// 获取系统信息
const systemInfo = await getSystemInfo();
console.log(systemInfo);
```

### 在支持 AI MCP 的应用中使用

在 Cursor 等支持 AI MCP 服务的应用中，您可以通过以下方式使用本服务：

1. 在应用的 MCP 配置中添加服务：

```json
{
  "services": {
    "env": {
      "name": "env-mcp",
      "type": "npm",
      "package": "@zhijianren/env-mcp",
      "version": "^0.0.1"
    }
  }
}
```

2. 在应用中调用服务：

```typescript
// 在 AI 工具函数中使用
const systemInfo = await mcp.env.getSystemInfo();

// 示例响应
{
  "platform": "darwin",
  "arch": "arm64",
  "hostname": "your-hostname",
  "type": "Darwin",
  "release": "24.3.0",
  "totalMemory": 25769803776,
  "freeMemory": 210976768,
  "cpus": [...],
  "networkInterfaces": {...},
  "userInfo": {
    "uid": 501,
    "gid": 20,
    "username": "your-username",
    "homedir": "/Users/your-username",
    "shell": "/bin/zsh"
  }
}
```

返回的系统信息包含以下字段：

- `platform`: 操作系统平台
- `arch`: 系统架构
- `hostname`: 主机名
- `type`: 系统类型
- `release`: 系统版本
- `totalMemory`: 总内存
- `freeMemory`: 可用内存
- `cpus`: CPU 信息
- `networkInterfaces`: 网络接口信息
- `userInfo`: 用户信息
- 等等...

## 开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build

# 运行
npm start
```

## 环境变量

项目使用 `.env` 文件来管理环境变量，主要包含以下配置：

- `PORT`: 服务器端口号（默认：3000）
- `NODE_ENV`: 运行环境（development/production）

## License

ISC
