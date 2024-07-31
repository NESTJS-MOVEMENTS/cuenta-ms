import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  //? Y ano es necesario porque se esta usando nats
  // CLIENTES_MICROSERVICE_HOST: string;
  // CLIENTES_MICROSERVICE_PORT: number;
  NATS_SERVERS: string[];
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    //? Y ano es necesario porque se esta usando nats
    // CLIENTES_MICROSERVICE_HOST: joi.string().required(),
    // CLIENTES_MICROSERVICE_PORT: joi.number().required(),
    //Validamos como array
    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  //sobre escribimos la propiedad del objeto NATS_SERVERS con el nuevo valor. El split devuelve un array
  NATS_SERVERS: process.env.NATS_SERVERS.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
  //? Y ano es necesario porque se esta usando nats
  // clientesMicroserviceHost: envVars.CLIENTES_MICROSERVICE_HOST,
  // clientesMicroservicePort: envVars.CLIENTES_MICROSERVICE_PORT,
  natServers: envVars.NATS_SERVERS,
};
