// next.config.ts
import withTM from 'next-transpile-modules'

const withUuidFix = withTM(['uuid']) // ✅ transpilation forcée de uuid

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true
  }
}

export default withUuidFix(nextConfig)
