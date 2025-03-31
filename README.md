# env-mcp

一个用于获取当前环境系统信息的 MCP 工具包。

## 功能特性

- 获取详细的系统信息
- 支持跨平台使用
- 易于集成到支持 MCP 的应用程序中
- 提供 TypeScript 类型支持

## 安装

```bash
npm install @zhijianren/env-mcp -g
```

## 在支持 MCP 的应用中使用

### 1. 配置 MCP 服务

在应用的 MCP 配置中添加以下内容：

```json
{
  "mcpServers": {
    "env-mcp": {
      "name": "env-mcp",
      "type": "command",
      "command": "node",
      "args": [
        "/usr/local/lib/node_modules/@zhijianren/env-mcp/dist/index.js"
      ],
      "enabled": true
    }
  }
}
```

### 2. 调用服务

```typescript
const systemInfo = await mcp.env.getSystemInfo();
```

### 返回数据结构

```typescript
{
  platform: string;        // 操作系统平台
  arch: string;            // 系统架构
  hostname: string;        // 主机名
  type: string;            // 系统类型
  release: string;         // 系统版本
  totalMemory: number;     // 总内存（字节）
  freeMemory: number;      // 可用内存（字节）
  cpus: Array<{           // CPU 信息
    model: string;
    speed: number;
    times: {
      user: number;
      nice: number;
      sys: number;
      idle: number;
      irq: number;
    };
  }>;
  networkInterfaces: {     // 网络接口信息
    [key: string]: Array<{
      address: string;
      netmask: string;
      family: string;
      mac: string;
      internal: boolean;
    }>;
  };
  userInfo: {             // 用户信息
    uid: number;
    gid: number;
    username: string;
    homedir: string;
    shell: string;
  };
}
```

## 开发指南

```bash
# 安装依赖
npm install

# 开发模式（监听文件变化）
npm run dev

# 构建项目
npm run build

# 运行项目
npm start
```

## 环境变量配置

通过 `.env` 文件配置环境变量：

- `PORT`：服务器端口号（默认：3000）
- `NODE_ENV`：运行环境（development/production）

## 许可证

本项目采用 ISC 许可证
