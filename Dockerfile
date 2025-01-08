#使用官方node.js镜像作为基础镜像
FROM node:20

#设置工作目录
WORKDIR /usr/src/app

#复制package.json和package-lock.json到工作目录
COPY package*.json ./

#清除缓存重新安装依赖
RUN npm ci

#复制所有文件到工作目录
COPY . .

#暴露端口
EXPOSE 8080

#启动应用
CMD [ "npm", "start" ]