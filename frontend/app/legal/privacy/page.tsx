export const dynamic = "force-static";
export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">プライバシーポリシー</h1>

      <p>
        本プライバシーポリシーは、「ムキメンタリー」（以下「当サービス」といいます）におけるユーザーの個人情報の取扱い方針を定めるものです。
      </p>

      <h2 className="text-xl font-semibold mt-6">第1条（取得する情報）</h2>
      <p>当サービスでは、以下の情報を取得する場合があります：</p>
      <ul className="list-disc list-inside">
        <li>Clerk等の認証サービスを通じて提供されるユーザー情報（メールアドレス、氏名、ユーザーID等）</li>
        <li>掛け声や画像等、ユーザーが投稿したコンテンツ</li>
        <li>サービス利用履歴・アクセスログ・閲覧ページ・操作情報等</li>
        <li>AI生成機能の利用状況（回数、パラメータ等）</li>
        <li>Cookie情報・広告ID等（Google AdSenseによる）</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">第2条（利用目的）</h2>
      <ul className="list-disc list-inside">
        <li>サービスの提供・改善・本人認証</li>
        <li>掛け声生成や画像アップロード等の機能提供</li>
        <li>利用状況の分析、サービス運営の最適化</li>
        <li>利用制限の管理（AI生成回数等）</li>
        <li>Google AdSense等の広告配信・最適化</li>
        <li>不正利用防止および対応</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">第3条（Cookieの使用）</h2>
      <p>
        当サービスでは、Google等の第三者配信事業者によるCookieを使用し、ユーザーの興味関心に基づく広告を表示する場合があります。ユーザーは、
        <a href="https://www.google.com/settings/ads" className="text-blue-600 underline" target="_blank">Googleの広告設定ページ</a>
        からパーソナライズ広告を無効にできます。詳細は
        <a href="https://policies.google.com/technologies/ads?hl=ja" className="text-blue-600 underline" target="_blank">Googleのポリシー</a>
        をご確認ください。
      </p>

      <h2 className="text-xl font-semibold mt-6">第4条（第三者提供）</h2>
      <p>当サービスは、以下の場合を除き、取得した個人情報を第三者に提供しません：</p>
      <ul className="list-disc list-inside">
        <li>ユーザーの同意がある場合</li>
        <li>法令に基づく場合</li>
        <li>不正行為の防止や対応に必要な場合</li>
        <li>業務委託先（インフラ・ストレージ・分析ツール等）に必要な範囲で共有する場合</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">第5条（外部サービスの利用）</h2>
      <p>当サービスでは以下の外部サービスを利用しており、情報が送信される場合があります：</p>
      <ul className="list-disc list-inside">
        <li>Clerk（認証）</li>
        <li>OpenAI（掛け声生成）</li>
        <li>Amazon S3（画像ストレージ）</li>
        <li>Google AdSense（広告配信）</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">第6条（免責事項）</h2>
      <ul className="list-disc list-inside">
        <li>ユーザー自身が投稿または公開した情報について、当サービスは一切責任を負いません。</li>
        <li>不正アクセスや第三者による情報漏洩など、当社の責によらない事由による損害については責任を負いません。</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">第7条（ユーザーの権利）</h2>
      <p>ユーザーは自身の個人情報に関して、開示・訂正・削除等を請求できます。希望される場合は、お問い合わせフォームよりご連絡ください。</p>

      <h2 className="text-xl font-semibold mt-6">第8条（ポリシーの変更）</h2>
      <p>
        本ポリシーは、法令改正・サービス内容の変更等に応じて、ユーザーへの事前通知なく変更されることがあります。変更後は当ページにて常時公開されます。
      </p>

      <p className="text-right text-sm text-gray-500">制定日：2025年6月13日</p>
    </div>
  );
}
