#!/bin/bash

set -e

BUCKET=uploads
MAX_RETRIES=10
DELAY=2

# LocalStackの準備完了を待つ
for i in $(seq 1 $MAX_RETRIES); do
  echo "⏳ [$i/$MAX_RETRIES] LocalStack S3 に接続を試みます..."
  if awslocal s3 ls >/dev/null 2>&1; then
    echo "✅ LocalStack S3 準備完了"
    break
  fi
  sleep $DELAY
done

# バケット作成
echo "📦 バケット作成中: $BUCKET"
awslocal s3 mb s3://$BUCKET || true

# CORS 設定
echo "🌐 CORS 設定中..."
awslocal s3api put-bucket-cors \
  --bucket $BUCKET \
  --cors-configuration file:///etc/localstack/init/ready.d/cors.json || true

echo "✅ S3 バケット & CORS 設定完了"
