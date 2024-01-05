import { priceHistoryItem } from "@/types";



export function extractPrice (...elements : any) {
    for (const element of elements) {
        const pricecheck = element.text().trim();

        if(pricecheck) {
            const cleanPrice = pricecheck.replace(/[^\d.]/g, '');

            let firstPrice;

            if(cleanPrice) {
                firstPrice = cleanPrice.match(/\d+\.\d{2}/)?.[0];

            }
            return firstPrice || cleanPrice;

        }


    }

    return '';

}

export function extractCurrency(element:any){
    const CurrencyText = element.text().trim().slice(0,1);
    return CurrencyText? CurrencyText:"";

}

export function getHighestPrice(pricelist:priceHistoryItem[]){
    let hightestPrice = pricelist[0];

    for (let i=0; i<pricelist.length; i++) {
        if(pricelist [i].price> hightestPrice.price)
        hightestPrice = pricelist[i];

    }
    return hightestPrice.price;

}

export function getLowestPrice(pricelist:priceHistoryItem[]){
    let lowestPrice = pricelist[0];

    for (let i=0; i<pricelist.length; i++) {
        if(pricelist [i].price< lowestPrice.price)
        lowestPrice = pricelist[i];

    }
    return lowestPrice.price;
    
}

export function getAveragePrice(pricelist:priceHistoryItem[]){
    const sumOfPrice = pricelist.reduce((acc,curr)=>acc+curr.price,0);
    const averageprice = sumOfPrice/pricelist.length || 0;
    
    return averageprice;
}