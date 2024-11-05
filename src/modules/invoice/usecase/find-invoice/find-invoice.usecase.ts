import { Address } from "../../domain/address.valueobject"
import InvoiceGateway from "../../gateway/invoice.gateway"
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.dto"

export default class FindInvoiceUseCase {

  private _invoiceRepository: InvoiceGateway

  constructor(invoiceRepository: InvoiceGateway) {
      this._invoiceRepository = invoiceRepository
  }

  async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
      const result = await this._invoiceRepository.find(input.id)

      return {
          id: result.id.value,
          name: result.name,
          document: result.document,
          address: new Address(
              result.address.street,
              result.address.number,
              result.address.complement,
              result.address.city,
              result.address.state,
              result.address.zipCode,
          ),
          items: result.items.map((item) => ({
              id: item.id.value,
              name: item.name,
              price: item.price,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt
          })),
          total: result.total,
          createdAt: result.createdAt
      }
  }
}