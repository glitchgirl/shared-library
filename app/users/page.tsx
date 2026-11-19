'use client'

import { Box } from '@mui/material'
import { Header } from '../src/header/header'
import Footer from '../src/footer/footer'
import UserCard from '../src/cards/userCard'

export default function UsersPage() {
  return (
    <>
      <Header />
      <Box component="main" sx={{ p: '1.5rem' }}>
        <Box
          sx={{
            maxWidth: 1080,
            mx: 'auto',
            '& .user-card': {
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: '100%',
              p: { xs: 2, sm: 2.5 },
              border: '1px solid #E59059',
              borderRadius: 2,
              backgroundColor: '#E9D9B4',
              color: '#2F406A',
              fontFamily: 'Arial, sans-serif',
            },
            '& .user-card__menu': {
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
            },
            '& .user-card__menu button': {
              border: 0,
              borderRadius: 5,
              px: 2,
              py: 1,
              backgroundColor: '#4D6AAA',
              color: '#E9D9B4',
              cursor: 'pointer',
              font: 'inherit',
              '&:hover': { backgroundColor: '#2F406A' },
            },
            '& .user-card__details': {
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            },
            '& .user-card__icon': {
              display: 'inline-flex',
              width: 48,
              height: 48,
              flex: '0 0 48px',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              backgroundColor: '#4D6AAA',
              color: '#E9D9B4',
            },
            '& .user-card__icon svg': { width: 28, height: 28 },
            '& .user-card__details h2': { m: 0, fontSize: '1.5rem' },
            '& .user-card__details p': { my: 1, color: '#4D6AAA' },
          }}
        >
          <UserCard
            name="Sample User"
            email="user@example.com"
            phoneNumber="(555) 010-1234"
          />
        </Box>
      </Box>
      <Footer />
    </>
  )
}
