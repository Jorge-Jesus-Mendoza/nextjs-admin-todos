import { WidgetItem } from "@/components";
import { Product, products } from "@/products/data/products";
import { ItemCard } from "@/shopping-cart";
import { cookies } from "next/headers";

export const metadata = {
  title: "Carrito de compra",
  description: "Carrito de compra",
};

interface ProductsInCart {
  product: Product;
  quantity: number;
}

const getProductsInCart = (cart: {
  [id: string]: number;
}): ProductsInCart[] => {
  const productsInCart: ProductsInCart[] = [];
  for (const id of Object.keys(cart)) {
    const product = products.find((prod) => prod.id === id);
    if (product) {
      productsInCart.push({ product, quantity: cart[id] });
    }
  }
  return productsInCart;
};

export default function CartPage() {
  const cookiesStore = cookies();
  const cart = JSON.parse(cookiesStore.get("cart")?.value ?? "{}") as {
    [id: string]: number;
  };

  const productsInCart = getProductsInCart(cart);
  const totalToPay = productsInCart.reduce(
    (prev, current) => current.product.price * current.quantity + prev,
    0
  );
  return (
    <div>
      <h1 className="text-5xl">Productos en el Carrito</h1>
      <hr className="mb-2" />
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {productsInCart.map(({ product, quantity }) => (
            <ItemCard key={product.id} product={product} quantity={quantity} />
          ))}
        </div>

        <div className="flex flex-col w-full sm:w-4/12">
          <WidgetItem title="Total a Pagar">
            <div className="mt-2 gap-4 justify-center">
              <h3 className="text-3xl text-gray-700 text-center font-bold">
                ${(totalToPay * 1.15).toFixed(2)}
              </h3>
            </div>
            <span className="font-bold text-center text-gray-500">
              Impuestos 15% ${(totalToPay * 0.15).toFixed(2)}
            </span>
          </WidgetItem>
        </div>
      </div>
    </div>
  );
}
