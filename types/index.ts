export type priceHistoryItem={
    price:number;

};

export type Product = {
    _id?: string;
    url: string;
    image: string;
    title: string;
    currency : string;
    currentPrice: number;
    originalPrice: number;
    priceHistory: priceHistoryItem[] | [];
    highestprice: number;
    lowestprice: number;
    averageprice: number;

};