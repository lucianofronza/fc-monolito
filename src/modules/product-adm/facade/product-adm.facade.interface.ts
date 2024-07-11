export interface addProductFacadeInputDto {
    id?: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
}

export interface checkStockFacadeInputDto {
    productId: string;
}

export interface checkStockFacadeOutputDto {
    productId: string;
    stock: number;
}

export default interface ProductAdmFacadeInterface {
    addProduct(input: addProductFacadeInputDto): Promise<void>;
    checkStock(input: checkStockFacadeInputDto): Promise<checkStockFacadeOutputDto>;
}