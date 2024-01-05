'use server'

import { revalidatePath } from 'next/cache';
import {connectTodb} from '../Mongoose'
import Product from '../models/product.model';
import {scarperAmazonProduct} from '../scraper/index';


export async function ScrapeAndStoreAmazon(productURL: string){
    if(!productURL) return true;
    try {
        
    connectTodb();
    const scrapestoreproduct = await scarperAmazonProduct(productURL);
    
    if(!scrapestoreproduct) return ;
    let product = scrapestoreproduct;

    const existingproduct = await Product.findOne({url: scrapestoreproduct. url});

    const newproduct = await Product. findOneAndUpdate(
        {url: scrapestoreproduct. url},
        product, 
        {upsert:true, new:true}
    );

    revalidatePath(`/products/${newproduct._id}`);
        
    } catch (error:any) {
        throw new Error(`Failed to create or update product: ${error.message}`)
        
    }
}

export async function getAllProduct() {
    try {
        connectTodb();
        const products = await Product.find();
        return products;

    } catch (error) {
        console.log(error);
        
    }
    
}

export async function getProductById(productId:string) {
    try {
        connectTodb();
        const products = await Product.findOne({_id:productId});
        if(!products) return null;
        console.log(products);
        return products;
    } catch (error) {
        console.log(error);
        
    }
    
}