import Id from "../../@shared/domain/value-object/id.value-object";
import clientEntity from "../domain/client.entity";
import ClientGateway from "../gateway/client.gateway";
import { ClientModel } from "./client.model";

export default class ClientRepository implements ClientGateway {
    async add(client: clientEntity): Promise<void> {
        await ClientModel.create({
            id: client.id.value,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        });
    }

    async find(id:string): Promise<clientEntity> {
        const client = await ClientModel.findOne({ where: { id } });

        if (!client) {
            throw new Error("Client not found");
        }

        return new clientEntity({
            id: new Id(client.id),
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        }, new Id(id));
    }
}