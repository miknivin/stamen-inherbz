'use client'
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1, // Set slides to take full width
    spaceBetween: 0,  // Remove space between slides
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    loop: true,

    // Navigation
    navigation: {
        nextEl: '.h1n',
        prevEl: '.h1p',
    },

    // Pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 0,
        },
        575: {
            slidesPerView: 1,
            spaceBetween: 0,
        },
        767: {
            slidesPerView: 1,
            spaceBetween: 0,
        },
        991: {
            slidesPerView: 1,
            spaceBetween: 0,
        },
        1199: {
            slidesPerView: 1,
            spaceBetween: 0,
        },
        1350: {
            slidesPerView: 1,
            spaceBetween: 0,
        },
    }
}

export default function BannerSlider() {
    return (
        <>
            <Swiper {...swiperOptions} className="theme_carousel owl-theme">
                <SwiperSlide className="slide-item">
                    <figure >
                        <Link href="index-2">
                            <img src="assets/images/banner/banner-slider-3.webp" alt="" />
                        </Link>
                    </figure>
                </SwiperSlide>
                <SwiperSlide className="slide-item">
                    <figure >
                        <Link href="index-2">
                            <img src="assets/images/banner/banner-slider-2.webp" alt="" />
                        </Link>
                    </figure>
                </SwiperSlide>
                <SwiperSlide className="slide-item">
                    <figure >
                        <Link href="index-2">
                            <img src="assets/images/banner/banner-slider-1.webp" alt="" />
                        </Link>
                    </figure>
                </SwiperSlide>
                {/* Add other SwiperSlides here */}
            </Swiper>
        </>
    )
}
