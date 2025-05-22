const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});
export default {
  // ...otras opciones...
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // ...otras opciones...
};
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    // Soporte para imports con "@"
    '^@/(.*)$': '<rootDir>/$1',
    // Mock de archivos estáticos (imágenes, css)
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);