# GATHER-IN

## Calistirma

env dosyasina eklenmesi gerekenler:

- `DATABASE_URL`
- `SECRET` for next-auth
- `GITHUB_ID`
- `GITHUB_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`

```bash
git clone https://github.com/osmnfdrcn/gatherin.git
npm install
npm run build
npm run start
```

## Tech-Stack

- Typescript, NextJS, Redux Toolkit, Tailwind CSS, Next-Auth, Next-Intl, Cloudinary, ZegoCloud

### Ana Ozellikler

## 1.Authentication

- Kullanicilar kayit ve login olmak icin hem kendi sosya medya hesaplarini kullanabilirler hem de isterlerse email adreslerini kullarak yeni bir hesap olusturabilirler.
- Authentication's icin Next-Auth kullanilmistir.

## 2.Coklu Dil Destegi

- Uygulama hem Turkce, hem Ingilizce dil destegi saglamaktadir.
- Coklu dil destegi icin Next-Intl kullanilmistir.

## 3.Video Konferans

- Kullanicilar aktif olan bir event'e katilip birbirleri ile video konferans araciligi ile gorusebilirler.
- Video konferans destegi icin ZegoCloud kullanilmistir.
