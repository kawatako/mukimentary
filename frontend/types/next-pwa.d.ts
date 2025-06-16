declare module "next-pwa" {
  import { NextConfig } from "next";
  
  interface RuntimeCachingEntry {
    urlPattern: string | RegExp;
    handler: 'CacheFirst' | 'CacheOnly' | 'NetworkFirst' | 'NetworkOnly' | 'StaleWhileRevalidate';
    options?: {
      cacheName?: string;
      expiration?: {
        maxEntries?: number;
        maxAgeSeconds?: number;
      };
      cacheKeyWillBeUsed?: unknown;
      cacheWillUpdate?: unknown;
      fetchDidFail?: unknown;
      fetchDidSucceed?: unknown;
      requestWillFetch?: unknown;
      responseWillBeCached?: unknown;
    };
  }
  
  interface PWAConfig {
    dest?: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    sw?: string;
    publicExcludes?: string[];
    buildExcludes?: (string | RegExp)[];
    cacheOnFrontEndNav?: boolean;
    subdomainPrefix?: string;
    reloadOnOnline?: boolean;
    scope?: string;
    runtimeCaching?: RuntimeCachingEntry[];
  }
  
  interface NextConfigWithPWA extends NextConfig {
    pwa?: PWAConfig;
  }
  
  function withPWA(config: NextConfigWithPWA): NextConfig;
  export default withPWA;
}