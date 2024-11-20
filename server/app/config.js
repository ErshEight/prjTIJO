const config = {
  port: process.env.PORT || 3001,
  databaseUrl: process.env.MONGODB_URI || 'mongodb+srv://igotokarz88:ersh1808@praca.lyqaj.mongodb.net/actual_test?retryWrites=true&w=majority&appName=Praca',
  JwtSecret: process.env.JWT_SECRET || 'secret'
};

export default config;
