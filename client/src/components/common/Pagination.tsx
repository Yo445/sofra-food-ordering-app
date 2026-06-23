export function Pagination() {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <button className="rounded border px-3 py-1 text-sm">Previous</button>
      <span className="text-sm text-zinc-600">Page 1 of 10</span>
      <button className="rounded border px-3 py-1 text-sm">Next</button>
    </div>
  );
}
