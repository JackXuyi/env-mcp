import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import os from 'os';
import { execSync } from "child_process"
import si from 'systeminformation'; // 导入 systeminformation 库
import fs from 'fs';
import plist from 'plist'; // 导入 plist 模块

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
      },
      {
        name: "getProxyInfo",
        description: "获取当前网络的所有代理信息",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      },
      {
        name: "getHardwareInfo",
        description: "获取当前设备的硬件信息，包括生产日期等",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      },
      {
        name: "getVpnInfo",
        description: "获取当前设备的 VPN 信息",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      },
      {
        name: "getInstalledApps",
        description: "获取当前设备已安装的应用信息",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      },
      {
        name: "getWifiInfo",
        description: "获取当前设备的 Wi-Fi 信息",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      },
      {
        name: "getAppSchemas",
        description: "获取当前设备所有注册唤醒的 App Schema 信息",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      },
      {
        name: "getTimezone",
        description: "获取当前设备的时区信息",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      },
      {
        name: "getAvailableNetworks",
        description: "获取当前设备可用的网络信息",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      },
      {
        name: "getBatteryInfo",
        description: "获取当前设备的电池信息",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      },
      {
        name: "getGraphicsInfo",
        description: "获取当前设备的显卡信息",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      },
      {
        name: "getProcesses",
        description: "获取当前设备的进程信息",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      },
      {
        name: "getBluetoothInfo",
        description: "获取当前设备的蓝牙信息",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      },
      {
        name: "getAudioInfo",
        description: "获取当前设备的音频设备信息",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      },
      {
        name: "getUsbInfo",
        description: "获取当前设备的 USB 设备信息",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      },
      {
        name: "getPrinterInfo",
        description: "获取当前设备的打印机信息",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      },
      {
        name: "getSshPublicKey",
        description: "获取当前用户的 SSH 公钥",
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
    case "getProxyInfo": {
      const proxyInfo = {
        httpProxy: process.env.HTTP_PROXY || process.env.http_proxy || '未配置',
        httpsProxy: process.env.HTTPS_PROXY || process.env.https_proxy || '未配置',
        noProxy: process.env.NO_PROXY || process.env.no_proxy || '未配置'
      };

      return {
        content: [{
          type: "text",
          text: JSON.stringify(proxyInfo, null, 2)
        }]
      };
    }
    case "getHardwareInfo": {
      const hardwareInfo = await si.system();
      return {
        content: [{
          type: "text",
          text: JSON.stringify(hardwareInfo, null, 2)
        }]
      };
    }
    case "getVpnInfo": {
      const networkInterfaces = os.networkInterfaces();
      const vpnInterfaces: Record<string, any> = {};

      for (const [interfaceName, interfaces = []] of Object.entries(networkInterfaces)) {
        // 检测常见的 VPN 接口名称（如 tun0, ppp0, etc）
        if (interfaceName.startsWith('tun') || interfaceName.startsWith('ppp')) {
          vpnInterfaces[interfaceName] = interfaces.map((info) => ({
            address: info.address,
            netmask: info.netmask,
            family: info.family,
            internal: info.internal
          }));
        }
      }

      return {
        content: [{
          type: "text",
          text: JSON.stringify(vpnInterfaces, null, 2)
        }]
      };
    }
    case "getInstalledApps": {
      let installedApps: string[] = [];
      try {
        if (os.platform() === 'darwin') {
          // macOS 使用 system_profiler 命令获取已安装的应用
          const apps = execSync('system_profiler SPApplicationsDataType -json').toString();
          installedApps = JSON.parse(apps).SPApplicationsDataType.map((app: any) => app._name);
        } else if (os.platform() === 'linux') {
          // Linux 使用 dpkg 或 rpm 命令获取已安装的软件包
          try {
            installedApps = execSync('dpkg --list | grep ^ii').toString().split('\n').map(line => line.split(/\s+/)[1]);
          } catch (error) {
            installedApps = execSync('rpm -qa').toString().split('\n');
          }
        } else if (os.platform() === 'win32') {
          // Windows 使用 Get-WmiObject 命令获取已安装的应用
          const apps = execSync('powershell -Command "Get-WmiObject -Class Win32_Product | Select-Object -Property Name"').toString();
          installedApps = apps.split('\n').filter(line => line.trim()).slice(1);
        }
      } catch (error) {
        console.error("获取已安装应用信息失败:", error);
      }

      return {
        content: [{
          type: "text",
          text: JSON.stringify({ installedApps }, null, 2)
        }]
      };
    }
    case "getWifiInfo": {
      const wifiInfo = await si.wifiNetworks();
      return {
        content: [{
          type: "text",
          text: JSON.stringify(wifiInfo, null, 2)
        }]
      };
    }
    case "getAppSchemas": {
      let appSchemas: Record<string, string[]> = {};
      try {
        if (os.platform() === 'darwin') {
          // macOS 使用 mdfind 命令查找所有 .app 包
          const appPaths = execSync('mdfind "kMDItemContentType == com.apple.application-bundle"').toString().split('\n');
          for (const appPath of appPaths) {
            if (appPath) {
              try {
                // 读取 Info.plist 文件
                const plistPath = `${appPath}/Contents/Info.plist`;
                if (fs.existsSync(plistPath)) {
                  const plistContent = fs.readFileSync(plistPath, 'utf8');
                  const plistData: any = plist.parse(plistContent);
                  if (plistData.CFBundleURLTypes) {
                    const schemes = plistData.CFBundleURLTypes
                      .flatMap((type: any) => type.CFBundleURLSchemes || [])
                      .filter((scheme: string) => scheme);
                    if (schemes.length > 0) {
                      appSchemas[plistData.CFBundleName || appPath] = schemes;
                    }
                  }
                }
              } catch (error) {
                console.warn(`无法读取 ${appPath} 的 Info.plist 文件:`, error);
                continue; // 跳过无法读取的 .app 包
              }
            }
          }
        } else if (os.platform() === 'linux') {
          // Linux 通过检查 .desktop 文件获取 URL Scheme 信息
          const desktopFiles = execSync('find /usr/share/applications /~/.local/share/applications -name "*.desktop"').toString().split('\n');
          desktopFiles.forEach(file => {
            if (file) {
              const content = execSync(`cat ${file}`).toString();
              const schemes = content.match(/MimeType=(.+)/)?.[1].split(';').filter(s => s.startsWith('x-scheme-handler/')).map(s => s.replace('x-scheme-handler/', ''));
              if (schemes && schemes.length > 0) {
                appSchemas[file] = schemes;
              }
            }
          });
        } else if (os.platform() === 'win32') {
          // Windows 通过注册表获取 URL Scheme 信息
          const regOutput = execSync('reg query HKEY_CLASSES_ROOT /f "URL Protocol" /s').toString();
          const schemes = regOutput.split('\n').filter(line => line.trim().startsWith('HKEY_CLASSES_ROOT\\')).map(line => line.split('\\')[1]);
          schemes.forEach(scheme => {
            appSchemas[scheme] = [scheme];
          });
        }
      } catch (error) {
        console.error("获取 App Schema 信息失败:", error);
      }

      return {
        content: [{
          type: "text",
          text: JSON.stringify(appSchemas, null, 2)
        }]
      };
    }
    case "getTimezone": {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return {
        content: [{
          type: "text",
          text: JSON.stringify({ timezone }, null, 2)
        }]
      };
    }
    case "getAvailableNetworks": {
      const networkInterfaces = os.networkInterfaces();
      const availableNetworks: Record<string, any> = {};

      // 获取网络接口信息
      for (const [interfaceName, interfaces = []] of Object.entries(networkInterfaces)) {
        availableNetworks[interfaceName] = interfaces.map((info) => ({
          address: info.address,
          netmask: info.netmask,
          family: info.family,
          internal: info.internal
        }));
      }

      // 获取 Wi-Fi 网络信息
      const wifiNetworks = await si.wifiNetworks();

      return {
        content: [{
          type: "text",
          text: JSON.stringify({ networkInterfaces: availableNetworks, wifiNetworks }, null, 2)
        }]
      };
    }
    case "getBatteryInfo": {
      const batteryInfo = await si.battery();
      return {
        content: [{
          type: "text",
          text: JSON.stringify(batteryInfo, null, 2)
        }]
      };
    }
    case "getGraphicsInfo": {
      const graphicsInfo = await si.graphics();
      return {
        content: [{
          type: "text",
          text: JSON.stringify(graphicsInfo, null, 2)
        }]
      };
    }
    case "getProcesses": {
      const processes = await si.processes();
      return {
        content: [{
          type: "text",
          text: JSON.stringify(processes, null, 2)
        }]
      };
    }
    case "getBluetoothInfo": {
      const bluetoothInfo = await si.bluetoothDevices();
      return {
        content: [{
          type: "text",
          text: JSON.stringify(bluetoothInfo, null, 2)
        }]
      };
    }
    case "getAudioInfo": {
      const audioInfo = await si.audio();
      return {
        content: [{
          type: "text",
          text: JSON.stringify(audioInfo, null, 2)
        }]
      };
    }
    case "getUsbInfo": {
      const usbInfo = await si.usb();
      return {
        content: [{
          type: "text",
          text: JSON.stringify(usbInfo, null, 2)
        }]
      };
    }
    case "getPrinterInfo": {
      const printerInfo = await si.printer();
      return {
        content: [{
          type: "text",
          text: JSON.stringify(printerInfo, null, 2)
        }]
      };
    }
    case "getSshPublicKey": {
      const sshKeys: string[] = [];
      const sshDir = `${os.homedir()}/.ssh`;

      const keyFiles = fs.readdirSync(sshDir).filter(file => file.endsWith('.pub'));
      for (const keyFile of keyFiles) {
        const filePath = `${sshDir}/${keyFile}`;
        const publicKey = fs.readFileSync(filePath, 'utf8');
        sshKeys.push(publicKey);
      }

      return {
        content: [{
          type: "text",
          text: JSON.stringify(sshKeys, null, 2)
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


