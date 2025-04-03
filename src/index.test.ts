import { handleCallToolRequest, handleRequest } from "./index";

describe("handleRequest", () => {
  it("应该返回正确的工具列表", async () => {
    const result = await handleRequest();
    expect(result.tools).toContainEqual({
      name: "getSystemInfo",
      description: "获取当前系统的环境信息",
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
  });
});

describe("handleCallToolRequest", () => {
  it("应该返回系统信息", async () => {
    const result = await handleCallToolRequest({
      params: { name: "getSystemInfo" },
    });
    const systemInfo = JSON.parse(result.content[0].text);
    expect(systemInfo).toHaveProperty("platform");
    expect(systemInfo).toHaveProperty("arch");
    expect(systemInfo).toHaveProperty("hostname");
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
  });

  it("应该返回 IPv4 信息", async () => {
    const result = await handleCallToolRequest({
      params: { name: "getIpv4Info" },
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
