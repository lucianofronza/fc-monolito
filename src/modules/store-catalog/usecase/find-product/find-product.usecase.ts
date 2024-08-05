import ProductGateway from "../../gateway/product.gateway";
import { FindAllProductsOutputDto, FindProductInputDto } from "./find-product.dto";

export default class FindProductUseCase {
    constructor(private readonly productRepository: ProductGateway) {}

    async execute(input: FindProductInputDto): Promise<FindAllProductsOutputDto> {
        const product = await this.productRepository.find(input.id);

        return {
            id: product.id.value,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
        };
    }
}