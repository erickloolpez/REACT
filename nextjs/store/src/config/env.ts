export const env = {
  SHOPIFY_HOSTNAME: process.env.SHOPIFY_HOSTNAME || 'https://example.myshopify.com',
  SHOPIFY_TOKEN: process.env.SHOPIFY_TOKEN_API || 'shopify_token',
  CACHE_TOKEN: process.env.CACHE_TOKEN,
  SHOPIFY_GRAPHQL_ENDPOINT: process.env.SHOPIFY_GRAPHQL_ENDPOINT as string,
  SHOPIFY_STOREFRONT_TOKEN: process.env.SHOPIFY_STOREFRONT_TOKEN as string,
}