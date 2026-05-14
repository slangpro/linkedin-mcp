import { Server } from "@modelcontextprotocol/sdk/server/index.js";

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "linkedin-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

/**
 * LIST TOOLS
 */
server.setRequestHandler(
  ListToolsRequestSchema,
  async () => {
    return {
      tools: [
        {
          name: "hello",

          description:
            "Test MCP tool",

          inputSchema: {
            type: "object",
            properties: {},
          },
        },
      ],
    };
  }
);

/**
 * TOOL EXECUTION
 */
server.setRequestHandler(
  CallToolRequestSchema,
  async (request) => {
    const toolName =
      request.params.name;

    if (toolName === "hello") {
      return {
        content: [
          {
            type: "text",

            text:
              "MCP server working successfully 🚀",
          },
        ],
      };
    }

    throw new Error(
      `Unknown tool: ${toolName}`
    );
  }
);

/**
 * START SERVER
 */
async function startServer() {
  const transport =
    new StdioServerTransport();

  await server.connect(
    transport
  );

  console.log(
    "LinkedIn MCP Server Running..."
  );
}

startServer();