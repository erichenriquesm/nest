module.exports = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'nest',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
