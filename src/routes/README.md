# Routes Structure

Bu klasör, uygulamanın routing yapısını organize eder ve role-based access control (RBAC) sağlar.

## Dosya Yapısı

```
src/routes/
├── index.tsx          # Ana routing bileşeni
├── AuthRoutes.tsx     # Kimlik doğrulama rotaları
├── AdminRoutes.tsx    # Admin kullanıcı rotaları
├── PatientRoutes.tsx  # Hasta kullanıcı rotaları
├── DoctorRoutes.tsx   # Doktor kullanıcı rotaları
├── PublicRoutes.tsx   # Genel erişim rotaları
├── routeConfig.ts     # Rota konfigürasyonu
└── README.md         # Bu dosya
```

## Kullanıcı Rolleri

- **Admin**: Tüm sayfalara erişim
- **Patient**: Dashboard, randevular, mesajlar, doktorlar, yorumlar, profil, ayarlar
- **Doctor**: Dashboard, randevular, mesajlar, yorumlar, profil, ayarlar (doktorlar sayfası hariç)

## Rota Yapısı

### Auth Routes (`/auth/*`)
- `/auth/login` - Giriş sayfası
- `/auth/register` - Kayıt sayfası
- `/auth/password-update` - Şifre güncelleme

### Protected Routes
Her kullanıcı rolü için ayrı route grupları:

#### Admin Routes
- `/dashboard` - Admin dashboard
- `/appointments` - Randevu yönetimi
- `/messages` - Mesaj yönetimi
- `/doctors` - Doktor yönetimi
- `/reviews` - Yorum yönetimi
- `/settings` - Sistem ayarları
- `/profile/me` - Admin profili

#### Patient Routes
- `/dashboard` - Hasta dashboard
- `/appointments` - Randevu görüntüleme/oluşturma
- `/messages` - Mesajlaşma
- `/doctors` - Doktor listesi ve randevu alma
- `/reviews` - Yorum yazma/görüntüleme
- `/settings` - Hesap ayarları
- `/profile/me` - Hasta profili

#### Doctor Routes
- `/dashboard` - Doktor dashboard
- `/appointments` - Randevu yönetimi
- `/messages` - Hasta mesajları
- `/reviews` - Yorum görüntüleme
- `/settings` - Hesap ayarları
- `/profile/me` - Doktor profili

## Güvenlik

- `RequireRole` bileşeni ile role-based access control
- Kimlik doğrulama kontrolü
- Otomatik yönlendirme (unauthorized users → login)

## Kullanım

```tsx
// Ana App bileşeninde
import AppRoutes from "./routes";

function App() {
  return <AppRoutes />;
}
```

## Yeni Rota Ekleme

1. `routeConfig.ts` dosyasına yeni rotayı ekleyin
2. İlgili role-based route dosyasına component'i import edin
3. Route'u Routes bileşenine ekleyin
4. Gerekirse sidebar'a menü öğesi ekleyin 