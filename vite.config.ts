import { defineConfig, loadEnv, ConfigEnv, ProxyOptions } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig as defineVitestConfig } from 'vitest/config';

// Vitest 설정
const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: [
      'src/pages/**/components/**/*.spec.{ts,tsx}',
      'src/pages/**/components/**/*.test.{ts,tsx}',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './test/unit/coverage',
      include: ['src/pages/**/components/**/*.{ts,tsx}'],
      exclude: [
        'src/pages/**/components/**/*.spec.{ts,tsx}',
        'src/pages/**/components/**/*.test.{ts,tsx}',
      ],
    },
  },
});

// 경로 별칭 설정
const aliasConfig = {
  '@api': './src/api',
  '@components': './src/components',
  '@pages': './src/pages',
  '@hooks': './src/hooks',
  '@stores': './src/stores',
  '@model': './src/model',
  '@utils': './src/utils',
  '@assets': './src/assets',
  '@router': './src/router',
  '@layout': './src/layout',
  '@constants': './src/constants',
  '@theme': './src/theme',
};

// 백엔드 서비스 설정
const backendServices = [
  { path: '/cca-be', port: 8081 },
  { path: '/mpn-be', port: 8082 },
  { path: '/cbg-be', port: 8083 },
  { path: '/ctt-be', port: 8084 },
  { path: '/nwk-be', port: 8085 },
  { path: '/adm-be', port: 8086 },
  { path: '/stg-be', port: 8087 },
];

export default defineConfig(({ mode }: ConfigEnv) => {
  // 환경 변수 로드
  const env = loadEnv(mode, process.cwd(), '');
  const useGateway = env.VITE_GW === 'true';
  // 프록시 설정 생성
  const proxySettings: Record<string, ProxyOptions> = {};

  // 백엔드 서비스 프록시 설정 추가
  backendServices.forEach(({ path, port }) => {
    proxySettings[path] = useGateway
      ? {
          target: 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
        }
      : {
          target: `http://localhost:${port}`,
          changeOrigin: true,
          secure: false,
          rewrite: (urlPath: string) => urlPath.replace(new RegExp(`^${path}`), ''),
        };
  });

  // 최종 설정 반환
  return {
    plugins: [react()],
    ...vitestConfig,
    resolve: {
      alias: Object.entries(aliasConfig).reduce(
        (acc, [key, value]) => {
          acc[key] = path.resolve(__dirname, value);
          return acc;
        },
        {} as Record<string, string>,
      ),
    },
    server: {
      proxy: proxySettings,
    },
  };
});
