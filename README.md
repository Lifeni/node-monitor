# Node Monitor

用前端技术做的系统信息收集程序，包含收集和展示两个部分。

## 项目结构

项目使用 [lerna](https://github.com/lerna/lerna) 来管理多个子项目。

| 名称     | 说明                                   | 地址                                       |
| -------- | -------------------------------------- | ------------------------------------------ |
| 客户端   | 负责收集系统信息并发送给服务端         | [packages/client](./packages/client)       |
| 展示页面 | 负责读取并展示数据                     | [packages/dashboard](./packages/dashboard) |
| 服务端   | 负责将不同客户端的数据收集并存入数据库 | [packages/server](./packages/server)       |

## 用的技术

开发工具：

- [**pnpm/pnpm**: Fast, disk space efficient package manager](https://github.com/pnpm/pnpm)
- [**lerna/lerna**: A tool for managing JavaScript projects with multiple packages.](https://github.com/lerna/lerna)
- [**TypeStrong/ts-node**: TypeScript execution and REPL for node.js](https://github.com/TypeStrong/ts-node)
- [**remy/nodemon**: Monitor for any changes in your node.js application and automatically restart the server - perfect for development](https://github.com/remy/nodemon)
- [**prettier/prettier**: Prettier is an opinionated code formatter.](https://github.com/prettier/prettier)

构建工具：

- [**evanw/esbuild**: An extremely fast JavaScript bundler and minifier](https://github.com/evanw/esbuild)
- [**vercel/pkg**: Package your Node.js project into an executable](https://github.com/vercel/pkg)
- [**docker/compose**: Define and run multi-container applications with Docker](https://github.com/docker/compose)

## License

[MIT License](./LICENSE)