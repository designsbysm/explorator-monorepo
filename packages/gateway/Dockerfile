# nginx reverse proxy Dockerfile
FROM nginx:1.25-alpine

# remove default config
RUN rm /etc/nginx/conf.d/default.conf

# copy custom nginx config template
COPY nginx.conf /etc/nginx/nginx.conf.template

# substitute environment variables into a new config
ARG HOST_CLIENT
ARG HOST_SERVER
RUN envsubst '${HOST_CLIENT} ${HOST_SERVER}' < /etc/nginx/nginx.conf.template > /etc/nginx/conf.d/nginx.conf

CMD nginx -g 'daemon off;'
