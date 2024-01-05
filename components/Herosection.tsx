import React, { FormEvent, useState } from 'react'
import { ScrapeAndStoreAmazon, getAllProduct } from '@/lib/actions';
import Page from '@/app/products/[id]/page';
import { ProductCard } from './ProductCard';
import SearchBar from './SearchBar';

const Herosection = async () => {
  const allProduct = await getAllProduct();
    
  return (
    <>
    <section>
      <SearchBar/>
      </section>
      <section>
      <div>
          {allProduct?.map((product)=> (
            <ProductCard key={product._id} product={product}/>
))}
</div>
      </section>
      </>
    )
}
export default Herosection