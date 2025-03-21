import { shopifyUrls } from "./urls"
import { env } from 'app/config/env'

interface CollectionStore {
  id: string;
  handle: string;
  title: string;
}

export const getCollections = async () => {
  try {
    const response = await fetch(shopifyUrls.collections.all, {
      headers: new Headers({
        'X-Shopify-Access-Token': env.SHOPIFY_TOKEN
      })
    })
    const { smart_collections } = await response.json()
    const transformedCollections = smart_collections.map((collection: CollectionStore) => {
      return {
        id: collection.id,
        title: collection.title,
        handle: collection.handle,
      }
    })
    return transformedCollections

  } catch (error) {
    console.log(error)
  }
}

export const getCollectionsProducts = async (id: string) => {
  try {
    const response = await fetch(shopifyUrls.collections.products(id), {
      headers: new Headers({
        'X-Shopify-Access-Token': env.SHOPIFY_TOKEN
      })
    })

    const { products } = await response.json()
    return products

  } catch (error) {
    console.error(error)
  }
}