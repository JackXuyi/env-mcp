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
// 获取平台信息
const platformInfo = await mcp.env.getPlatformInfo();

// 获取内存信息
const memoryInfo = await mcp.env.getMemoryInfo();

// 获取 CPU 信息
const cpuInfo = await mcp.env.getCpuInfo();

// 获取网络信息
const networkInfo = await mcp.env.getNetworkInfo();

// 获取用户信息
const userInfo = await mcp.env.getUserInfo();

// 获取 CPU 使用率
const cpuUsage = await mcp.env.getCpuUsage();

// 获取硬盘使用率
const diskUsage = await mcp.env.getDiskUsage();

// 获取终端类型
const terminalTypes = await mcp.env.getTerminalTypes();

// 获取 IPv4 信息
const ipv4Info = await mcp.env.getIpv4Info();

// 获取 IPv6 信息
const ipv6Info = await mcp.env.getIpv6Info();

// 获取代理信息
const proxyInfo = await mcp.env.getProxyInfo();
```

### 支持的工具列表

| 工具名称         | 描述                           | 返回数据结构示例                                                                 |
|------------------|--------------------------------|----------------------------------------------------------------------------------|
| `getWifiInfo`    | 获取当前设备的 Wi-Fi 信息      | `Array<{ ssid: string, bssid: string, mode: string, channel: number, frequency: number, signalLevel: number, quality: number, security: string[] }>` |
| `getInstalledApps` | 获取当前设备已安装的应用信息   | `{ installedApps: string[] }`                                                    |
| `getVpnInfo`     | 获取当前设备的 VPN 信息        | `{ [key: string]: Array<{ address: string, netmask: string, family: string, internal: boolean }> }` |
| `getHardwareInfo` | 获取当前设备的硬件信息，包括生产日期等 | `{ manufacturer: string, model: string, version: string, serial: string, uuid: string, sku: string, virtual: boolean }` |
| `getPlatformInfo` | 获取当前系统的平台信息         | `{ platform: string, arch: string, hostname: string, type: string, release: string, version: string }` |
| `getMemoryInfo`   | 获取当前系统的内存信息         | `{ totalMemory: number, freeMemory: number, usedMemory: number }`                |
| `getCpuInfo`      | 获取当前系统的 CPU 信息        | `{ cpus: Array<{ model: string, speed: number, times: { user: number, nice: number, sys: number, idle: number, irq: number } }> }` |
| `getNetworkInfo`  | 获取当前系统的网络信息         | `{ networkInterfaces: { [key: string]: Array<{ address: string, netmask: string, family: string, mac: string, internal: boolean }> } }` |
| `getUserInfo`     | 获取当前系统的用户信息         | `{ userInfo: { uid: number, gid: number, username: string, homedir: string, shell: string }, tmpdir: string, homedir: string }` |
| `getCpuUsage`     | 获取当前平台的 CPU 占用率      | `{ cpuUsage: string }`                                                           |
| `getDiskUsage`    | 获取当前平台的硬盘使用率       | `string`（`df -h` 命令的输出）                                                   |
| `getTerminalTypes`| 获取系统上支持的所有终端类型   | `{ terminalTypes: string[] }`                                                    |
| `getIpv4Info`     | 获取当前设备的 IPv4 信息       | `{ [key: string]: Array<{ address: string, netmask: string, family: string, internal: boolean }> }` |
| `getIpv6Info`     | 获取当前设备的 IPv6 信息       | `{ [key: string]: Array<{ address: string, netmask: string, family: string, internal: boolean }> }` |
| `getProxyInfo`    | 获取当前网络的所有代理信息     | `{ httpProxy: string, httpsProxy: string, noProxy: string }`                     |

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
