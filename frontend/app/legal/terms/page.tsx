export const dynamic = "force-static";
export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">利用規約</h1>

      <p>
        本規約は、運営者（以下「当社」）が提供する「ムキメンタリー」（以下「本サービス」）の利用に関する一切に適用されるものとします。
      </p>

      <h2 className="text-xl font-semibold mt-6">第1条（適用）</h2>
      <p>
        本規約は、本サービスの利用に関するすべての事項に適用され、利用者は本規約に同意した上で本サービスを利用するものとします。
      </p>

      <h2 className="text-xl font-semibold mt-6">第2条（利用者の責任）</h2>
      <p>
        利用者は、自らの責任において本サービスを利用するものとし、投稿された掛け声、画像、その他すべての情報（以下「ユーザーコンテンツ」）について一切の責任を負います。
        当社は内容の合法性・正確性・有用性等について一切保証せず、責任を負いません。
      </p>

      <h2 className="text-xl font-semibold mt-6">第3条（禁止事項）</h2>
      <p>以下の行為を禁止します：</p>
      <ul className="list-disc list-inside">
        <li>他者の権利を侵害する行為（著作権・肖像権含む）</li>
        <li>公序良俗に反する行為</li>
        <li>虚偽の情報の登録</li>
        <li>サービスの妨害や不正アクセス行為</li>
        <li>当社が不適切と判断する一切の行為</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">第4条（ユーザーコンテンツの取扱い）</h2>
      <p>
        利用者は、自身が投稿したユーザーコンテンツに関して著作権を保持しますが、当社はこれを無償かつ無期限で、世界中で複製・改変・公開・配信・販売・利用できる権利を保有するものとします。
        また、当社はプロモーション・SNS・イベント等、あらゆる用途で自由に使用できるものとします。
      </p>

      <h2 className="text-xl font-semibold mt-6">第5条（知的財産権）</h2>
      <p>
        本サービスに含まれるUI・構成・ロゴ・画像・文言等の知的財産はすべて当社に帰属し、無断転載・転用・複製を禁止します。
      </p>

      <h2 className="text-xl font-semibold mt-6">第6条（保証の否認および免責）</h2>
      <ul className="list-disc list-inside">
        <li>本サービスは現状有姿で提供され、当社はその正確性・有用性・合法性等について一切の保証を行いません。</li>
        <li>AIが生成したコンテンツの内容・結果についても、当社は一切責任を負いません。</li>
        <li>利用に関連して利用者に生じた損害・トラブルについて、当社は一切責任を負いません。</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">第7条（サービス内容の変更・停止）</h2>
      <p>
        当社は事前の通知なく、本サービスの全部または一部を変更・停止・終了できるものとし、これに伴い利用者に生じる損害について一切責任を負いません。
      </p>

      <h2 className="text-xl font-semibold mt-6">第8条（利用停止・削除）</h2>
      <p>
        利用者が本規約に違反したと当社が判断した場合、当社は当該利用者の投稿削除・利用停止・アカウント削除を予告なく行えるものとします。
      </p>

      <h2 className="text-xl font-semibold mt-6">第9条（準拠法・管轄）</h2>
      <p>
        本規約は日本法に準拠し、当サービスまたは本規約に起因または関連する一切の紛争は、当社の所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。
      </p>

      <p className="text-right text-sm text-gray-500">制定日：2025年6月13日</p>
    </div>
  );
}