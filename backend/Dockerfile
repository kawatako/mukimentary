FROM ruby:3.3.6-slim

WORKDIR /app

# 必要なパッケージをインストール
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential libpq-dev nodejs && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Gemfile, Gemfile.lockを先にコピー
COPY Gemfile Gemfile.lock ./

# Bundlerでgemインストール
RUN gem install bundler && bundle install

# アプリ本体をコピー
COPY . .

# ポート3000を開ける
EXPOSE 3000

# RAILS_ENV=production のときだけマイグレーションを実行し、常にサーバー起動
CMD ["sh", "-c", "if [ \"$RAILS_ENV\" = \"production\" ]; then bundle exec rails db:migrate; fi && rails server -b 0.0.0.0"]
