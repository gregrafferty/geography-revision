/*
 * Revision topics.
 *
 * To add a new topic, push another object onto TOPICS with the same shape:
 *   id        unique id (used to store progress)
 *   title     shown on the home screen
 *   emoji     icon for the home screen
 *   forward   question template; {q} = item.q, {a} = item.a (an item's own `ask` wins)
 *   reverse   optional reverse question template; leave out to hide reverse mode
 *   fact      optional template shown after answering (an item's own `fact` wins)
 *   flashHint / flashBack   optional flashcard wording
 *   mcHint / reverseHint    optional subtitles for the mode buttons
 *   groups    optional filter chips: { id: label }; defaultOff lists chips that start off;
 *             groupsLabel is the heading shown above them
 *   regions   optional second set of filter chips (e.g. continents), matched against item.region;
 *             regionsLabel is the heading (default "Continents")
 *   items     { q, a, alt?: [accepted alternative answers], ask?, fact?, flag?, group?, region?,
 *               kind? (multiple-choice wrong answers come only from items of the same kind),
 *               choices? (fixed wrong answers for multiple choice, used instead of other items) }
 *             q must be unique within a topic: progress is stored against it.
 */
window.TOPICS = [
  {
    id: "europe-capitals",
    title: "European capital cities",
    emoji: "🏛️",
    forward: "What is the capital of {q}?",
    reverse: "{a} is the capital of which country?",
    fact: "{a} is the capital of {q}.",
    flashHint: "What's the capital?",
    flashBack: "The capital of {q} is",
    mcHint: "Pick the capital from four options",
    reverseHint: "Given the capital, pick the country",
    defaultOff: ["uk"],
    groups: {
      north: "Northern",
      west: "Western",
      south: "Southern",
      east: "Eastern",
      small: "Microstates",
      uk: "UK nations"
    },
    items: [
      // Northern Europe
      { q: "Iceland", a: "Reykjavík", alt: ["Reykjavik"], flag: "🇮🇸", group: "north" },
      { q: "Norway", a: "Oslo", flag: "🇳🇴", group: "north" },
      { q: "Sweden", a: "Stockholm", flag: "🇸🇪", group: "north" },
      { q: "Finland", a: "Helsinki", flag: "🇫🇮", group: "north" },
      { q: "Denmark", a: "Copenhagen", flag: "🇩🇰", group: "north" },
      { q: "Estonia", a: "Tallinn", flag: "🇪🇪", group: "north" },
      { q: "Latvia", a: "Riga", flag: "🇱🇻", group: "north" },
      { q: "Lithuania", a: "Vilnius", flag: "🇱🇹", group: "north" },

      // Western Europe
      { q: "United Kingdom", a: "London", qAlt: ["UK"], flag: "🇬🇧", group: "west" },
      { q: "Ireland", a: "Dublin", flag: "🇮🇪", group: "west" },
      { q: "France", a: "Paris", flag: "🇫🇷", group: "west" },
      { q: "Belgium", a: "Brussels", flag: "🇧🇪", group: "west" },
      { q: "Netherlands", a: "Amsterdam", flag: "🇳🇱", group: "west" },
      { q: "Luxembourg", a: "Luxembourg", alt: ["Luxembourg City"], flag: "🇱🇺", group: "west" },
      { q: "Germany", a: "Berlin", flag: "🇩🇪", group: "west" },
      { q: "Switzerland", a: "Bern", alt: ["Berne"], flag: "🇨🇭", group: "west" },
      { q: "Austria", a: "Vienna", flag: "🇦🇹", group: "west" },

      // Southern Europe
      { q: "Portugal", a: "Lisbon", flag: "🇵🇹", group: "south" },
      { q: "Spain", a: "Madrid", flag: "🇪🇸", group: "south" },
      { q: "Italy", a: "Rome", flag: "🇮🇹", group: "south" },
      { q: "Malta", a: "Valletta", flag: "🇲🇹", group: "south" },
      { q: "Greece", a: "Athens", flag: "🇬🇷", group: "south" },
      { q: "Cyprus", a: "Nicosia", flag: "🇨🇾", group: "south" },
      { q: "Slovenia", a: "Ljubljana", flag: "🇸🇮", group: "south" },
      { q: "Croatia", a: "Zagreb", flag: "🇭🇷", group: "south" },
      { q: "Bosnia and Herzegovina", a: "Sarajevo", qAlt: ["Bosnia"], flag: "🇧🇦", group: "south" },
      { q: "Serbia", a: "Belgrade", flag: "🇷🇸", group: "south" },
      { q: "Montenegro", a: "Podgorica", flag: "🇲🇪", group: "south" },
      { q: "Kosovo", a: "Pristina", alt: ["Prishtina", "Priština"], flag: "🇽🇰", group: "south" },
      { q: "Albania", a: "Tirana", alt: ["Tiranë"], flag: "🇦🇱", group: "south" },
      { q: "North Macedonia", a: "Skopje", qAlt: ["Macedonia"], flag: "🇲🇰", group: "south" },

      // Eastern Europe
      { q: "Poland", a: "Warsaw", flag: "🇵🇱", group: "east" },
      { q: "Czechia", a: "Prague", qAlt: ["Czech Republic"], flag: "🇨🇿", group: "east" },
      { q: "Slovakia", a: "Bratislava", flag: "🇸🇰", group: "east" },
      { q: "Hungary", a: "Budapest", flag: "🇭🇺", group: "east" },
      { q: "Romania", a: "Bucharest", flag: "🇷🇴", group: "east" },
      { q: "Bulgaria", a: "Sofia", flag: "🇧🇬", group: "east" },
      { q: "Moldova", a: "Chișinău", alt: ["Chisinau", "Kishinev"], flag: "🇲🇩", group: "east" },
      { q: "Ukraine", a: "Kyiv", alt: ["Kiev"], flag: "🇺🇦", group: "east" },
      { q: "Belarus", a: "Minsk", flag: "🇧🇾", group: "east" },
      { q: "Russia", a: "Moscow", flag: "🇷🇺", group: "east" },

      // Microstates
      { q: "Andorra", a: "Andorra la Vella", flag: "🇦🇩", group: "small" },
      { q: "Monaco", a: "Monaco", flag: "🇲🇨", group: "small" },
      { q: "Liechtenstein", a: "Vaduz", flag: "🇱🇮", group: "small" },
      { q: "San Marino", a: "San Marino", alt: ["City of San Marino"], flag: "🇸🇲", group: "small" },
      { q: "Vatican City", a: "Vatican City", qAlt: ["Vatican", "Holy See"], flag: "🇻🇦", group: "small" },

      // UK nations
      { q: "England", a: "London", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "uk" },
      { q: "Scotland", a: "Edinburgh", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", group: "uk" },
      { q: "Wales", a: "Cardiff", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", group: "uk" },
      { q: "Northern Ireland", a: "Belfast", flag: "🇬🇧", group: "uk" }
    ]
  },

  {
    id: "world-rivers-mountains",
    title: "World rivers & mountains",
    emoji: "🏔️",
    forward: "{q}?",
    mcHint: "Pick the right river or mountain from four options",
    groupsLabel: "Topics to include",
    regions: {
      europe: "Europe",
      asia: "Asia",
      africa: "Africa",
      "north-america": "North America",
      "south-america": "South America",
      oceania: "Oceania",
      antarctica: "Antarctica"
    },
    groups: {
      rivers: "World rivers",
      ranges: "Mountain ranges",
      peaks: "Highest peaks",
      uk: "UK rivers & mountains"
    },
    items: [
      // World rivers
      { q: "Longest river in the world", ask: "What is the longest river in the world?", a: "Nile", kind: "river", region: "africa", group: "rivers",
        fact: "The Nile is about 6,650 km long. It flows north through East Africa and Egypt into the Mediterranean Sea." },
      { q: "River carrying the most water", ask: "Which river carries more water than any other?", a: "Amazon", kind: "river", region: "south-america", group: "rivers",
        fact: "The Amazon flows across South America (Peru, Colombia, Brazil) into the Atlantic Ocean. At about 6,400 km it is the second longest river." },
      { q: "Longest river in Asia", ask: "What is the longest river in Asia?", a: "Yangtze", alt: ["Yangtse", "Chang Jiang"], kind: "river", region: "asia", group: "rivers",
        fact: "The Yangtze (about 6,300 km) flows across China into the East China Sea at Shanghai. It has the Three Gorges Dam, the world's biggest hydroelectric power station." },
      { q: "Longest river in Europe", ask: "What is the longest river in Europe?", a: "Volga", kind: "river", region: "europe", group: "rivers",
        fact: "The Volga (about 3,530 km) flows through Russia into the Caspian Sea." },
      { q: "Longest river in Australia", ask: "What is the longest river in Australia?", a: "Murray", kind: "river", region: "oceania", group: "rivers",
        fact: "The Murray (about 2,500 km) flows through south-east Australia into the Southern Ocean." },
      { q: "River through New Orleans", ask: "Which major US river flows south through New Orleans into the Gulf of Mexico?", a: "Mississippi", kind: "river", region: "north-america", group: "rivers",
        fact: "The Mississippi (about 3,730 km) drains much of the central USA. With its tributary the Missouri, it forms one of the world's longest river systems." },
      { q: "River through Paris", ask: "Which river flows through Paris?", a: "Seine", kind: "river", region: "europe", group: "rivers",
        fact: "The Seine flows through Paris into the English Channel." },
      { q: "River through Vienna, Budapest and Belgrade", ask: "Which river flows through Vienna, Budapest and Belgrade?", a: "Danube", kind: "river", region: "europe", group: "rivers",
        fact: "The Danube flows through ten countries, more than any other river, into the Black Sea." },
      { q: "River through Cologne to Rotterdam", ask: "Which river flows from the Swiss Alps through Germany to the North Sea at Rotterdam?", a: "Rhine", kind: "river", region: "europe", group: "rivers",
        fact: "The Rhine is one of Europe's busiest rivers for shipping." },
      { q: "Sacred river of India", ask: "Which river, sacred to Hindus, flows through Varanasi in India?", a: "Ganges", alt: ["Ganga"], kind: "river", region: "asia", group: "rivers",
        fact: "The Ganges flows from the Himalayas across India and Bangladesh into the Bay of Bengal." },
      { q: "River with Victoria Falls", ask: "Victoria Falls is on which African river?", a: "Zambezi", alt: ["Zambesi"], kind: "river", region: "africa", group: "rivers",
        fact: "The Zambezi forms the border between Zambia and Zimbabwe and flows into the Indian Ocean." },
      { q: "River on the USA–Mexico border", ask: "Which river forms much of the border between the USA and Mexico?", a: "Rio Grande", kind: "river", region: "north-america", group: "rivers",
        fact: "The Rio Grande flows into the Gulf of Mexico." },
      { q: "River through Baghdad", ask: "Which river flows through Baghdad in Iraq?", a: "Tigris", kind: "river", region: "asia", group: "rivers",
        fact: "The Tigris and the Euphrates surround Mesopotamia, where some of the earliest cities grew." },
      { q: "Longest river in West Africa", ask: "Which is the longest river in West Africa?", a: "Niger", kind: "river", region: "africa", group: "rivers",
        fact: "The Niger flows in a big curve through Mali and Niger to Nigeria, into the Gulf of Guinea." },
      { q: "Deepest river in the world", ask: "Which river in central Africa is the deepest in the world?", a: "Congo", kind: "river", region: "africa", group: "rivers",
        fact: "The Congo is over 220 m deep in places and carries the second-largest amount of water after the Amazon." },

      // Mountain ranges
      { q: "Range containing Mount Everest", ask: "Which mountain range contains Mount Everest?", a: "Himalayas", alt: ["Himalaya", "Himalayan"], kind: "range", region: "asia", group: "ranges",
        fact: "The Himalayas are in Asia (Nepal, India, Bhutan, China, Pakistan). They are still growing as the Indian plate pushes into the Eurasian plate." },
      { q: "Range along western South America", ask: "Which mountain range runs down the west side of South America?", a: "Andes", kind: "range", region: "south-america", group: "ranges",
        fact: "The Andes are the longest mountain range on land, about 7,000 km." },
      { q: "Range in western North America", ask: "Which mountain range runs through western Canada and the USA?", a: "Rocky Mountains", alt: ["Rockies"], kind: "range", region: "north-america", group: "ranges",
        fact: "The Rockies stretch about 4,800 km from Canada to New Mexico." },
      { q: "Range containing Mont Blanc", ask: "Which mountain range in Europe contains Mont Blanc and the Matterhorn?", a: "Alps", kind: "range", region: "europe", group: "ranges",
        fact: "The Alps cross France, Switzerland, Italy, Austria, Germany, Slovenia, Liechtenstein and Monaco." },
      { q: "Range between France and Spain", ask: "Which mountain range forms the border between France and Spain?", a: "Pyrenees", kind: "range", region: "europe", group: "ranges",
        fact: "The tiny country of Andorra sits in the Pyrenees." },
      { q: "Range dividing Europe and Asia", ask: "Which mountain range in Russia is seen as the boundary between Europe and Asia?", a: "Ural Mountains", alt: ["Urals", "Ural"], kind: "range", region: "europe", group: "ranges",
        fact: "The Urals run about 2,500 km north to south through western Russia." },
      { q: "Range in north-west Africa", ask: "Which mountain range is in Morocco, Algeria and Tunisia?", a: "Atlas Mountains", alt: ["Atlas"], kind: "range", region: "africa", group: "ranges",
        fact: "The Atlas Mountains separate the Mediterranean coast from the Sahara Desert." },
      { q: "Range along eastern USA", ask: "Which old, worn-down mountain range runs along the eastern USA?", a: "Appalachian Mountains", alt: ["Appalachians", "Appalachian"], kind: "range", region: "north-america", group: "ranges",
        fact: "The Appalachians are hundreds of millions of years old, much older than the Rockies." },
      { q: "Range forming the spine of Italy", ask: "Which mountain range runs down the length of Italy?", a: "Apennines", alt: ["Apennine"], kind: "range", region: "europe", group: "ranges",
        fact: "The Apennines are about 1,200 km long." },
      { q: "Range between the Black and Caspian seas", ask: "Which mountain range lies between the Black Sea and the Caspian Sea?", a: "Caucasus", alt: ["Caucasus Mountains"], kind: "range", region: "europe", group: "ranges",
        fact: "Mount Elbrus, the highest mountain in Europe, is in the Caucasus." },
      { q: "Range along eastern Australia", ask: "Which mountain range runs along the east coast of Australia?", a: "Great Dividing Range", kind: "range", region: "oceania", group: "ranges",
        fact: "The Great Dividing Range is over 3,500 km long." },

      // Highest peaks
      { q: "Highest mountain in the world", ask: "What is the highest mountain in the world?", a: "Mount Everest", alt: ["Everest"], kind: "peak", region: "asia", group: "peaks",
        fact: "Everest is 8,849 m high, on the border of Nepal and China (Tibet), in the Himalayas." },
      { q: "Second highest mountain in the world", ask: "What is the second highest mountain in the world?", a: "K2", kind: "peak", region: "asia", group: "peaks",
        fact: "K2 is 8,611 m high, on the border of Pakistan and China." },
      { q: "Highest mountain in Africa", ask: "What is the highest mountain in Africa?", a: "Kilimanjaro", alt: ["Mount Kilimanjaro"], kind: "peak", region: "africa", group: "peaks",
        fact: "Kilimanjaro is 5,895 m high, in Tanzania. It is a dormant volcano." },
      { q: "Highest mountain in South America", ask: "What is the highest mountain in South America?", a: "Aconcagua", kind: "peak", region: "south-america", group: "peaks",
        fact: "Aconcagua is 6,961 m high, in Argentina, in the Andes." },
      { q: "Highest mountain in North America", ask: "What is the highest mountain in North America?", a: "Denali", alt: ["Mount McKinley", "McKinley"], kind: "peak", region: "north-america", group: "peaks",
        fact: "Denali is 6,190 m high, in Alaska, USA." },
      { q: "Highest mountain in Europe", ask: "What is the highest mountain in Europe?", a: "Mount Elbrus", alt: ["Elbrus"], kind: "peak", region: "europe", group: "peaks",
        fact: "Elbrus is 5,642 m high, in Russia's Caucasus Mountains. Mont Blanc is the highest in western Europe." },
      { q: "Highest mountain in the Alps", ask: "What is the highest mountain in the Alps?", a: "Mont Blanc", kind: "peak", region: "europe", group: "peaks",
        fact: "Mont Blanc is about 4,806 m high, on the border of France and Italy." },
      { q: "Highest mountain in Australia", ask: "What is the highest mountain in mainland Australia?", a: "Mount Kosciuszko", alt: ["Kosciuszko", "Kosciusko"], kind: "peak", region: "oceania", group: "peaks",
        fact: "Mount Kosciuszko is 2,228 m high, in the Great Dividing Range." },
      { q: "Highest mountain in Antarctica", ask: "What is the highest mountain in Antarctica?", a: "Vinson Massif", alt: ["Mount Vinson", "Vinson"], kind: "peak", region: "antarctica", group: "peaks",
        fact: "Vinson Massif is 4,892 m high." },
      { q: "Highest mountain in Japan", ask: "Which volcano is the highest mountain in Japan?", a: "Mount Fuji", alt: ["Fuji", "Fujiyama", "Fuji-san"], kind: "peak", region: "asia", group: "peaks",
        fact: "Mount Fuji is 3,776 m high, on the island of Honshu." },

      // UK rivers & mountains
      { q: "Longest river in the UK", ask: "What is the longest river in the UK?", a: "Severn", alt: ["River Severn"], kind: "river", region: "europe", group: "uk",
        fact: "The Severn (about 354 km) rises in Wales and flows into the Bristol Channel." },
      { q: "River through London", ask: "Which river flows through London?", a: "Thames", alt: ["River Thames"], kind: "river", region: "europe", group: "uk",
        fact: "The Thames (about 346 km) is the longest river entirely in England. It flows into the North Sea." },
      { q: "Longest river in Scotland", ask: "What is the longest river in Scotland?", a: "Tay", alt: ["River Tay"], kind: "river", region: "europe", group: "uk",
        fact: "The Tay (about 190 km) flows through Perth into the North Sea." },
      { q: "Longest river in Northern Ireland", ask: "What is the longest river in Northern Ireland?", a: "Bann", alt: ["River Bann"], kind: "river", region: "europe", group: "uk",
        fact: "The Bann flows through Lough Neagh, the UK's largest lake." },
      { q: "Highest mountain in the UK", ask: "What is the highest mountain in the UK?", a: "Ben Nevis", kind: "peak", region: "europe", group: "uk",
        fact: "Ben Nevis is 1,345 m high, near Fort William in the Scottish Highlands." },
      { q: "Highest mountain in England", ask: "What is the highest mountain in England?", a: "Scafell Pike", kind: "peak", region: "europe", group: "uk",
        fact: "Scafell Pike is 978 m high, in the Lake District." },
      { q: "Highest mountain in Wales", ask: "What is the highest mountain in Wales?", a: "Snowdon", alt: ["Yr Wyddfa"], kind: "peak", region: "europe", group: "uk",
        fact: "Snowdon (Yr Wyddfa) is 1,085 m high, in Snowdonia (Eryri)." },
      { q: "Highest mountain in Northern Ireland", ask: "What is the highest mountain in Northern Ireland?", a: "Slieve Donard", kind: "peak", region: "europe", group: "uk",
        fact: "Slieve Donard is 850 m high, in the Mourne Mountains." },
      { q: "The backbone of England", ask: "Which range of hills is known as the 'backbone of England'?", a: "Pennines", alt: ["Pennine"], kind: "range", region: "europe", group: "uk",
        fact: "The Pennines run from the Peak District up to the Scottish border." },
      { q: "Range containing Ben Nevis", ask: "Which mountain range in Scotland contains Ben Nevis?", a: "Grampian Mountains", alt: ["Grampians", "Grampian"], kind: "range", region: "europe", group: "uk",
        fact: "The Grampians cover much of the Scottish Highlands." }
    ]
  },

  {
    id: "oceans-continents",
    title: "Oceans & continents",
    emoji: "🌍",
    forward: "{q}?",
    mcHint: "Pick the right answer from four options",
    groupsLabel: "Topics to include",
    groups: {
      continents: "Continents",
      countries: "Which continent?",
      oceans: "Oceans",
      seas: "Seas",
      lines: "Lines on the globe"
    },
    items: [
      // Continents
      { q: "Number of continents", ask: "How many continents are there?", a: "7", alt: ["seven"], choices: ["5", "6", "8"], kind: "number", group: "continents",
        fact: "The seven continents are Africa, Antarctica, Asia, Europe, North America, Oceania (Australia) and South America." },
      { q: "Largest continent", ask: "What is the largest continent?", a: "Asia", kind: "continent", group: "continents",
        fact: "Asia covers about 30% of the world's land." },
      { q: "Continent with the most people", ask: "Which continent has the most people?", a: "Asia", kind: "continent", group: "continents",
        fact: "About 6 in every 10 people in the world live in Asia. China and India each have over 1.4 billion people." },
      { q: "Second largest continent", ask: "What is the second largest continent?", a: "Africa", kind: "continent", group: "continents",
        fact: "Africa covers about 20% of the world's land." },
      { q: "Continent with the most countries", ask: "Which continent has the most countries?", a: "Africa", kind: "continent", group: "continents",
        fact: "Africa has 54 countries." },
      { q: "Smallest continent", ask: "What is the smallest continent?", a: "Oceania", alt: ["Australia", "Australasia"], kind: "continent", group: "continents",
        fact: "Oceania is made up of Australia, New Zealand, Papua New Guinea and many Pacific islands. Europe is the second smallest." },
      { q: "Coldest continent", ask: "Which is the coldest, windiest and driest continent?", a: "Antarctica", kind: "continent", group: "continents",
        fact: "Antarctica is a cold desert with no permanent population. The lowest temperature ever recorded there was −89.2°C." },
      { q: "Continent with the Sahara", ask: "Which continent is the Sahara Desert in?", a: "Africa", kind: "continent", group: "continents",
        fact: "The Sahara is the world's largest hot desert, about the size of the USA." },
      { q: "Continent with the Amazon rainforest", ask: "Which continent is the Amazon rainforest in?", a: "South America", kind: "continent", group: "continents",
        fact: "The Amazon is the world's largest tropical rainforest. Most of it is in Brazil." },

      // Which continent is this country in?
      { q: "Egypt", ask: "Which continent is Egypt in?", a: "Africa", flag: "🇪🇬", kind: "continent", group: "countries" },
      { q: "Kenya", ask: "Which continent is Kenya in?", a: "Africa", flag: "🇰🇪", kind: "continent", group: "countries" },
      { q: "Nigeria", ask: "Which continent is Nigeria in?", a: "Africa", flag: "🇳🇬", kind: "continent", group: "countries" },
      { q: "India", ask: "Which continent is India in?", a: "Asia", flag: "🇮🇳", kind: "continent", group: "countries" },
      { q: "Japan", ask: "Which continent is Japan in?", a: "Asia", flag: "🇯🇵", kind: "continent", group: "countries" },
      { q: "Saudi Arabia", ask: "Which continent is Saudi Arabia in?", a: "Asia", flag: "🇸🇦", kind: "continent", group: "countries",
        fact: "Saudi Arabia is in the Middle East, which is part of Asia." },
      { q: "Mexico", ask: "Which continent is Mexico in?", a: "North America", flag: "🇲🇽", kind: "continent", group: "countries",
        fact: "Mexico is in North America, not South America." },
      { q: "Canada", ask: "Which continent is Canada in?", a: "North America", flag: "🇨🇦", kind: "continent", group: "countries" },
      { q: "Jamaica", ask: "Which continent is Jamaica in?", a: "North America", flag: "🇯🇲", kind: "continent", group: "countries",
        fact: "Caribbean islands such as Jamaica count as part of North America." },
      { q: "Argentina", ask: "Which continent is Argentina in?", a: "South America", flag: "🇦🇷", kind: "continent", group: "countries" },
      { q: "Peru", ask: "Which continent is Peru in?", a: "South America", flag: "🇵🇪", kind: "continent", group: "countries" },
      { q: "New Zealand", ask: "Which continent is New Zealand in?", a: "Oceania", alt: ["Australia", "Australasia"], flag: "🇳🇿", kind: "continent", group: "countries" },
      { q: "Fiji", ask: "Which continent is Fiji in?", a: "Oceania", alt: ["Australia", "Australasia"], flag: "🇫🇯", kind: "continent", group: "countries" },
      { q: "Iceland", ask: "Which continent is Iceland in?", a: "Europe", flag: "🇮🇸", kind: "continent", group: "countries" },

      // Oceans
      { q: "Number of oceans", ask: "How many oceans are there?", a: "5", alt: ["five"], choices: ["3", "4", "7"], kind: "number", group: "oceans",
        fact: "The five oceans are the Pacific, Atlantic, Indian, Southern and Arctic." },
      { q: "Share of Earth covered by ocean", ask: "Roughly what percentage of the Earth's surface is covered by ocean?", a: "71%", alt: ["71", "70%", "70"], choices: ["31%", "51%", "91%"], kind: "number", group: "oceans",
        fact: "About 71% of the Earth's surface is ocean." },
      { q: "Largest ocean", ask: "What is the largest and deepest ocean?", a: "Pacific Ocean", alt: ["Pacific"], kind: "ocean", group: "oceans",
        fact: "The Pacific is bigger than all the land on Earth put together. Its Mariana Trench is about 11,000 m deep, the deepest point in any ocean." },
      { q: "Second largest ocean", ask: "What is the second largest ocean?", a: "Atlantic Ocean", alt: ["Atlantic"], kind: "ocean", group: "oceans",
        fact: "The Atlantic lies between the Americas and Europe and Africa." },
      { q: "Ocean between the UK and North America", ask: "Which ocean do you cross flying from the UK to the USA?", a: "Atlantic Ocean", alt: ["Atlantic"], kind: "ocean", group: "oceans",
        fact: "The Titanic sank in the North Atlantic in 1912." },
      { q: "Ocean south of India", ask: "Which ocean lies between Africa and Australia, south of India?", a: "Indian Ocean", alt: ["Indian"], kind: "ocean", group: "oceans",
        fact: "The Indian Ocean is the third largest and the warmest ocean." },
      { q: "Ocean around Antarctica", ask: "Which ocean surrounds Antarctica?", a: "Southern Ocean", alt: ["Southern", "Antarctic Ocean"], kind: "ocean", group: "oceans",
        fact: "The Southern Ocean is the fourth largest. It was officially recognised as an ocean more recently than the others." },
      { q: "Smallest ocean", ask: "What is the smallest and shallowest ocean, around the North Pole?", a: "Arctic Ocean", alt: ["Arctic"], kind: "ocean", group: "oceans",
        fact: "Much of the Arctic Ocean is covered in sea ice, which is shrinking as the climate warms." },
      { q: "Ocean ringed by volcanoes", ask: "The 'Ring of Fire' of volcanoes and earthquakes surrounds which ocean?", a: "Pacific Ocean", alt: ["Pacific"], kind: "ocean", group: "oceans",
        fact: "About three-quarters of the world's active volcanoes are on the Ring of Fire." },

      // Seas
      { q: "Sea between Europe and Africa", ask: "Which sea lies between southern Europe and North Africa?", a: "Mediterranean Sea", alt: ["Mediterranean"], kind: "sea", group: "seas",
        fact: "The Mediterranean joins the Atlantic at the narrow Strait of Gibraltar." },
      { q: "Sea between the UK and Norway", ask: "Which sea lies between the east coast of Britain and Norway?", a: "North Sea", kind: "sea", group: "seas",
        fact: "The North Sea has oil and gas fields and many offshore wind farms." },
      { q: "Sea between Britain and Ireland", ask: "Which sea lies between Great Britain and Ireland?", a: "Irish Sea", kind: "sea", group: "seas" },
      { q: "Sea between Africa and Arabia", ask: "Which sea lies between north-east Africa and the Arabian Peninsula?", a: "Red Sea", kind: "sea", group: "seas",
        fact: "The Suez Canal links the Red Sea to the Mediterranean." },
      { q: "Sea north of Turkey", ask: "Which sea lies north of Turkey, with Ukraine on its northern coast?", a: "Black Sea", kind: "sea", group: "seas",
        fact: "The River Danube flows into the Black Sea." },
      { q: "Largest lake in the world", ask: "Which 'sea' between Europe and Asia is actually the largest lake in the world?", a: "Caspian Sea", alt: ["Caspian"], kind: "sea", group: "seas",
        fact: "The Caspian Sea is surrounded by land on all sides. The River Volga flows into it." },
      { q: "Sea with Jamaica and Cuba", ask: "Which sea are Jamaica and Cuba in?", a: "Caribbean Sea", alt: ["Caribbean"], kind: "sea", group: "seas" },
      { q: "Lowest point on land", ask: "Which salty lake between Israel and Jordan is the lowest point on land?", a: "Dead Sea", kind: "sea", group: "seas",
        fact: "The shore of the Dead Sea is about 430 m below sea level. It is so salty that people float easily." },

      // Lines on the globe
      { q: "Line at 0° latitude", ask: "What is the imaginary line at 0° latitude, halfway between the North and South Poles?", a: "Equator", kind: "line", group: "lines",
        fact: "The Equator splits the Earth into the Northern and Southern Hemispheres." },
      { q: "Line at 23.5° north", ask: "What is the line of latitude at about 23.5° north?", a: "Tropic of Cancer", kind: "line", group: "lines",
        fact: "The Tropic of Cancer passes through Mexico, the Sahara, India and China." },
      { q: "Line at 23.5° south", ask: "What is the line of latitude at about 23.5° south?", a: "Tropic of Capricorn", kind: "line", group: "lines",
        fact: "The Tropic of Capricorn passes through Brazil, southern Africa and Australia." },
      { q: "Line at 66.5° north", ask: "What is the line of latitude at about 66.5° north?", a: "Arctic Circle", kind: "line", group: "lines",
        fact: "North of the Arctic Circle the sun doesn't set on midsummer's day or rise on midwinter's day." },
      { q: "Line at 66.5° south", ask: "What is the line of latitude at about 66.5° south?", a: "Antarctic Circle", kind: "line", group: "lines" },
      { q: "Line at 0° longitude", ask: "What is the line of 0° longitude that runs through Greenwich in London?", a: "Prime Meridian", alt: ["Greenwich Meridian", "Meridian"], kind: "line", group: "lines",
        fact: "Lines of longitude run from pole to pole and measure how far east or west a place is." },
      { q: "Line at 180° longitude", ask: "Which line, roughly at 180° longitude in the Pacific, marks where the date changes?", a: "International Date Line", alt: ["Date Line"], kind: "line", group: "lines" }
    ]
  },

  {
    id: "climate-types",
    title: "Climate types",
    emoji: "🌦️",
    forward: "{q}?",
    mcHint: "Pick the right answer from four options",
    groupsLabel: "Topics to include",
    groups: {
      describe: "Name the climate",
      places: "Climates around the world",
      factors: "What affects climate",
      rain: "Types of rainfall",
      uk: "UK weather & climate"
    },
    items: [
      // Name the climate from its description
      { q: "Hot and wet all year", ask: "Which climate is hot (about 27°C) and wet all year, with heavy rain most afternoons?", a: "Tropical rainforest", alt: ["Rainforest", "Equatorial", "Tropical"], kind: "climate", group: "describe",
        fact: "Tropical rainforests are near the Equator. They have the greatest biodiversity of any biome: about half of all species on land." },
      { q: "Very dry, hot days and cold nights", ask: "Which climate has less than 250 mm of rain a year, very hot days and cold nights?", a: "Hot desert", alt: ["Desert", "Arid"], kind: "climate", group: "describe",
        fact: "Hot deserts are found around the Tropics of Cancer and Capricorn, where sinking air brings clear skies." },
      { q: "Wet season and long dry season", ask: "Which climate is hot all year with a wet season and a long dry season, and has grassland with scattered trees?", a: "Savanna", alt: ["Savannah", "Tropical grassland"], kind: "climate", group: "describe",
        fact: "Savanna is found between the tropical rainforests and the hot deserts, for example in East Africa." },
      { q: "Hot dry summers, mild wet winters", ask: "Which climate has hot, dry summers and mild, wet winters?", a: "Mediterranean", kind: "climate", group: "describe",
        fact: "As well as around the Mediterranean Sea, it is found in California, central Chile, South Africa's Cape and south-west Australia." },
      { q: "Mild with rain all year", ask: "Which climate has mild summers, cool winters and rain spread throughout the year?", a: "Temperate maritime", alt: ["Temperate", "Maritime", "Cool temperate", "Oceanic"], kind: "climate", group: "describe",
        fact: "'Maritime' means affected by the sea, which keeps temperatures mild all year." },
      { q: "Hot summers, very cold winters, far from sea", ask: "Which climate has hot summers, very cold winters and little rain because it is far from the sea?", a: "Continental", alt: ["Temperate continental", "Cold continental"], kind: "climate", group: "describe",
        fact: "Continental climates are found in the middle of large continents, such as central Russia and the Canadian prairies." },
      { q: "Wet season from changing winds", ask: "Which climate has a very wet season caused by winds changing direction, as in India and Bangladesh?", a: "Monsoon", alt: ["Tropical monsoon"], kind: "climate", group: "describe",
        fact: "In summer, monsoon winds blow in from the warm ocean, bringing very heavy rain." },
      { q: "Cold forests of conifers", ask: "Which cold climate has long, freezing winters, short summers and huge coniferous forests?", a: "Taiga", alt: ["Boreal", "Boreal forest", "Coniferous forest"], kind: "climate", group: "describe",
        fact: "The taiga is the largest land biome. It stretches across Canada, Scandinavia and Russia." },
      { q: "Frozen ground, no trees", ask: "Which climate has frozen ground (permafrost), a short cool summer and no trees?", a: "Tundra", kind: "climate", group: "describe",
        fact: "Only mosses, lichens, grasses and small shrubs can grow in the tundra." },
      { q: "Ice all year", ask: "Which climate is extremely cold all year, with ice sheets and very little precipitation?", a: "Polar", alt: ["Ice cap", "Polar ice cap"], kind: "climate", group: "describe",
        fact: "Polar climates cover Antarctica and most of Greenland." },
      { q: "Colder with height", ask: "Which climate gets colder and wetter the higher you go, with snow on the peaks?", a: "Mountain", alt: ["Alpine", "Highland"], kind: "climate", group: "describe",
        fact: "Even near the Equator, high mountains such as Kilimanjaro have snow on top." },

      // Climates around the world
      { q: "Amazon and Congo basins", ask: "What climate do the Amazon Basin and the Congo Basin have?", a: "Tropical rainforest", alt: ["Rainforest", "Equatorial", "Tropical"], kind: "climate", group: "places" },
      { q: "Sahara and Cairo", ask: "What climate do the Sahara and Cairo in Egypt have?", a: "Hot desert", alt: ["Desert", "Arid"], kind: "climate", group: "places" },
      { q: "Serengeti", ask: "What climate does the Serengeti in Tanzania have?", a: "Savanna", alt: ["Savannah", "Tropical grassland"], kind: "climate", group: "places",
        fact: "The Serengeti is famous for the yearly migration of wildebeest, following the rains." },
      { q: "Southern Spain and Greece", ask: "What climate do southern Spain and Greece have?", a: "Mediterranean", kind: "climate", group: "places" },
      { q: "The UK", ask: "What type of climate does the UK have?", a: "Temperate maritime", alt: ["Temperate", "Maritime", "Cool temperate", "Oceanic"], kind: "climate", group: "places" },
      { q: "Mumbai", ask: "What climate does Mumbai in India have?", a: "Monsoon", alt: ["Tropical monsoon"], kind: "climate", group: "places" },
      { q: "Siberia and northern Canada's forests", ask: "What climate do the forests of Siberia and northern Canada have?", a: "Taiga", alt: ["Boreal", "Boreal forest", "Coniferous forest"], kind: "climate", group: "places" },
      { q: "Northern Alaska", ask: "What climate does northern Alaska, near the Arctic Ocean, have?", a: "Tundra", kind: "climate", group: "places" },
      { q: "Antarctica", ask: "What climate does Antarctica have?", a: "Polar", alt: ["Ice cap", "Polar ice cap"], kind: "climate", group: "places" },
      { q: "Biome with most species", ask: "Which biome has the greatest biodiversity (the most kinds of plants and animals)?", a: "Tropical rainforest", alt: ["Rainforest"], kind: "climate", group: "places" },

      // What affects climate
      { q: "Colder away from the Equator", ask: "Places get colder the further they are from the Equator. Which factor is this?", a: "Latitude", kind: "factor", group: "factors",
        fact: "Near the Equator the sun's rays are concentrated on a small area. Near the poles the same energy is spread over a bigger area." },
      { q: "Colder the higher you go", ask: "Temperature falls by about 6.5°C for every 1,000 m you climb. Which factor is this?", a: "Altitude", alt: ["Height", "Elevation", "Relief"], kind: "factor", group: "factors" },
      { q: "Milder near the coast", ask: "Coastal places have milder winters and cooler summers than places inland. Which factor is this?", a: "Distance from the sea", alt: ["Distance from sea", "Continentality"], kind: "factor", group: "factors",
        fact: "The sea heats up and cools down more slowly than the land." },
      { q: "Warm water moving around the world", ask: "Warm or cold water moving around the oceans changes the temperature of nearby land. Which factor is this?", a: "Ocean currents", alt: ["Currents", "Ocean current"], kind: "factor", group: "factors" },
      { q: "Usual direction of the wind", ask: "What do we call the direction the wind blows from most often?", a: "Prevailing wind", alt: ["Prevailing winds"], kind: "factor", group: "factors",
        fact: "In the UK, the prevailing wind is from the south-west." },

      // Types of rainfall
      { q: "Rain over mountains", ask: "What type of rainfall forms when moist air is forced to rise over mountains?", a: "Relief rainfall", alt: ["Relief", "Orographic rainfall", "Orographic"], kind: "rain", group: "rain",
        fact: "This is why the mountains of western Britain are so wet." },
      { q: "Rain from the sun heating the ground", ask: "What type of rainfall forms when the sun heats the ground and warm air rises quickly, common in the tropics?", a: "Convectional rainfall", alt: ["Convectional", "Convection rainfall"], kind: "rain", group: "rain",
        fact: "It often brings afternoon thunderstorms in tropical rainforests." },
      { q: "Rain where warm air meets cold air", ask: "What type of rainfall forms when warm air meets cold air and is forced to rise over it?", a: "Frontal rainfall", alt: ["Frontal", "Cyclonic rainfall"], kind: "rain", group: "rain",
        fact: "Most of the UK's rain is frontal rainfall, brought by depressions from the Atlantic." },
      { q: "Dry side of a mountain", ask: "What is the drier area on the sheltered side of mountains called?", a: "Rain shadow", kind: "rain", group: "rain",
        fact: "The air loses most of its moisture as it rises over the mountains, then warms as it sinks down the other side." },

      // UK weather & climate
      { q: "Climate versus weather", ask: "Climate is the average weather over roughly how many years?", a: "30", alt: ["30 years", "thirty"], choices: ["1", "5", "100"], kind: "number", group: "uk",
        fact: "Weather is the day-to-day state of the atmosphere. Climate is the average pattern over about 30 years." },
      { q: "UK prevailing wind", ask: "Which direction does the UK's prevailing wind come from?", a: "South-west", alt: ["Southwest", "SW"], choices: ["North-east", "South-east", "North-west"], kind: "direction", group: "uk",
        fact: "South-westerly winds bring mild, moist air from the Atlantic." },
      { q: "Wettest side of the UK", ask: "Which side of the UK gets the most rain?", a: "West", alt: ["The west"], choices: ["East", "North", "South"], kind: "direction", group: "uk",
        fact: "Moist air from the Atlantic rises over the western mountains (relief rainfall). The east is in a rain shadow." },
      { q: "Warmest part of the UK in summer", ask: "Which part of the UK is usually warmest in summer?", a: "South-east", alt: ["Southeast", "SE"], choices: ["North-west", "North-east", "South-west"], kind: "direction", group: "uk",
        fact: "The south-east is furthest south (latitude) and closest to mainland Europe, which heats up in summer." },
      { q: "Current keeping the UK mild", ask: "Which warm ocean current keeps the UK's winters mild?", a: "North Atlantic Drift", alt: ["Gulf Stream"], choices: ["Labrador Current", "Canary Current", "Humboldt Current"], kind: "current", group: "uk",
        fact: "The North Atlantic Drift carries warm water from the Gulf of Mexico. Without it, UK winters would be much colder." },
      { q: "High pressure weather", ask: "What is an area of high pressure, bringing dry and settled weather, called?", a: "Anticyclone", choices: ["Depression", "Front", "Monsoon"], kind: "pressure", group: "uk",
        fact: "Anticyclones bring hot sunny days in summer, and cold, frosty or foggy weather in winter." },
      { q: "Low pressure weather", ask: "What is an area of low pressure, bringing wind, cloud and rain, called?", a: "Depression", alt: ["Low", "Cyclone"], choices: ["Anticyclone", "Front", "Jet stream"], kind: "pressure", group: "uk",
        fact: "Depressions come in from the Atlantic and bring most of the UK's rain." }
    ]
  }
];
