import { ProductCard } from "../ProductCard"
import styles from './ProductsWrapper.module.sass'

interface ProductWrapperProps {
  products: ProductType[]
}

export const ProductsWrapper = ({ products }: ProductWrapperProps) => {
  return (
    <div className={styles.ProductsWrapper}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}