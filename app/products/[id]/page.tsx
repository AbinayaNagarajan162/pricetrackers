import { getProductById } from '@/lib/actions'
import { Product } from '@/types'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import React from 'react'
import product from '@/lib/models/product.model'


type Props = {
  params : {id: string}

}

const ProductDetails = async ({params:{id}}:Props ) => {
  const product : Product = await getProductById (id);
  if(!product) redirect('/');

  return (
    <div>  
      <Image 
      src={ product.image}
      alt={product.title}
      width={200}
      height={200}
      ></Image>
      {product.title}
      {product.currentPrice}

    </div>
  )
}

export default ProductDetails