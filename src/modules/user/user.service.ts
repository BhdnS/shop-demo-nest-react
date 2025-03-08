import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common'
import PrismaService from '../prisma'
import * as bcrypt from 'bcrypt'
import { User } from '@prisma/client'
import { Request } from 'express'
import PublicUserResponse from './response/public-user.response'
import { RegisterUserDto } from '../auth/dto'
import UpdateUserDto from './dto/update-user.dto'
import { TokenService } from '../token/token.service'

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService
  ) {}

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

  async updateUser(dto: UpdateUserDto, req: Request): Promise<PublicUserResponse> {
    const accessToken = req.headers.authorization

    if (!accessToken) throw new BadRequestException(HttpStatus.UNAUTHORIZED)

    const { id } = await this.tokenService.verifyAccessToken(accessToken)

    return this.prisma.user.update({
      where: { id },
      data: dto,
    })
  }

  async deleteUser(req: Request): Promise<User> {
    const accessToken = req.headers.authorization

    if (!accessToken) throw new BadRequestException(HttpStatus.UNAUTHORIZED)

    const { id } = await this.tokenService.verifyAccessToken(accessToken)

    return this.prisma.user.delete({ where: { id } })
  }

  async getUser(req: Request): Promise<PublicUserResponse> {
    const accessToken = req.headers.authorization

    if (!accessToken) throw new BadRequestException(HttpStatus.UNAUTHORIZED)

    const { id } = await this.tokenService.verifyAccessToken(accessToken)

    return this.findUserById(id)
  }

  async getAllUsers(): Promise<PublicUserResponse[]> {
    return this.prisma.user.findMany()
  }
}
