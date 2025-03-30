# İstanbulRota Site Haritası

## Klasör Yapısı

```
istanbul-rota/
├── app/
│   ├── [locale]/
│   │   ├── (home)/
│   │   │   └── page.tsx
│   │   ├── semtler/
│   │   │   ├── page.tsx
│   │   │   └── [semt-adı]/
│   │   │       ├── page.tsx
│   │   │       ├── gezilecek-mekanlar/
│   │   │       │   └── page.tsx
│   │   │       ├── yapilacak-seyler/
│   │   │       │   └── page.tsx
│   │   │       ├── semt-blog-yazisi/
│   │   │       │   └── page.tsx
│   │   │       └── isletmeler/
│   │   │           ├── page.tsx
│   │   │           └── [isletme-adi]/
│   │   │               └── page.tsx
│   │   ├── mekanlar/
│   │   │   ├── page.tsx
│   │   │   └── [mekan-adi]/
│   │   │       ├── page.tsx
│   │   │       ├── yorumlar/
│   │   │       │   └── page.tsx
│   │   │       └── galeri/
│   │   │           └── page.tsx
│   │   ├── etkinlikler/
│   │   │   ├── page.tsx
│   │   │   └── [etkinlik-adi]/
│   │   │       ├── page.tsx
│   │   │       ├── biletler/
│   │   │       │   └── page.tsx
│   │   │       └── detaylar/
│   │   │           └── page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [blog-yazisi-adi]/
│   │   │       └── page.tsx
│   │   ├── rehberler/
│   │   │   ├── page.tsx
│   │   │   └── [rehber-adi]/
│   │   │       └── page.tsx
│   │   ├── hakkimizda/
│   │   │   └── page.tsx
│   │   ├── iletisim/
│   │   │   └── page.tsx
│   │   ├── uye-ol/
│   │   │   └── page.tsx
│   │   └── giris/
│   │       └── page.tsx
│   └── layout.tsx
├── components/
│   ├── header/
│   │   └── index.tsx
│   ├── footer/
│   │   └── index.tsx
│   ├── search-input/
│   │   └── index.tsx
│   └── ui/
│       └── ...
├── lib/
│   ├── sanity/
│   │   └── client.ts
│   └── utils/
│       └── ...
├── messages/
│   ├── en.json
│   └── tr.json
├── public/
│   ├── images/
│   └── icons/
├── styles/
│   └── globals.css
├── types/
│   └── index.ts
└── studio/
    └── ...
```

## Sayfa Yapıları

## Ana Sayfa (/)

- Arama çubuğu
- Filtreler (Tümü, Kafeler, Yapılacak Şeyler, Restoranlar)
- Öne çıkan semtler
- Popüler mekanlar
- Son eklenen blog yazıları
- Öne çıkan etkinlikler

## Semtler (/tr/semtler)

### Semt Listesi

- Tüm semtlerin alfabetik listesi
- Bölgelere göre filtreleme (Avrupa/Anadolu Yakası)
- Popüler semtler
- Yeni eklenen semtler
- Her semt için:
  - Küçük bir fotoğraf
  - Kısa açıklama
  - Öne çıkan özellikler
  - Gezilecek yer sayısı
  - İşletme sayısı
  - Etkinlik sayısı

### Filtreleme ve Arama

- Alfabetik sıralama
- Bölgeye göre filtreleme
- Özelliklere göre filtreleme (tarihi, modern, turistik vb.)
- Arama çubuğu
- Harita görünümü

## Semt Detay Sayfası (/tr/semtler/[semt-adı])

### Genel Bilgiler

- Semt hakkında genel bilgi
- Konum ve ulaşım bilgileri
- Semt fotoğrafları
- Hava durumu widget'ı
- Yakın semtler
- Bölge bilgisi

### Gezilecek Mekanlar (/tr/semtler/[semt-adı]/gezilecek-mekanlar)

- Tarihi yerler
- Müzeler
- Parklar ve bahçeler
- Manzaralı noktalar
- Fotoğraf noktaları
- Her mekan için:
  - Detaylı açıklama
  - Fotoğraf galerisi
  - Konum bilgisi
  - Ziyaret saatleri
  - Giriş ücretleri
  - Kullanıcı yorumları

### Yapılacak Şeyler (/tr/semtler/[semt-adı]/yapılacak-seyler)

- Aktiviteler
- Deneyimler
- Turlar
- Her aktivite için:
  - Detaylı açıklama
  - Fiyat bilgisi
  - Rezervasyon linki
  - Kullanıcı deneyimleri

### Semt Blog Yazıları (/tr/semtler/[semt-adı]/semt-blog-yazisi)

- Semt hakkında detaylı yazılar
- Gezi rehberleri
- Yerel hikayeler
- Kullanıcı deneyimleri
- Her yazı için:
  - Yazar bilgisi
  - Yayın tarihi
  - Okuma süresi
  - İlgili etiketler
  - Yorumlar

### İşletmeler (/tr/semtler/[semt-adı]/işletmeler)

#### Kategoriler

- Restoranlar
- Kafeler
- Barlar
- Oteller
- Her işletme için (/tr/semtler/[semt-adı]/işletmeler/[işletme-adı]):
  - Detaylı bilgi
  - Menü
  - Fotoğraf galerisi
  - Çalışma saatleri
  - İletişim bilgileri
  - Konum
  - Kullanıcı yorumları ve puanları
  - Rezervasyon linki

## Mekanlar (/tr/mekanlar)

### Mekan Detay Sayfası (/tr/mekanlar/[mekan-adı])

- Genel bilgiler
- Fotoğraf galerisi
- Konum bilgisi
- İletişim bilgileri
- Çalışma saatleri
- Fiyat aralığı
- Özellikler (WiFi, otopark vb.)

### Yorumlar (/tr/mekanlar/[mekan-adı]/yorumlar)

- Kullanıcı yorumları
- Puanlama sistemi
- Yorum filtreleme
- Yorum yazma formu

### Galeri (/tr/mekanlar/[mekan-adı]/galeri)

- Fotoğraf galerisi
- Kullanıcı fotoğrafları
- Fotoğraf yükleme özelliği

## Etkinlikler (/tr/etkinlikler)

### Etkinlik Detay Sayfası (/tr/etkinlikler/[etkinlik-adı])

- Etkinlik bilgileri
- Tarih ve saat
- Konum
- Organizatör bilgileri
- Katılımcı sayısı
- Sosyal medya paylaşımları

### Biletler (/tr/etkinlikler/[etkinlik-adı]/biletler)

- Bilet seçenekleri
- Fiyat bilgileri
- Satın alma formu
- Bilet iptal politikası

### Detaylar (/tr/etkinlikler/[etkinlik-adı]/detaylar)

- Detaylı program
- Konuşmacılar
- Sponsorlar
- Geçmiş etkinlik fotoğrafları

## Blog (/tr/blog)

### Blog Yazısı (/tr/blog/[blog-yazisi-adı])

- İçerik
- Yazar bilgisi
- Yayın tarihi
- Okuma süresi
- İlgili etiketler
- Sosyal medya paylaşım butonları
- Yorumlar
- İlgili yazılar

## Rehberler (/tr/rehberler)

### Rehber Detay Sayfası (/tr/rehberler/[rehber-adı])

- İçerik
- Harita entegrasyonu
- İpuçları
- Sık sorulan sorular
- İlgili linkler

## Diğer Sayfalar

### Hakkımızda (/tr/hakkimizda)

- Şirket bilgileri
- Misyon ve vizyon
- Ekip
- Kariyer fırsatları
- Basın bültenleri

### İletişim (/tr/iletisim)

- İletişim formu
- Adres bilgileri
- Sosyal medya linkleri
- Çalışma saatleri

### Üye Ol (/tr/uye-ol)

- Kayıt formu
- Kullanım şartları
- Gizlilik politikası
- Sosyal medya ile kayıt

### Giriş (/tr/giris)

- Giriş formu
- Şifremi unuttum
- Sosyal medya ile giriş

## Admin Paneli (/studio)

- Sanity Studio arayüzü
- İçerik yönetimi
- Medya yönetimi
- Kullanıcı yönetimi
- Ayarlar
