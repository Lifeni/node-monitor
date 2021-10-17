# Server

负责将不同客户端的数据收集并存入数据库的服务端。

## 用的技术

- [**socketio/socket.io**: Realtime application framework (Node.JS server)](https://github.com/socketio/socket.io)
- [**hapijs/hapi**: The Simple, Secure Framework Developers Trust](https://github.com/hapijs/hapi)
- [**prisma/prisma**: Next-generation ORM for Node.js & TypeScript | PostgreSQL, MySQL, MariaDB, SQL Server, SQLite & MongoDB (Preview)](https://github.com/prisma/prisma)
- [**postgres/postgres**: Mirror of the official PostgreSQL GIT repository.](https://github.com/postgres/postgres)
- [**iamkun/dayjs**: ⏰ Day.js 2kB immutable date-time library alternative to Moment.js with the same modern API](https://github.com/iamkun/dayjs/)

## 环境变量

| 名称        | 用处                  | 默认值                                                           |
| ----------- | --------------------- | ---------------------------------------------------------------- |
| `WS_PORT`   | 服务器 WebSocket 端口 | `9010`                                                           |
| `HTTP_PORT` | 服务器 HTTP 端口      | `9020`                                                           |
| `DB_URL`    | 数据库接口地址        | `postgresql://<USERNAME>:<PASSWORD>@localhost:5432/node-monitor` |

## 接口设计

也可以看看 [`api.ts`](./api.ts) 里的注释。

### `GET` `/bots`

获取所有的连接过的客户端 ID 及其简略信息。

<details>
<summary>返回数据示例</summary>

&nbsp;

```json
[
  {
    "id": 1,
    "name": "f732f4ad-db7b-4d59-98e9-543ee61e2a4c",
    "time": 1634458480519,
    "system": {
      "id": 1,
      "manufacturer": "Microsoft",
      "model": "WSL",
      "version": 1237,
      "virtual": true
    },
    "os": {
      "id": 1,
      "platform": "linux",
      "distro": "Ubuntu",
      "release": "18.04.5 LTS",
      "arch": "x64",
      "hostname": "Notebook-LFN"
    }
  }
]
```

&nbsp;

</details>

### `GET` `/bot/{name}/info`

获取指定客户端的系统信息数据。

<details>
<summary>返回数据示例</summary>

&nbsp;

```json
{
  "id": 1,
  "name": "f732f4ad-db7b-4d59-98e9-543ee61e2a4c",
  "time": 1634458480519,
  "system": {
    "id": 1,
    "manufacturer": "Microsoft",
    "model": "WSL",
    "version": 1237,
    "virtual": true
  },
  "os": {
    "id": 1,
    "platform": "linux",
    "distro": "Ubuntu",
    "release": "18.04.5 LTS",
    "arch": "x64",
    "hostname": "Notebook-LFN"
  },
  "cpu": {
    "id": 1,
    "manufacturer": "Intel®",
    "brand": "Core™ i7-8550U",
    "speed": 1.8,
    "cores": 8,
    "physicalCores": 4,
    "processors": 1
  },
  "network": [
    {
      "id": 1,
      "iface": "eth0",
      "ip4": "172.23.32.1",
      "ip6": "fe80::f003:f64a:71cd:2d4b",
      "mac": "00:15:5d:38:ec:38",
      "systemInfoId": 1
    }
  ],
  "disk": [
    {
      "id": 1,
      "fs": "rootfs",
      "size": "499775442944",
      "used": "396712529920",
      "available": "103062913024",
      "use": 79.38,
      "mount": "/",
      "systemInfoId": 1
    }
  ]
}
```

&nbsp;

</details>

### `GET` `/bot/{name}/load`

获取指定客户端的系统负载数据。

<details>
<summary>返回数据示例</summary>

&nbsp;

```json
[
  {
    "id": 1,
    "name": "f732f4ad-db7b-4d59-98e9-543ee61e2a4c",
    "time": 1634458485525,
    "load": 17.0461354167168,
    "cpu": [
      20.8590700360494, 11.41565946144175, 23.3050431293291, 12.45225217084062,
      19.50636217491716, 13.54775420932726, 17.7385646722266, 17.48185837274735
    ],
    "memory": {
      "id": 1,
      "total": "17058336768",
      "free": "2603118592",
      "used": "14455218176",
      "available": "2845270016",
      "swaptotal": "51539607552",
      "swapused": "3539410944",
      "swapfree": "48000196608",
      "buffcache": "242151424"
    }
  }
]
```

&nbsp;

</details>

可以使用 **查询参数（Query Parameter）** 来对数据进行筛选。

| 参数    | 说明                                            | 默认值 |
| ------- | ----------------------------------------------- | ------ |
| `from`  | Unix 时间戳（毫秒），从该时间戳开始获取（包含） | 无     |
| `to`    | Unix 时间戳（毫秒），到该时间戳结束获取（包含） | 无     |
| `count` | 获取的数据最大条数                              | `100`  |

三者均为可选参数，可独立使用。
