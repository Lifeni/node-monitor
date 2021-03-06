# Client

一个负责收集系统信息的客户端。

## 用的技术

- [**socketio/socket.io**: Realtime application framework (Node.JS server)](https://github.com/socketio/socket.io)
- [**sebhildebrandt/systeminformation**: System Information Library for Node.JS](https://github.com/sebhildebrandt/systeminformation)
- [**uuidjs/uuid**: Generate RFC-compliant UUIDs in JavaScript](https://github.com/uuidjs/uuid)

## 环境变量

| 名称       | 用处                  | 默认值                |
| ---------- | --------------------- | --------------------- |
| `ID`       | 客户端 ID             | 随机生成的 UUID       |
| `WS_URL`   | 服务器 WebSocket 地址 | `ws://localhost:9010` |
| `INTERVAL` | 负载数据收集间隔时间  | `5` （单位为秒）      |

## 开发

```shell
pnpm i && pnpm run dev
```

客户端支持 Docker、JS、可执行程序的构建，详情可见 [package.json](package.json) 。
