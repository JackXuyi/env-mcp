import { handleCallToolRequest, handleRequest } from "./index";

describe("handleRequest", () => {
  it("应该返回正确的工具列表", async () => {
    const result = await handleRequest();
    expect(result.tools).toContainEqual({
      name: "getPlatformInfo",
      description: "获取当前系统的平台信息",
      inputSchema: {
        type: "object",
        properties: {},
        required: [],
      },
    });
    expect(result.tools).toContainEqual({
      name: "getMemoryInfo",
      description: "获取当前系统的内存信息",
      inputSchema: {
        type: "object",
        properties: {},
        required: [],
      },
    });
    expect(result.tools).toContainEqual({
      name: "getCpuInfo",
      description: "获取当前系统的 CPU 信息",
      inputSchema: {
        type: "object",
        properties: {},
        required: [],
      },
    });
    expect(result.tools).toContainEqual({
      name: "getNetworkInfo",
      description: "获取当前系统的网络信息",
      inputSchema: {
        type: "object",
        properties: {},
        required: [],
      },
    });
    expect(result.tools).toContainEqual({
      name: "getUserInfo",
      description: "获取当前系统的用户信息",
      inputSchema: {
        type: "object",
        properties: {},
        required: [],
      },
    });
    expect(result.tools).toContainEqual({
      name: "getCpuUsage",
      description: "获取当前平台的 CPU 占用率",
      inputSchema: {
        type: "object",
        properties: {},
        required: [],
      },
    });
    expect(result.tools).toContainEqual({
      name: "getDiskUsage",
      description: "获取当前平台的硬盘使用率",
      inputSchema: {
        type: "object",
        properties: {},
        required: [],
      },
    });
    expect(result.tools).toContainEqual({
      name: "getTerminalTypes",
      description: "获取系统上支持的所有终端类型",
      inputSchema: {
        type: "object",
        properties: {},
        required: [],
      },
    });
    expect(result.tools).toContainEqual({
      name: "getIpv4Info",
      description: "获取当前设备的 IPv4 信息",
      inputSchema: {
        type: "object",
        properties: {},
        required: [],
      },
    });
    expect(result.tools).toContainEqual({
      name: "getIpv6Info",
      description: "获取当前设备的 IPv6 信息",
      inputSchema: {
        type: "object",
        properties: {},
        required: [],
      },
    });
  });
});

describe("handleCallToolRequest", () => {
  it("应该返回平台信息", async () => {
    const result = await handleCallToolRequest({
      params: { name: "getPlatformInfo" },
    });
    const platformInfo = JSON.parse(result.content[0].text);
    expect(platformInfo).toHaveProperty("platform");
    expect(platformInfo).toHaveProperty("arch");
    expect(platformInfo).toHaveProperty("hostname");
  });

  it("应该返回内存信息", async () => {
    const result = await handleCallToolRequest({
      params: { name: "getMemoryInfo" },
    });
    const memoryInfo = JSON.parse(result.content[0].text);
    expect(memoryInfo).toHaveProperty("totalMemory");
    expect(memoryInfo).toHaveProperty("freeMemory");
    expect(memoryInfo).toHaveProperty("usedMemory");
  });

  it("应该返回 CPU 信息", async () => {
    const result = await handleCallToolRequest({
      params: { name: "getCpuInfo" },
    });
    const cpuInfo = JSON.parse(result.content[0].text);
    expect(cpuInfo).toHaveProperty("cpus");
  });

  it("应该返回网络信息", async () => {
    const result = await handleCallToolRequest({
      params: { name: "getNetworkInfo" },
    });
    const networkInfo = JSON.parse(result.content[0].text);
    expect(networkInfo).toHaveProperty("networkInterfaces");
  });

  it("应该返回用户信息", async () => {
    const result = await handleCallToolRequest({
      params: { name: "getUserInfo" },
    });
    const userInfo = JSON.parse(result.content[0].text);
    expect(userInfo).toHaveProperty("userInfo");
    expect(userInfo).toHaveProperty("tmpdir");
    expect(userInfo).toHaveProperty("homedir");
  });

  it("应该返回 CPU 使用率", async () => {
    const result = await handleCallToolRequest({
      params: { name: "getCpuUsage" },
    });
    const cpuUsage = JSON.parse(result.content[0].text);
    expect(cpuUsage).toHaveProperty("cpuUsage");
  });

  it("应该返回硬盘使用率", async () => {
    const result = await handleCallToolRequest({
      params: { name: "getDiskUsage" },
    });
    expect(result.content[0].text).toBeDefined();
  });

  it("应该返回终端类型", async () => {
    const result = await handleCallToolRequest({
      params: { name: "getTerminalTypes" },
    });
    const terminalTypes = JSON.parse(result.content[0].text);
    expect(terminalTypes).toHaveProperty("terminalTypes");
    expect(terminalTypes.terminalTypes.length).toBeGreaterThan(0);
  });

  it("应该返回 IPv4 信息", async () => {
    const result = await handleCallToolRequest({
      params: { name: "getIpv4Info" },
    });
    const ipInfo = JSON.parse(result.content[0].text);
    expect(ipInfo).toHaveProperty("en0");
  });

  it("应该返回 IPv6 信息", async () => {
    const result = await handleCallToolRequest({
      params: { name: "getIpv6Info" },
    });
    const ipInfo = JSON.parse(result.content[0].text);
    expect(ipInfo).toHaveProperty("en0");
  });

  it("应该返回代理信息", async () => {
    // 设置测试环境变量
    process.env.HTTP_PROXY = 'http://proxy.example.com:8080';
    process.env.HTTPS_PROXY = 'https://proxy.example.com:8080';
    process.env.NO_PROXY = 'localhost,127.0.0.1';

    const result = await handleCallToolRequest({
      params: { name: "getProxyInfo" },
    });
    const proxyInfo = JSON.parse(result.content[0].text);
    expect(proxyInfo).toHaveProperty("httpProxy");
    expect(proxyInfo).toHaveProperty("httpsProxy");
    expect(proxyInfo).toHaveProperty("noProxy");

    // 清理测试环境变量
    delete process.env.HTTP_PROXY;
    delete process.env.HTTPS_PROXY;
    delete process.env.NO_PROXY;
  });

  it("应该返回硬件信息", async () => {
    const result = await handleCallToolRequest({
      params: { name: "getHardwareInfo" },
    });
    const hardwareInfo = JSON.parse(result.content[0].text);
    expect(hardwareInfo).toHaveProperty("manufacturer");
    expect(hardwareInfo).toHaveProperty("model");
    expect(hardwareInfo).toHaveProperty("serial");
  });

  it("应该返回 VPN 信息", async () => {
    const result = await handleCallToolRequest({
      params: { name: "getVpnInfo" },
    });
    const vpnInfo = JSON.parse(result.content[0].text);
    expect(vpnInfo).toBeDefined();
  });

  it("应该返回已安装的应用信息", async () => {
    const result = await handleCallToolRequest({
      params: { name: "getInstalledApps" },
    });
    const installedApps = JSON.parse(result.content[0].text);
    expect(installedApps).toHaveProperty("installedApps");
  });

  it("应该返回 Wi-Fi 信息", async () => {
    const result = await handleCallToolRequest({
      params: { name: "getWifiInfo" },
    });
    const wifiInfo = JSON.parse(result.content[0].text);
    expect(wifiInfo).toBeDefined();
  });

  it("应该返回 App Schema 信息", async () => {
    const result = await handleCallToolRequest({
      params: { name: "getAppSchemas" },
    });
    const appSchemas = JSON.parse(result.content[0].text);
    expect(appSchemas).toBeDefined();
  });

  it("应该返回时区信息", async () => {
    const result = await handleCallToolRequest({
      params: { name: "getTimezone" },
    });
    const timezoneInfo = JSON.parse(result.content[0].text);
    expect(timezoneInfo).toHaveProperty("timezone");
  });

  it("应该返回可用的网络信息", async () => {
    const result = await handleCallToolRequest({
      params: { name: "getAvailableNetworks" },
    });
    const availableNetworks = JSON.parse(result.content[0].text);
    expect(availableNetworks).toHaveProperty("networkInterfaces");
    expect(availableNetworks).toHaveProperty("wifiNetworks");
  });

  it("应该返回电池信息", async () => {
    const result = await handleCallToolRequest({
      params: { name: "getBatteryInfo" },
    });
    const batteryInfo = JSON.parse(result.content[0].text);
    expect(batteryInfo).toHaveProperty("hasBattery");
    expect(batteryInfo).toHaveProperty("isCharging");
  });

  it("应该返回显卡信息", async () => {
    const result = await handleCallToolRequest({
      params: { name: "getGraphicsInfo" },
    });
    const graphicsInfo = JSON.parse(result.content[0].text);
    expect(graphicsInfo).toHaveProperty("controllers");
    expect(graphicsInfo).toHaveProperty("displays");
  });

  it("应该返回进程信息", async () => {
    const result = await handleCallToolRequest({
      params: { name: "getProcesses" },
    });
    const processes = JSON.parse(result.content[0].text);
    expect(processes).toHaveProperty("list");
  });

  it("应该返回蓝牙信息", async () => {
    const result = await handleCallToolRequest({
      params: { name: "getBluetoothInfo" },
    });
    const bluetoothInfo = JSON.parse(result.content[0].text);
    expect(bluetoothInfo).toBeInstanceOf(Array);
  });

  it("应该返回音频设备信息", async () => {
    const result = await handleCallToolRequest({
      params: { name: "getAudioInfo" },
    });
    const audioInfo = JSON.parse(result.content[0].text);
    expect(audioInfo).toBeInstanceOf(Array);
  });

  it("应该返回 USB 设备信息", async () => {
    const result = await handleCallToolRequest({
      params: { name: "getUsbInfo" },
    });
    const usbInfo = JSON.parse(result.content[0].text);
    expect(usbInfo).toBeInstanceOf(Array);
  });

  it("应该返回打印机信息", async () => {
    const result = await handleCallToolRequest({
      params: { name: "getPrinterInfo" },
    });
    const printerInfo = JSON.parse(result.content[0].text);
    expect(printerInfo).toBeInstanceOf(Array);
  });

  it("应该抛出未知工具错误", async () => {
    await expect(
      handleCallToolRequest({ params: { name: "unknownTool" } })
    ).rejects.toThrow("未知的工具");
  });
});
