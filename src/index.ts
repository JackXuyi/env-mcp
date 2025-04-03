import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import os from 'os';
import { execSync } from "child_process"
import { isatty } from "tty"

export const server = new Server(
  {
    name: "env-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

export const handleRequest = async () => {
  return {
    tools: [
      {
        name: "getPlatformInfo",
        description: "获取当前系统的平台信息",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      },
      {
        name: "getMemoryInfo",
        description: "获取当前系统的内存信息",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      },
      {
        name: "getCpuInfo",
        description: "获取当前系统的 CPU 信息",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      },
      {
        name: "getNetworkInfo",
        description: "获取当前系统的网络信息",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      },
      {
        name: "getUserInfo",
        description: "获取当前系统的用户信息",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      },
      {
        name: "getCpuUsage",
        description: "获取当前平台的 CPU 占用率",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      },
      {
        name: "getDiskUsage",
        description: "获取当前平台的硬盘使用率",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      },
      {
        name: "getTerminalTypes",
        description: "获取系统上支持的所有终端类型",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      },
      {
        name: "getIpv4Info",
        description: "获取当前设备的 IPv4 信息",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      },
      {
        name: "getIpv6Info",
        description: "获取当前设备的 IPv6 信息",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      }
    ]
  };
};

export const handleCallToolRequest = async (request: any) => {
  switch (request.params.name) {
    case "getPlatformInfo": {
      const platformInfo = {
        platform: os.platform(),
        arch: os.arch(),
        hostname: os.hostname(),
        type: os.type(),
        release: os.release(),
        version: os.version()
      };

      return {
        content: [{
          type: "text",
          text: JSON.stringify(platformInfo, null, 2)
        }]
      };
    }
    case "getMemoryInfo": {
      const memoryInfo = {
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        usedMemory: os.totalmem() - os.freemem()
      };

      return {
        content: [{
          type: "text",
          text: JSON.stringify(memoryInfo, null, 2)
        }]
      };
    }
    case "getCpuInfo": {
      const cpuInfo = {
        cpus: os.cpus()
      };

      return {
        content: [{
          type: "text",
          text: JSON.stringify(cpuInfo, null, 2)
        }]
      };
    }
    case "getNetworkInfo": {
      const networkInfo = {
        networkInterfaces: os.networkInterfaces()
      };

      return {
        content: [{
          type: "text",
          text: JSON.stringify(networkInfo, null, 2)
        }]
      };
    }
    case "getUserInfo": {
      const userInfo = {
        userInfo: os.userInfo(),
        tmpdir: os.tmpdir(),
        homedir: os.homedir()
      };

      return {
        content: [{
          type: "text",
          text: JSON.stringify(userInfo, null, 2)
        }]
      };
    }
    case "getCpuUsage": {
      const cpus = os.cpus();
      const totalIdle = cpus.reduce((acc, cpu) => acc + cpu.times.idle, 0);
      const totalTick = cpus.reduce((acc, cpu) => acc + Object.values(cpu.times).reduce((a, b) => a + b, 0), 0);
      const cpuUsage = 1 - totalIdle / totalTick;

      return {
        content: [{
          type: "text",
          text: JSON.stringify({ cpuUsage: (cpuUsage * 100).toFixed(2) + '%' }, null, 2)
        }]
      };
    }
    case "getDiskUsage": {
      let diskUsage;
      if (os.platform() === 'darwin') {
        // macOS 使用 df -h 命令
        diskUsage = execSync('df -h').toString();
      } else {
        // 其他平台使用 df -h --output=used,size,pcent 命令
        diskUsage = execSync('df -h --output=used,size,pcent').toString();
      }

      return {
        content: [{
          type: "text",
          text: diskUsage
        }]
      };
    }
    case "getTerminalTypes": {
      let terminalTypes: string[] = [];
      try {
        // 读取 /etc/shells 文件获取支持的终端类型
        const shells = execSync('cat /etc/shells').toString().split('\n');
        terminalTypes = shells
          .filter((shell) => shell.trim() && !shell.startsWith('#')) // 过滤空行和注释
          .map((shell) => shell.split('/').pop() || ''); // 提取 shell 名称
      } catch (error) {
        // 如果读取失败，返回默认的终端类型
        terminalTypes = ['bash', 'cmd', 'powershell', 'zsh', 'fish', 'sh', 'ksh', 'csh'];
      }

      return {
        content: [{
          type: "text",
          text: JSON.stringify({ terminalTypes }, null, 2)
        }]
      };
    }
    case "getIpv4Info": {
      const networkInterfaces = os.networkInterfaces();
      const ipInfo: Record<string, { address: string; netmask: string; family: string; internal: boolean }[]> = {};

      for (const [interfaceName, interfaces = []] of Object.entries(networkInterfaces)) {
        const ipv4Interfaces = interfaces
          .filter((info) => info.family === 'IPv4')
          .map((info) => ({
            address: info.address,
            netmask: info.netmask,
            family: info.family,
            internal: info.internal
          }));
        if (ipv4Interfaces.length > 0) {
          ipInfo[interfaceName] = ipv4Interfaces;
        }
      }

      return {
        content: [{
          type: "text",
          text: JSON.stringify(ipInfo, null, 2)
        }]
      };
    }
    case "getIpv6Info": {
      const networkInterfaces = os.networkInterfaces();
      const ipInfo: Record<string, { address: string; netmask: string; family: string; internal: boolean }[]> = {};

      for (const [interfaceName, interfaces = []] of Object.entries(networkInterfaces)) {
        const ipv6Interfaces = interfaces
          .filter((info) => info.family === 'IPv6')
          .map((info) => ({
            address: info.address,
            netmask: info.netmask,
            family: info.family,
            internal: info.internal
          }));
        if (ipv6Interfaces.length > 0) {
          ipInfo[interfaceName] = ipv6Interfaces;
        }
      }

      return {
        content: [{
          type: "text",
          text: JSON.stringify(ipInfo, null, 2)
        }]
      };
    }
    default:
      throw new Error("未知的工具");
  }
}

// 列出可用的工具
server.setRequestHandler(ListToolsRequestSchema, handleRequest);

// 处理工具调用
server.setRequestHandler(CallToolRequestSchema, handleCallToolRequest);

// 启动服务器
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("系统环境信息 MCP 服务器已在 stdio 上运行");
}

if (process.env.NODE_ENV !== 'test') {
  main().catch((error) => {
    console.error("服务器错误:", error);
    process.exit(1);
  });
}


