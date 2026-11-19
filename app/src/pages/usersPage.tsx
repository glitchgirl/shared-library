import { Box } from '@mui/material'
import { Header } from '../header/header'
import Footer from '../footer/footer'
import UserCard from '../cards/userCard'

export default function UsersPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#E9D9B4' }}>
      <Header />
      <Box component="main" sx={{ flex: 1, p: '1.5rem', backgroundColor: '#E9D9B4' }}>
        <Box
          sx={{
            maxWidth: 1080,
            mx: 'auto',
            '& .user-card': {
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              width: '100%',
              p: { xs: 3, sm: 4 },
              borderRadius: 2,
              backgroundColor: '#E9D9B4',
              color: '#2F406A',
              fontFamily: 'Arial, sans-serif',
            },
            '& .user-card__update': {
              alignSelf: 'flex-end',
              border: 0,
              borderRadius: 6,
              px: 3,
              py: 1.5,
              backgroundColor: '#4D6AAA',
              color: '#E9D9B4',
              cursor: 'pointer',
              font: 'inherit',
              fontSize: '1.125rem',
              '&:hover': { backgroundColor: '#2F406A' },
            },
            '& .user-card__details': {
              display: 'flex',
              alignItems: 'center',
              gap: 3,
            },
            '& .user-card__icon': {
              display: 'inline-flex',
              width: 72,
              height: 72,
              flex: '0 0 72px',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              backgroundColor: '#4D6AAA',
              color: '#E9D9B4',
            },
            '& .user-card__icon svg': { width: 40, height: 40 },
            '& .user-card__details h2': { m: 0, fontSize: '2rem' },
            '& .user-card__details p': {
              my: 1.5,
              color: '#4D6AAA',
              fontSize: '1.25rem',
            },
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
    </Box>
  )
}
