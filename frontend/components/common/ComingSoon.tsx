//frontend/components/common/ComingSoon.tsx
export default function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-muted-foreground text-sm">
        このページは現在準備中です。近日公開予定！
      </p>
    </div>
  );
}
