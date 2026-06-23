export function CategoryTabs() {
  const categories = ["All", "Appetizers", "Main Course", "Desserts", "Beverages", "Salads"];

  return (
    <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
      {categories.map((cat) => (
        <button
          key={cat}
          className="whitespace-nowrap rounded-full border border-amber-200 px-5 py-1.5 text-sm font-medium text-zinc-600 transition-all hover:border-amber-600 hover:bg-amber-600 hover:text-white"
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
