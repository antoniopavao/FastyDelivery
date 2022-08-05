import { prisma } from '../../../../database/prismaClient';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

declare var process: {
  env: {
    JSON_SECRET_KEY: string;
  };
};

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    //  Receive username and password

    // Verify if user exists
    const client = await prisma.clients.findFirst({
      where: { username },
    });
    console.log(client);

    if (!client) {
      throw new Error(`Username or password invalid!`);
    }

    // Verify if the password is valid
    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error('Username or password invalid!');
    }

    // Generate token
    const token = sign({ username }, process.env.JSON_SECRET_KEY, {
      subject: client.id,
      expiresIn: '1d',
    });

    return token;
  }
}
