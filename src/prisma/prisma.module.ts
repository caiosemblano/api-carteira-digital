import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'

@Global() // @Global() evita ter que importar o PrismaModule em todo lugar
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule {}