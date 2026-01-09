import { Body, Controller, Post } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() body: any) {
        // Utilizar DTOs em situações reais (em produção) com class-validator para validar o body
        return this.userService.create(body)
    }
}