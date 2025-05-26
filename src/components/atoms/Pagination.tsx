interface PaginationProps {
  prevPageUrl: string | null;
  nextPageUrl: string | null;
  currentPage: number;
  lastPage: number;
  onPageChange: (url: string) => void;
}

export default function Pagination({
  prevPageUrl,
  nextPageUrl,
  currentPage,
  lastPage,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex sm:flex-row justify-center items-center mt-4 gap-2">
      <button
        disabled={!prevPageUrl}
        onClick={() => prevPageUrl && onPageChange(prevPageUrl)}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Anterior
      </button>
      <span className="px-4 py-2 text-center">
        Página {currentPage} de {lastPage}
      </span>
      <button
        disabled={!nextPageUrl}
        onClick={() => nextPageUrl && onPageChange(nextPageUrl)}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  );
}
