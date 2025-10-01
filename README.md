# Note App – React + Node.js + GraphQL (Author: HoleTex)

## Kiến trúc & Thư mục

## 2:33:53

.
├─ client/ # React + Vite
├─ server/ # Express + Apollo Server v4
│ ├─ fakeData/index.js # Dữ liệu giả (authors, folders)
│ └─ server.mjs # Entry GraphQL API (ESM)
├─ .gitignore
├─ .Prettierrc
└─ README.md

## Chạy nhanh (Quick Start)

# 1) Clone

git clone https://github.com/phuocsasc/Note_App_GraphQL.git
cd Note_App_GraphQL

# 2) Cài & chạy server

cd server
npm install

# Sửa script start (khuyến nghị) trong server/package.json thành: "start": "node server.mjs"

npm run start

# Server lên ở: http://localhost:4000/graphql (Apollo Sandbox)

# 3) Cài & chạy client (tab terminal khác)

cd ../client
npm install
npm run dev

# Mặc định Vite chạy ở: http://localhost:5173
