"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { Expand, ShoppingCart } from "lucide-react";

import type { Product } from "@/lib/types";
import { Currency } from "./ui/Currency";
import { Button } from "./ui/Button";
import { useSetAtom } from "jotai";
import { previewModalAtom } from "@/atoms/atoms";
import { useCart } from "@/lib/hooks/useCart";

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const setPreviewModal = useSetAtom(previewModalAtom);
  const cart = useCart();

  const handleClick = () => {
    router.push(`/product/${product.id}?categoryId=${product.category.id}`);
  };

  const onExpand = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setPreviewModal(product);
  };

  const onAddToCart = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    cart.addProduct(product);
  };

  return (
    <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image alt="Image" src={product.images[0]} fill className="aspect-square object-cover rounded-md" />

        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute w-full px-6 bottom-5">
          <div className="flex gap-x-4 justify-center">
            <Button onClick={onExpand} variant="icon" size="icon">
              <Expand size={20} className="text-gray-600" />
            </Button>
            <Button onClick={onAddToCart} variant="icon" size="icon">
              <ShoppingCart size={20} className="text-gray-600" />
            </Button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{product.name}</p>
        <p className="text-sm text-gray-500">{product.category.name}</p>
      </div>
      {/* Price */}
      <div className="flex items-center justify-between">
        <Currency value={product.price} />
      </div>
    </div>
  );
};
