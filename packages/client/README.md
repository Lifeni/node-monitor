# Client

一个负责收集系统信息的客户端。

## 用的技术

程序依赖：

- [**socketio/socket.io**: Realtime application framework (Node.JS server)](https://github.com/socketio/socket.io)
- [**sebhildebrandt/systeminformation**: System Information Library for Node.JS](https://github.com/sebhildebrandt/systeminformation)
- [**uuidjs/uuid**: Generate RFC-compliant UUIDs in JavaScript](https://github.com/uuidjs/uuid)
- [**lodash/lodash**: A modern JavaScript utility library delivering modularity, performance, & extras.](https://github.com/lodash/lodash)

开发工具：

- [**pnpm/pnpm**: Fast, disk space efficient package manager](https://github.com/pnpm/pnpm)
- [**TypeStrong/ts-node**: TypeScript execution and REPL for node.js](https://github.com/TypeStrong/ts-node)
- [**remy/nodemon**: Monitor for any changes in your node.js application and automatically restart the server - perfect for development](https://github.com/remy/nodemon)
- [**prettier/prettier**: Prettier is an opinionated code formatter.](https://github.com/prettier/prettier)

构建工具：

- [**evanw/esbuild**: An extremely fast JavaScript bundler and minifier](https://github.com/evanw/esbuild)
- [**vercel/pkg**: Package your Node.js project into an executable](https://github.com/vercel/pkg)

## 环境变量

| env        | 用处                  | 默认值                |
| ---------- | --------------------- | --------------------- |
| `ID`       | 客户端 ID             | 随机生成的 UUID       |
| `WS_URL`   | 服务器 WebSocket 地址 | `ws://localhost:9010` |
| `INTERVAL` | 负载数据收集间隔时间  | `5` （单位为秒）      |