import { Request, Response } from 'express';
import { FindAvailableDeliveriesUseCase } from './FindAvailableDeliveriesUseCase';

export class FindAvailablesDeliveriesController {
  async handle(request: Request, response: Response) {
    const findAllWithoutEndDateUseCase = new FindAvailableDeliveriesUseCase();

    const deliveries = await findAllWithoutEndDateUseCase.execute();

    return response.json(deliveries);
  }
}
