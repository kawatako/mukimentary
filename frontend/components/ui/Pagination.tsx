//frontend/components/ui/Pagination.tsx

"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({ currentPage, totalPages }: Props) {
  const params = useSearchParams();
  const pose = params.getAll("pose");
  const muscle = params.getAll("muscle");

  const generateUrl = (page: number) => {
    const searchParams = new URLSearchParams();
    pose.forEach((p) => searchParams.append("pose", p));
    muscle.forEach((m) => searchParams.append("muscle", m));
    searchParams.set("page", page.toString());
    return `/cheers?${searchParams.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className='flex justify-center mt-6 gap-2'>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link key={page} href={generateUrl(page)}>
          <a
            className={`px-3 py-1 border rounded text-sm transition ${
              page === currentPage
                ? "bg-primary text-white"
                : "bg-background text-foreground border-border hover:bg-accent"
            }`}
          >
            {page}
          </a>
        </Link>
      ))}
    </div>
  );
}
