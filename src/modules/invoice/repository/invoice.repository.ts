import Id from "../../@shared/domain/value-object/id.value-object"
import { Address } from "../domain/address.valueobject"
import { InvoiceEntity } from "../domain/invoice.entity"
import { ItemEntity } from "../domain/item.entity"
import InvoiceGateway from "../gateway/invoice.gateway"
import { InvoiceItemsModel } from "./invoice-items.model"
import { InvoiceModel } from "./invoice.model"

export default class InvoiceRepository implements InvoiceGateway {
    async generate(invoice: InvoiceEntity): Promise<void> {
        await InvoiceModel.create(
            {
                id: invoice.id.value,
                name: invoice.name,
                document: invoice.document,
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode,
                items: invoice.items.map((item) => ({
                    id: item.id.value,
                    name: item.name,
                    price: item.price,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt
                })),
                createdAt: invoice.createdAt,
                updatedAt: invoice.updatedAt
            },
            {
                include: [{ model: InvoiceItemsModel }]
            }
        )
    }

    async find(id: string): Promise<InvoiceEntity> {
        const invoice = await InvoiceModel.findOne({ 
            where: { id },
            include: ["items"]
         })

        if (!invoice) {
            throw new Error("Invoice not found")
        }

        return new InvoiceEntity({
            id: new Id(invoice.id),
            name: invoice.name,
            document: invoice.document,
            address: new Address(
                invoice.street,
                invoice.number,
                invoice.complement,
                invoice.city,
                invoice.state,
                invoice.zipCode,
            ),
            items: invoice.items.map((item) => (
                new ItemEntity({ id: new Id(item.id), name: item.name, price: item.price })
            )),
            createdAt: invoice.createdAt,
            updatedAt: invoice.createdAt
        })
    }
}