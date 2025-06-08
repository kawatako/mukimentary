// app/debug/page.tsx （一時的に作成）
'use client'

export default function DebugPage() {
  return (
    <div>
      <h1>環境変数デバッグ</h1>
      <p>
        Publishable Key: <code>{process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}</code>
      </p>
    </div>
  )
}
