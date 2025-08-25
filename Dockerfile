# Stage 1: Build aplikasi React
FROM node:18-alpine AS build

# Tentukan direktori kerja
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package.json package-lock.json ./

# Instal dependensi
# Gunakan --dns-result-order=ipv4first untuk memastikan instalasi berhasil di beberapa lingkungan
RUN npm install --legacy-peer-deps

# Salin semua kode aplikasi
COPY . .

# Jalankan build produksi untuk React
# Folder 'build' yang akan dibuat berisi file-file statis
RUN npm run build

# Stage 2: Serve aplikasi React yang sudah di-build dengan Nginx
FROM nginx:alpine

# Salin output build dari Stage 1 ke direktori Nginx
# Pastikan folder 'build' sesuai dengan output dari 'npm run build'
COPY --from=build /app/build /usr/share/nginx/html

# Salin file konfigurasi Nginx kustom
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Buka port 80 untuk lalu lintas
EXPOSE 80

# Jalankan Nginx saat container dimulai
CMD ["nginx", "-g", "daemon off;"]
