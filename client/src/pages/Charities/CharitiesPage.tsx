import { useEffect, useState } from "react";

export default function CharitiesPage() {
  const [charities, setCharities] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (pageNum) => {
    const res = await fetch(`http://localhost:8080/charities?page=${pageNum}`);
    const data = await res.json();

    setCharities(data.data);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  return (
    <div className="pt-32 px-6 text-[#1a3d2b]">
      <h1 className="text-3xl font-bold mb-6 text-center">Charities</h1>

      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow-md">
        <thead className="bg-[#1a3d2b] text-white">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Description</th>
          </tr> 
        </thead>

        <tbody className="bg-white">
          {charities.map((c, index) => (
            <tr
              key={c.id}
              className={`border-t hover:bg-gray-100 transition ${
                index % 2 === 0 ? "bg-gray-50" : ""
              }`}
            >
              <td className="px-4 py-2">{c.id}</td>
              <td className="px-4 py-2 font-medium">{c.name}</td>
              <td className="px-4 py-2 text-gray-600">{c.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center gap-4 mb-6 items-center">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
