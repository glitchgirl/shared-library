'use client'
import * as React from 'react'
import Button from '@mui/material/Button'
import {Header} from './src/header/header'
import { Splash } from './src/splash/splash'
import LastCheckedOutBanner from './src/lastCheckedOutBanner/lastCheckedOutBanner'
import Footer from './src/footer/footer'
export default function Page() {
  return (
    <>
    <Header />
    <Splash/>
    <LastCheckedOutBanner />
    <Footer />
    </>

  )
}

