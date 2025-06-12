# docker/localstack/Dockerfile
FROM localstack/localstack:latest

# CORS設定スクリプトとJSONをコピー
COPY init-s3-buckets.sh /etc/localstack/init/ready.d/init-s3-buckets.sh
COPY cors.json          /etc/localstack/init/ready.d/cors.json

# スクリプトに実行権限付与
RUN chmod +x /etc/localstack/init/ready.d/init-s3-buckets.sh
