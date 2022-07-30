import { prisma } from '../../../../database/prismaClient';
import { hash } from 'bcrypt';

interface ICreateClient {
  username: string;
  password: string;
}

export class CreateClientUseCase {
  async execute({ password, username }: ICreateClient) {
    // Verify if user exists
    const clientExist = await prisma.clients.findFirst({
      where: {
        username: {
          mode: 'insensitive',
        },
      },
    });

    if (clientExist) {
      throw new Error(`Client ${username} already exists`);
    }

    const hashPassword = await hash(password, 10);
    // Encrypt the passsword

    const client = await prisma.clients.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    return client;

    // Save client
  }
}
