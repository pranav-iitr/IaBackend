import controller from '../controllers/';

export default async function helloRoute(req: Request): Promise<Response> {
  return await controller(req);
}
