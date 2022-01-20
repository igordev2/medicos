module.exports = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ['./src/**/*.entity.ts'],
  synchronize: false,
  migrations: ['./src/infra/typeorm/migrations/*ts'],
  cli: {
    migrationsDir: './src/infra/typeorm/migrations',
  },
};
