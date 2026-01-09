import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(data: { fullName: string; cpf:string; email: string; password: string }) {
        return this.prisma.user.create({
            data: {
                ...data,
                wallet: {
                    create: {
                        balance: 0, // Começa com 0.
                    },
                },
            },
            include: { wallet: true }, // Retorna a carteira criada na resposta
        });
    }
}  