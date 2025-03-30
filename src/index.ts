import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import os from 'os';

const server = new Server(
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

// 列出可用的工具
server.setRequestHandler(ListToolsRequestSchema, async () => {
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
      }
    ]
  };
});

// 处理工具调用
server.setRequestHandler(CallToolRequestSchema, async (request) => {
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
      const { execSync } = require('child_process');
      const diskUsage = execSync('df -h --output=used,size,pcent').toString();

      return {
        content: [{
          type: "text",
          text: diskUsage
        }]
      };
    }
    default:
      throw new Error("未知的工具");
  }
});

// 启动服务器
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("系统环境信息 MCP 服务器已在 stdio 上运行");
}

main().catch((error) => {
  console.error("服务器错误:", error);
  process.exit(1);
});
