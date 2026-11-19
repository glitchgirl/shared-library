'use client'

import { useState, type FormEvent } from 'react'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { Header } from '../header/header'
import Footer from '../footer/footer'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState('')

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(
      query.trim()
        ? 'Catalog search is not connected yet.'
        : 'Enter a search term to get started.',
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#E9D9B4' }}>
      <Header />
      <Box
        component="main"
        sx={{ flex: 1, width: '100%', boxSizing: 'border-box', p: { xs: 3, sm: 6 }, backgroundColor: '#E9D9B4' }}
      >
        <Box sx={{ maxWidth: 880, mx: 'auto' }}>
          <Typography
            component="h1"
            variant="h3"
            sx={{ mb: 1, color: '#2F406A', fontFamily: 'Arial, sans-serif', fontWeight: 600 }}
          >
            Search the library
          </Typography>
          <Typography sx={{ mb: 4, color: '#4D6AAA', fontFamily: 'Arial, sans-serif' }}>
            Find items by name, category, or description.
          </Typography>

          <Paper
            component="form"
            onSubmit={handleSearch}
            elevation={0}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              p: { xs: 2, sm: 3 },
              backgroundColor: '#E9D9B4',
            }}
          >
            <TextField
              fullWidth
              label=""
              placeholder="Try a name or keyword"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setMessage('')
              }}
              inputProps={{ 'aria-label': 'Search items' }}
              sx={{
                '& .MuiInputLabel-root': { color: '#4D6AAA' },
                '& .MuiOutlinedInput-root': {
                  color: '#2F406A',
                  '& fieldset': { borderColor: '#4D6AAA' },
                  '&:hover fieldset': { borderColor: '#2F406A' },
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                minWidth: { sm: 140 },
                backgroundColor: '#4D6AAA',
                color: '#E9D9B4',
                fontFamily: 'Arial, sans-serif',
                '&:hover': { backgroundColor: '#2F406A' },
              }}
            >
              Search
            </Button>
          </Paper>
          {message && (
            <Typography role="status" sx={{ mt: 2, color: '#2F406A', fontFamily: 'Arial, sans-serif' }}>
              {message}
            </Typography>
          )}
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}
