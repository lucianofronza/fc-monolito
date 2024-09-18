import { IsEmail, Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import ClientRepository from "../repository/client.repository";
import AddProductUsecase from "../../product-adm/usecase/add-product/add-product.usecase";
import ClientAdmFacade from "./client-adm.facade";
import FindClientUsecase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";

describe("ClientAdmFacade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a client", async () => {
        const repository = new ClientRepository();
        const addusecase = new AddClientUseCase(repository);
        const facade = new ClientAdmFacade({
            addUseCase: addusecase,
            findUseCase: undefined,
        });

        const input = {
            id: "1",
            name: "Client 1",
            email: "x@x.com",
            address: "Address 1",
        };

        await facade.add(input);

        const client = await ClientModel.findOne({ where: { id: "1" } });

        expect(client).toBeDefined();
        expect(client!.name).toEqual(input.name);
        expect(client!.email).toEqual(input.email);
        expect(client!.address).toEqual(input.address);
    });  
    
    it("should find a client", async () => {
        // const repository = new ClientRepository();
        // const addusecase = new AddClientUseCase(repository);
        // const findusecase = new FindClientUsecase(repository);
        // const facade = new ClientAdmFacade({
        //     addUseCase: addusecase,
        //     findUseCase: findusecase,
        // });

        const facade = ClientAdmFacadeFactory.create(); 

        const input = {
            id: "1",
            name: "Client 1",
            email: "x@x.com",
            address: "Address 1",
        };

        await facade.add(input);

        const client = await facade.find({ id: "1" });
        
        expect(client).toBeDefined();
        expect(client.id).toBe(input.id);
        expect(client.name).toBe(input.name);
        expect(client.email).toBe(input.email);
        expect(client.address).toBe(input.address);
    });
});