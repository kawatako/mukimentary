export default function PostingGuidelinesPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">掛け声投稿ガイドライン</h1>

      <p>
        ムキメンタリーでは、ユーザーの皆さんが楽しく、安心して掛け声を投稿できる環境を目指しています。以下のガイドラインを守って投稿をお願いいたします。
      </p>

      <h2 className="text-xl font-semibold mt-6">📌 基本ルール</h2>
      <ul className="list-disc list-inside">
        <li>他人を不快にさせない、思いやりのある内容にしてください。</li>
        <li>投稿は必ずオリジナルまたはAI生成された内容にしてください。</li>
        <li>差別・攻撃的・性的・暴力的な表現は禁止です。</li>
        <li>著作権や肖像権を侵害する画像・言葉の使用はお控えください。</li>
        <li>広告や宣伝を目的とした投稿は禁止です。</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">🎭 掛け声の世界観について</h2>
      <p>
        ムキメンタリーは「筋肉 × エンタメ × ユーモア」を融合させたSNSです。以下のような表現が歓迎されます：
      </p>
      <ul className="list-disc list-inside">
        <li>筋肉を褒めつつ、クスッと笑える比喩（例：「その背中、富士山より雄大！」）</li>
        <li>アニメ・地名・動物・食べ物などとのユニークな例え</li>
        <li>関西弁・方言・なまりなどによる親しみのある表現</li>
        <li>社会現象・流行語などとの軽妙なリンク</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">🚫 禁止される表現の例</h2>
      <ul className="list-disc list-inside text-red-600">
        <li>「キモい」「ぶさいく」「死ね」などの侮辱表現</li>
        <li>明らかに性的な文脈（例：「その筋肉で抱いて…」など）</li>
        <li>個人名を出しての誹謗中傷</li>
        <li>不快な下ネタ・暴力表現</li>
        <li>差別的表現（人種、性別、宗教など）</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">🔁 AI生成に関するルール</h2>
      <ul className="list-disc list-inside">
        <li>AI生成掛け声もこのガイドラインに準じます。</li>
        <li>不適切と判断された場合、運営により非表示・削除される場合があります。</li>
        <li>掛け声に含めたい「フリーワード」はポジティブ・楽しい内容にしてください。</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">🛡 削除対応と報告機能</h2>
      <p>
        万が一、不適切な投稿を見つけた場合は、通報機能からご報告ください。運営が確認のうえ、ガイドライン違反が認められた場合は予告なく削除・アカウント制限等の対応を行います。
      </p>

      <p className="text-right text-sm text-gray-500">制定日：2025年6月13日</p>
    </div>
  );
}
