// Existing TIME GLOBAL list prices, preserved exactly; null means no published price.
// Colours describe the catalogue appearance and do not certify mineral composition.
window.STONE_PRODUCTS = [
  {
    id: 'white', code: 'A-01', img: 'white.jpg', category: 'decorative',
    prices: [116, 136, 168], sizes: '1–2 · 2–4 · 4–6 · 6–8 · 10–15–20',
    name: { en: 'White pebbles', ar: 'حصى أبيض', tr: 'Beyaz çakıl' },
    desc: {
      en: 'Bright white tones create a clean contrast with planting and dark surfaces. A simple finish for decorative beds, garden borders and planter tops.',
      ar: 'تمنح درجات الأبيض تبايناً أنيقاً مع النباتات والأسطح الداكنة. خيار جميل لأحواض الزينة وحدود الحدائق وتغطية سطح الأصص.',
      tr: 'Beyaz tonları bitkiler ve koyu yüzeylerle zarif bir kontrast oluşturur. Dekoratif tarhlar, bahçe bordürleri ve saksı üstleri için sade bir tamamlayıcıdır.'
    },
    uses: { en: ['Garden borders', 'Decorative beds', 'Planter tops'], ar: ['حدود الحدائق', 'أحواض الزينة', 'سطح الأصص'], tr: ['Bahçe bordürleri', 'Dekoratif tarhlar', 'Saksı üstleri'] },
    note: { en: '', ar: '', tr: '' }
  },
  {
    id: 'black', code: 'A-02', img: 'black.jpg', category: 'decorative',
    prices: [136, 157, 178], sizes: '1–2 · 2–4 · 4–6 · 6–8 · 10–15–20',
    name: { en: 'Black pebbles', ar: 'حصى أسود', tr: 'Siyah çakıl' },
    desc: {
      en: 'Deep, dark tones frame greenery and light paving. Use for ornamental ground cover, borders and contemporary planter displays.',
      ar: 'تُبرز الدرجات الداكنة جمال النباتات والأرضيات الفاتحة. تناسب التغطية الأرضية للزينة وحدود الأحواض وتنسيق الأصص العصري.',
      tr: 'Koyu tonları yeşil bitkileri ve açık renkli döşemeleri öne çıkarır. Dekoratif zemin kaplaması, bordürler ve modern saksı düzenlemeleri için uygundur.'
    },
    uses: { en: ['Modern gardens', 'Border accents', 'Planter tops'], ar: ['حدائق عصرية', 'تحديد الأحواض', 'سطح الأصص'], tr: ['Modern bahçeler', 'Bordür detayları', 'Saksı üstleri'] },
    note: { en: '', ar: '', tr: '' }
  },
  {
    id: 'maroon', code: 'A-03', img: 'maroon.jpg', category: 'decorative',
    prices: [136, 157, 178], sizes: '1–2 · 2–4 · 4–6 · 6–8 · 10–15–20',
    name: { en: 'Maroon pebbles', ar: 'حصى عنابي', tr: 'Bordo çakıl' },
    desc: {
      en: 'Warm burgundy tones bring colour and depth to outdoor planting. Ideal for decorative beds, contrasting borders and courtyard accents.',
      ar: 'تضيف الدرجات العنابية الدافئة لوناً وعمقاً للمساحات المزروعة. تناسب أحواض الزينة والحدود المتباينة ولمسات الأفنية.',
      tr: 'Sıcak bordo tonları dış mekân bitkilendirmelerine renk ve derinlik katar. Dekoratif tarhlar, kontrast bordürler ve avlu detayları için idealdir.'
    },
    uses: { en: ['Colour accents', 'Garden borders', 'Courtyard beds'], ar: ['لمسات لونية', 'حدود الحدائق', 'أحواض الأفنية'], tr: ['Renk vurguları', 'Bahçe bordürleri', 'Avlu tarhları'] },
    note: { en: '', ar: '', tr: '' }
  },
  {
    id: 'granite', code: 'A-04', img: 'granite.jpg', category: 'natural',
    prices: [157, 178, 200], sizes: '1–2 · 2–4 · 4–6 · 6–8 · 10–15–20',
    name: { en: 'Granite', ar: 'جرانيت', tr: 'Granit' },
    desc: {
      en: 'A textured, mineral-speckled stone for a natural landscape palette. Use in rock gardens, ornamental beds and edging alongside paved paths.',
      ar: 'حجر ذو نسيج وحبيبات معدنية ينسجم مع الطابع الطبيعي للحدائق. يُستخدم في الحدائق الصخرية وأحواض الزينة وعلى جوانب الممرات المرصوفة.',
      tr: 'Dokulu ve mineral benekli görünümüyle doğal peyzajlara uyum sağlar. Kaya bahçelerinde, dekoratif tarhlarda ve döşeli yolların kenarlarında kullanılır.'
    },
    uses: { en: ['Rock gardens', 'Ornamental beds', 'Path edging'], ar: ['حدائق صخرية', 'أحواض الزينة', 'حواف الممرات'], tr: ['Kaya bahçeleri', 'Dekoratif tarhlar', 'Yol kenarları'] },
    note: { en: '', ar: '', tr: '' }
  },
  {
    id: 'rainbow', code: 'A-05', img: 'rainbow.jpg', category: 'decorative',
    prices: [210, 231, 252], sizes: '1–2 · 2–4 · 4–6 · 6–8 · 10–15–20',
    name: { en: 'Rainbow pebbles', ar: 'حصى متعدد الألوان', tr: 'Gökkuşağı çakıl' },
    desc: {
      en: 'A varied colour palette adds movement and character to a landscape. Create decorative bed patterns, colourful borders and focal planter displays.',
      ar: 'تمنح الألوان المتنوعة حيوية وطابعاً مميزاً للمساحة. مناسبة لتشكيل أنماط في أحواض الزينة وحدود ملونة وتنسيقات أصص لافتة.',
      tr: 'Çok renkli görünümü peyzaja hareket ve karakter katar. Dekoratif tarh desenleri, renkli bordürler ve dikkat çekici saksı düzenlemeleri oluşturur.'
    },
    uses: { en: ['Decorative patterns', 'Colourful borders', 'Feature planters'], ar: ['أنماط زخرفية', 'حدود ملونة', 'أصص مميزة'], tr: ['Dekoratif desenler', 'Renkli bordürler', 'Vurgu saksıları'] },
    note: { en: '', ar: '', tr: '' }
  },
  {
    id: 'green', code: 'A-06', img: 'green.jpg', category: 'decorative',
    prices: [210, 231, 252], sizes: '1–2 · 2–4 · 4–6 · 6–8 · 10–15–20',
    name: { en: 'Green pebbles', ar: 'حصى أخضر', tr: 'Yeşil çakıl' },
    desc: {
      en: 'Green tones soften the transition between stone and planting. A distinctive choice for garden borders, ornamental beds and planter topdressing.',
      ar: 'تُحقق الدرجات الخضراء انسجاماً لطيفاً بين الحجر والنبات. خيار مميز لحدود الحدائق وأحواض الزينة وتغطية سطح الأصص.',
      tr: 'Yeşil tonları taş ile bitkiler arasında yumuşak bir geçiş sağlar. Bahçe bordürleri, dekoratif tarhlar ve saksı üstü kaplamaları için farklı bir seçenektir.'
    },
    uses: { en: ['Garden borders', 'Decorative beds', 'Planter tops'], ar: ['حدود الحدائق', 'أحواض الزينة', 'سطح الأصص'], tr: ['Bahçe bordürleri', 'Dekoratif tarhlar', 'Saksı üstleri'] },
    note: { en: '', ar: '', tr: '' }
  },
  {
    id: 'basalt', code: 'A-07', img: 'basalt.jpg', category: 'natural',
    prices: [126, 147, 168], sizes: '1–2 · 2–4 · 4–6 · 6–8 · 10–15–20',
    name: { en: 'Basalt', ar: 'بازلت', tr: 'Bazalt' },
    desc: {
      en: 'A dark volcanic stone that gives landscapes a grounded, understated finish. Use for rock gardens, decorative ground cover and border detailing.',
      ar: 'حجر بركاني داكن يمنح الحديقة طابعاً هادئاً ومتوازناً. يناسب الحدائق الصخرية والتغطية الأرضية للزينة وتحديد الأحواض.',
      tr: 'Koyu renkli volkanik yapısı peyzaja sade ve güçlü bir görünüm kazandırır. Kaya bahçeleri, dekoratif zemin kaplamaları ve bordür detaylarında kullanılır.'
    },
    uses: { en: ['Rock gardens', 'Ground cover', 'Border detailing'], ar: ['حدائق صخرية', 'تغطية أرضية', 'تحديد الأحواض'], tr: ['Kaya bahçeleri', 'Zemin kaplaması', 'Bordür detayları'] },
    note: { en: '', ar: '', tr: '' }
  },
  {
    id: 'river', code: 'A-08', img: 'river.jpg', category: 'natural',
    prices: [84, 105, 136], sizes: '1–2 · 2–4 · 4–6 · 6–8 · 10–15–20',
    name: { en: 'River pebbles', ar: 'حصى نهري', tr: 'Dere çakılı' },
    desc: {
      en: 'Rounded forms and varied tones bring an easy, natural feel. Suited to dry stream features, decorative beds and edging around planted areas.',
      ar: 'تمنح الأشكال المستديرة والدرجات المتنوعة مظهراً طبيعياً هادئاً. تناسب تنسيق مجاري المياه الجافة وأحواض الزينة وحواف المساحات المزروعة.',
      tr: 'Yuvarlak formları ve farklı tonları doğal, sakin bir görünüm sunar. Kuru dere tasarımları, dekoratif tarhlar ve bitkili alanların kenarları için uygundur.'
    },
    uses: { en: ['Dry stream features', 'Decorative beds', 'Garden edging'], ar: ['مجاري جافة للزينة', 'أحواض الزينة', 'حواف الحدائق'], tr: ['Kuru dere tasarımı', 'Dekoratif tarhlar', 'Bahçe kenarları'] },
    note: {
      en: 'Rounded loose pebbles can move underfoot; choose a suitable installed surface for walking areas.',
      ar: 'قد يتحرك الحصى المستدير المفكك تحت الأقدام؛ اختر سطحاً منفذاً مناسباً لمناطق المشي.',
      tr: 'Gevşek yuvarlak çakıllar ayak altında hareket edebilir; yürüme alanları için uygun bir uygulama seçin.'
    }
  },
  {
    id: 'pumice', code: 'A-09', img: 'pomza-tasi.jpg', category: 'volcanic',
    prices: [63, 95, null], sizes: '1–2',
    name: { en: 'Pumice', ar: 'حجر الخفاف (بومزا)', tr: 'Pomza taşı' },
    desc: {
      en: 'Lightweight, porous volcanic stone for rock gardens and planter displays. Suitably graded pumice can add air space to container growing mixes.',
      ar: 'حجر بركاني خفيف ومسامي للحدائق الصخرية وتنسيق الأصص. ويمكن للخفاف ذي التدرج المناسب زيادة المسامات الهوائية في خلطات الزراعة بالأوعية.',
      tr: 'Kaya bahçeleri ve saksı düzenlemeleri için hafif, gözenekli volkanik taş. Uygun tane boyutundaki pomza, saksı yetiştirme karışımlarına hava boşluğu kazandırabilir.'
    },
    uses: { en: ['Rock gardens', 'Planter displays', 'Graded growing mixes'], ar: ['حدائق صخرية', 'تنسيق الأصص', 'خلطات زراعية متدرجة'], tr: ['Kaya bahçeleri', 'Saksı düzenlemeleri', 'Uygun boyutlu harçlar'] },
    note: {
      en: 'Confirm particle size for your growing mix. Pumice is not a fertiliser.',
      ar: 'تحقق من حجم الحبيبات المناسب لخلطة الزراعة. الخفاف ليس سماداً.',
      tr: 'Yetiştirme karışımınız için tane boyutunu doğrulayın. Pomza gübre değildir.'
    }
  },
  {
    id: 'lava', code: 'A-10', img: 'broken-lava.jpg', category: 'volcanic',
    prices: [230, null, null], sizes: '1–2 · 2–4 · 4–6 · 6–8 · 10–15–20',
    name: { en: 'Broken lava', ar: 'لافا مجروشة', tr: 'Kırık lav taşı' },
    desc: {
      en: 'Rough, porous lava adds a bold texture to outdoor spaces. Use as an ornamental mineral mulch in rock gardens, dry landscapes and planter displays.',
      ar: 'تضيف اللافا الخشنة والمسامية ملمساً بارزاً للمساحات الخارجية. تُستخدم كتغطية حجرية للزينة في الحدائق الصخرية والتنسيقات الجافة والأصص.',
      tr: 'Pürüzlü, gözenekli lav taşı dış mekânlara belirgin bir doku katar. Kaya bahçelerinde, kuru peyzajlarda ve saksı düzenlemelerinde dekoratif mineral malç olarak kullanılır.'
    },
    uses: { en: ['Rock gardens', 'Mineral mulch', 'Dry landscapes'], ar: ['حدائق صخرية', 'تغطية حجرية', 'تنسيق جاف'], tr: ['Kaya bahçeleri', 'Mineral malç', 'Kuru peyzaj'] },
    note: { en: '', ar: '', tr: '' }
  }
];
