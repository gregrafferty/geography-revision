/*
 * Revision topics.
 *
 * To add a new topic, push another object onto TOPICS with the same shape:
 *   id        unique id (used to store progress)
 *   title     shown on the home screen
 *   emoji     icon for the home screen
 *   forward   question template when showing the prompt; {q} = item.q
 *   reverse   question template when showing the answer; {a} = item.a
 *   groups    optional filter chips: { id: label }
 *   items     { q, a, alt?: [accepted alternative answers], qAlt?: [...], flag?, group? }
 */
window.TOPICS = [
  {
    id: "europe-capitals",
    title: "European capital cities",
    emoji: "🏛️",
    forward: "What is the capital of {q}?",
    reverse: "{a} is the capital of which country?",
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
  }
];
