# 家族谱 (Family Tree)

这是一个基于 [Next.js](https://nextjs.org) 开发的家族谱展示项目，可以用来展示和管理您的家族历史和成员关系。

## 功能特点

- 多代家族成员的可视化展示
- 家族成员之间的关系链接
- 个人详细信息记录
- 可选的登录验证机制
- 完全可定制的界面和数据

## 快速开始

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
# 或
bun install
```

### 配置项目

1. 复制环境变量模板并进行配置：

```bash
cp .env.local.example .env.local
```

2. 在 `.env.local` 文件中设置您的配置：

```
# 是否需要登录验证 (true/false)
REQUIRE_AUTH=false

# 验证模式 (all: 允许所有家族成员, specific: 只允许输入特定名称)
AUTH_MODE=specific
# 特定用户登录名称
SPECIFIC_NAME=白景琦

# 姓氏配置（用于网站标题、描述和页脚）
NEXT_PUBLIC_FAMILY_NAME=白
```

### 添加家族数据

1. 在 `config` 目录中创建您的家族数据文件，可以参考 `family-data.example.json` 或 `family-data-bai.json`。

2. 按照以下格式添加您的家族成员信息：

```json
{
  "generations": [
    {
      "title": "第一世",
      "people": [
        {
          "id": "person-id",
          "name": "姓名",
          "info": "人物描述",
          "fatherId": "父亲ID"
        }
      ]
    }
  ]
}
```

字段说明：
- `id`: 每个人的唯一标识符，用于建立关系
- `name`: 姓名
- `info`: 个人描述、生平简介等
- `fatherId`: 父亲的ID，用于建立代际关系

### 运行项目

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
# 或
bun dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看您的家族谱。

## 数据格式详解

家族数据以 JSON 格式存储，按照世代（generations）组织：

- 每个世代有一个标题（title）和一组人员（people）
- 每个人员包含 ID、姓名、信息和父亲ID
- 通过 `fatherId` 建立父子关系
- 可以在信息字段中添加配偶、子女和其他重要信息

示例：
```json
{
  "generations": [
    {
      "title": "第一世",
      "people": [
        {
          "id": "ancestor",
          "name": "始祖",
          "info": "家族创始人，生于1850年"
        }
      ]
    },
    {
      "title": "第二世",
      "people": [
        {
          "id": "second-gen-1",
          "name": "长子",
          "info": "生于1880年，妻王氏",
          "fatherId": "ancestor"
        },
        {
          "id": "second-gen-2",
          "name": "次子",
          "info": "生于1885年，妻李氏",
          "fatherId": "ancestor"
        }
      ]
    }
  ]
}
```

## 自定义与扩展

- 修改 `app/page.tsx` 自定义首页内容
- 调整 `config/family-data.json` 中的数据文件更新家族信息
- 编辑 `.env.local` 文件更改配置和验证方式

## 部署

推荐使用 [Vercel 平台](https://vercel.com/new) 部署您的家族谱项目：

1. 将代码推送到 GitHub/GitLab/Bitbucket
2. 在 Vercel 上导入您的仓库
3. 设置环境变量
4. 部署

## 相关服务

�� **[www.fatemaster.ai](https://www.fatemaster.ai)** - AI八字算命网站，提供智能化命理分析服务，帮助您了解先祖的命运与传承。

## 贡献

欢迎提交 Pull Request 或创建 Issue 来改进这个项目。

## 许可

MIT
