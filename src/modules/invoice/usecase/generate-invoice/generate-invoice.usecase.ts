import Id from "../../../@shared/domain/value-object/id.value-object";
import { Address } from "../../domain/address.valueobject";
import { InvoiceEntity } from "../../domain/invoice.entity";
import { ItemEntity } from "../../domain/item.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.usecase.dto";

export default class GenerateInvoiceUseCase {

    private _invoiceRepository: InvoiceGateway

    constructor(invoiceRepository: InvoiceGateway) {
        this._invoiceRepository = invoiceRepository
    }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const props = {
            id: new Id(),
            name: input.name,
            document: input.document,
            address: new Address(
                input.street,
                input.number,
                input.complement,
                input.city,
                input.state,
                input.zipCode,
            ),
            items: input.items.map((item) => {
                return new ItemEntity({
                    id: new Id(item.id),
                    name: item.name,
                    price: item.price
                });
            })
        }

        const invoice = new InvoiceEntity(props)
        await this._invoiceRepository.generate(invoice)

        return {
            id: invoice.id.value,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map((item) => {
                return {
                    id: item.id.value,
                    name: item.name,
                    price: item.price
                };
            }),
            total: invoice.total
        }
    }
}