'use client'

import { useState } from 'react'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'

export type ItemCardProps = {
  itemName: string
  imageSrc: string
  imageAlt: string
  tags?: string[]
  description: string
  longDescription: string
  onCheckout: () => void
}

type ItemDetails = {
  itemName: string
  imageSrc: string
  imageAlt: string
  tags: string[]
  description: string
  longDescription: string
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
  const [details, setDetails] = useState<ItemDetails>({
    itemName,
    imageSrc,
    imageAlt,
    tags,
    description,
    longDescription,
  })
  const [selectedTags, setSelectedTags] = useState<string[]>(tags)
  const [draft, setDraft] = useState<ItemDetails | null>(null)
  const isEditing = draft !== null
  const displayedDetails = draft ?? details

  function toggleTag(tag: string) {
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((value) => value !== tag)
        : [...current, tag],
    )
  }

  function updateDraft<Key extends keyof ItemDetails>(key: Key, value: ItemDetails[Key]) {
    setDraft((current) => current && { ...current, [key]: value })
  }

  function saveChanges() {
    if (!draft) return
    setDetails(draft)
    setSelectedTags(draft.tags)
    setDraft(null)
  }

  function startEditing() {
    setDraft({ ...details, tags: [...details.tags] })
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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box
          component="img"
          src={displayedDetails.imageSrc}
          alt={displayedDetails.imageAlt}
          sx={{
            display: 'block',
            width: '100%',
            height: { xs: 280, sm: '100%' },
            minHeight: 0,
            objectFit: 'cover',
            borderRadius: 2,
            border: '2px solid #E59059',
            boxSizing: 'border-box',
          }}
        />
        {isEditing && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Image URL"
              value={draft.imageSrc}
              onChange={(event) => updateDraft('imageSrc', event.target.value)}
              fullWidth
            />
            <TextField
              label="Image alt text"
              value={draft.imageAlt}
              onChange={(event) => updateDraft('imageAlt', event.target.value)}
              fullWidth
            />
          </Box>
        )}
      </Box>

      <Paper
        component="section"
        elevation={0}
        sx={{
          width: '100%',
          p: { xs: 2, sm: 2.5 },
          boxSizing: 'border-box',
          backgroundColor: '#E9D9B4',
          color: '#2F406A',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isEditing ? 'space-between' : 'flex-end',
            flexWrap: 'wrap',
            gap: 2,
            mb: 2,
          }}
        >
          {isEditing ? (
            <>
              <Typography sx={{ color: '#4D6AAA', fontFamily: 'inherit', fontWeight: 600 }}>
                Editing item
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  type="button"
                  variant="contained"
                  onClick={saveChanges}
                  sx={{
                    backgroundColor: '#4D6AAA',
                    color: '#E9D9B4',
                    fontFamily: 'inherit',
                    '&:hover': { backgroundColor: '#2F406A' },
                  }}
                >
                  Save
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => setDraft(null)}
                  sx={{
                    color: '#2F406A',
                    borderColor: '#4D6AAA',
                    fontFamily: 'inherit',
                    '&:hover': { borderColor: '#2F406A', backgroundColor: 'rgba(77, 106, 170, 0.06)' },
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </>
          ) : (
            <Button
              type="button"
              variant="contained"
              onClick={startEditing}
              sx={{
                backgroundColor: '#4D6AAA',
                color: '#E9D9B4',
                fontFamily: 'inherit',
                '&:hover': { backgroundColor: '#2F406A' },
              }}
            >
              Edit item
            </Button>
          )}
        </Box>

        {isEditing ? (
          <TextField
            label="Item name"
            value={draft.itemName}
            onChange={(event) => updateDraft('itemName', event.target.value)}
            fullWidth
            autoFocus
          />
        ) : (
          <Typography component="h2" variant="h4" sx={{ fontWeight: 600, fontFamily: 'inherit' }}>
            {details.itemName}
          </Typography>
        )}

        {isEditing ? (
          <TextField
            label="Tags (comma-separated)"
            value={draft.tags.join(', ')}
            onChange={(event) =>
              updateDraft(
                'tags',
                event.target.value.split(',').map((tag) => tag.trim()).filter(Boolean),
              )
            }
            fullWidth
            sx={{ mt: 2 }}
          />
        ) : (
          details.tags.length > 0 && (
            <Box role="group" aria-label="Item tags" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {details.tags.map((tag) => {
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
          )
        )}

        {isEditing ? (
          <TextField
            label="Description"
            value={draft.description}
            onChange={(event) => updateDraft('description', event.target.value)}
            multiline
            minRows={3}
            fullWidth
            sx={{ mt: 2 }}
          />
        ) : (
          <Typography sx={{ mt: 2, lineHeight: 1.7, color: '#4D6AAA', fontFamily: 'inherit' }}>
            {details.description}
          </Typography>
        )}

        {isEditing ? (
          <TextField
            label="More details"
            value={draft.longDescription}
            onChange={(event) => updateDraft('longDescription', event.target.value)}
            multiline
            minRows={4}
            fullWidth
            sx={{ mt: 2 }}
          />
        ) : (
          <>
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
                {details.longDescription}
              </Typography>
            </Box>
          </>
        )}

      </Paper>
    </Box>
  )
}
