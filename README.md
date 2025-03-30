# İstanbulRota

İstanbulRota, İstanbul'un tüm güzelliklerini keşfetmenizi sağlayan kapsamlı bir gezi rehberi platformudur. Semtler, mekanlar, etkinlikler ve daha fazlası hakkında detaylı bilgiler sunar.

## 🚀 Özellikler

- 🌍 Çoklu dil desteği (Türkçe/İngilizce)
- 🗺️ İnteraktif harita entegrasyonu
- 📱 Mobil uyumlu tasarım
- 🔍 Gelişmiş arama ve filtreleme
- 📸 Kullanıcı fotoğraf paylaşımı
- ⭐ Kullanıcı yorumları ve puanlama sistemi
- 🎫 Etkinlik ve bilet yönetimi
- 📝 Blog ve rehber içerikleri

## 🛠️ Teknolojiler

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Tip güvenliği
- [Tailwind CSS](https://tailwindcss.com/) - Stil framework'ü
- [Sanity.io](https://www.sanity.io/) - Headless CMS
- [next-intl](https://next-intl-docs.vercel.app/) - Çoklu dil desteği
- [Material UI](https://mui.com/) - UI komponentleri

## 📦 Kurulum

1. Projeyi klonlayın:

```bash
git clone https://github.com/yourusername/istanbul-rota.git
cd istanbul-rota
```

2. Bağımlılıkları yükleyin:

```bash
npm install
# veya
yarn install
# veya
pnpm install
```

3. Geliştirme sunucusunu başlatın:

```bash
npm run dev
# veya
yarn dev
# veya
pnpm dev
```

4. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 🌐 Ortam Değişkenleri

Projeyi çalıştırmak için aşağıdaki ortam değişkenlerini `.env.local` dosyasında tanımlamanız gerekmektedir:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-03-13
```

## 📚 Dokümantasyon

- [Klasör Yapısı](SITE-MAP.md#klasör-yapısı) - Proje klasör organizasyonu
- [Sayfa Yapıları](SITE-MAP.md#sayfa-yapıları) - Her sayfanın içerik ve özellikleri

## 🎨 Tasarım

Proje, modern ve kullanıcı dostu bir arayüz sunmak için aşağıdaki tasarım prensiplerini takip eder:

- Minimalist ve temiz tasarım
- Kolay navigasyon
- Hızlı yükleme süreleri
- Responsive tasarım
- Erişilebilirlik standartları
