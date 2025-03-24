# Chuyển Đổi Nhiệt Độ & Lấy Vị Trí

## Giới thiệu

Ứng dụng này cho phép người dùng:
- Chuyển đổi nhiệt độ từ Độ C sang Độ F
- Lấy vị trí hiện tại (tọa độ và tên vị trí)
- Nhận thông báo sau khi chuyển đổi nhiệt độ
- Chia sẻ kết quả nhiệt độ và vị trí

## Cài đặt và Chạy Ứng Dụng

### 1. Clone repository

git clone https://github.com/nhat65/Capacitor-App-Mid-Term.git  
cd Capacitor-App-Mid-Term

### 2. Cài đặt các phụ thuộc

npm install

### 3. Chạy ứng dụng trên trình duyệt

npm run start

### 4. Chạy ứng dụng trên Android Studio

npx cap open android

## Công Nghệ Sử Dụng
- **Frontend**: HTML, CSS (TailwindCSS), JavaScript
- **Backend**: Không cần server cục bộ, chạy hoàn toàn trên trình duyệt
- **Capacitor Plugins**:
  - `@capacitor/local-notifications` - Hiển thị thông báo
  - `@capacitor/share` - Chia sẻ kết quả
  - `@capacitor/splash-screen` - Quản lý Splash Screen
  - `@capacitor/geolocation` - Lấy vị trí hiện tại

## Ghi Chú
- Cần cấp quyền vị trí và thông báo khi chạy trên di động.
- Trên Android, khi chạy `npx cap open android`, hãy kiểm tra các quyền trước khi build APK.


