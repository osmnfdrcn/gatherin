# GATHER-IN

<<<<<<< HEAD
## RUN
In order to run this application, env file should be edited with folowing variables
- `DATABASE_URL`
- `NEXT_AUTH_SECRET`
- `GITHUB_ID`
- `GITHUB_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`


```bash
  git clone https://github.com/osmnfdrcn/gatherin.git
  npm install
  npm run build
  npm run start
=======
Gather-in is an app, designed to facilitate online social interactions by allowing users to join virtual gatherings via connecting video chats.
Users can create their own places and schdule events, which will then automatically activate at a date and time of their choosing.
Othr users can view evnts on the place page. If there is an ongoing event, they can join it, or if they're interested in a future event, they can see its date and time.

Original app : gatherin.life

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
>>>>>>> 48b618d1e7ca7c8d8d02eb4e9720c6761e721a20
```

## Tech-Stack

<<<<<<< HEAD
- Typescript, NextJS, Redux Toolkit, Tailwind CSS, Next-Auth, Next-Intl, Cloudinary, Zegocloud

## Fonksiyonalite ve Ozellikler

### 1.Filtreleme ve Listeleme

- Kitaplar tur, yazar, yayinevi ve dil kriterlerine gore filtrelenebilir.
- Herhangi bir kritere gore filtreleme yapildiginda diger kriterlerin icerigi ve listelenen kitaplar da dinamik olarak guncellenir.
- Filtre alani istenildigi takdirde gizlenebilir ve tekrar gosterilebilir.
- Sonuc alaninda varsayilan olarak 10 urun gsosterilmekte olup istendigi takdirde header alaninda degistirilebilir.
- Sonuclarin gosterimi icin pagination kullanilmistir.

### 2.Arama

- Sayfanin navigation bar’inda bulunan search ikonuna tiklanarak arama modal’i acilir.
- Arama kitap ismi ve yazar ismine gore yapilabilir.
- Arama input’unda debouncing degeri 100ms’dir.

### 3.Sepet

- Bir kitapin sayfasina girilip kitap sepete eklenebilir.
- Alinabilecek maksimum kitap sayisi kitabin stoktaki sayisi ile sinirlidir.
- Eger kitap halihazirda zaten sepete eklenmis ise eklenebilecek kitap sayisi stok sayisi - kitabin sepetteki sayisi kadardir. Her durumda stok sayisindan fazla alim yapilamaz. Denendigi takdirde bir uyari mesaji gosterilir.
- Kitabin stok’durumu kendi sayfasinda gorulebilir.
- Kitap sepete eklenip satin alinincaya kadar, stok sayisi duser ve kitabin sepetteki sayisi stoktan fazla ise kitap satin alinamaz ve kullaniciya bir uyari mesaji gosterilir.
- Kitap satin alindiktan sonra kitabin DB’deki stok sayisi guncellenir.

### 4.Kitap

- Listelenen bir kitaba tiklandiginda kullanici ilgili kitabin detaylarina ulasabilecegi kitap sayfasina yonlenir.
- Sayfada kitabin ismi, yayinevi, turu, fiyati ve stok adedi gibi bilgiler yaninda daha once ziyaret edilmis kitaplarin listesi de yer alir.
- Kullanici ayrica bu sayfada istedigi takdirde stok sayisini asmamak kaydi ile istedigi kadar kitabi sepete ekleyebilir.

### 5.Yazar

- Kitap sayfasinda yer alan yazar adina tiklandiginda kullanici ilgili kitabin yazari ile ilgili bilgiye ulasabilecegi yazar sayfasina yonlenir.
- Sayfada yazar ile ilgili bilgler ve yazarin maagazada bulunan kitaplarinin listesine ulasilabilir.
=======
- Typescript, NextJS, Redux Toolkit, Tailwind CSS, Next-Auth, Next-Intl, Cloudinary, ZegoCloud

### 1.Authentication

- Users have the option to sign up and log in either through their social media accounts or by creating a gatherin account using their email.
- Authentication's implemented by using Next-Auth.

### 2.Multi-Languaagee

- Application supports both Turkish and English.
- Multi-language feature's implemented by using Next-Intl.

### 3.Video Conferencing

- When a gathering is active, users can join and communicate with each other.
- Video Conferencing's implemented by using ZegoCloud.
>>>>>>> 48b618d1e7ca7c8d8d02eb4e9720c6761e721a20
