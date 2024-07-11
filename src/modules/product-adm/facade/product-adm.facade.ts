import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ProductAdmFacadeInterface, { addProductFacadeInputDto, checkStockFacadeInputDto, checkStockFacadeOutputDto } from "./product-adm.facade.interface";

export interface UseCaseProps {
    addUseCase: UseCaseInterface;
    stockUseCase: UseCaseInterface;
}
export default class ProductAdmFacade implements ProductAdmFacadeInterface {

    private _addUseCase: UseCaseInterface;
    private _checkStockUseCase: UseCaseInterface;

    constructor(useCaseProps: UseCaseProps) {
        this._addUseCase = useCaseProps.addUseCase;
        this._checkStockUseCase = useCaseProps.stockUseCase;
    }

    async addProduct(input: addProductFacadeInputDto): Promise<void> {
        return this._addUseCase.execute(input);
    }

    async checkStock(input: checkStockFacadeInputDto): Promise<checkStockFacadeOutputDto> {
        return this._checkStockUseCase.execute(input);
    }
}