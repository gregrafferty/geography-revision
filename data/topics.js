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
 *   groups    optional filter chips: { id: label }; defaultOff lists chips that start off
 *   items     { q, a, alt?: [accepted alternative answers], ask?, fact?, flag?, group?,
 *               kind? (multiple-choice wrong answers come only from items of the same kind) }
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
    groups: {
      rivers: "World rivers",
      ranges: "Mountain ranges",
      peaks: "Highest peaks",
      uk: "UK rivers & mountains"
    },
    items: [
      // World rivers
      { q: "Longest river in the world", ask: "What is the longest river in the world?", a: "Nile", kind: "river", group: "rivers",
        fact: "The Nile is about 6,650 km long. It flows north through East Africa and Egypt into the Mediterranean Sea." },
      { q: "River carrying the most water", ask: "Which river carries more water than any other?", a: "Amazon", kind: "river", group: "rivers",
        fact: "The Amazon flows across South America (Peru, Colombia, Brazil) into the Atlantic Ocean. At about 6,400 km it is the second longest river." },
      { q: "Longest river in Asia", ask: "What is the longest river in Asia?", a: "Yangtze", alt: ["Yangtse", "Chang Jiang"], kind: "river", group: "rivers",
        fact: "The Yangtze (about 6,300 km) flows across China into the East China Sea at Shanghai. It has the Three Gorges Dam, the world's biggest hydroelectric power station." },
      { q: "Longest river in Europe", ask: "What is the longest river in Europe?", a: "Volga", kind: "river", group: "rivers",
        fact: "The Volga (about 3,530 km) flows through Russia into the Caspian Sea." },
      { q: "Longest river in Australia", ask: "What is the longest river in Australia?", a: "Murray", kind: "river", group: "rivers",
        fact: "The Murray (about 2,500 km) flows through south-east Australia into the Southern Ocean." },
      { q: "River through New Orleans", ask: "Which major US river flows south through New Orleans into the Gulf of Mexico?", a: "Mississippi", kind: "river", group: "rivers",
        fact: "The Mississippi (about 3,730 km) drains much of the central USA. With its tributary the Missouri, it forms one of the world's longest river systems." },
      { q: "River through Paris", ask: "Which river flows through Paris?", a: "Seine", kind: "river", group: "rivers",
        fact: "The Seine flows through Paris into the English Channel." },
      { q: "River through Vienna, Budapest and Belgrade", ask: "Which river flows through Vienna, Budapest and Belgrade?", a: "Danube", kind: "river", group: "rivers",
        fact: "The Danube flows through ten countries, more than any other river, into the Black Sea." },
      { q: "River through Cologne to Rotterdam", ask: "Which river flows from the Swiss Alps through Germany to the North Sea at Rotterdam?", a: "Rhine", kind: "river", group: "rivers",
        fact: "The Rhine is one of Europe's busiest rivers for shipping." },
      { q: "Sacred river of India", ask: "Which river, sacred to Hindus, flows through Varanasi in India?", a: "Ganges", alt: ["Ganga"], kind: "river", group: "rivers",
        fact: "The Ganges flows from the Himalayas across India and Bangladesh into the Bay of Bengal." },
      { q: "River with Victoria Falls", ask: "Victoria Falls is on which African river?", a: "Zambezi", alt: ["Zambesi"], kind: "river", group: "rivers",
        fact: "The Zambezi forms the border between Zambia and Zimbabwe and flows into the Indian Ocean." },
      { q: "River on the USA–Mexico border", ask: "Which river forms much of the border between the USA and Mexico?", a: "Rio Grande", kind: "river", group: "rivers",
        fact: "The Rio Grande flows into the Gulf of Mexico." },
      { q: "River through Baghdad", ask: "Which river flows through Baghdad in Iraq?", a: "Tigris", kind: "river", group: "rivers",
        fact: "The Tigris and the Euphrates surround Mesopotamia, where some of the earliest cities grew." },
      { q: "Longest river in West Africa", ask: "Which is the longest river in West Africa?", a: "Niger", kind: "river", group: "rivers",
        fact: "The Niger flows in a big curve through Mali and Niger to Nigeria, into the Gulf of Guinea." },
      { q: "Deepest river in the world", ask: "Which river in central Africa is the deepest in the world?", a: "Congo", kind: "river", group: "rivers",
        fact: "The Congo is over 220 m deep in places and carries the second-largest amount of water after the Amazon." },

      // Mountain ranges
      { q: "Range containing Mount Everest", ask: "Which mountain range contains Mount Everest?", a: "Himalayas", alt: ["Himalaya", "Himalayan"], kind: "range", group: "ranges",
        fact: "The Himalayas are in Asia (Nepal, India, Bhutan, China, Pakistan). They are still growing as the Indian plate pushes into the Eurasian plate." },
      { q: "Range along western South America", ask: "Which mountain range runs down the west side of South America?", a: "Andes", kind: "range", group: "ranges",
        fact: "The Andes are the longest mountain range on land, about 7,000 km." },
      { q: "Range in western North America", ask: "Which mountain range runs through western Canada and the USA?", a: "Rocky Mountains", alt: ["Rockies"], kind: "range", group: "ranges",
        fact: "The Rockies stretch about 4,800 km from Canada to New Mexico." },
      { q: "Range containing Mont Blanc", ask: "Which mountain range in Europe contains Mont Blanc and the Matterhorn?", a: "Alps", kind: "range", group: "ranges",
        fact: "The Alps cross France, Switzerland, Italy, Austria, Germany, Slovenia, Liechtenstein and Monaco." },
      { q: "Range between France and Spain", ask: "Which mountain range forms the border between France and Spain?", a: "Pyrenees", kind: "range", group: "ranges",
        fact: "The tiny country of Andorra sits in the Pyrenees." },
      { q: "Range dividing Europe and Asia", ask: "Which mountain range in Russia is seen as the boundary between Europe and Asia?", a: "Ural Mountains", alt: ["Urals", "Ural"], kind: "range", group: "ranges",
        fact: "The Urals run about 2,500 km north to south through western Russia." },
      { q: "Range in north-west Africa", ask: "Which mountain range is in Morocco, Algeria and Tunisia?", a: "Atlas Mountains", alt: ["Atlas"], kind: "range", group: "ranges",
        fact: "The Atlas Mountains separate the Mediterranean coast from the Sahara Desert." },
      { q: "Range along eastern USA", ask: "Which old, worn-down mountain range runs along the eastern USA?", a: "Appalachian Mountains", alt: ["Appalachians", "Appalachian"], kind: "range", group: "ranges",
        fact: "The Appalachians are hundreds of millions of years old, much older than the Rockies." },
      { q: "Range forming the spine of Italy", ask: "Which mountain range runs down the length of Italy?", a: "Apennines", alt: ["Apennine"], kind: "range", group: "ranges",
        fact: "The Apennines are about 1,200 km long." },
      { q: "Range between the Black and Caspian seas", ask: "Which mountain range lies between the Black Sea and the Caspian Sea?", a: "Caucasus", alt: ["Caucasus Mountains"], kind: "range", group: "ranges",
        fact: "Mount Elbrus, the highest mountain in Europe, is in the Caucasus." },
      { q: "Range along eastern Australia", ask: "Which mountain range runs along the east coast of Australia?", a: "Great Dividing Range", kind: "range", group: "ranges",
        fact: "The Great Dividing Range is over 3,500 km long." },

      // Highest peaks
      { q: "Highest mountain in the world", ask: "What is the highest mountain in the world?", a: "Mount Everest", alt: ["Everest"], kind: "peak", group: "peaks",
        fact: "Everest is 8,849 m high, on the border of Nepal and China (Tibet), in the Himalayas." },
      { q: "Second highest mountain in the world", ask: "What is the second highest mountain in the world?", a: "K2", kind: "peak", group: "peaks",
        fact: "K2 is 8,611 m high, on the border of Pakistan and China." },
      { q: "Highest mountain in Africa", ask: "What is the highest mountain in Africa?", a: "Kilimanjaro", alt: ["Mount Kilimanjaro"], kind: "peak", group: "peaks",
        fact: "Kilimanjaro is 5,895 m high, in Tanzania. It is a dormant volcano." },
      { q: "Highest mountain in South America", ask: "What is the highest mountain in South America?", a: "Aconcagua", kind: "peak", group: "peaks",
        fact: "Aconcagua is 6,961 m high, in Argentina, in the Andes." },
      { q: "Highest mountain in North America", ask: "What is the highest mountain in North America?", a: "Denali", alt: ["Mount McKinley", "McKinley"], kind: "peak", group: "peaks",
        fact: "Denali is 6,190 m high, in Alaska, USA." },
      { q: "Highest mountain in Europe", ask: "What is the highest mountain in Europe?", a: "Mount Elbrus", alt: ["Elbrus"], kind: "peak", group: "peaks",
        fact: "Elbrus is 5,642 m high, in Russia's Caucasus Mountains. Mont Blanc is the highest in western Europe." },
      { q: "Highest mountain in the Alps", ask: "What is the highest mountain in the Alps?", a: "Mont Blanc", kind: "peak", group: "peaks",
        fact: "Mont Blanc is about 4,806 m high, on the border of France and Italy." },
      { q: "Highest mountain in Australia", ask: "What is the highest mountain in mainland Australia?", a: "Mount Kosciuszko", alt: ["Kosciuszko", "Kosciusko"], kind: "peak", group: "peaks",
        fact: "Mount Kosciuszko is 2,228 m high, in the Great Dividing Range." },
      { q: "Highest mountain in Antarctica", ask: "What is the highest mountain in Antarctica?", a: "Vinson Massif", alt: ["Mount Vinson", "Vinson"], kind: "peak", group: "peaks",
        fact: "Vinson Massif is 4,892 m high." },
      { q: "Highest mountain in Japan", ask: "Which volcano is the highest mountain in Japan?", a: "Mount Fuji", alt: ["Fuji", "Fujiyama", "Fuji-san"], kind: "peak", group: "peaks",
        fact: "Mount Fuji is 3,776 m high, on the island of Honshu." },

      // UK rivers & mountains
      { q: "Longest river in the UK", ask: "What is the longest river in the UK?", a: "Severn", alt: ["River Severn"], kind: "river", group: "uk",
        fact: "The Severn (about 354 km) rises in Wales and flows into the Bristol Channel." },
      { q: "River through London", ask: "Which river flows through London?", a: "Thames", alt: ["River Thames"], kind: "river", group: "uk",
        fact: "The Thames (about 346 km) is the longest river entirely in England. It flows into the North Sea." },
      { q: "Longest river in Scotland", ask: "What is the longest river in Scotland?", a: "Tay", alt: ["River Tay"], kind: "river", group: "uk",
        fact: "The Tay (about 190 km) flows through Perth into the North Sea." },
      { q: "Longest river in Northern Ireland", ask: "What is the longest river in Northern Ireland?", a: "Bann", alt: ["River Bann"], kind: "river", group: "uk",
        fact: "The Bann flows through Lough Neagh, the UK's largest lake." },
      { q: "Highest mountain in the UK", ask: "What is the highest mountain in the UK?", a: "Ben Nevis", kind: "peak", group: "uk",
        fact: "Ben Nevis is 1,345 m high, near Fort William in the Scottish Highlands." },
      { q: "Highest mountain in England", ask: "What is the highest mountain in England?", a: "Scafell Pike", kind: "peak", group: "uk",
        fact: "Scafell Pike is 978 m high, in the Lake District." },
      { q: "Highest mountain in Wales", ask: "What is the highest mountain in Wales?", a: "Snowdon", alt: ["Yr Wyddfa"], kind: "peak", group: "uk",
        fact: "Snowdon (Yr Wyddfa) is 1,085 m high, in Snowdonia (Eryri)." },
      { q: "Highest mountain in Northern Ireland", ask: "What is the highest mountain in Northern Ireland?", a: "Slieve Donard", kind: "peak", group: "uk",
        fact: "Slieve Donard is 850 m high, in the Mourne Mountains." },
      { q: "The backbone of England", ask: "Which range of hills is known as the 'backbone of England'?", a: "Pennines", alt: ["Pennine"], kind: "range", group: "uk",
        fact: "The Pennines run from the Peak District up to the Scottish border." },
      { q: "Range containing Ben Nevis", ask: "Which mountain range in Scotland contains Ben Nevis?", a: "Grampian Mountains", alt: ["Grampians", "Grampian"], kind: "range", group: "uk",
        fact: "The Grampians cover much of the Scottish Highlands." }
    ]
  }
];
