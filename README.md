# London-Twitter-Map-Web-Server



# Docker build commands
docker build -t canada_blog_staging . &&
docker tag canada_blog_staging:latest 293326272061.dkr.ecr.us-east-1.amazonaws.com/canada_blog_staging:latest && 
docker push 293326272061.dkr.ecr.us-east-1.amazonaws.com/canada_blog_staging:latest



docker build -f Nginx.Dockerfile -t nginx . &&
docker tag nginx:latest 293326272061.dkr.ecr.us-east-1.amazonaws.com/nginx:latest &&
docker push 293326272061.dkr.ecr.us-east-1.amazonaws.com/nginx:latest &&
git add -A &&
eb deploy --staged