# CodeTalk - React Native Sohbet Uygulaması

Bu proje, React Native ve Firebase kullanılarak geliştirilmiş bir gerçek zamanlı sohbet uygulamasıdır.

## Gereksinimler

- Node.js (v14.0.0 veya üzeri)
- npm veya yarn
- Expo CLI
- Firebase Hesabı

## Kullanılan Paketler

```json
{
  "@react-native-async-storage/async-storage": "^1.21.0",
  "@react-native-segmented-control/segmented-control": "^2.5.0",
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/stack": "^6.3.20",
  "expo": "~50.0.5",
  "expo-status-bar": "~1.11.1",
  "firebase": "^10.7.2",
  "formik": "^2.4.5",
  "react": "18.2.0",
  "react-native": "0.73.2",
  "react-native-dotenv": "^3.4.9",
  "react-native-gesture-handler": "~2.14.0",
  "react-native-safe-area-context": "4.8.2",
  "react-native-screens": "~3.29.0"
}
```

## Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/armaganaysu/chatapp.git
cd chatapp
```

2. Gerekli paketleri yükleyin:
```bash
npm install
# veya
yarn install
```

3. Environment değişkenlerini ayarlayın:
   - `.env.example` dosyasını `.env` olarak kopyalayın
   - Firebase Console'dan aldığınız yapılandırma bilgilerini `.env` dosyasına ekleyin

4. Uygulamayı başlatın:
```bash
npx expo start
```

## Firebase Kurulumu

1. [Firebase Console](https://console.firebase.google.com/)'a gidin
2. Yeni bir proje oluşturun
3. Authentication ve Realtime Database servislerini etkinleştirin
4. Web uygulaması için yapılandırma bilgilerini alın
5. Bu bilgileri `.env` dosyanıza ekleyin

## Özellikler

- Kullanıcı Kaydı ve Girişi
- Gerçek Zamanlı Sohbet Odaları
- Sohbet Odası Oluşturma
- Anlık Mesajlaşma

## Lisans

MIT

## İletişim

Armağan Aysu - [GitHub](https://github.com/armaganaysu)