// Existing TIME GLOBAL list prices, preserved exactly; null means no published price.
// Colours describe the catalogue appearance and do not certify mineral composition.
window.STONE_PRODUCTS = [
  {
    id: 'white', code: 'A-01', img: 'assets/images/white-pebbles.jpeg', category: 'decorative',
    prices: [116, 136, 168], sizes: '1–2 · 2–4 · 4–6 · 6–8 · 10–15–20',
    name: { en: 'White pebbles', ar: 'حصى أبيض', tr: 'Beyaz çakıl' },
    desc: {
      en: 'Bright white pebbles that stand out next to greenery and dark surfaces. Use them in decorative beds, along garden borders or on top of planters.',
      ar: 'حصى أبيض يبرز بجانب النباتات والأسطح الداكنة. استخدمه لتزيين الأحواض وتحديد حواف الحديقة وتغطية سطح الأصص.',
      tr: 'Yeşil bitkiler ve koyu yüzeyler yanında öne çıkan beyaz çakıllar. Dekoratif tarhlarda, bahçe kenarlarında ve saksı üstlerinde kullanabilirsiniz.'
    },
    uses: { en: ['Garden borders', 'Decorative beds', 'Planter tops'], ar: ['حدود الحدائق', 'أحواض الزينة', 'سطح الأصص'], tr: ['Bahçe bordürleri', 'Dekoratif tarhlar', 'Saksı üstleri'] },
    note: { en: '', ar: '', tr: '' }
  },
  {
    id: 'black', code: 'A-02', img: 'assets/images/black-pebbles.jpeg', category: 'decorative',
    prices: [136, 157, 178], sizes: '1–2 · 2–4 · 4–6 · 6–8 · 10–15–20',
    name: { en: 'Black pebbles', ar: 'حصى أسود', tr: 'Siyah çakıl' },
    desc: {
      en: 'A dark contrast for green plants and light paving. Use these pebbles as decorative ground cover, around borders or in modern planters.',
      ar: 'حصى داكن يبرز جمال النباتات والأرضيات الفاتحة. يناسب تغطية الأرض للزينة وتحديد الأحواض وتنسيق الأصص العصرية.',
      tr: 'Yeşil bitkiler ve açık renkli döşemelerle güzel bir kontrast oluşturur. Dekoratif zemin kaplamasında, bahçe kenarlarında ve modern saksılarda kullanabilirsiniz.'
    },
    uses: { en: ['Modern gardens', 'Border accents', 'Planter tops'], ar: ['حدائق عصرية', 'تحديد الأحواض', 'سطح الأصص'], tr: ['Modern bahçeler', 'Bordür detayları', 'Saksı üstleri'] },
    note: { en: '', ar: '', tr: '' }
  },
  {
    id: 'maroon', code: 'A-03', img: 'assets/images/maroon-pebbles.jpeg', category: 'decorative',
    prices: [136, 157, 178], sizes: '1–2 · 2–4 · 4–6 · 6–8 · 10–15–20',
    name: { en: 'Maroon pebbles', ar: 'حصى عنابي', tr: 'Bordo çakıl' },
    desc: {
      en: 'Warm burgundy pebbles for a splash of colour around your plants. Try them in decorative beds, contrasting borders or small courtyard areas.',
      ar: 'حصى عنابي دافئ يضيف لوناً جميلاً حول النباتات. جرّبه في أحواض الزينة أو لتحديد الحواف بلون مختلف أو لتزيين الفناء.',
      tr: 'Bitkilerin çevresine sıcak bir renk katan bordo çakıllar. Dekoratif tarhlarda, farklı renkte bahçe kenarlarında ya da avlu detaylarında deneyebilirsiniz.'
    },
    uses: { en: ['Colour accents', 'Garden borders', 'Courtyard beds'], ar: ['لمسات لونية', 'حدود الحدائق', 'أحواض الأفنية'], tr: ['Renk vurguları', 'Bahçe bordürleri', 'Avlu tarhları'] },
    note: { en: '', ar: '', tr: '' }
  },
  {
    id: 'granite', code: 'A-04', img: 'assets/images/granite.jpeg', category: 'natural',
    prices: [157, 178, 200], sizes: '1–2 · 2–4 · 4–6 · 6–8 · 10–15–20',
    name: { en: 'Granite', ar: 'جرانيت', tr: 'Granit' },
    desc: {
      en: 'A speckled stone with a textured, natural look. Use it in rock gardens, decorative beds or along the edges of paved paths.',
      ar: 'حجر منقّط بملمس ومظهر طبيعيين. استخدمه في الحدائق الصخرية وأحواض الزينة أو على جوانب الممرات المرصوفة.',
      tr: 'Benekli ve dokulu yüzeyiyle doğal bir görünüm verir. Kaya bahçelerinde, dekoratif tarhlarda veya döşeli yolların kenarlarında kullanabilirsiniz.'
    },
    uses: { en: ['Rock gardens', 'Ornamental beds', 'Path edging'], ar: ['حدائق صخرية', 'أحواض الزينة', 'حواف الممرات'], tr: ['Kaya bahçeleri', 'Dekoratif tarhlar', 'Yol kenarları'] },
    note: { en: '', ar: '', tr: '' }
  },
  {
    id: 'rainbow', code: 'A-05', img: 'assets/images/rainbow-pebbles.jpeg', category: 'decorative',
    prices: [210, 231, 252], sizes: '1–2 · 2–4 · 4–6 · 6–8 · 10–15–20',
    name: { en: 'Rainbow pebbles', ar: 'حصى متعدد الألوان', tr: 'Gökkuşağı çakılı' },
    desc: {
      en: 'A mix of colours for a livelier garden detail. Arrange them in decorative patterns, use them along borders or add them to your favourite planters.',
      ar: 'مزيج من الألوان يضيف حيوية للحديقة. رتّبه بأشكال زخرفية أو استخدمه لتلوين الحواف وتزيين الأصص.',
      tr: 'Bahçeye renk katmak için çok renkli çakıllar. Dekoratif desenler oluşturabilir, bahçe kenarlarını belirleyebilir veya saksılarınızı süsleyebilirsiniz.'
    },
    uses: { en: ['Decorative patterns', 'Colourful borders', 'Planter displays'], ar: ['أشكال زخرفية', 'حواف ملونة', 'تزيين الأصص'], tr: ['Dekoratif desenler', 'Renkli bordürler', 'Saksı süslemeleri'] },
    note: { en: '', ar: '', tr: '' }
  },
  {
    id: 'green', code: 'A-06', img: 'assets/images/green-pebbles.jpeg', category: 'decorative',
    prices: [210, 231, 252], sizes: '1–2 · 2–4 · 4–6 · 6–8 · 10–15–20',
    name: { en: 'Green pebbles', ar: 'حصى أخضر', tr: 'Yeşil çakıl' },
    desc: {
      en: 'Green pebbles that sit comfortably alongside your plants. Use them around garden borders, in decorative beds or as a top layer in planters.',
      ar: 'حصى أخضر ينسجم مع النباتات حوله. يناسب حواف الحديقة وأحواض الزينة، ويمكن استخدامه لتغطية سطح الأصص.',
      tr: 'Bitkilerle uyum sağlayan yeşil çakıllar. Bahçe kenarlarında, dekoratif tarhlarda veya saksılarda üst kaplama olarak kullanabilirsiniz.'
    },
    uses: { en: ['Garden borders', 'Decorative beds', 'Planter tops'], ar: ['حدود الحدائق', 'أحواض الزينة', 'سطح الأصص'], tr: ['Bahçe bordürleri', 'Dekoratif tarhlar', 'Saksı üstleri'] },
    note: { en: '', ar: '', tr: '' }
  },
  {
    id: 'basalt', code: 'A-07', img: 'assets/images/basalt.jpeg', category: 'natural',
    prices: [126, 147, 168], sizes: '1–2 · 2–4 · 4–6 · 6–8 · 10–15–20',
    name: { en: 'Basalt', ar: 'بازلت', tr: 'Bazalt' },
    desc: {
      en: 'Dark volcanic stone with a simple, natural look. Try it in rock gardens, as decorative ground cover or along garden borders.',
      ar: 'حجر بركاني داكن بمظهر طبيعي وبسيط. جرّبه في الحدائق الصخرية أو لتغطية الأرض للزينة أو تحديد حواف الأحواض.',
      tr: 'Sade, doğal görünümlü koyu renkli volkanik taş. Kaya bahçelerinde, dekoratif zemin kaplamasında veya bahçe kenarlarında kullanabilirsiniz.'
    },
    uses: { en: ['Rock gardens', 'Ground cover', 'Border detailing'], ar: ['حدائق صخرية', 'تغطية أرضية', 'تحديد الأحواض'], tr: ['Kaya bahçeleri', 'Zemin kaplaması', 'Bordür detayları'] },
    note: { en: '', ar: '', tr: '' }
  },
  {
    id: 'river', code: 'A-08', img: 'assets/images/river-pebbles.jpeg', category: 'natural',
    prices: [84, 105, 136], sizes: '1–2 · 2–4 · 4–6 · 6–8 · 10–15–20',
    name: { en: 'River pebbles', ar: 'حصى نهري', tr: 'Dere çakılı' },
    desc: {
      en: 'Rounded pebbles in mixed tones for a relaxed, natural look. Use them in dry stream designs, decorative beds or around planted areas.',
      ar: 'حصى مستدير بدرجات متنوعة ومظهر طبيعي هادئ. استخدمه لتنسيق المجاري الجافة أو في أحواض الزينة أو حول المساحات المزروعة.',
      tr: 'Farklı tonlardaki yuvarlak çakıllar doğal ve sakin bir görünüm verir. Kuru dere tasarımlarında, dekoratif tarhlarda veya bitkili alanların çevresinde kullanabilirsiniz.'
    },
    uses: { en: ['Dry stream features', 'Decorative beds', 'Garden edging'], ar: ['مجاري جافة للزينة', 'أحواض الزينة', 'حواف الحدائق'], tr: ['Kuru dere tasarımı', 'Dekoratif tarhlar', 'Bahçe kenarları'] },
    note: {
      en: 'Loose, rounded pebbles can shift underfoot. Walking areas need a suitable surface and installation.',
      ar: 'قد يتحرك الحصى المستدير تحت الأقدام. تحتاج مناطق المشي إلى سطح وطريقة تنفيذ مناسبين.',
      tr: 'Gevşek yuvarlak çakıllar ayak altında kayabilir. Yürüme alanlarında uygun bir yüzey ve uygulama gerekir.'
    }
  },
  {
    id: 'pumice', code: 'A-09', img: 'assets/images/pumice.jpg', category: 'volcanic',
    prices: [63, 95, null], sizes: '1–2',
    name: { en: 'Pumice', ar: 'حجر الخفاف (بومزا)', tr: 'Pomza taşı' },
    desc: {
      en: 'Light, porous volcanic stone for rock gardens and planters. When the particle size suits the mix, pumice can also add air space to potting mixes.',
      ar: 'حجر بركاني خفيف ومسامي للحدائق الصخرية والأصص. ويمكن إضافته لخلطات الزراعة لزيادة الفراغات الهوائية، بشرط اختيار حجم الحبيبات المناسب للخلطة.',
      tr: 'Kaya bahçeleri ve saksılar için hafif, gözenekli volkanik taş. Karışıma uygun tane boyutu seçildiğinde saksı harcındaki hava boşluklarını artırabilir.'
    },
    uses: { en: ['Rock gardens', 'Planters', 'Suitable potting mixes'], ar: ['حدائق صخرية', 'أصص', 'خلطات زراعة مناسبة'], tr: ['Kaya bahçeleri', 'Saksılar', 'Uygun saksı harçları'] },
    note: {
      en: 'Check that the particle size suits your potting mix. Pumice is not a fertiliser.',
      ar: 'تأكد أن حجم الحبيبات يناسب خلطة الزراعة لديك. الخفاف ليس سماداً.',
      tr: 'Tane boyutunun saksı harcınıza uygun olduğundan emin olun. Pomza gübre değildir.'
    }
  },
  {
    id: 'lava', code: 'A-10', img: 'assets/images/broken-lava.jpeg', category: 'volcanic',
    prices: [230, null, null], sizes: '1–2 · 2–4 · 4–6 · 6–8 · 10–15–20',
    name: { en: 'Broken lava', ar: 'لافا مجروشة', tr: 'Kırık lav taşı' },
    desc: {
      en: 'Rough, porous pieces of lava for a different garden texture. Use as decorative stone mulch in rock gardens, dry landscapes or planters.',
      ar: 'قطع لافا خشنة ومسامية تضيف ملمساً مختلفاً للحديقة. استخدمها كتغطية حجرية للزينة في الحدائق الصخرية والتنسيقات الجافة أو الأصص.',
      tr: 'Bahçenize farklı bir doku katan pürüzlü, gözenekli lav parçaları. Kaya bahçelerinde, kuru peyzajlarda veya saksılarda dekoratif taş malç olarak kullanabilirsiniz.'
    },
    uses: { en: ['Rock gardens', 'Mineral mulch', 'Dry landscapes'], ar: ['حدائق صخرية', 'تغطية حجرية', 'تنسيق جاف'], tr: ['Kaya bahçeleri', 'Mineral malç', 'Kuru peyzaj'] },
    note: { en: '', ar: '', tr: '' }
  }
];
