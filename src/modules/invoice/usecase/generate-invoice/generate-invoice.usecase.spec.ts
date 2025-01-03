import GenerateInvoiceUseCase from "./generate-invoice.usecase"

const MockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn()
    }
}

describe("Generate Invoice use case unit test", () => {

    it("should add an invoice", async () => {
        const repository = MockRepository()
        const usecase = new GenerateInvoiceUseCase(repository)

        const input = {
            name: "Luciano",
            document: "4564-4564",
            street: "Rua das palmeiras",
            number: "1999",
            complement: "Casa da esquima",
            city: "Blumenau",
            state: "SC",
            zipCode: "89047-500",
            items: [
                {
                    id: "1",
                    name: "Item 1",
                    price: 5
                }, 
                {
                    id: "2",
                    name: "Item 2",
                    price: 10
                }
            ]
        }

        const result = await usecase.execute(input)

        expect(repository.generate).toHaveBeenCalled()
        expect(result.id).toBeDefined()
        expect(result.name).toEqual(input.name)
        expect(result.street).toEqual(input.street)

        expect(result.number).toEqual(input.number)
        expect(result.complement).toEqual(input.complement)
        expect(result.city).toEqual(input.city)
        expect(result.state).toEqual(input.state)
        expect(result.zipCode).toEqual(input.zipCode)
        expect(result.items.length).toEqual(2)
        expect(result.items[0].id).toEqual(input.items[0].id)
        expect(result.items[0].name).toEqual(input.items[0].name)
        expect(result.items[0].price).toEqual(input.items[0].price)
        expect(result.items[1].id).toEqual(input.items[1].id)
        expect(result.items[1].name).toEqual(input.items[1].name)
        expect(result.items[1].price).toEqual(input.items[1].price)
        expect(result.total).toEqual(15)
    })
})