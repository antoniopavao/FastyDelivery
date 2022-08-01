import { prisma } from '../../../../database/prismaClient';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

declare var process: {
  env: {
    JSON_SECRET_KEY: string;
  };
};

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliveryman {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: { username: username },
    });

    if (!deliveryman) {
      throw new Error(`Deliveryman with username ${username} does not exist`);
    }

    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new Error(`Username or password invalid!`);
    }

    const token = sign({ username }, process.env.JSON_SECRET_KEY, {
      subject: deliveryman.id,
      expiresIn: '1d',
    });

    return token;
  }
}
