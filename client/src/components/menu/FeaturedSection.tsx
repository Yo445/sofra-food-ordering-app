import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

export function FeaturedSection({ products }: { products: Product[] }) {
  return (
    <section className="mt-12">
      <h2 className="mb-6 text-2xl font-bold text-zinc-800">Popular Picks</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
