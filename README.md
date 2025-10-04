# Hiring Task - Proje Dokümantasyonu

## 📋 Proje Hakkında

Bu proje, işe alım görevi kapsamında geliştirilmiştir. Projenin temel amacı, E-bebek ana sayfasında kullanılan ürün carousel bileşeninin yeniden oluşturulmasıdır.

### Mevcut Durum
- ✅ Masaüstü görünüm tamamlandı (Belirtmek isterimki ben monitör kullandığımdan dolayı malesef henüz laptop ekranında nasıl göründüğünü de test edemedim)
- ✅ Fonksiyonel özellikler tamamlandı
- ✅ Responsive tasarım hazırlandı

## ✨ Tamamlanan Özellikler

### 1. Carousel Bileşeni
- E-bebek'in orijinal carousel tasarımının **pixel-perfect** implementasyonu
- Smooth animasyonlar ve geçişler
- Kullanıcı dostu navigasyon kontrolleri

### 2. Ürün Verisi Yönetimi
- API'den ürün listesinin otomatik çekilmesi
- **Local Storage entegrasyonu**: İlk yüklemede API'den veri çekilir, sonraki yüklemelerde Local Storage kullanılır

### 3. Ürün Kartları
- Carousel başlığı: **"Beğenebileceğinizi düşündüklerimiz"**
- Her ürün kartı tıklanabilir ve ilgili ürün detay sayfasına yönlendirir
- Otomatik indirim oranı hesaplama (fiyat ve orijinal fiyat farklıysa)

### 4. Favori Sistemi
- ❤️ Kalp ikonu ile favori ekleme/çıkarma
- Favori durumunun Local Storage'da kalıcı olarak saklanması
- Sayfa yeniden yüklendiğinde favori durumlarının korunması
- Görsel geri bildirim (turuncu renk ile dolu kalp)

### 5. Güvenlik ve Kısıtlamalar
- Kod sadece `https://www.e-bebek.com/` domain'inde çalışacak şekilde yapılandırıldı
- Diğer URL'lerde "Yanlış Sayfa" hatası gösterilir

## 🛠️ Teknik Detaylar

### Kullanılan Teknolojiler
- HTML5
- CSS3
- JavaScript
- jQuery
- Local Storage

### Veri Yönetimi
```javascript
// İlk yükleme: API'den veri çekme
// Sonraki yüklemeler: Local Storage'den veri okuma
````

### Nasıl kullanılır
1. https://www.e-bebek.com/'a gidin
2. Console'i açın
3. Kodu yapıştırın
4. Enter'e basın
5. Test edin
