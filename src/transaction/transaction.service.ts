import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Você precisará criar esse serviço básico

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async transfer(payerId: string, payeeId: string, amount: number) {
    // 1. Iniciar uma Transação Interativa do Prisma (ACID)
    return await this.prisma.$transaction(async (tx) => {
      
      // 2. Buscar e Bloquear a carteira do pagador (Lock)
      const payerWallet = await tx.wallet.findUnique({
        where: { userId: payerId },
      });

      if (!payerWallet) throw new BadRequestException('Pagador não encontrado');

      // 3. Validação de Saldo
      if (payerWallet.balance < amount) {
        throw new BadRequestException('Saldo insuficiente');
      }

      // 4. Verificar autorizador externo (Simulado)
      // Aqui você faria uma chamada fetch para o serviço externo
      const isAuthorized = true; // Imagine que veio da API externa
      if (!isAuthorized) throw new BadRequestException('Transação não autorizada');

      // 5. Atualizar Saldos (O Pulo do Gato)
      // Decrementa de quem paga
      await tx.wallet.update({
        where: { userId: payerId },
        data: { balance: { decrement: amount } },
      });

      // Incrementa de quem recebe
      await tx.wallet.update({
        where: { userId: payeeId },
        data: { balance: { increment: amount } },
      });

      // 6. Registrar a Transação no Histórico
      const transaction = await tx.transaction.create({
        data: {
          amount,
          payerId,
          payeeId,
        },
      });

      return transaction;
    });
  }
}