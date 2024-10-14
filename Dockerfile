# Stage 1: Build the Angular application
FROM node:18 as build

# Set the working directory
WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli

COPY . ./

RUN ng build --configuration=production

FROM nginx:latest

COPY --from=build /app/dist/personal-website/browser /usr/share/nginx/html

EXPOSE 80

#  Build Docker
# docker build -t personal-website .

# Run Docker
# docker run -d -p 4200:80 personal-website

