FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]

FROM golang:1.11 AS go_builder
ADD . /app
WORKDIR /app
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags "-w" -a -o /main .
LABEL name="server" version="1.0"

FROM alpine:latest
RUN apk --no-cache add ca-certificates
COPY --from=go_builder /main ./
RUN chmod +x ./main
EXPOSE 8080
CMD ./main