'use server'

import axios from "axios"
import *as cheerio from "cheerio"
import {extractPrice, extractCurrency} from "../utils";




export async function scarperAmazonProduct(url: string) {

    if(!url) 
    
    return;

    

    const username =String (process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);

    const port = 222225;

    const session_id = (1000000 * Math.random())|0;

    const option = {

        auth : {
            username : `${username}-session-${session_id}`,
            password ,
    },
    host : "brd.superproxy.io" ,
    port,
    rejectUnauthorized : false ,
    
    }

    try {
        const response = await axios.get(url, option);
        // console.log(response);
        const $ = cheerio.load(response.data);

        const title =$('#title').text().trim();
        // console.log(title);

        const currentPrice = extractPrice(
            $('.priceToPay span.a-price-whole'),
            $('.a.size.base.a-color-price'),
            $('.a-button-selected .a-color-base'),
        );

        console.log(currentPrice);

        const originalPrice = extractPrice(
            $('#priceblock_ourprice'),
            $('.a-price.a-text-price span.a-offscreen'),
            $('#listPrice'),
            $('#priceblock_dealprice'),
            $('.a-size-base.a-color-price')
        );
        console.log(originalPrice);

       
        const currency = extractCurrency(
            $('.a-price-symbol')
        );

        // console.log(pricelist);

        const outOfstock = $('#availability span').text().trim();
        const img = $('#imgBLKFront').attr('data-a-dynamic-image') || $('#landingImage').attr('data-a-dynamic-image')||'{}'
        const imgURL = Object.keys(JSON.parse(img));



        const data = {
            url, 
            image : imgURL[0],
            title,
            // currency : currency || '₹',
            currentPrice: Number(currentPrice) || Number (originalPrice),
            originalPrice: Number(originalPrice) || Number(currentPrice),
            priceHistory: [],
            lowestprice : Number(currentPrice) || Number(originalPrice),
            highestprice: Number(originalPrice) || Number(currentPrice),
            averageprice: Number(currentPrice) || Number(originalPrice),


        };

        return data;
        
    } catch (error:any) {
        throw new Error(`Faild to scrape Data:${error.message}`);
        
    }

}


