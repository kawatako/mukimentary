# frontend/Dockerfile

# 公式Nodeイメージをベースに使う（最新LTSの20系）
FROM node:20

# 作業ディレクトリを/appに指定
WORKDIR /app

# 依存関係ファイルを先にコピー
COPY package.json package-lock.json* ./

# 依存インストール（node_modules生成）
RUN npm install

# アプリ本体をコピー（src, app, components, styles, など全部）
COPY . .

# ホストとのファイル変更を即時反映したい場合（MVP/開発時はこのままでOK）

# Next.jsアプリ（devサーバ）を起動
EXPOSE 3000
CMD ["npm", "run", "dev"]
