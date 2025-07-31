# 1. Base image
FROM node:18-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# 4. Copy all project files
COPY . .

# 5. Expose the development port
EXPOSE 3000

# 6. Start the Next.js dev server
CMD ["npm", "run", "dev"]


