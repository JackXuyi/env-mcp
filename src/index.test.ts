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

  it("应该抛出未知工具错误", async () => {
    await expect(
      handleCallToolRequest({ params: { name: "unknownTool" } })
    ).rejects.toThrow("未知的工具");
  });
});
