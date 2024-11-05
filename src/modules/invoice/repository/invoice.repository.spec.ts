import { Sequelize } from "sequelize-typescript"
import { InvoiceModel } from "./invoice.model"
import { InvoiceItemsModel } from "./invoice-items.model"
import Id from "../../@shared/domain/value-object/id.value-object"
import { Address } from "../domain/address.valueobject"
import InvoiceRepository from "./invoice.repository"
import { InvoiceEntity } from "../domain/invoice.entity"
import { ItemEntity } from "../domain/item.entity"

describe("Invoice Repository test", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        })

        sequelize.addModels([InvoiceModel, InvoiceItemsModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create an invoice", async () => {
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
                "89047-500"
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

        const repository = new InvoiceRepository()
        await repository.generate(invoice)

        const invoiceDb = await InvoiceModel.findOne({ where: { id: "1" }, include: ["items"] })

        expect(invoiceDb).toBeDefined()
        expect(invoiceDb.id).toEqual(invoice.id.value)
        expect(invoiceDb.name).toEqual(invoice.name)
        expect(invoiceDb.document).toEqual(invoice.document)
        expect(invoiceDb.street).toEqual(invoice.address.street)
        expect(invoiceDb.number).toEqual(invoice.address.number)
        expect(invoiceDb.complement).toEqual(invoice.address.complement)
        expect(invoiceDb.city).toEqual(invoice.address.city)
        expect(invoiceDb.state).toEqual(invoice.address.state)
        expect(invoiceDb.zipCode).toEqual(invoice.address.zipCode)
        expect(invoiceDb.items.length).toEqual(2);
        expect(invoiceDb.items[0].id).toEqual(invoice.items[0].id.value)
        expect(invoiceDb.items[0].name).toEqual(invoice.items[0].name)
        expect(invoiceDb.items[0].price).toEqual(invoice.items[0].price)
        expect(invoiceDb.items[1].id).toEqual(invoice.items[1].id.value)
        expect(invoiceDb.items[1].name).toEqual(invoice.items[1].name)
        expect(invoiceDb.items[1].price).toEqual(invoice.items[1].price)
        expect(invoiceDb.createdAt).toStrictEqual(invoice.createdAt)
        expect(invoiceDb.updatedAt).toStrictEqual(invoice.updatedAt)
    })

    it("should find an invoice", async () => {
        const invoice = await InvoiceModel.create({
            id: "1",
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
                    price: 5,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: "2",
                    name: "Item 2",
                    price: 10,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            include: [{ model: InvoiceItemsModel }]
        })

        const repository = new InvoiceRepository()
        const result = await repository.find(invoice.id)

        expect(result.id.value).toEqual(invoice.id)
        expect(result.name).toEqual(invoice.name)
        expect(result.address.street).toEqual(invoice.street)
        expect(result.address.number).toEqual(invoice.number)
        expect(result.address.complement).toEqual(invoice.complement)
        expect(result.address.city).toEqual(invoice.city)
        expect(result.address.state).toEqual(invoice.state)
        expect(result.address.zipCode).toEqual(invoice.zipCode)
        expect(result.items.length).toEqual(2);
        expect(result.items[0].id.value).toEqual(invoice.items[0].id)
        expect(result.items[0].name).toEqual(invoice.items[0].name)
        expect(result.items[0].price).toEqual(invoice.items[0].price)
        expect(result.items[1].id.value).toEqual(invoice.items[1].id)
        expect(result.items[1].name).toEqual(invoice.items[1].name)
        expect(result.items[1].price).toEqual(invoice.items[1].price)
    })
})