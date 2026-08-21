import Image from "next/image";
import Link from "next/link";
import { Edit, Trash2, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deleteProduct } from "@/actions/product"; // Import Server Action
import SearchFilters from "@/app/admin/_components/search-filter";
import { Category } from "@/generated/prisma/enums";


interface SearchParams {
  searchParams: Promise<{
    search?: string;
    category?: string;
    sort?: string;
  }>;
}

const AllProductsPage = async ({ searchParams }: SearchParams) => {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams.search || "";
  const category = resolvedSearchParams.category || "all";
  const sort = resolvedSearchParams.sort || "default";

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
      category: category !== "all" ? (category as Category) : undefined,
    },
    orderBy:
      sort === "price_asc"
        ? { price: "asc" }
        : sort === "price_desc"
        ? { price: "desc" }
        : { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-slate-50 p-5">
      {/* HEADER */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inventory Management</h1>
          <p className="text-slate-500">Manage your coffee machines, beans, and accessories.</p>
        </div>
        <Link
          href="/admin/products/add"
          className="flex items-center rounded-lg bg-slate-900 px-5 py-2.5 font-bold text-white transition-colors hover:bg-slate-800"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add New Product
        </Link>
      </div>

      <SearchFilters />

      <div className="overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
        <table className="w-full min-w-200px border-collapse text-left">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="w-[40%] p-4 font-semibold text-slate-600">Product Info</th>
              <th className="w-[20%] p-4 text-left font-semibold text-slate-600">Category</th>
              <th className="w-[20%] p-4 text-right font-semibold text-slate-600">Price</th>
              <th className="w-[10%] p-4 text-center font-semibold text-slate-600">Stock</th>
              <th className="w-[10%] p-4 text-center font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-10 text-center text-slate-500">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="border-b border-slate-100 transition-colors hover:bg-slate-50/50">
                  
                  {/* Product Info */}
                  <td className="flex items-center gap-4 p-4">
                    <Image
                      src={p.mainImage || "/placeholder.png"}
                      width={50}
                      height={50}
                      className="rounded-lg border border-slate-200 object-cover"
                      alt={p.name}
                    />
                    <div>
                      <div className="text-[15px] font-semibold text-slate-900">{p.name}</div>
                      <div className="text-[13px] text-slate-500">SKU: {p.sku}</div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="p-4 text-left">
                    <span className="rounded-full bg-sky-100 px-3 py-1 text-[12px] font-semibold uppercase text-sky-700">
                      {p.category.replace("_", " ")}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="p-4 text-right font-semibold text-slate-900">
                    {p.price ? Number(p.price).toLocaleString("vi-VN") : 0} ₫
                  </td>

                  {/* Stock */}
                  <td className="p-4 text-center font-semibold text-slate-900">
                    {p.inStock ? Number(p.inStock).toLocaleString("vi-VN") : 0}
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <Link
                        href={`/admin/products/add?editId=${p.id}`}
                        className="flex items-center justify-center rounded p-2 text-blue-500 transition-colors hover:bg-blue-50 hover:text-blue-700"
                      >
                        <Edit className="h-5 w-5" />
                      </Link>

                      <form
                        action={async () => {
                          "use server";
                          await deleteProduct(p.id);
                        }}
                        className="m-0 flex"
                      >
                        <button
                          type="submit"
                          className="flex cursor-pointer items-center justify-center rounded border-none bg-transparent p-2 text-red-500 transition-colors hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </form>
                    </div>
                  </td>
                  
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProductsPage;