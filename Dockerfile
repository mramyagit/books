FROM node:18.16.0-alpine

# Create app directory
WORKDIR /var/www/books

# Bundle app source
COPY . .

# Install app dependencies
RUN npm install

EXPOSE 4545
CMD [ "node", "books.js" ]