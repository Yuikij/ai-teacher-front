/**
 * 全局环境配置
 */

interface EnvConfig {
  API_BASE_URL: string;
  API_TIMEOUT: number;
}

// 开发环境配置
const devConfig: EnvConfig = {
  API_BASE_URL: 'http://127.0.0.1:18080',
  API_TIMEOUT: 30000, // 30秒
};

// 测试环境配置
const testConfig: EnvConfig = {
  API_BASE_URL: 'http://test-api.example.com',
  API_TIMEOUT: 30000,
};

// 生产环境配置
const prodConfig: EnvConfig = {
  API_BASE_URL: 'https://api.example.com',
  API_TIMEOUT: 30000,
};

// 根据当前环境选择配置
const getEnvConfig = (): EnvConfig => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return prodConfig;
    case 'test':
      return testConfig;
    default:
      return devConfig;
  }
};

export const env = getEnvConfig();

export default env; 