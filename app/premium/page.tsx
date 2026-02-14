export default function PremiumPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold">Premium ⭐</h1>
      <p className="mt-2 text-slate-700">
        Тренажер доступний тільки для Premium.
      </p>

      <div className="mt-6 rounded-2xl border p-4">
        <p className="font-medium">Що дає Premium:</p>
        <ul className="mt-2 list-disc pl-5 text-slate-700">
          <li>Тренажер (Practice) без обмежень</li>
          <li>Повний доступ до рівнів A0–A2 (додамо далі)</li>
          <li>Скасування ліміту на кількість уроків</li>
        </ul>
      </div>

      <p className="mt-6 text-sm text-slate-500">
        (Кнопку оплати підключимо/покажемо тут на наступному кроці.)
      </p>
    </main>
  );
}
