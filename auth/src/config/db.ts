import { User } from "../entities";
import { Connection, createConnection, getConnectionManager } from "typeorm";

const config = {
  type: "postgres",
  name: "default",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "test",
  password: process.env.POSTGRES_PASSWORD || "test",
  database: process.env.POSTGRES_DB || "test",
  synchronize: true,
  logging: false,
  entities: [User],
  subscribers: [],
  migrations: [],
  //   url: `postgres://'+ taras + ':'+ admin + '@'+ db +'/'+ shop`,
  url: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@auth-pg-srv:5432/shop`,
};

export const dbCreateConnection = async (): Promise<Connection | null> => {
  try {
    const conn = await createConnection({
      type: "postgres",
      host: process.env.POSTGRES_HOST || "localhost",
      port: Number(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USER || "test",
      password: process.env.POSTGRES_PASSWORD || "test",
      database: process.env.POSTGRES_DB || "test",
      synchronize: true,
      logging: false,
      entities: [User],
      subscribers: [],
      migrations: [],
      url: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@auth-pg-srv:5432/${process.env.POSTGRES_DB}`,
    });
    console.log(
      `Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'`
    );
  } catch (err) {
    if (err.name === "AlreadyHasActiveConnectionError") {
      const activeConnection = getConnectionManager().get(config.name);
      return activeConnection;
    }
    console.log(err);
  }
  return null;
};

// export const AppDataSource = new DataSource({
//     type: "postgres",
//     host: process.env.POSTGRES_HOST || "localhost",
//     port: Number(process.env.POSTGRES_PORT) || 5432,
//     username: process.env.POSTGRES_USER || "test",
//     password: process.env.POSTGRES_PASSWORD || "test",
//     database: process.env.POSTGRES_DB || "test",
//     synchronize: true,
//     logging: false,
//     entities: [User],
//     subscribers: [],
//     migrations: [],
//     //   url: `postgres://'+ taras + ':'+ admin + '@'+ db +'/'+ shop`,
//     url: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@auth-pg-srv:5432/shop`,
//   });
