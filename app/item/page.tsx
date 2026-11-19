'use client'

import { useState } from 'react'
import { Header } from '../src/header/header'
import ItemCard from '../src/cards/itemCard'
import Footer from '../src/footer/footer'
import itemPlaceholder from '../test images/item-placeholder.svg'

export default function ItemPage() {
  const [checkoutMessage, setCheckoutMessage] = useState('')

  return (
    <>
      <Header />
      <main style={{ padding: '1.5rem' }}>
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
          <p role="status" style={{ textAlign: 'center' }}>
            {checkoutMessage}
          </p>
        )}
      </main>
      <Footer />
    </>
  )
}
