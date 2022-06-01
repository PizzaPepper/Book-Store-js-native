FROM nginx

#config
COPY ./nginx.conf /etc/nginx/nginx.conf

#content
COPY ./ /usr/share/nginx/html/

