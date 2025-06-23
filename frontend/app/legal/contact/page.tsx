export const dynamic = "force-static";
export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">お問い合わせ</h1>

      <p>
        ムキメンタリーに関するご意見・ご要望・不具合のご報告・規約やポリシーに関するお問い合わせは、以下よりご連絡ください。
      </p>

      <div className="bg-gray-100 rounded p-4 text-center space-y-2">
        <div>
          <p className="font-semibold">📧 メールでのお問い合わせ</p>
          <a href="mailto:contact.mukimentary@gmail.com" className="text-primary underline">
            contact.mukimentary@gmail.com
          </a>
        </div>
        <div>
          <p className="font-semibold">📝 アンケートフォーム</p>
          <a
            href="https://forms.gle/xNz5tnc9AY9tJxH26"
            className="text-primary underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Googleフォームで送信する
          </a>
        </div>
      </div>

      <p>
        ※ 内容によっては返信までお時間をいただく場合がございます。あらかじめご了承ください。
      </p>

      <p className="text-right text-sm text-gray-500">最終更新日：2025年6月13日</p>
    </div>
  );
}
