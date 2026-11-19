'use client'

import * as React from 'react'
import { Header } from '../header/header'
import { Splash } from '../splash/splash'
import LastCheckedOutBanner from '../lastCheckedOutBanner/lastCheckedOutBanner'
import Footer from '../footer/footer'

export default function HomePage() {
  return (
    <>
      <Header />
      <Splash />
      <LastCheckedOutBanner />
      <Footer />
    </>
  )
}
