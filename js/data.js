// ============================================================
// data.js — Все данные о продуктах, правилах и магазинах
// ============================================================

// --- УТРЕННИЕ ШАГИ ---
const morningSteps = [
  {num:1, label:{ru:'Умывание', en:'Cleansing'}, products:[
    {name:{ru:'Xpel Tea Tree Foaming Face Wash 200ml', en:'Xpel Tea Tree Foaming Face Wash 200ml'}, price:'€7', icon:'cleanser', rec:true,
      comment:{ru:'Ваша основная утренняя умывалка — пенка с чайным деревом и мятой, освежает и подходит для ежедневного использования', en:'Your main morning cleanser — a tea tree and mint foaming wash, refreshing and suitable for daily use'},
      skinType:{ru:'Жирная, комбинированная, склонная к акне', en:'Oily, combination, acne-prone'},
      ingredients:{ru:'Масло чайного дерева, мята, аллантоин', en:'Tea tree oil, mint, allantoin'},
      usage:{ru:'Нанести на влажную кожу, вспенить, смыть тёплой водой', en:'Apply to damp skin, lather, rinse with warm water'},
      shops:[{name:{ru:'ExpressChemist', en:'ExpressChemist'}, url:'https://www.expresschemist.co.uk/xpel-tea-tree-foaming-face-wash-200ml.html'},{name:{ru:'Amazon', en:'Amazon'}, url:'https://www.amazon.co.uk/TREE-FOAMING-200ml-HEALTHY-CLEAN/dp/B09DRWCVRN'}]},
    {name:{ru:'CeraVe Hydrating Cleanser 236ml', en:'CeraVe Hydrating Cleanser 236ml'}, price:'€14', icon:'cleanser',
      comment:{ru:'Не пенящийся, для сухой и чувствительной кожи — на случай, если захочется сменить формулу', en:'Non-foaming, for dry and sensitive skin — in case you want to switch formulas'},
      skinType:{ru:'Сухая, чувствительная, обезвоженная', en:'Dry, sensitive, dehydrated'},
      ingredients:{ru:'Керамиды, гиалуроновая кислота, ниацинамид', en:'Ceramides, hyaluronic acid, niacinamide'},
      usage:{ru:'Нанести на влажную кожу, мягко помассировать, смыть водой', en:'Apply to damp skin, gently massage, rinse with water'},
      shops:[{name:{ru:'Boots.ie', en:'Boots.ie'}, url:'https://www.boots.ie/cerave-hydrating-cleanser-236ml-10246701'},{name:{ru:'Аптеки', en:'Pharmacies'}, url:'https://www.mccauley.ie'}]},
    {name:{ru:'Round Lab 1025 Dokdo Cleanser 150ml', en:'Round Lab 1025 Dokdo Cleanser 150ml'}, price:'€17', icon:'cleanser',
      comment:{ru:'Мягкая пенка с аллантоином и пантенолом', en:'Gentle foam with allantoin and panthenol'},
      skinType:{ru:'Чувствительная, склонная к покраснениям', en:'Sensitive, redness-prone'},
      ingredients:{ru:'Аллантоин, пантенол, экстракт морской воды', en:'Allantoin, panthenol, seawater extract'},
      usage:{ru:'Вспенить в руках, нанести на влажное лицо, смыть', en:'Lather in hands, apply to damp face, rinse'},
      shops:[{name:{ru:'Skinshop.ie', en:'Skinshop.ie'}, url:'https://skinshop.ie/products/roundlab-1025-dokdo-cleanser-150ml'}]}
  ]},
  {num:2, label:{ru:'Тонер (успокаивающий)', en:'Toner (soothing)'}, products:[
    {name:{ru:'Etude House SoonJung pH 5.5 Relief Toner 200ml', en:'Etude House SoonJung pH 5.5 Relief Toner 200ml'}, price:'€24', icon:'toner', rec:true,
      comment:{ru:'Пантенол и мадекассозид. В официальных магазинах ЕС/Ирландии почти не продаётся — заказывают через Amazon или YesStyle, отсюда и наценка', en:'Panthenol and madecassoside. Barely sold in official EU/Ireland stores — usually ordered via Amazon or YesStyle, hence the markup'},
      skinType:{ru:'Чувствительная, раздражённая, склонная к покраснениям', en:'Sensitive, irritated, redness-prone'},
      ingredients:{ru:'Пантенол, мадекассозид, центелла азиатская', en:'Panthenol, madecassoside, Centella Asiatica'},
      usage:{ru:'Нанести на чистую кожу с помощью ватного диска или ладоней, дать впитаться', en:'Apply to clean skin with a cotton pad or palms, let absorb'},
      shops:[{name:{ru:'Amazon', en:'Amazon'}, url:'https://www.amazon.co.uk/Etude-House-Sensitive-Non-Comedogenic-Hypoallergenic/dp/B0921NXR2V'}]},
    {name:{ru:'Aveeno Calm + Restore Toning Lotion 200ml', en:'Aveeno Calm + Restore Toning Lotion 200ml'}, price:'€11', icon:'toner',
      comment:{ru:'С успокаивающим овсом и фиверфью', en:'With soothing oat and feverfew'},
      skinType:{ru:'Чувствительная, сухая, склонная к раздражению', en:'Sensitive, dry, irritation-prone'},
      ingredients:{ru:'Коллоидный овёс, экстракт фиверфью, пантенол', en:'Colloidal oatmeal, feverfew extract, panthenol'},
      usage:{ru:'Встряхнуть, нанести на чистую кожу ватным диском', en:'Shake well, apply to clean skin with a cotton pad'},
      shops:[{name:{ru:'Boots', en:'Boots'}, url:'https://www.boots.com/aveeno-face-calm-and-restore-toner-200ml-10300779'}]}
  ]},
  {num:3, label:{ru:'Актив — чередовать по дням', en:'Active — alternate by day'}, split:{
    a:{title:{ru:'День A · Витамин C', en:'Day A · Vitamin C'}, products:[
      {name:{ru:'Витамин C (любой ваш)', en:'Vitamin C (any of yours)'}, price:'—', icon:'citrus',
        comment:{ru:'Наносить на сухую кожу, дать впитаться 5 минут', en:'Apply to dry skin, let absorb for 5 minutes'},
        skinType:{ru:'Все типы, особенно тусклая и уставшая кожа', en:'All types, especially dull and tired skin'},
        ingredients:{ru:'L-аскорбиновая кислота, феруловая кислота, витамин E', en:'L-ascorbic acid, ferulic acid, vitamin E'},
        usage:{ru:'Нанести 2–3 капли на сухую кожу после тонера, подождать 5 минут перед следующим шагом', en:'Apply 2–3 drops to dry skin after toner, wait 5 minutes before next step'},
        shops:[]}
    ]},
    b:{title:{ru:'День Б · Азелаиновая кислота', en:'Day B · Azelaic Acid'}, products:[
      {name:{ru:'The Inkey List SuperSolutions 10% Azelaic Acid Serum 30ml', en:'The Inkey List SuperSolutions 10% Azelaic Acid Serum 30ml'}, price:'€19', icon:'acid', rec:true,
        comment:{ru:'Бренд обновил линейку и переименовал в SuperSolutions — состав тот же. Начинать через 2–3 недели после старта ретиналя', en:'The brand updated the line and renamed it SuperSolutions — same formula. Start 2–3 weeks after beginning retinal'},
        skinType:{ru:'Жирная, комбинированная, склонная к акне, с пигментацией', en:'Oily, combination, acne-prone, with hyperpigmentation'},
        ingredients:{ru:'Азелаиновая кислота 10%, экстракт корня солодки', en:'Azelaic acid 10%, licorice root extract'},
        usage:{ru:'Наносить на сухую кожу утром (в день Б) после тонера, перед SPF', en:'Apply to dry skin in the morning (on day B) after toner, before SPF'},
        shops:[{name:{ru:'Boots.ie', en:'Boots.ie'}, url:'https://www.boots.ie/supersolutions-10-azelaic-serum-10316417'}]},
      {name:{ru:'The Ordinary Azelaic Acid Suspension 10% 30ml', en:'The Ordinary Azelaic Acid Suspension 10% 30ml'}, price:'€13', icon:'acid',
        comment:{ru:'Бюджетный вариант', en:'Budget option'},
        skinType:{ru:'Жирная, комбинированная, с акне и постакне', en:'Oily, combination, with acne and post-acne marks'},
        ingredients:{ru:'Азелаиновая кислота 10%, диметикон', en:'Azelaic acid 10%, dimethicone'},
        usage:{ru:'Наносить тонким слоем на сухую кожу утром или вечером', en:'Apply a thin layer to dry skin in the morning or evening'},
        shops:[{name:{ru:'Boots.ie', en:'Boots.ie'}, url:'https://www.boots.ie/the-ordinary-azelaic-acid-supension-10-10267775'}]}
    ]}
  }},
  {num:4, label:{ru:'Увлажнение + SPF', en:'Moisturizer + SPF'}, products:[
    {name:{ru:'Beauty of Joseon Relief Sun: Aqua-fresh SPF50+ 50ml', en:'Beauty of Joseon Relief Sun: Aqua-fresh SPF50+ 50ml'}, price:'€19', icon:'spf', rec:true,
      comment:{ru:'Водный (aqua-fresh) вариант культового санскрина — ещё легче и свежее, не оставляет белых разводов, хорошо ведёт себя на жирной коже', en:'The water-based (aqua-fresh) version of the cult-favorite sunscreen — even lighter and fresher, no white cast, works well on oily skin'},
      skinType:{ru:'Все типы, особенно жирная и комбинированная', en:'All types, especially oily and combination'},
      ingredients:{ru:'Ниацинамид, пантенол, экстракт риса, SPF50+ PA++++', en:'Niacinamide, panthenol, rice extract, SPF50+ PA++++'},
      usage:{ru:'Наносить как финальный шаг утром, за 15–20 минут до выхода на солнце', en:'Apply as the final step in the morning, 15–20 minutes before sun exposure'},
      shops:[{name:{ru:'YesStyle', en:'YesStyle'}, url:'https://www.yesstyle.com/en/beauty-of-joseon/list.html/bpt.299_bid.320196'}]},
    {name:{ru:'La Roche-Posay Anthelios UVMune 400 Oil Control 50ml', en:'La Roche-Posay Anthelios UVMune 400 Oil Control 50ml'}, price:'€22', icon:'spf',
      comment:{ru:'Матирующий, для жирной и склонной к акне кожи, №1 у дерматологов', en:'Mattifying, for oily and acne-prone skin, #1 recommended by dermatologists'},
      skinType:{ru:'Жирная, комбинированная, акне-склонная', en:'Oily, combination, acne-prone'},
      ingredients:{ru:'Мексорил 400, ниацинамид, перлит (матирующий)', en:'Mexoryl 400, niacinamide, perlite (mattifying)'},
      usage:{ru:'Наносить за 20 минут до выхода на солнце, обновлять каждые 2 часа', en:'Apply 20 minutes before sun exposure, reapply every 2 hours'},
      shops:[{name:{ru:'Boots.ie', en:'Boots.ie'}, url:'https://www.boots.ie/la-roche-posay-anthelios-uvmune-400-oil-control-fluid-50ml-10324047'}]},
    {name:{ru:'CeraVe AM Facial Moisturising Lotion SPF30 52ml', en:'CeraVe AM Facial Moisturising Lotion SPF30 52ml'}, price:'€17', icon:'spf',
      comment:{ru:'Лёгкая, некомедогенная, с ниацинамидом и керамидами', en:'Lightweight, non-comedogenic, with niacinamide and ceramides'},
      skinType:{ru:'Нормальная, сухая, чувствительная', en:'Normal, dry, sensitive'},
      ingredients:{ru:'Керамиды, ниацинамид, гиалуроновая кислота, SPF30', en:'Ceramides, niacinamide, hyaluronic acid, SPF30'},
      usage:{ru:'Наносить утром как финальный шаг', en:'Apply in the morning as the final step'},
      shops:[{name:{ru:'Boots.ie', en:'Boots.ie'}, url:'https://www.boots.ie/cerave-am-facial-moisturising-lotion-spf30-52ml-10331199'},{name:{ru:'Аптеки', en:'Pharmacies'}, url:'https://www.mccauley.ie'}]},
    {name:{ru:'Elemis Pro-Collagen Marine Cream SPF30 50ml', en:'Elemis Pro-Collagen Marine Cream SPF30 50ml'}, price:'€89', icon:'spf', lux:true,
      comment:{ru:'Люкс-вариант: культовый увлажняющий гель-крем с SPF, если захочется побаловать себя', en:'Luxury option: a cult-favorite moisturizing gel-cream with SPF, for when you want to treat yourself'},
      skinType:{ru:'Все типы, особенно зрелая и увядающая кожа', en:'All types, especially mature and aging skin'},
      ingredients:{ru:'Морские водоросли, пептиды, SPF30', en:'Seaweed, peptides, SPF30'},
      usage:{ru:'Наносить утром на очищенную кожу', en:'Apply in the morning to cleansed skin'},
      shops:[{name:{ru:'Boots.ie', en:'Boots.ie'}, url:'https://www.boots.ie/elemis-pro-collagen-marine-cream-spf-30-50ml-10321076'}]}
  ]}
];

// --- ВЕЧЕРНИЕ ШАГИ ---
const eveningSteps = [
  {num:1, label:{ru:'Первое очищение (масло/бальзам)', en:'First cleanse (oil/balm)'}, products:[
    {name:{ru:'Purito Seoul From Green Cleansing Oil 200ml', en:'Purito Seoul From Green Cleansing Oil 200ml'}, price:'€18', icon:'oil', rec:true,
      comment:{ru:'Лёгкое, на 5 натуральных маслах, не забивает поры', en:'Lightweight, made with 5 natural oils, does not clog pores'},
      skinType:{ru:'Все типы, особенно жирная и комбинированная', en:'All types, especially oily and combination'},
      ingredients:{ru:'Масло жожоба, масло подсолнечника, масло виноградных косточек, масло авокадо, масло ши', en:'Jojoba oil, sunflower oil, grape seed oil, avocado oil, shea butter'},
      usage:{ru:'Нанести на сухую кожу, помассировать, добавить воды для эмульгации, смыть', en:'Apply to dry skin, massage, add water to emulsify, rinse'},
      shops:[{name:{ru:'Skinshop.ie', en:'Skinshop.ie'}, url:'https://skinshop.ie/products/purito-seoul-from-green-cleansing-oil-200ml'}]},
    {name:{ru:'Beauty of Joseon Radiance Cleansing Balm 100ml', en:'Beauty of Joseon Radiance Cleansing Balm 100ml'}, price:'€19', icon:'balm',
      comment:{ru:'Бальзам с рисом, успокаивает', en:'Rice balm, soothing'},
      skinType:{ru:'Сухая, чувствительная, склонная к раздражению', en:'Dry, sensitive, irritation-prone'},
      ingredients:{ru:'Масло рисовых отрубей, экстракт риса, центелла азиатская', en:'Rice bran oil, rice extract, Centella Asiatica'},
      usage:{ru:'Взять небольшое количество, растереть в руках, нанести на сухую кожу, смыть водой', en:'Take a small amount, warm in hands, apply to dry skin, rinse with water'},
      shops:[{name:{ru:'Skinshop.ie', en:'Skinshop.ie'}, url:'https://skinshop.ie/products/beauty-of-joseon-radiance'}]},
    {name:{ru:'Elemis Pro-Collagen Cleansing Balm 100g', en:'Elemis Pro-Collagen Cleansing Balm 100g'}, price:'€62', icon:'balm', lux:true,
      comment:{ru:'Люкс-вариант: бестселлер бренда, 3 текстуры в одной — бальзам, масло и молочко', en:"Luxury option: the brand's bestseller, 3 textures in one — balm, oil, and milk"},
      skinType:{ru:'Все типы, особенно зрелая и сухая', en:'All types, especially mature and dry'},
      ingredients:{ru:'Масла падок, лаванды, мимозы, экстракт морских водорослей', en:'Padina pavonica oil, lavender, mimosa, seaweed extract'},
      usage:{ru:'Нанести на сухую кожу, помассировать, смыть тёплой водой или влажной салфеткой', en:'Apply to dry skin, massage, rinse with warm water or a damp cloth'},
      shops:[{name:{ru:'Boots.ie', en:'Boots.ie'}, url:'https://www.boots.ie/elemis-pro-collagen-cleansing-balm-100g-10321086'}]}
  ]},
  {num:2, label:{ru:'Второе очищение', en:'Second cleanse'}, ref:{ru:'CeraVe Hydrating Cleanser или Round Lab Dokdo Cleanser — то же, что утром, шаг 1', en:'CeraVe Hydrating Cleanser or Round Lab Dokdo Cleanser — same as morning step 1'}, anchor:'#morning'},
  {num:3, label:{ru:'Тонер', en:'Toner'}, ref:{ru:'Etude House SoonJung Toner или Aveeno Calm + Restore — тот же, что утром, шаг 2', en:'Etude House SoonJung Toner or Aveeno Calm + Restore — same as morning step 2'}, anchor:'#morning'},
  {num:4, label:{ru:'Ретиналь', en:'Retinal'}, products:[
    {name:{ru:'Medik8 Crystal Retinal 3 30ml (start)', en:'Medik8 Crystal Retinal 3 30ml (start)'}, price:'€58', icon:'retinol',
      comment:{ru:'Только на сухую кожу! 2 раза/нед → каждый день. Цена выросла по сравнению с прошлой проверкой (было ~€50)', en:'Dry skin only! 2x/week → daily. Price has increased since last check (was ~€50)'},
      skinType:{ru:'Все типы, кроме очень чувствительной (начинать с осторожностью)', en:'All types except very sensitive (start with caution)'},
      ingredients:{ru:'Ретиналь (эквивалент 0.3% ретинола), гиалуроновая кислота', en:'Retinal (equivalent to 0.3% retinol), hyaluronic acid'},
      usage:{ru:'Наносить вечером на сухую кожу, избегая области вокруг глаз. Начинать с 2 раз в неделю, постепенно увеличивая частоту.', en:'Apply in the evening to dry skin, avoiding the eye area. Start with 2x per week, gradually increasing frequency.'},
      shops:[{name:{ru:'Lookfantastic', en:'Lookfantastic'}, url:'https://www.lookfantastic.com/p/medik8-crystal-retinal-3-serum-30ml/12097972/'}]},
    {name:{ru:'Medik8 Crystal Retinal 6 30ml (transition)', en:'Medik8 Crystal Retinal 6 30ml (transition)'}, price:'€65', icon:'retinol',
      comment:{ru:'После полного использования флакона 3', en:'After finishing bottle 3 completely'},
      skinType:{ru:'Адаптированная к ретинолу кожа (после 3–6 месяцев использования)', en:'Retinol-adapted skin (after 3–6 months of use)'},
      ingredients:{ru:'Ретиналь (эквивалент 0.6% ретинола), гиалуроновая кислота', en:'Retinal (equivalent to 0.6% retinol), hyaluronic acid'},
      usage:{ru:'Наносить вечером на сухую кожу. Можно использовать ежедневно, если кожа хорошо переносит.', en:'Apply in the evening to dry skin. Can be used daily if skin tolerates well.'},
      shops:[{name:{ru:'Medik8.ie', en:'Medik8.ie'}, url:'https://www.medik8.ie'}]}
  ]},
  {num:5, label:{ru:'Ночной крем', en:'Night cream'}, products:[
    {name:{ru:'La Roche-Posay Cicaplast Baume B5+ 40ml', en:'La Roche-Posay Cicaplast Baume B5+ 40ml'}, price:'€11', icon:'balm', rec:true,
      comment:{ru:'Тонким слоем поверх ретиналя. При сильном раздражении — толстым слоем вместо ретиналя. Цена оказалась ниже, чем было указано (было €16)', en:'A thin layer over retinal. If irritation is strong, use a thick layer instead of retinal. Price turned out lower than listed (was €16)'},
      skinType:{ru:'Сухая, чувствительная, раздражённая, с нарушенным барьером', en:'Dry, sensitive, irritated, with compromised barrier'},
      ingredients:{ru:'Пантенол 5%, мадекассозид, цинк, марганец, медь', en:'Panthenol 5%, madecassoside, zinc, manganese, copper'},
      usage:{ru:'Нанести тонким слоем на ночь поверх ретиналя. При сильном раздражении использовать толстым слоем как маску.', en:'Apply a thin layer at night over retinal. For severe irritation, use a thick layer as a mask.'},
      shops:[{name:{ru:'McCauley (pharmacy)', en:'McCauley (pharmacy)'}, url:'https://www.mccauley.ie/la-roche-posay-cicaplast-baume-b5-40ml'}]}
  ]}
];

// --- АПТЕЧКА ---
const kitGroups = [
  {key:'spot', title:{ru:'Точечно', en:'Spot treatment'}, sub:{ru:'На воспалённые прыщики', en:'For inflamed breakouts'},
    analysis:{ru:'Эти два средства не конкурируют, а работают в паре: <b>кислота снимает воспаление</b> изнутри, <b>пластырь вытягивает</b> содержимое снаружи — держите оба под рукой.', en:'These two products do not compete — they work together: the <b>acid reduces inflammation</b> from within, while the <b>patch draws out</b> the contents from outside — keep both on hand.'},
    products:[
    {name:{ru:'Азелаиновая кислота (та же, что утром)', en:'Azelaic acid (same as morning)'}, price:'€13–19', icon:'spot', rec:true,
      comment:{ru:'Точечно на воспалённые прыщики, утром', en:'Spot-apply to inflamed breakouts, in the morning'},
      skinType:{ru:'Жирная, комбинированная, акне-склонная', en:'Oily, combination, acne-prone'},
      ingredients:{ru:'Азелаиновая кислота 10%', en:'Azelaic acid 10%'},
      usage:{ru:'Наносить точечно на воспалённые элементы утром или вечером', en:'Apply spot-on to inflamed breakouts in the morning or evening'},
      shops:[{name:{ru:'Boots.ie', en:'Boots.ie'}, url:'https://www.boots.ie/supersolutions-10-azelaic-serum-10316417'}]},
    {name:{ru:'Hero Mighty Patch Original, 24 шт', en:'Hero Mighty Patch Original, 24 pcs'}, price:'€9', icon:'patch', rec:true,
      comment:{ru:'Гидроколлоидные пластыри на созревший прыщ на ночь — вытягивают содержимое', en:'Hydrocolloid patches for a ripe pimple overnight — draw out the contents'},
      skinType:{ru:'Все типы', en:'All types'},
      ingredients:{ru:'Гидроколлоидный полимер', en:'Hydrocolloid polymer'},
      usage:{ru:'Наклеить на чистую сухую кожу на созревший прыщ на 6–8 часов (лучше на ночь)', en:'Apply to clean, dry skin on a ripe pimple for 6–8 hours (best overnight)'},
      shops:[{name:{ru:'Boots.ie', en:'Boots.ie'}, url:'https://www.boots.ie/hero-mighty-patches-original-24-10334405'}]}
  ]},
  {key:'mask', title:{ru:'Маски', en:'Masks'}, sub:{ru:'Баночные маски для контроля жирности, пор и восстановления барьера', en:'Jar masks for oil control, pores, and barrier repair'},
    analysis:{ru:'Оставили две непересекающиеся баночные маски: <b>Caudalie Instant Detox Mask</b> — глиняная маска для жирной кожи, и <b>Dr Organic Skin Calm</b> — бюджетный крем-вариант для восстановления барьера.', en:'Kept two non-overlapping jar masks: <b>Caudalie Instant Detox Mask</b> — a clay mask for oily skin, and <b>Dr Organic Skin Calm</b> — a budget cream option for barrier repair.'},
    products:[
    {name:{ru:'Caudalie Instant Detox Mask 75ml', en:'Caudalie Instant Detox Mask 75ml'}, price:'€30', icon:'mask', rec:true,
      comment:{ru:'Розовая глина, кофе и виноградные косточки — вытягивает себум, сужает поры', en:'Pink clay, coffee, and grape seeds — draws out sebum, tightens pores'},
      skinType:{ru:'Жирная, комбинированная, с расширенными порами', en:'Oily, combination, with enlarged pores'},
      ingredients:{ru:'Розовая глина, кофеин, экстракт виноградных косточек', en:'Pink clay, caffeine, grape seed extract'},
      usage:{ru:'Нанести тонким слоем на чистую кожу, оставить на 10 минут, смыть тёплой водой. Использовать 1–2 раза в неделю.', en:'Apply a thin layer to clean skin, leave for 10 minutes, rinse with warm water. Use 1–2 times per week.'},
      shops:[{name:{ru:'Lookfantastic', en:'Lookfantastic'}, url:'https://www.lookfantastic.com/p/caudalie-instant-detox-mask-75ml/15065645/'}]},
    {name:{ru:'Dr Organic Skin Calm Probiotic Recovery Mask 100ml', en:'Dr Organic Skin Calm Probiotic Recovery Mask 100ml'}, price:'€14', icon:'mask', rec:true,
      comment:{ru:'Бюджетный крем-вариант, восстанавливает барьер при раздражении', en:'Budget cream option, repairs the barrier during irritation'},
      skinType:{ru:'Сухая, чувствительная, раздражённая', en:'Dry, sensitive, irritated'},
      ingredients:{ru:'Пробиотики, пребиотики, экстракт центеллы, масло ши', en:'Probiotics, prebiotics, Centella extract, shea butter'},
      usage:{ru:'Нанести на чистую кожу тонким слоем, оставить на 10–15 минут, остатки втереть или смыть. Использовать при раздражении.', en:'Apply a thin layer to clean skin, leave for 10–15 minutes, massage in excess or rinse. Use when irritated.'},
      shops:[{name:{ru:'Holland & Barrett', en:'Holland & Barrett'}, url:'https://www.hollandandbarrett.ie/shop/product/dr-organic-skin-calm-probiotic-recovery-mask-100ml-6100004549'}]}
  ]},
  {key:'scrub', title:{ru:'Отшелушивание', en:'Exfoliation'}, sub:{ru:'Не чаще раза в неделю, только в вечера без ретиналя', en:'No more than once a week, only on evenings without retinal'},
    analysis:{ru:'Убрали кислоты, оставили мягкий PHA-гель и физический скраб.', en:'Removed acids, kept gentle PHA gel and a physical scrub.'},
    products:[
    {name:{ru:'COSRX Low pH Good Night Soft Peeling Gel 120ml', en:'COSRX Low pH Good Night Soft Peeling Gel 120ml'}, price:'€18', icon:'scrub', rec:true,
      comment:{ru:'Гель-пилинг на PHA (лактобионовая кислота) — мягкое отшелушивание, безопасно рядом с ретиналем', en:'PHA gel peel (lactobionic acid) — gentle exfoliation, safe alongside retinal'},
      skinType:{ru:'Чувствительная, сухая, склонная к раздражению', en:'Sensitive, dry, irritation-prone'},
      ingredients:{ru:'Лактобионовая кислота (PHA), экстракт центеллы, гиалуроновая кислота', en:'Lactobionic acid (PHA), Centella extract, hyaluronic acid'},
      usage:{ru:'Нанести на чистую сухую кожу, помассировать, оставить на 1–2 минуты, смыть. Использовать вечером без ретиналя.', en:'Apply to clean dry skin, massage, leave for 1–2 minutes, rinse. Use on evenings without retinal.'},
      shops:[{name:{ru:'YesStyle', en:'YesStyle'}, url:'https://www.yesstyle.com/en/cosrx-low-ph-good-night-soft-peeling-gel-120ml/info.html/pid.1102258127'}]},
    {name:{ru:'Nuxe Very Rose Radiance Face Scrub 75ml', en:'Nuxe Very Rose Radiance Face Scrub 75ml'}, price:'€19', icon:'scrub', rec:true,
      comment:{ru:'Физический скраб, 98% натуральных ингредиентов, без кислот', en:'Physical scrub, 98% natural ingredients, no acids'},
      skinType:{ru:'Все типы, кроме очень чувствительной', en:'All types except very sensitive'},
      ingredients:{ru:'Частицы розы, экстракт розы, масло ши, миндальное масло', en:'Rose particles, rose extract, shea butter, almond oil'},
      usage:{ru:'Нанести на влажную кожу, мягко помассировать круговыми движениями, смыть. Использовать 1 раз в неделю вечером без ретиналя.', en:'Apply to damp skin, gently massage in circular motions, rinse. Use once a week on evenings without retinal.'},
      shops:[{name:{ru:'Next', en:'Next'}, url:'https://www.next.co.uk/style/su637978/f46344'},{name:{ru:'Boots.ie', en:'Boots.ie'}, url:'https://www.boots.com/nuxe-very-rose-radiance-face-scrub-75ml-10362245'}]}
  ]}
];

// --- ПРАВИЛА ---
const rules = [
  {text:{ru:'Ретиналь — только на сухую кожу вечером. Не на влажную!', en:'Retinal — only on dry skin, in the evening. Not on damp skin!'}, caution:true},
  {text:{ru:'Cicaplast наносите после ретиналя тонким слоем. При сильном раздражении — толстым слоем, но тогда без ретиналя в этот вечер.', en:'Apply Cicaplast after retinal in a thin layer. If irritation is severe, use a thick layer instead — but skip retinal that evening.'}, caution:true},
  {text:{ru:'Утром чередуйте витамин C и азелаин по дням — не вместе. Наносить на сухую кожу после тонера.', en:'In the morning, alternate vitamin C and azelaic acid by day — not together. Apply to dry skin after toner.'}, caution:false},
  {text:{ru:'SPF 50 обязателен каждое утро, даже в пасмурную погоду.', en:'SPF 50 is mandatory every morning, even on cloudy days.'}, caution:true},
  {text:{ru:'Никаких AHA/BHA кислот (гликолевая, молочная, салициловая), пока вы на ретинале — повышают риск раздражения.', en:'No AHA/BHA acids (glycolic, lactic, salicylic) while using retinal — they increase the risk of irritation.'}, caution:true},
  {text:{ru:'Увлажняющую маску или скраб — только в вечера без ретиналя.', en:'Use a hydrating mask or scrub only on evenings without retinal.'}, caution:false},
  {text:{ru:'Ввод ретиналя: первые 2 недели — 2 раза в неделю, затем через ночь, с 5-й недели — каждый день (если нет сильного раздражения).', en:'Introducing retinal: first 2 weeks — 2x/week, then every other night, from week 5 — daily (if there is no strong irritation).'}, caution:false},
  {text:{ru:'Переход с Medik8 Crystal Retinal 3 на 6 — после полного использования флакона 3. Начинать 6 сразу ежедневно можно, кожа уже адаптирована.', en:'Switching from Medik8 Crystal Retinal 3 to 6 — after finishing bottle 3 completely. You can start using 6 daily right away since your skin is already adapted.'}, caution:false}
];

// --- МАГАЗИНЫ ---
const shopsInfo = [
  {name:{ru:'Boots.ie', en:'Boots.ie'}, url:'https://www.boots.ie', items:{ru:'CeraVe, La Roche-Posay, Elemis, Aveeno, The Ordinary, The Inkey List, гидроколлоидные пластыри', en:'CeraVe, La Roche-Posay, Elemis, Aveeno, The Ordinary, The Inkey List, hydrocolloid patches'}},
  {name:{ru:'Skinshop.ie', en:'Skinshop.ie'}, url:'https://skinshop.ie', items:{ru:'Purito, Beauty of Joseon, COSRX, Round Lab', en:'Purito, Beauty of Joseon, COSRX, Round Lab'}},
  {name:{ru:'Amazon.co.uk', en:'Amazon.co.uk'}, url:'https://www.amazon.co.uk', items:{ru:'Xpel, Etude House SoonJung и почти все позиции из списка — удобно заказывать всё сразу', en:'Xpel, Etude House SoonJung, and almost everything else on this list — convenient to order it all at once'}},
  {name:{ru:'ExpressChemist', en:'ExpressChemist'}, url:'https://www.expresschemist.co.uk', items:{ru:'Xpel Tea Tree Foaming Face Wash', en:'Xpel Tea Tree Foaming Face Wash'}},
  {name:{ru:'Аптеки (McCauley, Allcare, Chemco)', en:'Pharmacies (McCauley, Allcare, Chemco)'}, url:'https://www.mccauley.ie', items:{ru:'Cicaplast B5+, CeraVe, La Roche-Posay', en:'Cicaplast B5+, CeraVe, La Roche-Posay'}},
  {name:{ru:'Next', en:'Next'}, url:'https://www.next.co.uk', items:{ru:'NUXE Very Rose', en:'NUXE Very Rose'}},
  {name:{ru:'Holland & Barrett', en:'Holland & Barrett'}, url:'https://www.hollandandbarrett.ie', items:{ru:'Маска Dr Organic Skin Calm', en:'Dr Organic Skin Calm mask'}},
  {name:{ru:'Lookfantastic', en:'Lookfantastic'}, url:'https://www.lookfantastic.com', items:{ru:'Medik8, Caudalie, Elemis', en:'Medik8, Caudalie, Elemis'}},
  {name:{ru:'YesStyle', en:'YesStyle'}, url:'https://www.yesstyle.com', items:{ru:'COSRX Low pH Good Night Soft Peeling Gel', en:'COSRX Low pH Good Night Soft Peeling Gel'}},
  {name:{ru:'Medik8.ie', en:'Medik8.ie'}, url:'https://www.medik8.ie', items:{ru:'Medik8 Crystal Retinal', en:'Medik8 Crystal Retinal'}}
];