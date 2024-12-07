import "@/node_modules/react-modal-video/css/modal-video.css"
import "../public/assets/css/bootstrap.css"
import "../public/assets/css/color.css"
import "../public/assets/css/style.css"
import 'swiper/css'
// import "swiper/css/navigation"
import "swiper/css/pagination"
import 'swiper/css/free-mode';
import { gotham } from '@/lib/font'
export const metadata = {
    title: 'inHerbz',
    description: 'Stamen',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${gotham.variable}`}>
            <body>{children}</body>
        </html>
    )
}
