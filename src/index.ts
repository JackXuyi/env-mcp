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
        name: "getSystemInfo",
        description: "获取当前系统的环境信息",
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
      }
    ]
  };
};

export const handleCallToolRequest = async (request: any) => {
  switch (request.params.name) {
    case "getSystemInfo": {
      const systemInfo = {
        platform: os.platform(),
        arch: os.arch(),
        hostname: os.hostname(),
        type: os.type(),
        release: os.release(),
        version: os.version(),
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        cpus: os.cpus(),
        networkInterfaces: os.networkInterfaces(),
        uptime: os.uptime(),
        loadAvg: os.loadavg(),
        userInfo: os.userInfo(),
        tmpdir: os.tmpdir(),
        homedir: os.homedir(),
        usedMemory: os.totalmem() - os.freemem(),
      };

      return {
        content: [{
          type: "text",
          text: JSON.stringify(systemInfo, null, 2)
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
      const terminalTypes = Object.keys(isatty);
      return {
        content: [{
          type: "text",
          text: JSON.stringify({ terminalTypes }, null, 2)
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


