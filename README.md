# 💪 Mukimentary（ムキメンタリー）

筋肉 ✖️ AI = ユーモアな掛け声で  
マッチョもマッチョの友達も、楽しく大会に挑めるエンタメSNSです。

---

## 🌟 サービス概要

Mukimentaryは、筋トレやフィジーク大会を盛り上げるための掛け声を  
AIがユニークに生成し、保存・共有できるSNSです。

- 自由入力・AI・画像から選べる3モードで掛け声を生成  
- 掛け声をマイリストに保存して大会・練習用に活用  
- 「#ムキメンタリー」をつけてSNSシェアで盛り上がれる  

🎯 [サービスを使ってみる](https://www.mukimentary.com/)

---

## 🔧 主な機能

| 機能              | 内容                                                             |
|-------------------|------------------------------------------------------------------|
| ✍️ Manualモード    | 自分で自由に掛け声を入力                                         |
| 🤖 AIモード        | 筋肉・ポーズ・キーワードからGPT-4が掛け声を生成                 |
| 🖼️ 画像AIモード    | マッチョ画像から掛け声を生成（Vision API）                      |
| 📁 マイリスト機能 | テーマ別に掛け声を保存・編集・削除・一括コピー                   |
| 📢 シェア機能      | X（旧Twitter）に掛け声をシェア・コピー                            |
| 📱 モバイル対応    | PWA対応、モバイルUIに特化した設計                                |

---

## 🧑‍🤝‍🧑 ターゲットユーザー

- 筋トレを日課にしている人  
- フィジーク・ボディビル大会に出場する選手  
- マッチョな友人を応援したい人  
- SNSで筋肉投稿を楽しみたい人  

---

## 🎨 UI・デザインへのこだわり

> 「やさしい筋肉系SNS」を目指したUI・配色設計

| 要素              | 色              | 意図                             |
|-------------------|------------------|----------------------------------|
| アクセントカラー | `#ff6b81`（ピンク） | 筋肉感と親しみのバランス           |
| サブアクセント    | `#ffa94d`（オレンジ）| 活力や楽しさを演出                 |
| 背景              | `#f9fafb`          | 優しい白、長時間でも疲れにくい     |
| モバイル対応      | ✅                 | スマホ中心、PWA対応済み            |

InstagramとBEAMSの中間のような、  
「ポップだけど本気」の雰囲気を意識しています。

---

## 🧠 技術スタック

| カテゴリ       | 技術                                             |
|----------------|--------------------------------------------------|
| フロントエンド | Next.js 15 App Router（RSC + Server Actions）  |
| スタイリング   | Tailwind CSS v4 / Shadcn UI                     |
| バックエンド   | Ruby on Rails 7（APIモード）                   |
| データベース   | PostgreSQL                                       |
| 認証           | Clerk.dev                                        |
| AI              | OpenAI GPT-4 + Vision API                       |
| ストレージ     | S3（LocalStackでローカル再現）                  |
| デプロイ       | Vercel（Frontend）＋ Render（Backend）         |

---

## 🚀 セットアップ（Docker）

```bash
git clone https://github.com/yourname/mukimentary.git
cd mukimentary
docker-compose up --build
```

- フロントエンド（Next.js）：http://localhost:3000  
- バックエンド（Rails API）：http://localhost:4000  

※ `.env` や Clerk / S3 / OpenAI の環境変数が必要です。

---

## 🔥 シェア機能：生成文言例

> AIがあなたの筋トレを盛り上げる📣  
> 「バズーカ砲より厚い友情」  
> 素敵な掛け声を作ってシェアしよう💪  
> #ムキメンタリー https://mukimentary.com  

Xボタンから1クリックで投稿できます。

---

## 📁 マイリスト活用例

- 「2025レモンクラシック決勝用」  
- 「大腿四頭筋だけまとめた応援リスト」  
- 「筋トレが嫌になったときに見るコレクション」

→ リスト内の掛け声を一括でコピー・友達と共有できます！

---

## 🏁 開発の背景

筋トレ好きな友人の大会出場をきっかけに、  
AIを使って「筋肉 × ユーモア」で人を元気にできるアプリを作りたいと思いました。

真面目なだけじゃなく、笑って筋トレを楽しめる空間を、  
テクノロジーで実現しています。

---
