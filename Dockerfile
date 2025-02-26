FROM mcr.microsoft.com/azurelinux/base/nodejs:20.14 AS build
WORKDIR /app
# ENV PROFILE_ENV $ENVIRONMENT_DEPLOY

COPY . .
RUN npm install
RUN npm run build

FROM mcr.microsoft.com/azurelinux/base/nginx:1.25
COPY --from=build /app/dist/ /app/

COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /app

CMD ["nginx", "-g", "daemon off;"]
