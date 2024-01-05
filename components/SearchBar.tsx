"use client"

import { ScrapeAndStoreAmazon } from '@/lib/actions';
import React, { FormEvent, useState } from 'react'

const SearchBar = () => {

    const isValidAmazonProductsURL = (url : string ) => {

        try {
    
          const parsedURL = new URL(url);
          const hostname = parsedURL. hostname;
    
          if (
    
            hostname.includes('amazon.com') ||
            hostname.includes('amazon.')||
            hostname.endsWith('amazon')
    
          )
          {
            return true;
          }
          
        } catch (error) {
          return(false);
    
        }
        return false;
    
    
      }
    
        const [searchPrompt, setsearchPrompt] = useState('');
        const [Isloading, setIsloading] = useState(false);
    
    
        const handleSubmit =async (event: FormEvent<HTMLFormElement>) =>  {
    
          event.preventDefault();
          const isValidLink =isValidAmazonProductsURL(searchPrompt);
    
          if(!isValidLink) 
          return alert("Please enter a valid link"); 
    
          try {
            setIsloading(true);
            const amazonSrape = await ScrapeAndStoreAmazon(searchPrompt);
    
          } catch (error) {
    
            console.log(error);
            
          }
          finally{
            setIsloading(false);
    
          }
          
        }
  return (
    <div className='flex w-[100px] h-[50px] bg-blue-700 rounded-[50px]' > 
    <h1>
      
    </h1>
    <form onSubmit={handleSubmit} className='flex gap-3 '>

<input type= 'text' placeholder='Enter the Amazon URL' value = {searchPrompt} onChange={(e) => setsearchPrompt(e.target.value) } className='text-black'/>
<button type = 'submit' disabled={searchPrompt ===''} className='items-center bf' >{Isloading ? 'searching...':'Search'}


</button>
</form>


  </div>
  )
}

export default SearchBar