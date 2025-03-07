import { Injectable } from '@nestjs/common'
import PrismaService from '../prisma'
import * as bcrypt from 'bcrypt'
import { User } from '@prisma/client'
import PublicUserResponse from './response/public-user.response'
import { RegisterUserDto } from '../auth/dto'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    })
  }

  async findUserById(id: number): Promise<PublicUserResponse> {
    return this.prisma.user.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        password: false,
      },
    })
  }

  async publicUser(email: string): Promise<PublicUserResponse> {
    return this.prisma.user.findUniqueOrThrow({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        password: false,
      },
    })
  }

  async createUser(dto: RegisterUserDto): Promise<void> {
    dto.password = await this.hashPassword(dto.password)

    await this.prisma.user.create({ data: dto })
  }

  updateUser() {
    return `This action updates a #id user`
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } })
  }
}
