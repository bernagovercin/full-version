# Bilgisayar Mühendisliği Lisans Bitirme Projesi Frontend 

Bu proje, Sipariş Yönetim Sistemi ve Hata Yönetim Sistemi olmak üzere iki ana bölümden oluşmaktadır. Angular 19 kullanılarak geliştirilmiştir. Proje, kullanıcıların siparişlerini ve hatalarını yönetmelerine olanak tanır.

## Teknolojiler 

Angular 19

TypeScript

HTML5, CSS3
## Kurulum 

Projeyi Klonlayın:
 git clone https://github.com/full-version.git
cd full-version

Gerekli Bağımlılıkları Yükelyin: 
npm install
npm i --legacy-peer-deps

Projeyi çalıştırın: 
ng serve

Taratıcıda Görüntüleyin:

http://localhost:4200 

## Proje Yapısı

Proje iki ana bölümden oluşmaktadır:

Sipariş Yönetim Sistemi: Sipariş oluşturma, düzenleme, silme ve listeleme işlemleri. Sipariş durumlarını takip etme.

Hata Yönetim Sistemi: Hata kaydı oluşturma, güncelleme ve çözümleme. Hata durumlarını takip etme.

## Giriş Yapma Zorunluluğunu Kaldırma 
Projede sayfalara erişim için giriş yapma zorunluluğu bulunmaktadır. Bu zorunluluğu kaldırmak için aşağıdaki adımları izleyebilirsiniz:

Routing Dosyasını Düzenleyin:
app-routing.module.ts dosyasında canActivate ile korunan route'ları bulun ve bu korumayı kaldırın.

Auth Guard'ı Devre Dışı Bırakın:
 canActivate için kullanılan  AuthGuardı,  route'lardan kaldırın.

## Katkıda Bulunam 

Projeye katkıda bulunmak isterseniz:

Fork edin.

Yeni bir branch oluşturun (git checkout -b yeni-ozellik).

Değişikliklerinizi commit edin (git commit -m 'Yeni özellik eklendi').

Branch'i pushlayın (git push origin yeni-ozellik).

Pull Request oluşturun.

## Lisans 

Bu proje MIT Lisansı ile lisanslanmıştır

## İletişim 

Proje ile ilgili sorularınız veya geri bildirimleriniz için bana e-posta veya GitHub üzerinden ulaşabilirsiniz.
