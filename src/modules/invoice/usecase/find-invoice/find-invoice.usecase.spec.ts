import Id from "../../../@shared/domain/value-object/id.value-object"
import { Address } from "../../domain/address.valueobject"
import { InvoiceEntity } from "../../domain/invoice.entity"
import { ItemEntity } from "../../domain/item.entity"
import FindInvoiceUseCase from "./find-invoice.usecase"

const invoice = new InvoiceEntity({
    id: new Id("1"),
    name: "Luciano",
    document: "4564-4564",
    address: new Address(
        "Rua das palmeiras",
        "1999",
        "Casa da esquima",
        "Blumenau",
        "SC",
        "89047-500",
    ), 
    items: [
        new ItemEntity({
            id: new Id("1"),
            name: "Item 1",
            price: 5
        }), 
        new ItemEntity({
            id: new Id("2"),
            name: "Item 2",
            price: 10
        })
    ]
})

const MockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice))
    }
}

describe("Find Invoice use case unit test", () => {

    it("should find an invoice", async () => {

        const repository = MockRepository()
        const usecase = new FindInvoiceUseCase(repository)

        const input = { id: "1" }
        const result = await usecase.execute(input)

        expect(repository.find).toHaveBeenCalled()
        expect(result.id).toEqual(input.id)
        expect(result.name).toEqual(invoice.name)
        expect(result.address).toEqual(invoice.address)
        expect(result.items.length).toEqual(2);
        expect(result.items[0].id).toEqual(invoice.items[0].id.value)
        expect(result.items[0].name).toEqual(invoice.items[0].name)
        expect(result.items[0].price).toEqual(invoice.items[0].price)
        expect(result.items[1].id).toEqual(invoice.items[1].id.value)
        expect(result.items[1].name).toEqual(invoice.items[1].name)
        expect(result.items[1].price).toEqual(invoice.items[1].price)
        expect(result.total).toEqual(invoice.total)
        expect(result.createdAt).toStrictEqual(invoice.createdAt)
    })
})