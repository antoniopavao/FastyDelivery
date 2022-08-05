import { Router } from 'express';
import { ensureAuthenticateClient } from './middlewares/ensureAuthenticateClient';
import { AuthenticateClientController } from './modules/account/useCases/authenticateClient/AuthenticateClientController';
import { AuthenticateDeliverymanController } from './modules/account/useCases/authenticateDeliveryman/AuthenticateDeliverymanController';
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController';
import { CreateDeliveryController } from './modules/deliveries/useCases/createDelivery/CreateDeliveryController';
import { FindAvailablesDeliveriesController } from './modules/deliveries/useCases/findAllAvailable/FindAvailablesDeliveriesController';
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();

const createDelivermanController = new CreateDeliverymanController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();

const createDeliveryController = new CreateDeliveryController();
const findAvailablesDeliveries = new FindAvailablesDeliveriesController();

// Clients Routes
routes.post('/client/', createClientController.handle);
routes.post('/client/authenticate', authenticateClientController.handle);

// Deliveryman routes
routes.post('/deliveryman/', createDelivermanController.handle);
routes.post(
  '/deliveryman/authenticate',
  authenticateDeliverymanController.handle,
);

// Deliveries routes
routes.get('/delivery/available', findAvailablesDeliveries.handle);

routes.post(
  '/delivery',
  ensureAuthenticateClient,
  createDeliveryController.handle,
);

export { routes };
