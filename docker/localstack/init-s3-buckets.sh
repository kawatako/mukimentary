#!/bin/bash
# LocalStack S3バケット作成＋CORS設定

# バケット名（必要に応じて複数可）
BUCKET=uploads

# 1. バケット作成
awslocal s3 mb s3://$BUCKET

# 2. CORS設定（※ JSONは「CORSRules」形式で！）
awslocal s3api put-bucket-cors \
  --bucket $BUCKET \
  --cors-configuration file:///docker-entrypoint-initaws.d/cors.json