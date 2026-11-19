'use client'

import { useState } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'

export type ItemCardProps = {
  itemName: string
  imageSrc: string
  imageAlt: string
  tags?: string[]
  description: string
  longDescription: string
  onCheckout: () => void
}

export default function ItemCard({
  itemName,
  imageSrc,
  imageAlt,
  tags = [],
  description,
  longDescription,
  onCheckout,
}: ItemCardProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>(tags)

  function toggleTag(tag: string) {
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((value) => value !== tag)
        : [...current, tag],
    )
  }

  return (
    <Box
      component="article"
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
        alignItems: 'stretch',
        gap: { xs: 3, sm: 4 },
        maxWidth: 1080,
        mx: 'auto',
      }}
    >
      <Box
        component="img"
        src={imageSrc}
        alt={imageAlt}
        sx={{
          display: 'block',
          width: '100%',
          height: '100%',
          minHeight: 0,
          objectFit: 'cover',
          borderRadius: 2,
        }}
      />

      <Paper
        component="section"
        variant="outlined"
        sx={{
          width: '100%',
          p: { xs: 2, sm: 2.5 },
          boxSizing: 'border-box',
          backgroundColor: '#E9D9B4',
          color: '#2F406A',
          borderColor: '#E59059',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <Typography component="h2" variant="h4" sx={{ fontWeight: 600, fontFamily: 'inherit' }}>
          {itemName}
        </Typography>

        {tags.length > 0 && (
          <Box role="group" aria-label="Item tags" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
            {tags.map((tag) => {
              const isSelected = selectedTags.includes(tag)
              return (
                <Button
                  key={tag}
                  type="button"
                  size="small"
                  variant={isSelected ? 'contained' : 'outlined'}
                  aria-pressed={isSelected}
                  onClick={() => toggleTag(tag)}
                  sx={{
                    borderRadius: 5,
                    minWidth: 0,
                    fontFamily: 'inherit',
                    ...(isSelected
                      ? { backgroundColor: '#4D6AAA', color: '#E9D9B4', '&:hover': { backgroundColor: '#2F406A' } }
                      : { color: '#2F406A', borderColor: '#4D6AAA' }),
                  }}
                >
                  {tag}
                </Button>
              )
            })}
          </Box>
        )}

        <Typography sx={{ mt: 2, lineHeight: 1.7, color: '#4D6AAA', fontFamily: 'inherit' }}>
          {description}
        </Typography>

        <Button
          type="button"
          variant="contained"
          fullWidth
          onClick={onCheckout}
          sx={{
            mt: 2.5,
            backgroundColor: '#4D6AAA',
            color: '#E9D9B4',
            fontFamily: 'inherit',
            '&:hover': { backgroundColor: '#2F406A' },
          }}
        >
          Checkout
        </Button>

        <Box component="details" sx={{ mt: 2, borderTop: 1, borderColor: 'divider', pt: 2 }}>
          <Box
            component="summary"
            sx={{
              cursor: 'pointer',
              fontWeight: 600,
              fontFamily: 'Arial, sans-serif',
              color: '#4D6AAA',
            }}
          >
            More details
          </Box>
          <Typography
            sx={{
              mt: 1.5,
              lineHeight: 1.7,
              color: '#4D6AAA',
              fontFamily: 'Arial, sans-serif',
              whiteSpace: 'pre-line',
            }}
          >
            {longDescription}
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}
