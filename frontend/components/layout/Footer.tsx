export default function Footer() {
  return (
    <footer className="text-sm text-muted-foreground border-t mt-12 p-6 text-center bg-background">
      <div className="flex flex-col items-center space-y-2 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-6">
        <a href="/legal/about" className="underline hover:text-primary">ムキメンタリーについて</a>
        <a href="/legal/privacy" className="underline hover:text-primary">プライバシーポリシー</a>
        <a href="/legal/terms" className="underline hover:text-primary">利用規約</a>
        <a href="/legal/guidelines" className="underline hover:text-primary">投稿ガイドライン</a>
        <a href="/legal/contact" className="underline hover:text-primary">お問い合わせ</a>
      </div>
      <p className="text-xs mt-4 text-gray-400">© 2025 ムキメンタリー - 筋肉と掛け声でつながるSNS</p>
    </footer>
  );
}
