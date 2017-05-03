#!/bin/bash 

#Script to build and push a docker image to AWS repo then deploy to AWS elastic beanstalk


echo "################################################"
echo "#########   MAKE SURE YOUVE LOGGED IN  #########"
echo "#########   aws ecr get-login          #########"
echo "################################################"
echo ""

echo "#########   BUILDING CANADA BLOG   #########"
docker build -t canada_blog_staging . 
docker tag canada_blog_staging:latest 293326272061.dkr.ecr.us-east-1.amazonaws.com/canada_blog_staging:latest 
docker push 293326272061.dkr.ecr.us-east-1.amazonaws.com/canada_blog_staging:latest


echo "#########   BUILDING NGINX   #########"
docker build -f Nginx.Dockerfile -t nginx . 
docker tag nginx:latest 293326272061.dkr.ecr.us-east-1.amazonaws.com/nginx:latest 
docker push 293326272061.dkr.ecr.us-east-1.amazonaws.com/nginx:latest 

echo "#########   DEPLOYING   #########"
git add -A 
eb deploy --staged