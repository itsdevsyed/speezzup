import "fastify";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: any; // or more strict type if you want
  }

  interface FastifyRequest {
    user: {
      phone: string;
    };
  }
}
