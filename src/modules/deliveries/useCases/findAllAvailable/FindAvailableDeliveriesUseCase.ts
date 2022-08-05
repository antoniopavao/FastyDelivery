import { prisma } from '../../../../database/prismaClient';

export class FindAvailableDeliveriesUseCase {
  async execute() {
    const deliveries = await prisma.deliveries.findMany({
      where: {
        delivered_at: null,
      },
    });

    return deliveries;
  }
}
