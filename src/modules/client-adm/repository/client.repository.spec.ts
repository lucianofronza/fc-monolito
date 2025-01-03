import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import ClientRepository from "./client.repository";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";

describe("ClientRepository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a client", async () => {
        const client = new Client({            
            name: "Client 1",
            email: "x@x.com",
            address: "Address 1",
        });

        const repository = new ClientRepository();
        await repository.add(client);

        const clientDb = await ClientModel.findOne({ where: { id: client.id.value } });

        expect(clientDb).toBeDefined();
        expect(clientDb.id).toEqual(client.id.value);
        expect(clientDb.name).toEqual(client.name);
        expect(clientDb.email).toEqual(client.email);
        expect(clientDb.address).toEqual(client.address);
        expect(clientDb.createdAt).toStrictEqual(client.createdAt);
        expect(clientDb.updatedAt).toStrictEqual(client.updatedAt);
    });
    
    it("should find a client", async () => {
        const client = await ClientModel.create({
            id: "1",
            name: "Lucian",
            email: "lucian@123.com",
            address: "123 Street",
            createdAt: new Date(),
            updatedAt: new Date()
          })
      
          const repository = new ClientRepository()
          const result = await repository.find(client.id)
     
          expect(result.id.value).toEqual(client.id)
          expect(result.name).toEqual(client.name)
          expect(result.email).toEqual(client.email)
          expect(result.createdAt).toStrictEqual(client.createdAt)
          expect(result.updatedAt).toStrictEqual(client.updatedAt)    
    });
});