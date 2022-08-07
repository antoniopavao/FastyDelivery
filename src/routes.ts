import { Router } from 'express';
import { ensureAuthenticateClient } from './middlewares/ensureAuthenticateClient';
import { ensureAuthenticateDeliveryman } from './middlewares/ensureAuthenticateDeliveryman';
import { AuthenticateClientController } from './modules/account/useCases/authenticateClient/AuthenticateClientController';
import { AuthenticateDeliverymanController } from './modules/account/useCases/authenticateDeliveryman/AuthenticateDeliverymanController';
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController';
import { FindAllDeliveriesController } from './modules/clients/useCases/deliveries/FindAllDeliveriesController';
import { CreateDeliveryController } from './modules/deliveries/useCases/createDelivery/CreateDeliveryController';
import { FindAvailablesDeliveriesController } from './modules/deliveries/useCases/findAllAvailable/FindAvailablesDeliveriesController';
import { UpdateDeliverymanController } from './modules/deliveries/useCases/updateDeliveryman/UpdateDeliverymanController';
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';

const routes = Router();

// Clients
const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const findAllDeliveriesController = new FindAllDeliveriesController();

// Deliveryman
const createDelivermanController = new CreateDeliverymanController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();

// Deliveries
const createDeliveryController = new CreateDeliveryController();
const findAvailablesDeliveries = new FindAvailablesDeliveriesController();
const updateDeliverymanController = new UpdateDeliverymanController();

// Clients Routes
routes.post('/client/', createClientController.handle);
routes.post('/client/authenticate', authenticateClientController.handle);
routes.get(
  '/client/deliveries',
  ensureAuthenticateClient,
  findAllDeliveriesController.handle,
);

// Deliveryman routes
routes.post('/deliveryman/', createDelivermanController.handle);
routes.post(
  '/deliveryman/authenticate',
  authenticateDeliverymanController.handle,
);

// Deliveries routes
routes.get(
  '/delivery/available',
  ensureAuthenticateDeliveryman,
  findAvailablesDeliveries.handle,
);

routes.post(
  '/delivery',
  ensureAuthenticateClient,
  createDeliveryController.handle,
);

routes.put(
  '/delivery/updateDeliveryman/:id',
  ensureAuthenticateDeliveryman,
  updateDeliverymanController.handle,
);

export { routes };
