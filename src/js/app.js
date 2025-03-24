import { LocalNotifications } from '@capacitor/local-notifications';
import { Share } from '@capacitor/share';
import { SplashScreen } from '@capacitor/splash-screen';
import { Geolocation } from '@capacitor/geolocation';

window.addEventListener('DOMContentLoaded', async () => {
    console.log("App loaded");
    await SplashScreen.hide(); 
});

async function convertTemperature() {
    const celsius = document.getElementById('celsius').value;
    const resultElement = document.getElementById('result');
    const shareBtn = document.getElementById('shareBtn');

    if (!celsius || isNaN(celsius)) {
        resultElement.textContent = "Vui lòng nhập nhiệt độ hợp lệ.";
        shareBtn.style.display = "none";
        return;
    }

    const fahrenheit = (parseFloat(celsius) * 9/5) + 32;
    resultElement.textContent = `${celsius}°C = ${fahrenheit.toFixed(2)}°F`;
    shareBtn.style.display = "block"; 

    const perm = await LocalNotifications.requestPermissions();
    if (perm.display === 'granted') {
        await LocalNotifications.schedule({
            notifications: [{
                id: 1,
                title: "Chuyển đổi nhiệt độ",
                body: `${celsius}°C = ${fahrenheit.toFixed(2)}°F`,
                schedule: { at: new Date(Date.now() + 1000) },
            }]
        });
    }

    shareBtn.setAttribute('data-temperature', `${celsius}°C = ${fahrenheit.toFixed(2)}°F`);
}

async function getCurrentLocation() {
    try {
        const position = await Geolocation.getCurrentPosition();
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const locationResult = document.getElementById('locationResult');
        locationResult.textContent = `Vị trí của bạn: ${latitude}, ${longitude}`;

        const shareBtn = document.getElementById('shareLocationBtn');
        shareBtn.style.display = "block";
        shareBtn.setAttribute('data-location', `Tôi đang ở vị trí: ${latitude}, ${longitude}`);

        const perm = await LocalNotifications.requestPermissions();
        if (perm.display === 'granted') {
            await LocalNotifications.schedule({
                notifications: [{
                    id: 2,
                    title: "Vị trí hiện tại",
                    body: `Vĩ độ: ${latitude}, Kinh độ: ${longitude}`,
                    schedule: { at: new Date(Date.now() + 1000) },
                }]
            });
        }

    } catch (error) {
        console.error("Lỗi khi lấy vị trí:", error);
        document.getElementById('locationResult').textContent = "Không thể lấy vị trí.";
    }
}

async function shareResult() {
    const temperature = document.getElementById('shareBtn').getAttribute('data-temperature');
    if (!temperature) return;

    await Share.share({
        title: "Kết Quả Chuyển Đổi Nhiệt Độ",
        text: `Tôi vừa tính được nhiệt độ: ${temperature} 🔥`,
        dialogTitle: "Chia sẻ kết quả"
    });
}

async function shareLocation() {
    const location = document.getElementById('shareLocationBtn').getAttribute('data-location');
    if (!location) return;

    await Share.share({
        title: "Vị trí hiện tại",
        text: location,
        dialogTitle: "Chia sẻ vị trí"
    });
}

window.convertTemperature = convertTemperature;
window.getCurrentLocation = getCurrentLocation;
window.shareResult = shareResult;
window.shareLocation = shareLocation;
