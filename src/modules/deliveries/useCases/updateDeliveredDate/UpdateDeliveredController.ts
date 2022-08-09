import { Request, Response } from 'express';
import { UpdateDeliveredUseCase } from './UpdateDeliveredUseCase';

export class UpdateDeliveredController {
  async handle(request: Request, response: Response) {
    const { deliveryman_id } = request;
    const { id: delivery_id } = request.params;

    const updateDeliveredUseCase = new UpdateDeliveredUseCase();
    const finishedDelivery = await updateDeliveredUseCase.execute({
      deliveryman_id,
      delivery_id,
    });
    return response.json(finishedDelivery);
  }
}
