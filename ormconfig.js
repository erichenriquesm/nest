module.exports = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'eric',
  password: '',
  database: 'task-nest',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
