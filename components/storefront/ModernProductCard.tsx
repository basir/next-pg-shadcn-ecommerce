import Link from "next/link";
import { Product } from "../../types/Product";
import styles from "./ModernProductCard.module.css";

interface ModernProductCardProps {
  product: Product;
  imageUrl: string;
  fallbackImageUrl: string;
  detailsHref?: string;
  reviewCount?: number;
}

const formatPrice = (price: number): string => {
  return `₹${Math.round(price || 0).toLocaleString("en-IN")}`;
};

const calculateOldPrice = (price: number, discount?: number, mrp?: number): number | null => {
  if (mrp && mrp > price) return mrp;
  if (!discount || discount <= 0 || discount >= 100) return null;
  return Math.round(price / (1 - discount / 100));
};

const renderStars = (rating?: number): string => {
  const safeRating = Math.max(0, Math.min(5, Math.round(rating || 0)));
  return `${"★".repeat(safeRating)}${"☆".repeat(5 - safeRating)}`;
};

const ModernProductCard = ({ product, imageUrl, fallbackImageUrl, detailsHref, reviewCount = 124 }: ModernProductCardProps) => {
  const discountText = product.discount && product.discount > 0 ? `${product.discount}% OFF` : "NEW";
  const oldPrice = calculateOldPrice(product.price || 0, product.discount, product.mrp);

  return (
    <div className={styles.productCard}>
      <div className={styles.productImage}>
        <img
          src={imageUrl}
          alt={product.name}
          onError={(event) => {
            event.currentTarget.src = fallbackImageUrl;
          }}
        />
        <span className={styles.discountBadge}>{discountText}</span>
      </div>
      <div className={styles.productDetails}>
        <div className={styles.productCategory}>{product.category || "Seeds & Fertilizers"}</div>
        <h3 className={styles.productTitle}>{product.name || "Premium Hybrid Paddy Seeds"}</h3>
        <div className={styles.productRating}>
          {renderStars(product.rating)} <span className={styles.reviewCount}>({reviewCount})</span>
        </div>
        <div className={styles.priceActionRow}>
          <div className={styles.pricing}>
            <span className={styles.currentPrice}>{formatPrice(product.price || 0)}</span>
            {oldPrice ? <span className={styles.oldPrice}>{formatPrice(oldPrice)}</span> : <span className={styles.oldPrice}>-</span>}
          </div>
          <button className={styles.addToCartBtn} title="Add to Cart" type="button" aria-label={`Add ${product.name} to cart`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
          </button>
        </div>
        {detailsHref && (
          <Link href={detailsHref} className={styles.detailsLink}>
            View details
          </Link>
        )}
      </div>
    </div>
  );
};

export default ModernProductCard;
