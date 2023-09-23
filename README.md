# GATHER-IN

Gather-in is an app, designed to facilitate online social interactions by allowing users to join virtual gatherings via connecting video chats.
Users can create their own places and schdule events, which will then automatically activate at a date and time of their choosing.
Othr users can view evnts on the place page. If there is an ongoing event, they can join it, or if they're interested in a future event, they can see its date and time.

Original app : gatherin.life

## RUN

env dosyasina eklenmesi gerekenler:

- `DATABASE_URL`
- `NEXT_AUTH_SECRET`
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
