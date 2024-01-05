import { Product } from '@/types'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


interface Props {
    product: Product,
}

export const ProductCard = ({product}: Props) => {
  return (
    <div>

        <Link href={`/products/${product._id}`}>
        <Image
         src={product.image} 
         alt={product.title}
         height={200}
         width={200}/>

         {product.title}
        </Link>
    </div>
  )
}

