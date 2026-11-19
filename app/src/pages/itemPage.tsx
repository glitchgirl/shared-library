'use client'

import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { Header } from '../header/header'
import ItemCard from '../cards/itemCard'
import Footer from '../footer/footer'
import itemPlaceholder from '../../test images/item-placeholder.svg'

export default function ItemPage() {
  const [checkoutMessage, setCheckoutMessage] = useState('')

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#E9D9B4' }}>
      <Header />
      <Box component="main" sx={{ flex: 1, p: '1.5rem', backgroundColor: '#E9D9B4' }}>
        <ItemCard
          itemName="Sample library item"
          imageSrc={itemPlaceholder.src}
          imageAlt="Placeholder image for a sample library item"
          tags={['Sample']}
          description="This is sample item information for the item page."
          longDescription="Replace this sample content with details for the selected item."
          onCheckout={() => setCheckoutMessage('Checkout is not connected yet.')}
        />
        {checkoutMessage && (
          <Typography role="status" sx={{ mt: 2, textAlign: 'center', color: '#2F406A' }}>
            {checkoutMessage}
          </Typography>
        )}
      </Box>
      <Footer />
    </Box>
  )
}
