import dotenv from 'dotenv';

//TODO сделать чтобы старт был с окружения

// dotenv.config({ path: `.env.test` });
dotenv.config({ path: `.env.preprod` });
//dotenv.config({ path: `.env.prod` });

export default {
  node_env: String(process.env.NODE_ENV),
  petstore: String(process.env.PETSTORE)
};
