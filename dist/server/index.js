"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const server = new index_js_1.Server({
    name: "linkedin-mcp",
    version: "1.0.0",
}, {
    capabilities: {
        tools: {},
    },
});
/**
 * LIST TOOLS
 */
server.setRequestHandler(types_js_1.ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "hello",
                description: "Test MCP tool",
                inputSchema: {
                    type: "object",
                    properties: {},
                },
            },
        ],
    };
});
/**
 * TOOL EXECUTION
 */
server.setRequestHandler(types_js_1.CallToolRequestSchema, async (request) => {
    const toolName = request.params.name;
    if (toolName === "hello") {
        return {
            content: [
                {
                    type: "text",
                    text: "MCP server working successfully 🚀",
                },
            ],
        };
    }
    throw new Error(`Unknown tool: ${toolName}`);
});
/**
 * START SERVER
 */
async function startServer() {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
    // console.error(
    //   "LinkedIn MCP Server Running..."
    // );
}
startServer();
