import { Poppins } from 'next/font/google'
import localFont from 'next/font/local'

// Existing fonts
const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'], 
  variable: "--poppins", 
  display: 'swap' 
})

const gotham = localFont({
  src: [
    {
      path: '../public/assets/fonts/Gotham-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/gotham-book-webfont.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/Gotham-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/Gotham-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/Gotham-Black.woff2',
      weight: '900',
      style: 'normal',
    }
  ],
  variable: '--gotham',
  display: 'swap'
})

// Adding NEXT_ART font with .woff2 files
const nextArt = localFont({
  src: [
    {
      path: '../public/assets/fonts/NEXT ART_Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/NEXT ART_Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/NEXT ART_SemiBold.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/NEXT ART_Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--next-art',
  display: 'swap'
})

export { poppins, gotham, nextArt }
