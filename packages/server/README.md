# Server

负责将不同客户端的数据收集并存入数据库的服务端。

## 用的技术

- [**socketio/socket.io**: Realtime application framework (Node.JS server)](https://github.com/socketio/socket.io)
- [**hapijs/hapi**: The Simple, Secure Framework Developers Trust](https://github.com/hapijs/hapi)
- [**prisma/prisma**: Next-generation ORM for Node.js & TypeScript | PostgreSQL, MySQL, MariaDB, SQL Server, SQLite & MongoDB (Preview)](https://github.com/prisma/prisma)
- [**postgres/postgres**: Mirror of the official PostgreSQL GIT repository.](https://github.com/postgres/postgres)

## 环境变量

| 名称        | 用处                  | 默认值                                                           |
| ----------- | --------------------- | ---------------------------------------------------------------- |
| `WS_PORT`   | 服务器 WebSocket 端口 | `9010`                                                           |
| `HTTP_PORT` | 服务器 HTTP 端口      | `9020`                                                           |
| `DB_URL`    | 数据库接口地址        | `postgresql://<USERNAME>:<PASSWORD>@localhost:5432/node-monitor` |