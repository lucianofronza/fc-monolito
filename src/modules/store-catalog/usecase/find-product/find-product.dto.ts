export interface FindProductInputDto {
    id: string;
}

export interface FindAllProductsOutputDto {
    id: string;
    name: string;
    description: string;
    salesPrice: number;    
}
