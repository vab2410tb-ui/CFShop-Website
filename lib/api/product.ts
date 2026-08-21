export async function searchProducts(keyword: string) {
  const res = await fetch(
    `/api/products/search?s=${encodeURIComponent(keyword)}`
  );

  if (!res.ok) {
    throw new Error("Search failed");
  }

  return res.json();
}