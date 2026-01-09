import { Body, Controller,Post } from '@nestjs/common'
import { TransactionService } from './transaction.service'

@Controller('transaction')
export class TransactionController {
    constructor(private readonly service: TransactionService) {}

    @Post()
    async createTransaction(@Body() body: { payer: string; payee: string; value: number }) {
        return this.service.transfer(body.payer, body.payee, body.value)
    }
}
