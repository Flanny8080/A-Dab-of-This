import { useState, useEffect } from "react";

// ─── SPIRITS EDUCATION DATA ────────────────────────────────────────────────
const SPIRITS_GUIDE = [
  {
    id: "whiskey", name: "Whiskey", emoji: "🥃", color: "#C8821A",
    tagline: "The soul of the grain",
    overview: "American whiskey is distilled from a fermented grain mash and aged in charred oak barrels. The char caramelizes wood sugars, drawing out rich vanilla, caramel, and oak. Read recipes top to bottom — the spirit is always listed first.",
    flavor: [{ label: "Vanilla & Caramel", value: 88 },{ label: "Oak & Char", value: 75 },{ label: "Spice & Pepper", value: 60 },{ label: "Dried Fruit", value: 48 },{ label: "Smokiness", value: 28 }],
    subtypes: [{ name: "Bourbon", note: "≥51% corn mash, new charred oak — the sweetest American style" },{ name: "Rye", note: "≥51% rye grain — drier, spicier, great in Manhattans" },{ name: "Tennessee", note: "Charcoal-mellowed before barreling — Jack Daniels is the classic" },{ name: "Blended", note: "Mixed grain and malt whiskies — Seagram's 7, lighter style" }],
    pairings: ["Dark chocolate","Pecan pie","BBQ ribs","Sharp cheddar","Honey"],
    barTip: "When a recipe says 'Whiskey B.' it means Whiskey Bourbon. Order by style: 'I'll have a Whiskey Sour with rye' gets you a sharper, drier drink.",
    bookDrinks: ["Manhattan","Dry Manhattan","Perfect Manhattan","Whiskey Sour","Stone Sour","Old Fashion","Mint Julep","Black Hawk","Presbyterian","Whiskey & Water","Pussycat","Boston Ward 8","Hot Tamale"],
  },
  {
    id: "bourbon", name: "Bourbon", emoji: "🍯", color: "#B8680A",
    tagline: "America's native spirit",
    overview: "Bourbon must be made in the USA from at least 51% corn, aged in new charred oak, and bottled at no less than 80 proof. It's the sweetest and most approachable American whiskey — when a recipe calls for Whiskey B., this is what Andrew means.",
    flavor: [{ label: "Caramel & Vanilla", value: 94 },{ label: "Corn Sweetness", value: 85 },{ label: "Oak & Char", value: 68 },{ label: "Dried Fruit", value: 52 },{ label: "Spice", value: 42 }],
    subtypes: [{ name: "High Rye Bourbon", note: "More spice, less sweetness — Four Roses, Bulleit" },{ name: "Wheated Bourbon", note: "Softer, sweeter — Maker's Mark, Pappy Van Winkle" },{ name: "Single Barrel", note: "One cask only — unique character, usually higher proof" },{ name: "Bottled-in-Bond", note: "100 proof, aged 4+ years — the original quality standard" }],
    pairings: ["Salted caramel","Sweet potato pie","Grilled pork","Honey","Candied pecans"],
    barTip: "Ask for bourbon by name for premium results. 'Maker's Manhattan' or 'Bulleit Old Fashioned' tells the bartender exactly what you want.",
    bookDrinks: ["Manhattan","Dry Manhattan","Perfect Manhattan","Old Fashion","Mint Julep","Black Hawk","Whiskey Sour","Stone Sour","Boston Ward 8","Hot Tamale"],
  },
  {
    id: "scotch", name: "Scotch", emoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", color: "#8B6914",
    tagline: "Born of peat and sea",
    overview: "Scotch whisky is made in Scotland, aged minimum 3 years in oak casks. The use of malted barley — sometimes dried over peat smoke — gives Scotch its complex, earthy, often maritime character. The Rob Roy is the Scotch Manhattan.",
    flavor: [{ label: "Peat & Smoke", value: 75 },{ label: "Malt & Grain", value: 78 },{ label: "Sea & Brine", value: 60 },{ label: "Dried Fruit", value: 58 },{ label: "Heather & Honey", value: 48 }],
    subtypes: [{ name: "Speyside", note: "Fruity, floral, elegant — Glenfiddich, Macallan, Glenlivet" },{ name: "Islay", note: "Heavily peated, medicinal, smoky — Laphroaig, Ardbeg, Lagavulin" },{ name: "Highland", note: "Broad range from light to full-bodied — Dalmore, Oban" },{ name: "Blended Scotch", note: "Grain + malt combined — Johnnie Walker, Dewar's, J&B" }],
    pairings: ["Smoked salmon","Dark fruitcake","Aged gouda","Oysters","Dark chocolate"],
    barTip: "The God Father (Scotch + Amaretto) is a great gateway. For Rob Roys, specify blended or single malt — it changes the drink completely.",
    bookDrinks: ["Rob Roy","Dry Rob Roy","Perfect Rob Roy","God Father","Aggravation","Rusty Nail","Scotch & Soda","Hot Tamale"],
  },
  {
    id: "rum", name: "Rum", emoji: "🏝️", color: "#A0522D",
    tagline: "The spirit of the tropics",
    overview: "Distilled from sugarcane juice or molasses, rum ranges from light and clean to richly complex. Andrew uses rum heavily in the Tantalizing Tropics section — light rum for mixing, dark rum for depth and floats, 151 for fire.",
    flavor: [{ label: "Molasses & Sugar", value: 88 },{ label: "Tropical Fruit", value: 70 },{ label: "Vanilla & Toffee", value: 62 },{ label: "Oak & Spice", value: 52 },{ label: "Funk & Earthiness", value: 40 }],
    subtypes: [{ name: "White / Light Rum", note: "Clean, mixable — Bacardi, the base of most cocktails" },{ name: "Dark Rum", note: "Molasses-rich, used for depth and floats — Myers's, Gosling's" },{ name: "Golden / Amber Rum", note: "Aged, smooth — great for sipping or complex cocktails" },{ name: "151 Rum", note: "75.5% ABV — used as a float or for flaming shots only" }],
    pairings: ["Coconut","Mango","Lime","Coffee","Pineapple"],
    barTip: "When Andrew writes 'Float – 151 Rum' it always goes last, poured over the back of a spoon. Never stir after floating.",
    bookDrinks: ["Daiquiri","Banana Daiquiri","Strawberry Daiquiri","Rum & Coke","Cuba Libra","Rum Sour","Pina Colada","Mai Tai","Hurricane","Zombie","Mojito","Planters Punch","Rumrunner","Melted Otter Pop","Hummer","Bacardi Cocktail","Limey"],
  },
  {
    id: "gin", name: "Gin", emoji: "🌿", color: "#2E7D4F",
    tagline: "Botanicals in a bottle",
    overview: "Gin is a neutral spirit redistilled with botanicals — juniper being the defining one. Andrew uses gin extensively in martinis and classic cocktails. It's the base of the Tom Collins, Singapore Sling, and several sours.",
    flavor: [{ label: "Juniper & Pine", value: 90 },{ label: "Citrus Zest", value: 70 },{ label: "Floral & Herbal", value: 65 },{ label: "Spice & Pepper", value: 48 },{ label: "Earth & Root", value: 38 }],
    subtypes: [{ name: "London Dry", note: "Classic, juniper-forward, bone dry — Tanqueray, Beefeater" },{ name: "Plymouth", note: "Slightly earthier and softer than London Dry" },{ name: "Contemporary", note: "Floral, citrus-forward, experimental — Hendrick's" },{ name: "Sloe Gin", note: "Sloe berry-infused, sweet-tart — used in Sloe Screws and shooters" }],
    pairings: ["Cucumber","Tonic water","Lemon","Elderflower","Fresh herbs"],
    barTip: "Sloe Gin is its own thing — much sweeter and lower proof than regular gin. Don't substitute one for the other in Andrew's recipes.",
    bookDrinks: ["Martini","Dry Martini","Extra Dry Martini","Gibson","Dirty Martini","Desert Dry Martini","Gin & Tonic","Tom Collins","Singapore Sling","French 75","Gimlet","Orange Blossom","Buck","Bulldog","Ricky"],
  },
  {
    id: "vodka", name: "Vodka", emoji: "❄️", color: "#6A9CC8",
    tagline: "The invisible backbone",
    overview: "Vodka's neutrality makes it the most versatile spirit — it adds alcohol without changing the flavor profile of a drink. Andrew uses it as the base for more cocktails than any other spirit, especially in the One Liquor and Tropics sections.",
    flavor: [{ label: "Clean & Neutral", value: 95 },{ label: "Subtle Grain", value: 35 },{ label: "Light Sweetness", value: 25 },{ label: "Mineral", value: 20 },{ label: "Heat", value: 15 }],
    subtypes: [{ name: "Grain Vodka", note: "Wheat or rye base — cleaner, slightly sweet" },{ name: "Potato Vodka", note: "Creamier, fuller body — Chopin, Luksusowa" },{ name: "Flavored Vodka", note: "Infused with fruit or spice — used sparingly in modern cocktails" },{ name: "High-Proof", note: "Handle with extreme care" }],
    pairings: ["Caviar","Pickles","Smoked fish","Citrus","Almost anything"],
    barTip: "For Long Island Teas, Long Beach Teas, and Electric Lemonade — all use equal parts vodka, rum, gin, and tequila. Only the topper changes.",
    bookDrinks: ["Vodka Martini","Screwdriver","Bloody Mary","Vodka & Tonic","Kamikaze","White Russian","Black Russian","Colorado Bulldog","Sea Breeze","Bay Breeze","Madras","Grey Hound","Salty Dog","Vodka Gimlet"],
  },
  {
    id: "tequila", name: "Tequila", emoji: "🌵", color: "#C5A028",
    tagline: "The heart of the agave",
    overview: "Made from blue Weber agave in Jalisco, Mexico. The piña is roasted, juiced, fermented, and distilled. Andrew uses it in margaritas, sunrises, and the Cadillac — always ordering up in quality pays off with tequila.",
    flavor: [{ label: "Agave & Earth", value: 90 },{ label: "Citrus & Pepper", value: 68 },{ label: "Vegetal & Herbal", value: 62 },{ label: "Vanilla & Oak (aged)", value: 50 },{ label: "Smoke (Mezcal)", value: 35 }],
    subtypes: [{ name: "Blanco / Silver", note: "Unaged, pure agave — best for margaritas" },{ name: "Reposado", note: "2–12 months in oak — smooth, balanced" },{ name: "Anejo", note: "1–3 years aged — sip it, don't mix it" },{ name: "Mezcal", note: "Any agave variety, often smoky — its own category" }],
    pairings: ["Lime","Salt","Jalapeño","Mango","Grilled corn"],
    barTip: "The Cadillac Margarita uses Cuervo + Grand Marnier float. Pour the float slowly over the back of a spoon.",
    bookDrinks: ["Margarita","Blue Margarita","Top Shelf / Cadillac Margarita","Tequila Sunrise","Bloody Maria","Brave Bull","Horny Bull","Freddie Fudpucker","Tequila Slammer"],
  },
  {
    id: "brandy", name: "Brandy & Cognac", emoji: "🍇", color: "#8B3A62",
    tagline: "Wine's sophisticated heir",
    overview: "Brandy is distilled wine or fermented fruit juice. It shows up throughout Andrew's book — in the God series, Sours, Dessert drinks, and the Stinger family. Cognac is the finest French brandy.",
    flavor: [{ label: "Dried Fruit & Raisin", value: 85 },{ label: "Vanilla & Oak", value: 75 },{ label: "Floral & Grape", value: 68 },{ label: "Spice & Warmth", value: 55 },{ label: "Earthiness", value: 40 }],
    subtypes: [{ name: "Cognac (VS/VSOP/XO)", note: "French, grape-based — increasingly complex with age" },{ name: "Armagnac", note: "Rougher, more rustic than Cognac" },{ name: "Blackberry Brandy", note: "Sweet, fruit-forward — Jellybean, Purple Orchid, Rumrunner" },{ name: "Apple Brandy", note: "Apple-distilled — Jack Rose Cocktail" }],
    pairings: ["Dark chocolate","Dried apricot","Crème brûlée","Walnuts","Strong coffee"],
    barTip: "The God Child, God Mother, and God Father are the same drink with different base spirits plus Amaretto. Great way to understand how base spirits change a cocktail.",
    bookDrinks: ["God Child","Stinger","Italian Stinger","Side Car","Brandy Alexander","Jack Rose Cocktail","Dirty Mother","Dirty White Mother","Sloe Brandy","Between the Sheets"],
  },
];

// ─── BOOK DATA ─────────────────────────────────────────────────────────────
const BOOK_CATEGORIES = [
  { id: "martinis", label: "Martinis & Manhattans", emoji: "🍸" },
  { id: "one_liquor", label: "One Liquor Drinks", emoji: "🥃" },
  { id: "sours", label: "Sour / Lemon Juice", emoji: "🍋" },
  { id: "frozen", label: "Frozen Drinks", emoji: "🧊" },
  { id: "two_liquor", label: "Two Liquor Cocktails", emoji: "🍹" },
  { id: "tropics", label: "Tantalizing Tropics", emoji: "🌴" },
  { id: "dessert", label: "Dessert Drinks", emoji: "🍫" },
  { id: "coffee", label: "Coffee & Hot Drinks", emoji: "☕" },
  { id: "wine", label: "Wine & Champagne", emoji: "🍷" },
  { id: "shooters", label: "Shooters", emoji: "🎯" },
];

const BOOK_DRINKS = [
  { id: 1, cat: "martinis", name: "Martini", ingredients: ["Dash dry Vermouth","2 oz. Gin"], garnish: "Olive" },
  { id: 2, cat: "martinis", name: "Dry Martini", ingredients: ["Less than a dash dry Vermouth","2 oz. Gin"], garnish: "Olive" },
  { id: 3, cat: "martinis", name: "Extra Dry Martini", ingredients: ["Couple drops of dry Vermouth","2 oz. Gin"], garnish: "Olive" },
  { id: 4, cat: "martinis", name: "Gibson", ingredients: ["Dash dry Vermouth","2 oz. Gin"], garnish: "Onion" },
  { id: 5, cat: "martinis", name: "Vodka Martini", ingredients: ["Dash dry Vermouth","2 oz. Vodka"], garnish: "Olive" },
  { id: 6, cat: "martinis", name: "Rob Roy", ingredients: ["Dash Sweet Vermouth","2 oz. Scotch"], garnish: "Cherry" },
  { id: 7, cat: "martinis", name: "Dry Rob Roy", ingredients: ["Less than a dash sweet Vermouth","2 oz. Scotch"], garnish: "Lemon Twist" },
  { id: 8, cat: "martinis", name: "Perfect Rob Roy", ingredients: ["Dash dry Vermouth","Dash sweet Vermouth","2 oz. Scotch"], garnish: "Lemon Twist / Cherry" },
  { id: 9, cat: "martinis", name: "Manhattan", ingredients: ["Dash sweet Vermouth","2 oz. Whiskey Bourbon"], garnish: "Cherry" },
  { id: 10, cat: "martinis", name: "Dry Manhattan", ingredients: ["Less than a dash sweet Vermouth","2 oz. Whiskey Bourbon"], garnish: "Lemon Twist" },
  { id: 11, cat: "martinis", name: "Perfect Manhattan", ingredients: ["Dash dry Vermouth","Dash sweet Vermouth","2 oz. Whiskey Bourbon"], garnish: "Lemon Twist / Cherry" },
  { id: 12, cat: "martinis", name: "Dirty Martini", ingredients: ["Dash dry Vermouth","2 oz. Gin","Bar spoon Olive Juice"], garnish: "Olive" },
  { id: 13, cat: "martinis", name: "Desert Dry Martini", ingredients: ["Dry Vermouth (throw away)","2 oz. Gin"], garnish: "Olive" },
  { id: 14, cat: "martinis", name: "Black Martini", ingredients: ["1 oz. Gin","1 oz. C. de Cassis"], garnish: "" },
  { id: 15, cat: "one_liquor", name: "Tequila Sunrise", ingredients: ["1 oz. Tequila","½ oz. Grenadine","Orange Juice"], garnish: "" },
  { id: 16, cat: "one_liquor", name: "Vodka & Tonic", ingredients: ["1 oz. Vodka","Tonic water"], garnish: "Lime Wedge" },
  { id: 17, cat: "one_liquor", name: "Gin & Tonic", ingredients: ["1 oz. Gin","Tonic Water"], garnish: "Lime Wedge" },
  { id: 18, cat: "one_liquor", name: "Rum & Coke", ingredients: ["1 oz. Rum","Coke"], garnish: "" },
  { id: 19, cat: "one_liquor", name: "Cuba Libra", ingredients: ["1 oz. Rum","Coke"], garnish: "Lime Wedge" },
  { id: 20, cat: "one_liquor", name: "Presbyterian", ingredients: ["1 oz. Whiskey","½ oz. Ginger Ale","½ oz. Club Soda"], garnish: "" },
  { id: 21, cat: "one_liquor", name: "Gin Presbyterian", ingredients: ["1 oz. Gin","½ oz. Ginger Ale","½ oz. Club Soda"], garnish: "" },
  { id: 22, cat: "one_liquor", name: "Fuzzy Navel", ingredients: ["1 oz. Peach Schnapps","Orange Juice"], garnish: "" },
  { id: 23, cat: "one_liquor", name: "Screwdriver", ingredients: ["1 oz. Vodka","Orange Juice"], garnish: "" },
  { id: 24, cat: "one_liquor", name: "Grey Hound", ingredients: ["1 oz. Vodka","Grapefruit Juice"], garnish: "" },
  { id: 25, cat: "one_liquor", name: "Salty Dog", ingredients: ["1 oz. Vodka","Grapefruit Juice"], garnish: "Salt rim" },
  { id: 26, cat: "one_liquor", name: "Bloody Mary", ingredients: ["1 oz. Vodka","Bloody Mary Mix"], garnish: "Celery" },
  { id: 27, cat: "one_liquor", name: "Bloody Maria", ingredients: ["1 oz. Tequila","Bloody Mary Mix"], garnish: "Lime" },
  { id: 28, cat: "one_liquor", name: "Madras", ingredients: ["1 oz. Vodka","½ oz. Cranberry Juice","½ oz. Orange Juice"], garnish: "" },
  { id: 29, cat: "one_liquor", name: "Bay Breeze", ingredients: ["1 oz. Vodka","½ oz. Cranberry Juice","½ oz. Pineapple Juice"], garnish: "" },
  { id: 30, cat: "one_liquor", name: "Sea Breeze", ingredients: ["1 oz. Vodka","Cranberry Juice","Grapefruit Juice"], garnish: "" },
  { id: 31, cat: "one_liquor", name: "Cap Coder", ingredients: ["1 oz. Vodka","Cranberry Juice"], garnish: "" },
  { id: 32, cat: "one_liquor", name: "Hairy Navel", ingredients: ["½ oz. Vodka","1 oz. Peach Schnapps","Orange Juice"], garnish: "" },
  { id: 33, cat: "one_liquor", name: "Freddie Fudpucker", ingredients: ["1 oz. Tequila","½ oz. Galliano","Orange Juice"], garnish: "" },
  { id: 34, cat: "one_liquor", name: "Harvey Wallbanger", ingredients: ["1 oz. Vodka","½ oz. Galliano","Orange Juice"], garnish: "" },
  { id: 35, cat: "one_liquor", name: "Sloe Screw", ingredients: ["1 oz. Sloe Gin","Orange Juice"], garnish: "" },
  { id: 36, cat: "one_liquor", name: "Sloe Comfortable Screw", ingredients: ["1 oz. Southern Comfort","½ oz. Sloe Gin","Orange Juice"], garnish: "" },
  { id: 37, cat: "one_liquor", name: "Sloe Comfortable Screw Up Against the Wall", ingredients: ["1 oz. Southern Comfort","½ oz. Sloe Gin","Orange Juice","Float – ½ oz. Galliano"], garnish: "" },
  { id: 38, cat: "one_liquor", name: "Horny Bull", ingredients: ["1 oz. Tequila","Orange Juice"], garnish: "" },
  { id: 39, cat: "one_liquor", name: "Orange Blossom", ingredients: ["1 oz. Gin","Orange Juice"], garnish: "Orange Slice" },
  { id: 40, cat: "one_liquor", name: "7 & 7", ingredients: ["1 oz. Seagram's 7","7up / Sprite"], garnish: "" },
  { id: 41, cat: "one_liquor", name: "Whiskey & Water", ingredients: ["1 oz. Whiskey","Water"], garnish: "" },
  { id: 42, cat: "one_liquor", name: "Scotch & Soda", ingredients: ["1 oz. Scotch","Club Soda"], garnish: "" },
  { id: 43, cat: "one_liquor", name: "Buck", ingredients: ["1 oz. Gin or Vodka","Ginger Ale"], garnish: "Lemon" },
  { id: 44, cat: "one_liquor", name: "Bulldog", ingredients: ["1 oz. Gin","Orange Juice","Ginger Ale"], garnish: "" },
  { id: 45, cat: "one_liquor", name: "Crazy Screw", ingredients: ["1 oz. Vodka","Orange Juice","Splash Soda"], garnish: "" },
  { id: 46, cat: "one_liquor", name: "Fuzzy Fruit", ingredients: ["1 oz. Peach Schnapps","Grapefruit Juice"], garnish: "" },
  { id: 47, cat: "one_liquor", name: "Georgia Reef", ingredients: ["1 oz. Peach Schnapps","Cranberry Juice"], garnish: "" },
  { id: 48, cat: "one_liquor", name: "Ricky", ingredients: ["1 oz. Gin or Vodka","Soda","Splash Rose's Lime Juice"], garnish: "Lime" },
  { id: 49, cat: "one_liquor", name: "Sombrero", ingredients: ["1 oz. Kahlua","Cream"], garnish: "" },
  { id: 50, cat: "one_liquor", name: "Sunset", ingredients: ["1 oz. Vodka","Orange Juice","½ oz. Grenadine"], garnish: "" },
  { id: 51, cat: "one_liquor", name: "Boccie Ball", ingredients: ["1 oz. Amaretto","Orange Juice"], garnish: "Cherry" },
  { id: 52, cat: "one_liquor", name: "Otter Pop", ingredients: ["1 oz. Southern Comfort","½ oz. Sloe Gin","½ Orange Juice","½ Sour Mix"], garnish: "" },
  { id: 53, cat: "one_liquor", name: "Melted Otter Pop", ingredients: ["1 oz. Southern Comfort","½ oz. Sloe Gin","½ Orange Juice","½ Sour Mix","Float – 151 Rum"], garnish: "" },
  { id: 54, cat: "sours", name: "Daiquiri", ingredients: ["1 oz. Rum","2 oz. Sour Mix"], garnish: "" },
  { id: 55, cat: "sours", name: "Whiskey Sour", ingredients: ["1 oz. Whiskey","2 oz. Sour Mix"], garnish: "Flag" },
  { id: 56, cat: "sours", name: "Rum Sour", ingredients: ["1 oz. Rum","2 oz. Sour Mix"], garnish: "Flag" },
  { id: 57, cat: "sours", name: "Stone Sour", ingredients: ["1 oz. Whiskey","1 oz. Sour Mix","1 oz. Orange Juice"], garnish: "Flag" },
  { id: 58, cat: "sours", name: "Jack Rose Cocktail", ingredients: ["1 oz. Apple Brandy","½ oz. Grenadine","1½ oz. Sour Mix"], garnish: "" },
  { id: 59, cat: "sours", name: "Bacardi Cocktail", ingredients: ["1 oz. Bacardi Rum","½ oz. Grenadine","1½ oz. Sour Mix"], garnish: "" },
  { id: 60, cat: "sours", name: "Boston Ward 8", ingredients: ["1 oz. Whiskey Bourbon","½ oz. Grenadine","1½ oz. Sour Mix"], garnish: "Lime Wedge" },
  { id: 61, cat: "sours", name: "Pussycat", ingredients: ["1 oz. Whiskey","½ oz. Grenadine","1½ oz. Sour Mix"], garnish: "" },
  { id: 62, cat: "sours", name: "Scarlet O'Hara", ingredients: ["1 oz. Southern Comfort","½ oz. Grenadine","1½ oz. Sour Mix"], garnish: "" },
  { id: 63, cat: "sours", name: "Between the Sheets", ingredients: ["½ oz. Rum","½ oz. Brandy","½ oz. Triple Sec","1½ oz. Sour Mix"], garnish: "" },
  { id: 64, cat: "sours", name: "Limey", ingredients: ["1 oz. Light Rum","½ oz. Triple Sec","1½ oz. Sour Mix","Splash Rose's Lime Juice"], garnish: "Lime" },
  { id: 65, cat: "sours", name: "Side Car", ingredients: ["1 oz. Brandy","½ oz. Triple Sec","1½ oz. Sour Mix"], garnish: "Rim Sugar" },
  { id: 66, cat: "sours", name: "Sloe Brandy", ingredients: ["1 oz. Brandy","½ oz. Sloe Gin","1½ oz. Sour Mix"], garnish: "" },
  { id: 67, cat: "frozen", name: "Banana Daiquiri", ingredients: ["1½ oz. Light Rum","½ oz. Creme de Banana","½ Banana","1 oz. Sour Mix","½ cup of ice"], garnish: "" },
  { id: 68, cat: "frozen", name: "Strawberry Daiquiri", ingredients: ["1½ oz. Light Rum","3 oz. Strawberry Mix","1 oz. Sour Mix","½ cup of ice"], garnish: "" },
  { id: 69, cat: "frozen", name: "Strawberry Margarita", ingredients: ["½ oz. Tequila","½ oz. Triple Sec","3 oz. Strawberry Mix","1 oz. Sour Mix","½ cup of ice"], garnish: "" },
  { id: 70, cat: "two_liquor", name: "God Child", ingredients: ["1½ oz. Brandy","½ oz. Amaretto"], garnish: "" },
  { id: 71, cat: "two_liquor", name: "God Mother", ingredients: ["1½ oz. Vodka","½ oz. Amaretto"], garnish: "" },
  { id: 72, cat: "two_liquor", name: "God Father", ingredients: ["1½ oz. Scotch","½ oz. Amaretto"], garnish: "" },
  { id: 73, cat: "two_liquor", name: "Brave Bull", ingredients: ["1½ oz. Tequila","½ oz. Kahlua"], garnish: "" },
  { id: 74, cat: "two_liquor", name: "Dirty White Mother", ingredients: ["1 oz. Brandy","½ oz. Kahlua","½ oz. Cream"], garnish: "" },
  { id: 75, cat: "two_liquor", name: "Dirty Mother", ingredients: ["1 oz. Brandy","½ oz. Kahlua"], garnish: "" },
  { id: 76, cat: "two_liquor", name: "Snake Bite", ingredients: ["1½ oz. 101 Wild Turkey","½ oz. Peppermint Schnapps"], garnish: "" },
  { id: 77, cat: "two_liquor", name: "Old Fashion", ingredients: ["1 Spoon sugar","1 Dash bitters — muddle","1½ oz. Bourbon","Top with Soda"], garnish: "Flag, Ice" },
  { id: 78, cat: "two_liquor", name: "Jellybean", ingredients: ["1 oz. Blackberry Brandy","1 oz. Anisette","Top w/ Southern Comfort"], garnish: "" },
  { id: 79, cat: "two_liquor", name: "Aggravation", ingredients: ["1 oz. Scotch","½ oz. Kahlua","½ oz. Cream"], garnish: "" },
  { id: 80, cat: "two_liquor", name: "Black Russian", ingredients: ["1½ oz. Vodka","½ oz. Kahlua","Coke"], garnish: "" },
  { id: 81, cat: "two_liquor", name: "White Russian", ingredients: ["1 oz. Vodka","½ oz. Kahlua","½ oz. Cream"], garnish: "" },
  { id: 82, cat: "two_liquor", name: "Stinger", ingredients: ["1½ oz. Brandy","½ oz. White Creme de Menthe"], garnish: "" },
  { id: 83, cat: "two_liquor", name: "Rusty Nail", ingredients: ["1½ oz. Scotch","½ oz. Drambuie"], garnish: "" },
  { id: 84, cat: "two_liquor", name: "Mint Julep", ingredients: ["2 oz. Bourbon","1 Spoon sugar","4 Mint Leaves","Dash of Water"], garnish: "Mint Leaf" },
  { id: 85, cat: "two_liquor", name: "Kamikaze", ingredients: ["1 oz. Vodka","½ oz. Triple Sec","½ oz. Rose's Lime Juice"], garnish: "Lime Wedge" },
  { id: 86, cat: "two_liquor", name: "Vodka Gimlet", ingredients: ["1½ oz. Vodka","½ oz. Rose's Lime"], garnish: "Lime Wedge" },
  { id: 87, cat: "two_liquor", name: "Gimlet", ingredients: ["1½ oz. Gin","½ oz. Rose's Lime"], garnish: "Lime Wedge" },
  { id: 88, cat: "two_liquor", name: "Colorado Bulldog", ingredients: ["1 oz. Vodka","½ oz. Kahlua","Cream","Splash of Coke"], garnish: "Lime" },
  { id: 89, cat: "two_liquor", name: "Hummer", ingredients: ["1 oz. Light Rum","½ oz. Kahlua","Cream"], garnish: "" },
  { id: 90, cat: "two_liquor", name: "Black Hawk", ingredients: ["1 oz. Bourbon","½ oz. Sloe Gin"], garnish: "Cherry" },
  { id: 91, cat: "two_liquor", name: "Toasted Almond", ingredients: ["1 oz. Amaretto","½ oz. Kahlua","½ oz. Cream"], garnish: "" },
  { id: 92, cat: "two_liquor", name: "Roasted Almond", ingredients: ["1 oz. Amaretto","½ oz. Vodka","Cream"], garnish: "" },
  { id: 93, cat: "two_liquor", name: "Burnt Almond", ingredients: ["1 oz. Amaretto","½ oz. Dark Creme de Cacao","Cream"], garnish: "" },
  { id: 94, cat: "two_liquor", name: "White Spider", ingredients: ["1 oz. Vodka","½ oz. White Creme de Cacao"], garnish: "" },
  { id: 95, cat: "two_liquor", name: "Washington Apple", ingredients: ["1 oz. Crown Royal","1 oz. Sour Apple Schnapps","Cranberry Juice"], garnish: "Apple Slice" },
  { id: 96, cat: "two_liquor", name: "Scooby Snack", ingredients: ["1 oz. Coconut Rum","1 oz. Creme de Bananas","1 oz. Melon Liqueur","Pineapple Juice"], garnish: "Whipped Cream, Pineapple" },
  { id: 97, cat: "two_liquor", name: "Peppermint Pattie", ingredients: ["1½ oz. White Menthe","1½ oz. White Creme de Cacao"], garnish: "" },
  { id: 98, cat: "two_liquor", name: "Galliano Stinger", ingredients: ["1½ oz. Galliano","½ oz. White Creme de Menthe"], garnish: "" },
  { id: 99, cat: "two_liquor", name: "International Stinger", ingredients: ["1 oz. Ouzo","½ oz. Galliano"], garnish: "" },
  { id: 100, cat: "two_liquor", name: "Italian Stinger", ingredients: ["1 oz. Brandy","½ oz. Galliano"], garnish: "" },
  { id: 101, cat: "tropics", name: "Long Island Tea", ingredients: ["½ oz. Rum","½ oz. Vodka","½ oz. Gin","½ oz. Tequila","½ oz. Triple Sec","Sour Mix","Top – Coke"], garnish: "Lemon Wedge" },
  { id: 102, cat: "tropics", name: "Long Beach Tea", ingredients: ["½ oz. Rum","½ oz. Vodka","½ oz. Gin","½ oz. Tequila","½ oz. Triple Sec","Sour Mix","Top – Cranberry"], garnish: "Lemon Wedge" },
  { id: 103, cat: "tropics", name: "Electric Lemonade", ingredients: ["½ oz. Rum","½ oz. Vodka","½ oz. Gin","½ oz. Tequila","½ oz. Triple Sec","Sour Mix","Top – Sprite"], garnish: "Lemon Wedge" },
  { id: 104, cat: "tropics", name: "Green Dinosaur", ingredients: ["½ oz. Rum","½ oz. Vodka","½ oz. Gin","½ oz. Tequila","½ oz. Triple Sec","Sour Mix","Top – Midori/Coke"], garnish: "Lemon Wedge" },
  { id: 105, cat: "tropics", name: "Blue Motorcycle / Blue Whale", ingredients: ["½ oz. Rum","½ oz. Vodka","½ oz. Gin","½ oz. Tequila","½ oz. Blue Curacao","Sour Mix / Sprite"], garnish: "Flag" },
  { id: 106, cat: "tropics", name: "Blue Hawaiian", ingredients: ["1 oz. Light Rum","2 oz. Pineapple Juice","1 oz. Blue Curacao","1 oz. Cream of Coconut"], garnish: "Cherry, Pineapple" },
  { id: 107, cat: "tropics", name: "Pina Colada", ingredients: ["1 oz. Rum","½ Pineapple Juice","½ Colada Mix"], garnish: "Pineapple" },
  { id: 108, cat: "tropics", name: "Mai Tai", ingredients: ["1 oz. Light Rum","½ oz. Dark Rum","½ oz. Cream de Almond","½ oz. Triple Sec","Sweet and Sour Mix","Pineapple Juice"], garnish: "Flag" },
  { id: 109, cat: "tropics", name: "Lynchburg Lemonade", ingredients: ["1 oz. Jack Daniels","½ oz. Triple Sec","Sour Mix"], garnish: "Lemon" },
  { id: 110, cat: "tropics", name: "Hurricane", ingredients: ["1 oz. Light Rum","1 oz. Dark Rum","½ oz. Grenadine","½ oz. Passion Fruit"], garnish: "Flag" },
  { id: 111, cat: "tropics", name: "Zombie", ingredients: ["½ oz. Light Rum","1 oz. Dark Rum","1½ oz. Golden Rum","1 oz. Lime Juice","1 tsp Pineapple Juice","1 tsp Orange Juice","1 tsp Sugar","Float ½ oz. 151 Rum"], garnish: "Flag" },
  { id: 112, cat: "tropics", name: "Planters Punch", ingredients: ["1½ oz. Dark Rum","½ oz. Grenadine","1 oz. Orange Juice","Sour Mix"], garnish: "Flag" },
  { id: 113, cat: "tropics", name: "Tom Collins", ingredients: ["1½ oz. Gin","Sour Mix","Top – Club Soda"], garnish: "Flag" },
  { id: 114, cat: "tropics", name: "Singapore Sling", ingredients: ["1½ oz. Gin","½ oz. Grenadine","2½ oz. Sour Mix","Fill w/ Club Soda","Top w/ Cherry Brandy"], garnish: "Flag" },
  { id: 115, cat: "tropics", name: "Margarita", ingredients: ["1 oz. Tequila","½ oz. Triple Sec","Dash Rose's Lime Juice","Sour Mix"], garnish: "Lime, Salt" },
  { id: 116, cat: "tropics", name: "Blue Margarita", ingredients: ["1 oz. Tequila","½ oz. Blue Curacao","Dash Rose's Lime Juice","Sour Mix"], garnish: "Lime" },
  { id: 117, cat: "tropics", name: "Top Shelf / Cadillac Margarita", ingredients: ["1 oz. Cuervo Tequila","½ oz. Triple Sec","Dash Rose's Lime Juice","Sour Mix","Float – ½ oz. Grand Marnier"], garnish: "Lime, Salt" },
  { id: 118, cat: "tropics", name: "Mojito", ingredients: ["1 oz. Rum","Club Soda","12 Mint Leaves","½ Lime","3 Tsp Sugar"], garnish: "" },
  { id: 119, cat: "tropics", name: "Skip and Go Naked", ingredients: ["½ oz. Light Rum","½ oz. Vodka","½ oz. Brandy","Orange Juice","Sour Mix","Top – ½ oz. Grenadine"], garnish: "" },
  { id: 120, cat: "tropics", name: "T.G.I.F", ingredients: ["½ oz. Vodka","½ oz. Light Rum","½ oz. Gin","½ oz. Triple Sec","½ oz. Grenadine","½ oz. Rose's Lime Juice","Orange Juice"], garnish: "Flag" },
  { id: 121, cat: "tropics", name: "Sex on the Beach", ingredients: ["½ oz. Vodka","½ oz. Peach Schnapps","Cranberry Juice","Pineapple Juice"], garnish: "" },
  { id: 122, cat: "tropics", name: "Rumrunner", ingredients: ["½ oz. Light Rum","½ oz. Creme de Banana","½ oz. Grenadine","½ oz. Blackberry Brandy","Sour Mix","Float – ½ oz. Dark Rum"], garnish: "Flag" },
  { id: 123, cat: "dessert", name: "Banshee", ingredients: ["½ oz. Creme de Banana","½ oz. White Creme de Cacao","2 oz. Cream"], garnish: "" },
  { id: 124, cat: "dessert", name: "Pink Squirrel", ingredients: ["½ oz. Creme de Almond","½ oz. White Creme de Cacao","2 oz. Cream"], garnish: "" },
  { id: 125, cat: "dessert", name: "Grasshopper", ingredients: ["½ oz. Green De Menthe","½ oz. White Creme de Cacao","2 oz. Cream"], garnish: "" },
  { id: 126, cat: "dessert", name: "Cream / Dream Cycle", ingredients: ["½ oz. Triple Sec","½ oz. White Creme de Cacao","½ oz. Orange Juice","2 oz. Cream"], garnish: "" },
  { id: 127, cat: "dessert", name: "Blue Carnation", ingredients: ["½ oz. Blue Curacao","½ oz. White Creme de Cacao","2 oz. Cream"], garnish: "" },
  { id: 128, cat: "dessert", name: "Almond Joy", ingredients: ["½ oz. Amaretto","½ oz. Coco Lopez","½ oz. Brown Creme de Cacao","2 oz. Cream"], garnish: "" },
  { id: 129, cat: "dessert", name: "Golden Cadillac", ingredients: ["½ oz. Galliano","½ oz. White Creme de Cacao","2 oz. Cream"], garnish: "" },
  { id: 130, cat: "dessert", name: "Golden Dream", ingredients: ["½ oz. Galliano","½ oz. Triple Sec","½ oz. Orange Juice","Cream"], garnish: "" },
  { id: 131, cat: "dessert", name: "Brandy Alexander", ingredients: ["½ oz. Brandy","½ oz. Brown Creme de Cacao","2 oz. Cream"], garnish: "Nutmeg" },
  { id: 132, cat: "dessert", name: "Alexander", ingredients: ["½ oz. Gin","½ oz. Brown Creme de Cacao","2 oz. Cream"], garnish: "Nutmeg" },
  { id: 133, cat: "dessert", name: "Pink Lady", ingredients: ["1 oz. Gin","½ oz. Grenadine","2 oz. Cream"], garnish: "" },
  { id: 134, cat: "dessert", name: "Velvet Nut", ingredients: ["1 oz. Amaretto","½ oz. White Creme de Cacao","2 oz. Cream"], garnish: "" },
  { id: 135, cat: "dessert", name: "Velvet Hammer", ingredients: ["½ oz. Triple Sec","½ oz. White Creme de Cacao","Cream"], garnish: "" },
  { id: 136, cat: "dessert", name: "Purple Orchid", ingredients: ["1 oz. Blackberry Brandy","½ oz. White Creme de Cacao","Cream"], garnish: "" },
  { id: 137, cat: "dessert", name: "Peaches and Cream", ingredients: ["½ oz. Amaretto","½ oz. Peach Schnapps","Cream"], garnish: "" },
  { id: 138, cat: "coffee", name: "Nutty Irishman", ingredients: ["½ oz. Frangelico","½ oz. Bailey's","½ oz. Kahlua","Coffee"], garnish: "Whipped Cream" },
  { id: 139, cat: "coffee", name: "Hot Scotch", ingredients: ["1½ oz. Butterscotch Schnapps","Coffee"], garnish: "Whipped Cream" },
  { id: 140, cat: "coffee", name: "Almond Mocha", ingredients: ["1 oz. Disaronno Amaretto","½ oz. Brown Creme de Cacao","Coffee"], garnish: "Whipped Cream" },
  { id: 141, cat: "coffee", name: "Cafe Cloud Nine", ingredients: ["½ oz. Kahlua","½ oz. Bailey's","½ oz. Frangelico","Coffee"], garnish: "Whipped Cream" },
  { id: 142, cat: "coffee", name: "Millionaires Coffee", ingredients: ["½ oz. Grand Marnier","½ oz. Kahlua","½ oz. Bailey's","Coffee"], garnish: "Whipped Cream" },
  { id: 143, cat: "coffee", name: "Cafe Nelson", ingredients: ["½ oz. Bailey's","½ oz. Frangelico","Coffee"], garnish: "Whipped Cream" },
  { id: 144, cat: "coffee", name: "Hot Tamale", ingredients: ["Boiling Water","1 oz. Bourbon or Scotch","Cinnamon Stick","Tsp Honey"], garnish: "" },
  { id: 145, cat: "wine", name: "Dubonnet Cocktail", ingredients: ["1 oz. Gin","1 oz. Red Dubonnet"], garnish: "" },
  { id: 146, cat: "wine", name: "Diplomat / French Kiss", ingredients: ["1 oz. Dry Vermouth","1 oz. Sweet Vermouth"], garnish: "Lemon Twist" },
  { id: 147, cat: "wine", name: "Wine Cooler", ingredients: ["½ White, Red, or Rose Wine","½ 7 Up or Sprite"], garnish: "" },
  { id: 148, cat: "wine", name: "Spritzer", ingredients: ["½ White Wine","½ Club Soda"], garnish: "" },
  { id: 149, cat: "wine", name: "Kir", ingredients: ["1 oz. C. de Cassis","White Wine"], garnish: "" },
  { id: 150, cat: "wine", name: "Kir Royal", ingredients: ["1 oz. Chambord","Champagne"], garnish: "" },
  { id: 151, cat: "wine", name: "Champagne Cocktail", ingredients: ["1 Spoon Sugar","Fill w/ Champagne"], garnish: "Cherry" },
  { id: 152, cat: "wine", name: "Mimosa", ingredients: ["Fill 1/4 Orange Juice","Fill w/ Champagne"], garnish: "" },
  { id: 153, cat: "wine", name: "French 75", ingredients: ["1 oz. Gin","1½ oz. Sour Mix","Fill w/ Champagne"], garnish: "" },
  { id: 154, cat: "shooters", name: "Harbor Light", ingredients: ["Amaretto","Kahlua","Tequila","Brandy"], garnish: "" },
  { id: 155, cat: "shooters", name: "Stop Light", ingredients: ["Sloe Gin","Banana Liqueur","Green Menthe"], garnish: "" },
  { id: 156, cat: "shooters", name: "Girl Scout Cookie", ingredients: ["Brown Creme de Cacao","White Menthe","Cream"], garnish: "" },
  { id: 157, cat: "shooters", name: "Red Hot", ingredients: ["Cinnamon Schnapps","Tabasco (optional)"], garnish: "" },
  { id: 158, cat: "shooters", name: "Brain", ingredients: ["Strawberry Schnapps","Bailey's (drop by drop)"], garnish: "" },
  { id: 159, cat: "shooters", name: "Watermelon", ingredients: ["Midori","Vodka","Cranberry Juice"], garnish: "" },
  { id: 160, cat: "shooters", name: "Cherry Jell-O Shooter", ingredients: ["Cherry Jell-O","Cup boiling Water","Cup of Vodka","Chill"], garnish: "" },
  { id: 161, cat: "shooters", name: "Lemon Drop", ingredients: ["Vodka","Triple Sec","Splash of Sour Mix","Squeeze ½ Lemon"], garnish: "" },
  { id: 162, cat: "shooters", name: "Bubble Gum", ingredients: ["Midori","Vodka","Creme de Banana","Orange Juice","Grenadine"], garnish: "" },
  { id: 163, cat: "shooters", name: "Melon Ball", ingredients: ["Midori","Vodka","Pineapple Juice"], garnish: "" },
  { id: 164, cat: "shooters", name: "Kool-Aid", ingredients: ["Midori","Amaretto","Cranberry Juice"], garnish: "" },
  { id: 165, cat: "shooters", name: "Roman Creme", ingredients: ["Kahlua","Sambuca","Cream"], garnish: "" },
  { id: 166, cat: "shooters", name: "After 5", ingredients: ["Kahlua","Bailey's","Peppermint Schnapps"], garnish: "" },
  { id: 167, cat: "shooters", name: "Purple Hooter", ingredients: ["Vodka","Chambord","Sour Mix"], garnish: "" },
  { id: 168, cat: "shooters", name: "Alabama Slammer", ingredients: ["2 oz. Southern Comfort","Splash of Soda"], garnish: "" },
  { id: 169, cat: "shooters", name: "Tequila Slammer", ingredients: ["Tequila","Triple Sec","Rose's Lime Juice","Soda"], garnish: "" },
  { id: 170, cat: "shooters", name: "Woo Woo", ingredients: ["Vodka","Peach Schnapps","Cranberry Juice"], garnish: "" },
  { id: 171, cat: "shooters", name: "B-52", ingredients: ["Kahlua","Bailey's","Grand Marnier"], garnish: "" },
  { id: 172, cat: "shooters", name: "B-51", ingredients: ["Kahlua","Bailey's","151 Rum"], garnish: "" },
  { id: 173, cat: "shooters", name: "Mud Slide", ingredients: ["Vodka (bottom)","Bailey's","Kahlua (top)"], garnish: "Reverse layer" },
  { id: 174, cat: "shooters", name: "Mind Eraser", ingredients: ["Kahlua","Vodka","Club Soda"], garnish: "" },
  { id: 175, cat: "shooters", name: "Flaming Dr. Pepper", ingredients: ["Amaretto","Chambord","151 Rum"], garnish: "Serve with ½ glass of beer" },
  { id: 176, cat: "shooters", name: "Orgasm", ingredients: ["Kahlua","Bailey's","Frangelico","Cream"], garnish: "" },
  { id: 177, cat: "shooters", name: "Screaming Orgasm", ingredients: ["Kahlua","Bailey's","Frangelico","Vodka","Cream"], garnish: "" },
  { id: 178, cat: "shooters", name: "Nuts and Berries", ingredients: ["Frangelico","Chambord"], garnish: "" },
  { id: 179, cat: "shooters", name: "Slippery Nipple", ingredients: ["Sambuca","Peach Schnapps"], garnish: "" },
  { id: 180, cat: "shooters", name: "Incredible Hulk", ingredients: ["Jagermeister","Hpnotiq"], garnish: "" },
  { id: 181, cat: "shooters", name: "Liquid Cocaine", ingredients: ["Goldschlager","Jagermeister","151 Rum"], garnish: "" },
  { id: 182, cat: "shooters", name: "Sweet Tart", ingredients: ["Vodka","Chambord","Midori","Sour Mix"], garnish: "" },
  { id: 183, cat: "shooters", name: "Charlotte Hornet", ingredients: ["Vodka","Chambord","Midori","Pineapple Juice"], garnish: "" },
];

const CAT_COLORS = {
  martinis:"#7B68C8", one_liquor:"#C8821A", sours:"#A8A020", frozen:"#4A9CC8",
  two_liquor:"#A0522D", tropics:"#2E8B57", dessert:"#C84B8A",
  coffee:"#6B4226", wine:"#8B1A4A", shooters:"#C84040", community:"#4A8B8B",
};
const cc = (cat) => CAT_COLORS[cat] || "#C8821A";
const catLabel = (cat) => BOOK_CATEGORIES.find(c => c.id === cat)?.label || (cat === "community" ? "Community" : cat);

// ─── STORAGE HELPERS ───────────────────────────────────────────────────────
const SESSION_KEY = "adab_session";
function loadSession() {
  try { const r = sessionStorage.getItem(SESSION_KEY); return r ? JSON.parse(r) : { users: {}, currentUser: null }; }
  catch { return { users: {}, currentUser: null }; }
}
function saveSession(d) { try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(d)); } catch {} }

// Average community ratings from shared storage
function calcAvg(ratingsMap) {
  if (!ratingsMap || typeof ratingsMap !== "object") return { avg: null, count: 0 };
  const vals = Object.values(ratingsMap).filter(v => v > 0);
  return vals.length ? { avg: vals.reduce((a, b) => a + b, 0) / vals.length, count: vals.length } : { avg: null, count: 0 };
}

function Stars({ avg, count, color, size = "0.85rem" }) {
  if (!avg) return <span style={{ fontSize: "0.68rem", color: "#3A2E20" }}>No ratings yet</span>;
  const full = Math.floor(avg);
  const half = avg % 1 >= 0.4;
  return (
    <span>
      <span style={{ color: color || "#F0A500", fontSize: size }}>
        {"★".repeat(full)}{half ? "½" : ""}{"☆".repeat(5 - full - (half ? 1 : 0))}
      </span>
      <span style={{ fontSize: "0.68rem", color: "#7A6A55", marginLeft: 5 }}>
        {avg.toFixed(1)} ({count} {count === 1 ? "rating" : "ratings"})
      </span>
    </span>
  );
}

function FBar({ label, value, color }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <span style={{ fontSize: "0.72rem", color: "#C8A97E", textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</span>
        <span style={{ fontSize: "0.68rem", color: "#5A4A38" }}>{value}%</span>
      </div>
      <div style={{ background: "#1A1510", borderRadius: 2, height: 4, overflow: "hidden" }}>
        <div style={{ width: `${value}%`, height: "100%", background: `linear-gradient(90deg,${color},${color}AA)`, borderRadius: 2 }} />
      </div>
    </div>
  );
}

// ─── MAIN ──────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// SUPABASE — paste your project URL and anon key from:
// supabase.com → your project → Settings → API
// ─────────────────────────────────────────────────────────────────────────────
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Minimal REST client — no npm install needed while prototyping.
// When deploying: npm install @supabase/supabase-js and swap this out.
//
// SQL to run in your Supabase SQL Editor:
// ────────────────────────────────────────
// create table profiles (
//   id uuid references auth.users primary key,
//   username text unique not null,
//   is_premium boolean default false,
//   created_at timestamptz default now()
// );
// create table ratings (
//   id uuid default gen_random_uuid() primary key,
//   user_id uuid references profiles(id),
//   drink_id text not null,
//   stars int check (stars between 1 and 5),
//   unique(user_id, drink_id)
// );
// create table community_drinks (
//   id uuid default gen_random_uuid() primary key,
//   name text not null, spirit text, ingredients jsonb,
//   garnish text, notes text, where_found text,
//   submitted_by text, user_id uuid references profiles(id),
//   created_at timestamptz default now()
// );
// create table journal_entries (
//   id uuid default gen_random_uuid() primary key,
//   user_id uuid references profiles(id),
//   drink_id text, drink_name text, personal_notes text,
//   tried_where text, would_order_again boolean default true,
//   created_at timestamptz default now()
// );
// -- Then enable RLS on each table and add policies for authenticated users.
const _sb = {
  _h: () => ({ "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` }),
  _url: (t) => `${SUPABASE_URL}/rest/v1/${t}`,
  async select(table, q = "") {
    try { const r = await fetch(`${this._url(table)}${q}`, { headers: this._h() }); return r.ok ? { data: await r.json(), error: null } : { data: null, error: "fetch error" }; } catch { return { data: null, error: "network" }; }
  },
  async insert(table, row) {
    try { const r = await fetch(this._url(table), { method: "POST", headers: { ...this._h(), Prefer: "return=representation" }, body: JSON.stringify(row) }); return r.ok ? { data: await r.json(), error: null } : { data: null, error: "insert error" }; } catch { return { data: null, error: "network" }; }
  },
  async upsert(table, row, onConflict) {
    try { const r = await fetch(`${this._url(table)}?on_conflict=${onConflict}`, { method: "POST", headers: { ...this._h(), Prefer: "return=representation,resolution=merge-duplicates" }, body: JSON.stringify(row) }); return r.ok ? { data: await r.json(), error: null } : { data: null, error: "upsert error" }; } catch { return { data: null, error: "network" }; }
  },
  async signUp(email, password) {
    try { const r = await fetch(`${SUPABASE_URL}/auth/v1/signup`, { method: "POST", headers: this._h(), body: JSON.stringify({ email, password }) }); const d = await r.json(); return r.ok ? { user: d.user, error: null } : { user: null, error: d.error_description || d.msg }; } catch { return { user: null, error: "network" }; }
  },
  async signIn(email, password) {
    try { const r = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, { method: "POST", headers: this._h(), body: JSON.stringify({ email, password }) }); const d = await r.json(); return r.ok ? { user: d.user, error: null } : { user: null, error: d.error_description || d.msg }; } catch { return { user: null, error: "network" }; }
  },
};

const PREMIUM_COLOR = "#C8A020";
const ALL_SPIRITS_LIST = [
  "Gin","Vodka","Rum (Light)","Rum (Dark)","Rum 151","Tequila","Scotch","Bourbon/Whiskey",
  "Brandy","Triple Sec","Kahlua","Bailey's","Amaretto","Peach Schnapps","Southern Comfort",
  "Sloe Gin","Frangelico","Galliano","Chambord","Midori","Blue Curacao","Grenadine",
  "Sour Mix","Creme de Banana","Creme de Cacao","Creme de Menthe","Drambuie","Grand Marnier",
  "Champagne/Sparkling Wine","Vermouth (Dry)","Vermouth (Sweet)","Sambuca","Ouzo",
];

export default function App() {
  // ── Age gate ──────────────────────────────────────────────────────────────
  const [ageOk, setAgeOk] = useState(() => { try { return sessionStorage.getItem("age_ok") === "true"; } catch { return false; } });
  const [ageM, setAgeM] = useState(""); const [ageD, setAgeD] = useState(""); const [ageY, setAgeY] = useState("");
  const [ageErr, setAgeErr] = useState("");

  function confirmAge() {
    const m = parseInt(ageM), d = parseInt(ageD), y = parseInt(ageY);
    if (!m || !d || !y || y < 1900 || y > 2025) { setAgeErr("Please enter a valid date."); return; }
    const age = (Date.now() - new Date(y, m - 1, d)) / (1000 * 60 * 60 * 24 * 365.25);
    if (age < 21) { setAgeErr("You must be 21 or older to enter."); return; }
    try { sessionStorage.setItem("age_ok", "true"); } catch {}
    setAgeOk(true);
  }

  // ── Auth ──────────────────────────────────────────────────────────────────
  const [user, setUser] = useState(null); // { id, email, username, is_premium }
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authEmail, setAuthEmail] = useState(""); const [authPass, setAuthPass] = useState("");
  const [authUser, setAuthUser] = useState(""); const [authErr, setAuthErr] = useState("");
  const [authBusy, setAuthBusy] = useState(false);

  async function handleAuth() {
    setAuthErr(""); setAuthBusy(true);
    const isDemoMode = SUPABASE_URL === "YOUR_SUPABASE_URL";
    if (isDemoMode) {
      const store = JSON.parse(sessionStorage.getItem("demo_users") || "{}");
      if (authMode === "signup") {
        if (!authUser.trim()) { setAuthErr("Username required."); setAuthBusy(false); return; }
        if (store[authEmail]) { setAuthErr("Email already in use."); setAuthBusy(false); return; }
        const u = { id: Date.now().toString(), email: authEmail, username: authUser.trim(), is_premium: false };
        store[authEmail] = { ...u, pass: authPass };
        sessionStorage.setItem("demo_users", JSON.stringify(store));
        setUser(u);
      } else {
        const u = store[authEmail];
        if (!u || u.pass !== authPass) { setAuthErr("Email or password incorrect."); setAuthBusy(false); return; }
        setUser({ id: u.id, email: u.email, username: u.username, is_premium: u.is_premium });
      }
      setShowAuth(false); setAuthEmail(""); setAuthPass(""); setAuthUser(""); setAuthBusy(false); return;
    }
    // Real Supabase
    if (authMode === "signup") {
      const { user: u, error } = await _sb.signUp(authEmail, authPass);
      if (error) { setAuthErr(error); setAuthBusy(false); return; }
      await _sb.insert("profiles", { id: u.id, username: authUser.trim() });
      setUser({ id: u.id, email: authEmail, username: authUser.trim(), is_premium: false });
    } else {
      const { user: u, error } = await _sb.signIn(authEmail, authPass);
      if (error) { setAuthErr(error); setAuthBusy(false); return; }
      const { data } = await _sb.select("profiles", `?id=eq.${u.id}`);
      const p = data?.[0] || {};
      setUser({ id: u.id, email: authEmail, username: p.username || authEmail, is_premium: !!p.is_premium });
    }
    setShowAuth(false); setAuthEmail(""); setAuthPass(""); setAuthUser(""); setAuthBusy(false);
  }

  // ── Navigation ────────────────────────────────────────────────────────────
  const [tab, setTab] = useState("home");
  const [activeCat, setActiveCat] = useState("martinis");
  const [communityTab, setCommunityTab] = useState("browse");
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [search, setSearch] = useState("");
  const [activeSpirit, setActiveSpirit] = useState(null);
  const [showPremium, setShowPremium] = useState(false);

  // ── Shared storage ────────────────────────────────────────────────────────
  const [communityRatings, setCommunityRatings] = useState({});
  const [communityDrinks, setCommunityDrinks] = useState([]);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [r, d] = await Promise.all([window.storage.get("cr_v3", true), window.storage.get("cd_v3", true)]);
        if (r) setCommunityRatings(JSON.parse(r.value));
        if (d) setCommunityDrinks(JSON.parse(d.value));
      } catch {}
      setStorageReady(true);
    }
    load();
  }, []);

  // ── Personal data ─────────────────────────────────────────────────────────
  const [mySaved, setMySaved] = useState({});
  const [myRatings, setMyRatings] = useState({});
  const [journalEntries, setJournalEntries] = useState([]);

  // ── Build My Bar ──────────────────────────────────────────────────────────
  const [myBar, setMyBar] = useState([]);
  const [barResults, setBarResults] = useState(null);

  // ── Community form ────────────────────────────────────────────────────────
  const [nName, setNName] = useState(""); const [nSpirit, setNSpirit] = useState("");
  const [nIngredients, setNIngredients] = useState(""); const [nGarnish, setNGarnish] = useState("");
  const [nNotes, setNNotes] = useState(""); const [nWhere, setNWhere] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");

  // ── Tasting journal form ──────────────────────────────────────────────────
  const [jDrink, setJDrink] = useState(null); const [jNotes, setJNotes] = useState("");
  const [jWhere, setJWhere] = useState(""); const [jReorder, setJReorder] = useState(true);
  const [jBusy, setJBusy] = useState(false);

  const isPremium = !!user?.is_premium;

  // ── Helpers ───────────────────────────────────────────────────────────────
  function getDR(id) {
    const map = communityRatings[String(id)] || {};
    const { avg, count } = calcAvg(map);
    return { avg, count, mine: user ? map[user.username] : null };
  }

  async function rateDrink(drinkId, stars) {
    if (!user) { setShowAuth(true); return; }
    const key = String(drinkId);
    const updated = { ...communityRatings, [key]: { ...(communityRatings[key] || {}), [user.username]: stars } };
    setCommunityRatings(updated);
    setMyRatings(r => ({ ...r, [drinkId]: stars }));
    try { await window.storage.set("cr_v3", JSON.stringify(updated), true); } catch {}
    if (SUPABASE_URL !== "YOUR_SUPABASE_URL") {
      await _sb.upsert("ratings", { user_id: user.id, drink_id: key, stars }, "user_id,drink_id");
    }
  }

  function toggleSaved(id) {
    if (!user) { setShowAuth(true); return; }
    setMySaved(s => ({ ...s, [id]: !s[id] }));
  }

  async function submitCommunityDrink() {
    if (!user) { setShowAuth(true); return; }
    if (!nName.trim() || !nIngredients.trim()) { setSubmitStatus("error"); return; }
    setSubmitStatus("saving");
    const drink = {
      id: "c_" + Date.now(), cat: "community", name: nName.trim(), spirit: nSpirit.trim(),
      ingredients: nIngredients.split("\n").map(s => s.trim()).filter(Boolean),
      garnish: nGarnish.trim(), notes: nNotes.trim(), where: nWhere.trim(),
      submittedBy: user.username, submittedAt: new Date().toISOString(), spirits: [],
    };
    const updated = [drink, ...communityDrinks];
    setCommunityDrinks(updated);
    try {
      await window.storage.set("cd_v3", JSON.stringify(updated), true);
      setSubmitStatus("saved"); setNName(""); setNSpirit(""); setNIngredients(""); setNGarnish(""); setNNotes(""); setNWhere("");
      setTimeout(() => setSubmitStatus(""), 3000);
    } catch { setSubmitStatus("error"); }
  }

  function runBarFilter() {
    if (myBar.length === 0) { setBarResults([]); return; }
    // Map spirit selector names to ingredient keyword matches
    const keyMap = {
      "Gin": ["gin"], "Vodka": ["vodka"], "Rum (Light)": ["light rum","rum","bacardi"],
      "Rum (Dark)": ["dark rum"], "Rum 151": ["151 rum","151"], "Tequila": ["tequila","cuervo"],
      "Scotch": ["scotch"], "Bourbon/Whiskey": ["bourbon","whiskey","jack daniels","seagram","wild turkey","crown royal"],
      "Brandy": ["brandy"], "Triple Sec": ["triple sec","blue curacao","curacao"], "Kahlua": ["kahlua"],
      "Bailey's": ["bailey"], "Amaretto": ["amaretto","disaronno"], "Peach Schnapps": ["peach schnapps","butterscotch schnapps"],
      "Southern Comfort": ["southern comfort"], "Sloe Gin": ["sloe gin"],
      "Frangelico": ["frangelico"], "Galliano": ["galliano"], "Chambord": ["chambord"],
      "Midori": ["midori"], "Blue Curacao": ["blue curacao","curacao"], "Grenadine": ["grenadine"],
      "Sour Mix": ["sour mix"], "Creme de Banana": ["banana","c.d. banana","crème de banana","creme de banana"],
      "Creme de Cacao": ["cacao","creme de cacao"], "Creme de Menthe": ["menthe","de menthe"],
      "Drambuie": ["drambuie"], "Grand Marnier": ["grand marnier"],
      "Champagne/Sparkling Wine": ["champagne","wine"], "Vermouth (Dry)": ["dry vermouth"],
      "Vermouth (Sweet)": ["sweet vermouth"], "Sambuca": ["sambuca"], "Ouzo": ["ouzo"],
    };
    function drinkMatchesBar(d) {
      // A drink matches if every ingredient that maps to a spirit selector is covered
      const ingText = d.ingredients.join(" ").toLowerCase();
      // Find which selectors this drink needs
      const needed = Object.entries(keyMap).filter(([spirit, keywords]) =>
        keywords.some(kw => ingText.includes(kw))
      ).map(([spirit]) => spirit);
      if (needed.length === 0) return false;
      return needed.every(s => myBar.includes(s));
    }
    setBarResults(BOOK_DRINKS.filter(drinkMatchesBar));
  }
  function getMissingForDrink(d) {
    const keyMap = {
      "Gin":["gin"],"Vodka":["vodka"],"Rum (Light)":["light rum","rum","bacardi"],
      "Rum (Dark)":["dark rum"],"Rum 151":["151 rum","151"],"Tequila":["tequila","cuervo"],
      "Scotch":["scotch"],"Bourbon/Whiskey":["bourbon","whiskey","jack daniels","seagram","wild turkey","crown royal"],
      "Brandy":["brandy"],"Triple Sec":["triple sec","blue curacao","curacao"],"Kahlua":["kahlua"],
      "Bailey's":["bailey"],"Amaretto":["amaretto","disaronno"],"Peach Schnapps":["peach schnapps","butterscotch schnapps"],
      "Southern Comfort":["southern comfort"],"Sloe Gin":["sloe gin"],"Frangelico":["frangelico"],
      "Galliano":["galliano"],"Chambord":["chambord"],"Midori":["midori"],"Grenadine":["grenadine"],
      "Sour Mix":["sour mix"],"Creme de Banana":["banana","crème de banana","creme de banana"],
      "Creme de Cacao":["cacao","creme de cacao"],"Creme de Menthe":["menthe","de menthe"],
      "Drambuie":["drambuie"],"Grand Marnier":["grand marnier"],
      "Champagne/Sparkling Wine":["champagne","wine"],"Vermouth (Dry)":["dry vermouth"],
      "Vermouth (Sweet)":["sweet vermouth"],"Sambuca":["sambuca"],"Ouzo":["ouzo"],
    };
    const ingText = d.ingredients.join(" ").toLowerCase();
    return Object.entries(keyMap).filter(([spirit, keywords]) =>
      keywords.some(kw => ingText.includes(kw)) && !myBar.includes(spirit)
    ).map(([spirit]) => spirit);
  }

  async function saveJournalEntry() {
    if (!jDrink) return;
    setJBusy(true);
    const entry = { id: Date.now().toString(), drinkId: jDrink.id, drinkName: jDrink.name, notes: jNotes, where: jWhere, wouldOrderAgain: jReorder, createdAt: new Date().toISOString() };
    setJournalEntries(j => [entry, ...j]);
    if (SUPABASE_URL !== "YOUR_SUPABASE_URL" && user) {
      await _sb.insert("journal_entries", { user_id: user.id, drink_id: String(jDrink.id), drink_name: jDrink.name, personal_notes: jNotes, tried_where: jWhere, would_order_again: jReorder });
    }
    setJDrink(null); setJNotes(""); setJWhere(""); setJReorder(true); setJBusy(false);
  }

  // ── Derived ───────────────────────────────────────────────────────────────
  const allDrinks = [...BOOK_DRINKS, ...communityDrinks];
  const savedDrinks = allDrinks.filter(d => mySaved[d.id]);
  const savedCount = savedDrinks.length;
  const sortedCommunity = [...communityDrinks].sort((a, b) => (calcAvg(communityRatings[String(b.id)]).avg || 0) - (calcAvg(communityRatings[String(a.id)]).avg || 0));
  const topRated = BOOK_DRINKS.map(d => ({ ...d, ...calcAvg(communityRatings[String(d.id)]) })).filter(d => d.count > 0).sort((a, b) => b.avg - a.avg).slice(0, 6);
  const searchResults = search.trim().length > 1 ? allDrinks.filter(d => d.name.toLowerCase().includes(search.toLowerCase())) : [];


  // ── Styles ────────────────────────────────────────────────────────────────
  const S = {
    app: { minHeight:"100vh", background:"#0A0806", color:"#E8DCC8", fontFamily:"Georgia,serif", maxWidth:960, margin:"0 auto" },
    hdr: { background:"linear-gradient(180deg,#1A1208,#0A0806)", borderBottom:"1px solid #221808", padding:"10px 15px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100, flexWrap:"wrap", gap:6 },
    logo: { fontStyle:"italic", background:"linear-gradient(135deg,#F0A500,#C8821A)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", fontSize:"1.05rem" },
    nav: { display:"flex", gap:2, background:"#120E08", padding:3, borderRadius:8, border:"1px solid #221808", flexWrap:"wrap" },
    nb: (a, gold) => ({ padding:"4px 9px", borderRadius:5, border:"none", cursor:"pointer", fontSize:"0.65rem", fontFamily:"Georgia,serif", fontWeight: a ? "bold" : "normal", background: a ? (gold ? `linear-gradient(135deg,${PREMIUM_COLOR},#E8C840)` : "linear-gradient(135deg,#C8821A,#F0A500)") : "transparent", color: a ? "#0A0806" : gold ? PREMIUM_COLOR : "#7A6A55" }),
    sec: { padding:20 },
    sttl: { fontSize:"0.87rem", fontStyle:"italic", color:"#C8A97E", marginBottom:10, paddingBottom:4, borderBottom:"1px solid #1A1510" },
    grid: { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:9 },
    card: (cat) => ({ background:"#111008", border:`1px solid ${cc(cat)}30`, borderRadius:10, padding:13, cursor:"pointer", position:"relative", overflow:"hidden", transition:"border-color 0.2s" }),
    cardTop: (cat) => ({ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,${cc(cat)},transparent)` }),
    badge: (col) => ({ display:"inline-block", padding:"1px 7px", background:col+"20", border:`1px solid ${col}50`, borderRadius:20, fontSize:"0.58rem", color:col, textTransform:"uppercase", letterSpacing:"0.5px" }),
    input: { width:"100%", background:"#111008", border:"1px solid #221808", borderRadius:7, padding:"8px 12px", color:"#E8DCC8", fontSize:"0.82rem", boxSizing:"border-box", fontFamily:"Georgia,serif", outline:"none" },
    textarea: { width:"100%", background:"#111008", border:"1px solid #221808", borderRadius:7, padding:"8px 12px", color:"#E8DCC8", fontSize:"0.82rem", boxSizing:"border-box", fontFamily:"Georgia,serif", outline:"none", resize:"vertical" },
    lbl: { display:"block", fontSize:"0.65rem", color:"#C8A97E", textTransform:"uppercase", letterSpacing:"1px", marginBottom:4 },
    overlay: { position:"fixed", inset:0, background:"rgba(0,0,0,0.92)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:16 },
    modal: { background:"#111008", border:"1px solid #221808", borderRadius:14, width:"100%", maxWidth:450, maxHeight:"88vh", overflowY:"auto", padding:22, position:"relative" },
    closeBtn: { position:"absolute", top:11, right:11, background:"#1A1510", border:"none", color:"#7A6A55", width:27, height:27, borderRadius:"50%", cursor:"pointer", fontSize:"0.8rem" },
    aBtn: (col) => ({ flex:1, padding:8, background:col+"20", border:`1px solid ${col}60`, color:col, borderRadius:20, cursor:"pointer", fontSize:"0.72rem", fontFamily:"Georgia,serif" }),
    premBanner: { background:`linear-gradient(135deg,${PREMIUM_COLOR}15,${PREMIUM_COLOR}05)`, border:`1px solid ${PREMIUM_COLOR}40`, borderRadius:8, padding:"10px 14px", marginBottom:14, cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center" },
  };

  // ── DrinkCard sub-component ───────────────────────────────────────────────
  function DrinkCard({ d, showCat }) {
    const { avg, count, mine } = getDR(d.id);
    return (
      <div style={S.card(d.cat)} onClick={() => setSelectedDrink(d)}
        onMouseEnter={e => e.currentTarget.style.borderColor = cc(d.cat) + "80"}
        onMouseLeave={e => e.currentTarget.style.borderColor = cc(d.cat) + "30"}>
        <div style={S.cardTop(d.cat)} />
        {showCat && <div style={{ ...S.badge(cc(d.cat)), marginBottom:5 }}>{catLabel(d.cat)}</div>}
        {d.submittedBy && <div style={{ fontSize:"0.59rem", color:"#5A4030", marginBottom:3 }}>by {d.submittedBy}</div>}
        <div style={{ fontSize:"0.89rem", fontStyle:"italic", color:"#E8DCC8", marginBottom:3 }}>{d.name}</div>
        {d.spirit && <div style={{ fontSize:"0.64rem", color:cc(d.cat), marginBottom:3 }}>{d.spirit}</div>}
        <div style={{ fontSize:"0.66rem", color:"#5A4A38", lineHeight:1.55, marginBottom:5 }}>{d.ingredients.slice(0,3).join(" · ")}{d.ingredients.length>3?` +${d.ingredients.length-3}`:""}</div>
        <Stars avg={avg} count={count} color={cc(d.cat)} />
        {mine && <div style={{ fontSize:"0.59rem", color:"#5A4030", marginTop:2 }}>Your rating: {"★".repeat(mine)}</div>}
        <div style={{ display:"flex", justifyContent:"space-between", marginTop:8 }}>
          <button onClick={e=>{e.stopPropagation();toggleSaved(d.id);}} style={{ background:mySaved[d.id]?cc(d.cat)+"20":"#1A1510", border:`1px solid ${mySaved[d.id]?cc(d.cat):"#221808"}`, color:mySaved[d.id]?cc(d.cat):"#5A4A38", padding:"3px 9px", borderRadius:20, cursor:"pointer", fontSize:"0.67rem" }}>
            {mySaved[d.id]?"♥":"♡"}
          </button>
          <span style={{ fontSize:"0.59rem", color:"#2A2010" }}>recipe →</span>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // AGE GATE SCREEN
  // ─────────────────────────────────────────────────────────────────────────
  if (!ageOk) return (
    <div style={{ minHeight:"100vh", background:"#0A0806", display:"flex", alignItems:"center", justifyContent:"center", padding:24, fontFamily:"Georgia,serif" }}>
      <div style={{ maxWidth:360, width:"100%", textAlign:"center" }}>
        <div style={{ fontSize:"3.2rem", marginBottom:14 }}>🥃</div>
        <h1 style={{ fontSize:"1.75rem", fontStyle:"italic", background:"linear-gradient(135deg,#F0A500,#C8821A)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:5, lineHeight:1.2 }}>A Dab of This,<br/>A Dab of That</h1>
        <p style={{ color:"#5A4030", fontSize:"0.68rem", letterSpacing:"2px", textTransform:"uppercase", marginBottom:24 }}>By Andrew Flannigan</p>
        <div style={{ background:"#111008", border:"1px solid #221808", borderRadius:12, padding:22 }}>
          <p style={{ color:"#C8A97E", fontSize:"0.86rem", marginBottom:18, fontStyle:"italic", lineHeight:1.65 }}>
            This app contains alcohol content.<br/>Please confirm you are 21 or older.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1.5fr", gap:7, marginBottom:12 }}>
            {[["MM",ageM,setAgeM,2],["DD",ageD,setAgeD,2],["YYYY",ageY,setAgeY,4]].map(([ph,val,set,max]) => (
              <input key={ph} style={{ ...S.input, textAlign:"center" }} placeholder={ph} value={val} maxLength={max} onChange={e=>set(e.target.value.replace(/\D/g,""))} onKeyDown={e=>e.key==="Enter"&&confirmAge()} />
            ))}
          </div>
          {ageErr && <p style={{ color:"#C84040", fontSize:"0.72rem", marginBottom:10 }}>{ageErr}</p>}
          <button onClick={confirmAge} style={{ width:"100%", padding:11, background:"linear-gradient(135deg,#C8821A,#F0A500)", border:"none", borderRadius:8, color:"#0A0806", fontSize:"0.9rem", fontFamily:"Georgia,serif", fontStyle:"italic", fontWeight:"bold", cursor:"pointer" }}>
            Enter →
          </button>
          <p style={{ color:"#3A2E20", fontSize:"0.6rem", marginTop:12, lineHeight:1.6 }}>By entering you confirm you are of legal drinking age in your location. Please drink responsibly.</p>
        </div>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // MAIN RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div style={S.app}>
      {/* HEADER */}
      <header style={S.hdr}>
        <div>
          <div style={S.logo}>A Dab of This, A Dab of That</div>
          <div style={{ fontSize:"0.55rem", color:"#5A4030", textTransform:"uppercase", letterSpacing:"2px" }}>Andrew Flannigan · Mirmandab, Afghanistan</div>
        </div>
        <nav style={S.nav}>
          {[["home","Home"],["browse","Browse"],["spirits","Spirits"],["community","Community"],["barcard","Bar Card"],["saved",savedCount>0?`Saved(${savedCount})`:"Saved"],["account",user?user.username.split(" ")[0]:"Sign In"]].map(([id,lbl])=>(
            <button key={id} style={S.nb(tab===id,false)} onClick={()=>{if(id==="account"&&!user)setShowAuth(true);else setTab(id);}}>{lbl}</button>
          ))}
          {!isPremium && <button style={S.nb(false,true)} onClick={()=>setShowPremium(true)}>⭐ Premium</button>}
          {isPremium && <button style={S.nb(tab==="mybar",true)} onClick={()=>setTab("mybar")}>🍸 My Bar</button>}
          {isPremium && <button style={S.nb(tab==="journal",true)} onClick={()=>setTab("journal")}>📓 Journal</button>}
        </nav>
      </header>

      {/* AUTH MODAL */}
      {showAuth && (
        <div style={S.overlay} onClick={()=>setShowAuth(false)}>
          <div style={{...S.modal,maxWidth:350}} onClick={e=>e.stopPropagation()}>
            <button style={S.closeBtn} onClick={()=>setShowAuth(false)}>✕</button>
            <div style={{ fontSize:"1.2rem", fontStyle:"italic", color:"#E8DCC8", marginBottom:3 }}>{authMode==="login"?"Welcome back":"Join the community"}</div>
            <div style={{ fontSize:"0.68rem", color:"#5A4030", marginBottom:14 }}>Rate drinks, share recipes, and unlock premium features.</div>
            {SUPABASE_URL==="YOUR_SUPABASE_URL" && <div style={{ fontSize:"0.66rem", color:"#8B6914", background:"#8B691420", border:"1px solid #8B691440", borderRadius:6, padding:"5px 9px", marginBottom:10 }}>Demo mode — accounts reset on page reload. Add Supabase credentials to persist.</div>}
            <div style={{ display:"flex", gap:0, marginBottom:12, background:"#1A1510", borderRadius:8, padding:3 }}>
              {["login","signup"].map(m=>(
                <button key={m} onClick={()=>{setAuthMode(m);setAuthErr("");}} style={{ flex:1, padding:"5px 0", borderRadius:6, border:"none", cursor:"pointer", background:authMode===m?"#C8821A":"transparent", color:authMode===m?"#0A0806":"#7A6A55", fontSize:"0.74rem", fontFamily:"Georgia,serif" }}>
                  {m==="login"?"Log In":"Sign Up"}
                </button>
              ))}
            </div>
            {authMode==="signup" && <input style={{...S.input,marginBottom:8}} placeholder="Username (shown publicly)" value={authUser} onChange={e=>setAuthUser(e.target.value)} />}
            <input style={{...S.input,marginBottom:8}} placeholder="Email address" value={authEmail} onChange={e=>setAuthEmail(e.target.value)} />
            <input style={{...S.input,marginBottom:12}} type="password" placeholder="Password" value={authPass} onChange={e=>setAuthPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleAuth()} />
            {authErr && <div style={{ fontSize:"0.68rem", color:"#C84040", marginBottom:8 }}>{authErr}</div>}
            <button onClick={handleAuth} disabled={authBusy} style={{ width:"100%", padding:10, background:"linear-gradient(135deg,#C8821A,#F0A500)", border:"none", borderRadius:8, color:"#0A0806", fontSize:"0.87rem", fontFamily:"Georgia,serif", fontStyle:"italic", fontWeight:"bold", cursor:"pointer", opacity:authBusy?0.6:1 }}>
              {authBusy?"One moment...":authMode==="login"?"Log in →":"Create account →"}
            </button>
          </div>
        </div>
      )}

      {/* PREMIUM MODAL */}
      {showPremium && (
        <div style={S.overlay} onClick={()=>setShowPremium(false)}>
          <div style={{...S.modal,maxWidth:390}} onClick={e=>e.stopPropagation()}>
            <button style={S.closeBtn} onClick={()=>setShowPremium(false)}>✕</button>
            <div style={{ textAlign:"center", marginBottom:18 }}>
              <div style={{ fontSize:"2.4rem", marginBottom:7 }}>⭐</div>
              <h2 style={{ fontSize:"1.35rem", fontStyle:"italic", background:`linear-gradient(135deg,${PREMIUM_COLOR},#E8C840)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", margin:"0 0 4px" }}>Unlock Premium</h2>
              <div style={{ fontSize:"0.7rem", color:"#5A4030", marginBottom:4 }}>One-time purchase · No subscription ever</div>
              <div style={{ fontSize:"1.9rem", fontStyle:"italic", color:PREMIUM_COLOR }}>$2.99</div>
            </div>
            {[
              ["🍸","Build My Bar","Check off what spirits you own — instantly see every drink from Andrew's book you can make right now."],
              ["📓","Tasting Journal","Log every drink you try with personal notes, where you had it, and whether you'd order it again."],
              ["📄","PDF Bar Card","Export your saved list as a printable card to hand to any bartender."],
              ["🔍","Advanced Filters","Filter the full book by flavor profile, spirit type, or complexity."],
            ].map(([icon,title,desc])=>(
              <div key={title} style={{ display:"flex", gap:11, padding:"10px 0", borderBottom:"1px solid #1A1510" }}>
                <div style={{ fontSize:"1.35rem", flexShrink:0 }}>{icon}</div>
                <div>
                  <div style={{ fontSize:"0.86rem", fontStyle:"italic", color:"#E8DCC8", marginBottom:2 }}>{title}</div>
                  <div style={{ fontSize:"0.7rem", color:"#6A5A44", lineHeight:1.55 }}>{desc}</div>
                </div>
              </div>
            ))}
            <button onClick={()=>{
              // Production: trigger Google Play Billing via Capacitor
              // import { InAppPurchase2 } from '@ionic-native/in-app-purchase-2';
              // For now: simulate unlock
              if(!user){setShowPremium(false);setShowAuth(true);return;}
              setUser(u=>({...u,is_premium:true}));
              setShowPremium(false);
            }} style={{ width:"100%", marginTop:16, padding:12, background:`linear-gradient(135deg,${PREMIUM_COLOR},#E8C840)`, border:"none", borderRadius:8, color:"#0A0806", fontSize:"0.9rem", fontFamily:"Georgia,serif", fontStyle:"italic", fontWeight:"bold", cursor:"pointer" }}>
              Unlock for $2.99 →
            </button>
            <p style={{ textAlign:"center", fontSize:"0.6rem", color:"#3A2E20", marginTop:9 }}>Supports Andrew and helps keep the app free for everyone.</p>
          </div>
        </div>
      )}

      {/* HOME */}
      {tab==="home" && (
        <>
          <div style={{ padding:"36px 20px 20px", textAlign:"center", background:"linear-gradient(180deg,#1A1208,#0A0806 70%)", position:"relative" }}>
            <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:340, height:200, background:"radial-gradient(ellipse,rgba(200,130,26,0.1),transparent 70%)", pointerEvents:"none" }} />
            <div style={{ fontSize:"2.6rem", marginBottom:6 }}>🥃</div>
            <h1 style={{ fontSize:"2rem", fontStyle:"italic", background:"linear-gradient(135deg,#F0A500,#C8821A,#E8C87A)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", lineHeight:1.2, marginBottom:5 }}>A Dab of This,<br/>A Dab of That</h1>
            <div style={{ color:"#5A4030", fontSize:"0.66rem", textTransform:"uppercase", letterSpacing:"3px", marginBottom:13 }}>By Andrew Flannigan</div>
            <p style={{ color:"#7A6A55", fontSize:"0.77rem", lineHeight:1.8, maxWidth:490, margin:"0 auto 18px", fontStyle:"italic" }}>
              Written in Mirmandab, Afghanistan during a 9-month tour with the 82nd Airborne and Special Operations — drawing on bartending school in Fayetteville, NC, memories from Whistler, BC, and recipes swapped with soldiers on the left and right.
            </p>
            <div style={{ display:"flex", justifyContent:"center", gap:22 }}>
              {[["183","Book Recipes"],["10","Chapters"],["8","Spirits"],[communityDrinks.length||"0","Community"]].map(([n,l])=>(
                <div key={l} style={{ textAlign:"center" }}>
                  <div style={{ fontSize:"1.55rem", fontStyle:"italic", background:"linear-gradient(135deg,#F0A500,#C8821A)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{n}</div>
                  <div style={{ fontSize:"0.56rem", color:"#5A4030", textTransform:"uppercase", letterSpacing:"1.5px" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          {!isPremium && (
            <div style={{ padding:"0 20px" }}>
              <div style={S.premBanner} onClick={()=>setShowPremium(true)}>
                <div>
                  <div style={{ fontSize:"0.8rem", color:PREMIUM_COLOR, fontStyle:"italic" }}>⭐ Unlock Premium — $2.99 one-time</div>
                  <div style={{ fontSize:"0.66rem", color:"#5A4030", marginTop:2 }}>Build My Bar · Tasting Journal · PDF Export</div>
                </div>
                <span style={{ color:PREMIUM_COLOR, fontSize:"0.8rem" }}>→</span>
              </div>
            </div>
          )}
          {topRated.length>0 && (
            <div style={S.sec}>
              <div style={S.sttl}>⭐ Top Rated by the Community</div>
              <div style={S.grid}>{topRated.map(d=><DrinkCard key={d.id} d={d} showCat />)}</div>
            </div>
          )}
          <div style={S.sec}>
            <div style={S.sttl}>Browse by Chapter</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(152px,1fr))", gap:8 }}>
              {BOOK_CATEGORIES.map(cat=>(
                <div key={cat.id} onClick={()=>{setActiveCat(cat.id);setTab("browse");}} style={{ background:"#111008", border:`1px solid ${cc(cat.id)}35`, borderRadius:10, padding:"12px 11px", cursor:"pointer", transition:"border-color 0.2s" }}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=cc(cat.id)+"90"}
                  onMouseLeave={e=>e.currentTarget.style.borderColor=cc(cat.id)+"35"}>
                  <div style={{ fontSize:"1.45rem", marginBottom:4 }}>{cat.emoji}</div>
                  <div style={{ fontSize:"0.76rem", fontStyle:"italic", color:"#E8DCC8" }}>{cat.label}</div>
                  <div style={{ fontSize:"0.59rem", color:cc(cat.id), marginTop:2 }}>{BOOK_DRINKS.filter(d=>d.cat===cat.id).length} drinks</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* BROWSE */}
      {tab==="browse" && (
        <div style={S.sec}>
          <input style={{...S.input,marginBottom:10}} placeholder="Search all drinks..." value={search} onChange={e=>setSearch(e.target.value)} />
          {!search && (
            <div style={{ display:"flex", gap:5, overflowX:"auto", paddingBottom:8, marginBottom:10 }}>
              {BOOK_CATEGORIES.map(cat=>(
                <button key={cat.id} onClick={()=>setActiveCat(cat.id)} style={{ padding:"4px 11px", border:`1px solid ${activeCat===cat.id?cc(cat.id):cc(cat.id)+"40"}`, borderRadius:20, background:activeCat===cat.id?cc(cat.id)+"25":"transparent", color:activeCat===cat.id?cc(cat.id):"#5A4A38", cursor:"pointer", fontSize:"0.66rem", whiteSpace:"nowrap", flexShrink:0 }}>
                  {cat.emoji} {cat.label}
                </button>
              ))}
            </div>
          )}
          <div style={S.sttl}>{search?`"${search}" — ${searchResults.length} found`:`${catLabel(activeCat)} — ${BOOK_DRINKS.filter(d=>d.cat===activeCat).length} drinks`}</div>
          <div style={S.grid}>{(search?searchResults:BOOK_DRINKS.filter(d=>d.cat===activeCat)).map(d=><DrinkCard key={d.id} d={d} showCat={!!search} />)}</div>
        </div>
      )}

      {/* SPIRITS */}
      {tab==="spirits" && (
        <div style={S.sec}>
          <div style={{ fontSize:"1.3rem", fontStyle:"italic", background:"linear-gradient(135deg,#F0A500,#C8821A)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:3 }}>The Spirit Guide</div>
          <p style={{ color:"#5A4030", fontSize:"0.72rem", marginBottom:15, fontStyle:"italic" }}>Understand what's in your glass. Every spirit used in the book.</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(122px,1fr))", gap:7, marginBottom:18 }}>
            {SPIRITS_GUIDE.map(s=>(
              <div key={s.id} onClick={()=>setActiveSpirit(activeSpirit?.id===s.id?null:s)} style={{ background:activeSpirit?.id===s.id?s.color+"20":"#111008", border:`1px solid ${activeSpirit?.id===s.id?s.color:s.color+"40"}`, borderRadius:10, padding:"10px 8px", cursor:"pointer", textAlign:"center", transition:"all 0.2s" }}>
                <div style={{ fontSize:"1.5rem", marginBottom:3 }}>{s.emoji}</div>
                <div style={{ fontSize:"0.75rem", fontStyle:"italic", color:"#E8DCC8" }}>{s.name}</div>
                <div style={{ fontSize:"0.56rem", color:s.color, marginTop:2 }}>{s.tagline}</div>
              </div>
            ))}
          </div>
          {activeSpirit && (
            <div style={{ background:"#111008", border:`1px solid ${activeSpirit.color}40`, borderRadius:12, padding:18 }}>
              <div style={{ display:"flex", alignItems:"center", gap:11, marginBottom:11 }}>
                <span style={{ fontSize:"1.9rem" }}>{activeSpirit.emoji}</span>
                <div>
                  <h2 style={{ fontSize:"1.25rem", fontStyle:"italic", color:activeSpirit.color, margin:0 }}>{activeSpirit.name}</h2>
                  <div style={{ fontSize:"0.59rem", color:"#5A4030", textTransform:"uppercase", letterSpacing:"1px" }}>{activeSpirit.tagline}</div>
                </div>
              </div>
              <p style={{ color:"#8A7A64", fontSize:"0.78rem", lineHeight:1.75, marginBottom:13 }}>{activeSpirit.overview}</p>
              <div style={S.sttl}>Flavor Profile</div>
              {activeSpirit.flavor.map(f=><FBar key={f.label} {...f} color={activeSpirit.color} />)}
              <div style={{...S.sttl,marginTop:13}}>Expressions & Styles</div>
              {activeSpirit.subtypes.map(sub=>(
                <div key={sub.name} style={{ padding:"6px 0", borderBottom:"1px solid #1A1510" }}>
                  <div style={{ fontSize:"0.81rem", fontStyle:"italic", color:"#E8DCC8" }}>{sub.name}</div>
                  <div style={{ fontSize:"0.67rem", color:"#5A4A38", marginTop:2 }}>{sub.note}</div>
                </div>
              ))}
              <div style={{...S.sttl,marginTop:13}}>Pairs Well With</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:11 }}>
                {activeSpirit.pairings.map(p=><span key={p} style={S.badge(activeSpirit.color)}>{p}</span>)}
              </div>
              <div style={{ background:"#1A1510", borderRadius:7, padding:"9px 11px", fontStyle:"italic", color:"#8A7A64", fontSize:"0.73rem", marginBottom:13 }}>
                <span style={{ color:activeSpirit.color }}>Andrew's tip: </span>{activeSpirit.barTip}
              </div>
              <div style={S.sttl}>In This Book</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                {activeSpirit.bookDrinks.map(name=>{const d=BOOK_DRINKS.find(x=>x.name===name);return d?<span key={name} onClick={()=>setSelectedDrink(d)} style={{...S.badge(cc(d.cat)),cursor:"pointer",padding:"3px 9px"}}>{name}</span>:null;})}
              </div>
            </div>
          )}
        </div>
      )}

      {/* COMMUNITY */}
      {tab==="community" && (
        <div style={S.sec}>
          <div style={{ fontSize:"1.3rem", fontStyle:"italic", background:"linear-gradient(135deg,#4AC8C8,#2E8B8B)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:3 }}>Community Bar</div>
          <p style={{ color:"#5A4030", fontSize:"0.72rem", marginBottom:13, fontStyle:"italic" }}>Drinks discovered and shared by the community.</p>
          <div style={{ display:"flex", gap:0, marginBottom:16, background:"#1A1510", borderRadius:8, padding:3, maxWidth:280 }}>
            {[["browse","Browse"],["share","Share a Drink"]].map(([id,lbl])=>(
              <button key={id} onClick={()=>setCommunityTab(id)} style={{ flex:1, padding:"6px 0", borderRadius:6, border:"none", cursor:"pointer", background:communityTab===id?"#4A8B8B":"transparent", color:communityTab===id?"#E8DCC8":"#7A6A55", fontSize:"0.74rem", fontFamily:"Georgia,serif", fontStyle:communityTab===id?"italic":"normal" }}>{lbl}</button>
            ))}
          </div>
          {communityTab==="browse" && (
            <>
              {!storageReady&&<div style={{ textAlign:"center", padding:"38px 0", color:"#5A4A38", fontStyle:"italic" }}>Loading...</div>}
              {storageReady&&sortedCommunity.length===0&&(
                <div style={{ textAlign:"center", padding:"44px 0" }}>
                  <div style={{ fontSize:"2rem", marginBottom:9 }}>🍹</div>
                  <div style={{ color:"#5A4030", fontStyle:"italic", marginBottom:5 }}>No community drinks yet.</div>
                  <button onClick={()=>setCommunityTab("share")} style={{ marginTop:8, padding:"6px 16px", background:"#4A8B8B20", border:"1px solid #4A8B8B60", color:"#4AC8C8", borderRadius:20, cursor:"pointer", fontSize:"0.76rem", fontFamily:"Georgia,serif" }}>Share the first one →</button>
                </div>
              )}
              {storageReady&&sortedCommunity.length>0&&<div style={S.grid}>{sortedCommunity.map(d=><DrinkCard key={d.id} d={d} showCat={false} />)}</div>}
            </>
          )}
          {communityTab==="share" && (
            <div style={{ maxWidth:510 }}>
              {!user&&<div style={{ background:"#1A1510", border:"1px solid #4A8B8B40", borderRadius:10, padding:14, marginBottom:14, textAlign:"center" }}>
                <div style={{ color:"#C8A97E", fontStyle:"italic", marginBottom:8, fontSize:"0.82rem" }}>Sign in to share a drink with the community.</div>
                <button onClick={()=>setShowAuth(true)} style={{ padding:"6px 16px", background:"#4A8B8B20", border:"1px solid #4A8B8B60", color:"#4AC8C8", borderRadius:20, cursor:"pointer", fontSize:"0.76rem", fontFamily:"Georgia,serif" }}>Sign in →</button>
              </div>}
              <div style={{ background:"#111008", border:"1px solid #221808", borderRadius:12, padding:18 }}>
                <div style={{ fontSize:"0.88rem", fontStyle:"italic", color:"#C8A97E", marginBottom:14 }}>Tell the community about a drink worth ordering.</div>
                {[["Drink Name *",nName,setNName,"e.g. The Smoke Signal"],["Spirit Base",nSpirit,setNSpirit,"e.g. Mezcal, Bourbon, Gin"],["Garnish",nGarnish,setNGarnish,"e.g. Lemon wheel"],["Where'd you find it?",nWhere,setNWhere,"Bar name or city"]].map(([lbl,val,set,ph])=>(
                  <div key={lbl} style={{ marginBottom:10 }}>
                    <label style={S.lbl}>{lbl}</label>
                    <input style={S.input} placeholder={ph} value={val} onChange={e=>set(e.target.value)} />
                  </div>
                ))}
                <div style={{ marginBottom:10 }}>
                  <label style={S.lbl}>Ingredients * (one per line)</label>
                  <textarea style={{...S.textarea,minHeight:85}} placeholder={"2 oz. Bourbon\n½ oz. Honey syrup\n¾ oz. Lemon juice"} value={nIngredients} onChange={e=>setNIngredients(e.target.value)} />
                </div>
                <div style={{ marginBottom:14 }}>
                  <label style={S.lbl}>Tasting Notes</label>
                  <textarea style={{...S.textarea,minHeight:58}} placeholder="What made it memorable?" value={nNotes} onChange={e=>setNNotes(e.target.value)} />
                </div>
                {submitStatus==="error"&&<div style={{ fontSize:"0.7rem", color:"#C84040", marginBottom:8 }}>Name and at least one ingredient required.</div>}
                {submitStatus==="saved"&&<div style={{ fontSize:"0.7rem", color:"#4AC8C8", marginBottom:8 }}>✓ Shared with the community!</div>}
                <button onClick={submitCommunityDrink} disabled={submitStatus==="saving"} style={{ width:"100%", padding:10, background:submitStatus==="saved"?"#2E8B8B":"linear-gradient(135deg,#2E8B8B,#4AC8C8)", border:"none", borderRadius:8, color:"#E8DCC8", fontSize:"0.86rem", fontFamily:"Georgia,serif", fontStyle:"italic", fontWeight:"bold", cursor:"pointer", opacity:submitStatus==="saving"?0.6:1 }}>
                  {submitStatus==="saving"?"Pouring it in...":submitStatus==="saved"?"✓ Shared!":"Pour it into the community →"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* BAR CARD */}
      {tab==="barcard" && (
        <div style={S.sec}>
          <div style={{ fontSize:"1.3rem", fontStyle:"italic", background:"linear-gradient(135deg,#F0A500,#C8821A)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:3 }}>Bar Card</div>
          <p style={{ color:"#5A4030", fontSize:"0.72rem", marginBottom:16 }}>Show this to your bartender. Every recipe, exactly as written.</p>
          {BOOK_CATEGORIES.map(cat=>(
            <div key={cat.id} style={{ marginBottom:18 }}>
              <div style={{ fontSize:"0.65rem", color:cc(cat.id), textTransform:"uppercase", letterSpacing:"2px", marginBottom:6, display:"flex", alignItems:"center", gap:5 }}>{cat.emoji} {cat.label}</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:6 }}>
                {BOOK_DRINKS.filter(d=>d.cat===cat.id).map(d=>{
                  const {avg,count}=getDR(d.id);
                  return (
                    <div key={d.id} style={{ background:"#111008", border:`1px solid ${cc(d.cat)}28`, borderRadius:7, padding:"9px 10px", position:"relative", overflow:"hidden" }}>
                      <div style={{ position:"absolute", top:0, left:0, width:3, height:"100%", background:cc(d.cat) }} />
                      <div style={{ paddingLeft:8 }}>
                        <div style={{ fontStyle:"italic", color:"#E8DCC8", fontSize:"0.81rem", marginBottom:3 }}>{d.name}</div>
                        {d.ingredients.map((ing,i)=><div key={i} style={{ fontSize:"0.64rem", color:"#7A6A55", lineHeight:1.58 }}>{ing}</div>)}
                        {d.garnish?<div style={{ fontSize:"0.59rem", color:cc(d.cat), marginTop:2 }}>— {d.garnish}</div>:null}
                        {avg&&<div style={{ marginTop:4 }}><Stars avg={avg} count={count} color={cc(d.cat)} size="0.68rem" /></div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SAVED */}
      {tab==="saved" && (
        <div style={S.sec}>
          <div style={{ fontSize:"1.3rem", fontStyle:"italic", background:"linear-gradient(135deg,#F0A500,#C8821A)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:3 }}>My List</div>
          <p style={{ color:"#5A4030", fontSize:"0.72rem", marginBottom:12 }}>{user?`Signed in as ${user.username}.`:"Sign in to save your list across sessions."}</p>
          {!user&&<button onClick={()=>setShowAuth(true)} style={{ marginBottom:14, padding:"6px 15px", background:"#C8821A20", border:"1px solid #C8821A60", color:"#C8821A", borderRadius:20, cursor:"pointer", fontSize:"0.74rem", fontFamily:"Georgia,serif" }}>Sign in →</button>}
          {savedDrinks.length===0?<div style={{ textAlign:"center", padding:"42px 0", color:"#3A2E20", fontStyle:"italic" }}>No drinks saved — browse and tap ♡</div>
            :<div style={S.grid}>{savedDrinks.map(d=><DrinkCard key={d.id} d={d} showCat />)}</div>}
        </div>
      )}

      {/* BUILD MY BAR — Premium */}
      {tab==="mybar" && (
        <div style={S.sec}>
          <div style={{ fontSize:"1.3rem", fontStyle:"italic", background:`linear-gradient(135deg,${PREMIUM_COLOR},#E8C840)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:3 }}>🍸 Build My Bar</div>
          <p style={{ color:"#5A4030", fontSize:"0.72rem", marginBottom:16, fontStyle:"italic" }}>Check off what you own — see every drink you can make right now from Andrew's book.</p>
          <div style={{ background:"#111008", border:`1px solid ${PREMIUM_COLOR}30`, borderRadius:12, padding:16, marginBottom:18 }}>
            <div style={{ fontSize:"0.75rem", color:"#C8A97E", fontStyle:"italic", marginBottom:11 }}>What's in your bar? ({myBar.length} selected)</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:14 }}>
              {ALL_SPIRITS_LIST.map(s=>(
                <button key={s} onClick={()=>setMyBar(b=>b.includes(s)?b.filter(x=>x!==s):[...b,s])} style={{ padding:"4px 11px", border:`1px solid ${myBar.includes(s)?PREMIUM_COLOR:"#2A2010"}`, borderRadius:20, background:myBar.includes(s)?PREMIUM_COLOR+"25":"transparent", color:myBar.includes(s)?PREMIUM_COLOR:"#5A4A38", cursor:"pointer", fontSize:"0.68rem" }}>
                  {myBar.includes(s)?"✓ ":""}{s}
                </button>
              ))}
            </div>
            <div style={{ display:"flex", gap:7 }}>
              <button onClick={runBarFilter} style={{ flex:1, padding:9, background:`linear-gradient(135deg,${PREMIUM_COLOR},#E8C840)`, border:"none", borderRadius:8, color:"#0A0806", fontSize:"0.8rem", fontFamily:"Georgia,serif", fontStyle:"italic", fontWeight:"bold", cursor:"pointer" }}>
                Find my drinks →
              </button>
              {myBar.length>0&&<button onClick={()=>{setMyBar([]);setBarResults(null);}} style={{ padding:"9px 12px", background:"#1A1510", border:"1px solid #221808", color:"#5A4A38", borderRadius:8, cursor:"pointer", fontSize:"0.73rem" }}>Clear</button>}
            </div>
          </div>
          {barResults!==null && (
            <>
              <div style={S.sttl}>{barResults.length===0?"No exact matches — try adding more spirits":`${barResults.length} drinks you can make right now`}</div>
              {barResults.length>0&&<div style={S.grid}>{barResults.map(d=><DrinkCard key={d.id} d={d} showCat />)}</div>}
              {barResults.length===0&&(
                <div style={{ background:"#111008", border:"1px solid #221808", borderRadius:10, padding:16 }}>
                  <div style={{ fontSize:"0.8rem", fontStyle:"italic", color:"#C8A97E", marginBottom:9 }}>One spirit away:</div>
                  {BOOK_DRINKS.filter(d => getMissingForDrink(d).length === 1).slice(0,8).map(d=>{
                    const missing = getMissingForDrink(d);
                    return(
                      <div key={d.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"6px 0", borderBottom:"1px solid #1A1510" }}>
                        <div><span style={{ fontStyle:"italic", color:"#E8DCC8", fontSize:"0.82rem" }}>{d.name}</span><span style={{...S.badge(cc(d.cat)),marginLeft:6}}>{catLabel(d.cat)}</span></div>
                        <span style={{ fontSize:"0.68rem", color:"#C84040" }}>need: {missing[0]}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* TASTING JOURNAL — Premium */}
      {tab==="journal" && (
        <div style={S.sec}>
          <div style={{ fontSize:"1.3rem", fontStyle:"italic", background:`linear-gradient(135deg,${PREMIUM_COLOR},#E8C840)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:3 }}>📓 Tasting Journal</div>
          <p style={{ color:"#5A4030", fontSize:"0.72rem", marginBottom:16, fontStyle:"italic" }}>Log every drink you try. Build your personal record.</p>
          <div style={{ background:"#111008", border:`1px solid ${PREMIUM_COLOR}30`, borderRadius:12, padding:16, marginBottom:20 }}>
            <div style={{ fontSize:"0.8rem", fontStyle:"italic", color:"#C8A97E", marginBottom:11 }}>Log a drink</div>
            <div style={{ marginBottom:9 }}>
              <label style={S.lbl}>Drink</label>
              <select style={S.input} value={jDrink?.id||""} onChange={e=>setJDrink(BOOK_DRINKS.find(d=>String(d.id)===e.target.value)||null)}>
                <option value="">Select from the book...</option>
                {BOOK_CATEGORIES.map(cat=>(
                  <optgroup key={cat.id} label={cat.label}>
                    {BOOK_DRINKS.filter(d=>d.cat===cat.id).map(d=><option key={d.id} value={d.id}>{d.name}</option>)}
                  </optgroup>
                ))}
              </select>
            </div>
            <div style={{ marginBottom:9 }}>
              <label style={S.lbl}>Where did you have it?</label>
              <input style={S.input} placeholder="Bar name, city, or occasion" value={jWhere} onChange={e=>setJWhere(e.target.value)} />
            </div>
            <div style={{ marginBottom:11 }}>
              <label style={S.lbl}>Tasting Notes</label>
              <textarea style={{...S.textarea,minHeight:65}} placeholder="What did you think? Flavors, balance, who made it best..." value={jNotes} onChange={e=>setJNotes(e.target.value)} />
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:12 }}>
              <button onClick={()=>setJReorder(!jReorder)} style={{ width:26, height:26, borderRadius:"50%", border:`2px solid ${jReorder?PREMIUM_COLOR:"#2A2010"}`, background:jReorder?PREMIUM_COLOR+"30":"transparent", color:jReorder?PREMIUM_COLOR:"#3A2E20", cursor:"pointer", fontSize:"0.85rem", display:"flex", alignItems:"center", justifyContent:"center" }}>{jReorder?"✓":""}</button>
              <span style={{ fontSize:"0.74rem", color:"#7A6A55" }}>I would order this again</span>
            </div>
            <button onClick={saveJournalEntry} disabled={!jDrink||jBusy} style={{ width:"100%", padding:9, background:jDrink?`linear-gradient(135deg,${PREMIUM_COLOR},#E8C840)`:"#1A1510", border:"none", borderRadius:8, color:jDrink?"#0A0806":"#3A2E20", fontSize:"0.83rem", fontFamily:"Georgia,serif", fontStyle:"italic", fontWeight:"bold", cursor:jDrink?"pointer":"default", opacity:jBusy?0.6:1 }}>
              {jBusy?"Saving...":"Add to journal →"}
            </button>
          </div>
          {journalEntries.length===0
            ?<div style={{ textAlign:"center", padding:"34px 0", color:"#3A2E20", fontStyle:"italic" }}>No entries yet — log a drink above</div>
            :journalEntries.map(e=>(
              <div key={e.id} style={{ background:"#111008", border:`1px solid ${PREMIUM_COLOR}20`, borderRadius:10, padding:14, marginBottom:9 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:5 }}>
                  <div style={{ fontStyle:"italic", color:"#E8DCC8", fontSize:"0.88rem" }}>{e.drinkName}</div>
                  <div style={{ fontSize:"0.63rem", color:e.wouldOrderAgain?PREMIUM_COLOR:"#C84040" }}>{e.wouldOrderAgain?"✓ Would order again":"✗ Wouldn't order again"}</div>
                </div>
                {e.where&&<div style={{ fontSize:"0.66rem", color:"#5A4030", marginBottom:3 }}>📍 {e.where}</div>}
                {e.notes&&<div style={{ fontSize:"0.74rem", color:"#8A7A64", fontStyle:"italic", lineHeight:1.6 }}>"{e.notes}"</div>}
                <div style={{ fontSize:"0.6rem", color:"#3A2E20", marginTop:5 }}>{new Date(e.createdAt).toLocaleDateString()}</div>
              </div>
            ))
          }
        </div>
      )}

      {/* ACCOUNT */}
      {tab==="account"&&user && (
        <div style={S.sec}>
          <div style={{ fontSize:"1.3rem", fontStyle:"italic", background:"linear-gradient(135deg,#F0A500,#C8821A)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:4 }}>Welcome, {user.username}</div>
          {isPremium&&<div style={{...S.badge(PREMIUM_COLOR),marginBottom:13,fontSize:"0.68rem",padding:"3px 10px",display:"inline-block"}}>⭐ Premium Member</div>}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(115px,1fr))", gap:8, marginBottom:18 }}>
            {[[savedCount,"Saved"],[Object.keys(myRatings).length,"Rated"],[communityDrinks.filter(d=>d.submittedBy===user.username).length,"Shared"],[journalEntries.length,"Journal Entries"]].map(([n,l])=>(
              <div key={l} style={{ background:"#111008", border:"1px solid #221808", borderRadius:10, padding:12, textAlign:"center" }}>
                <div style={{ fontSize:"1.6rem", fontStyle:"italic", background:"linear-gradient(135deg,#F0A500,#C8821A)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{n}</div>
                <div style={{ fontSize:"0.57rem", color:"#5A4030", textTransform:"uppercase", letterSpacing:"1px", marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>
          {!isPremium&&<div style={S.premBanner} onClick={()=>setShowPremium(true)}><div><div style={{ fontSize:"0.79rem", color:PREMIUM_COLOR, fontStyle:"italic" }}>⭐ Upgrade to Premium — $2.99</div><div style={{ fontSize:"0.64rem", color:"#5A4030", marginTop:2 }}>Build My Bar · Journal · PDF Export</div></div><span style={{ color:PREMIUM_COLOR }}>→</span></div>}
          {Object.keys(myRatings).length>0&&(
            <>
              <div style={S.sttl}>Your Ratings</div>
              {BOOK_DRINKS.filter(d=>myRatings[d.id]).sort((a,b)=>myRatings[b.id]-myRatings[a.id]).map(d=>(
                <div key={d.id} onClick={()=>setSelectedDrink(d)} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"7px 0", borderBottom:"1px solid #1A1510", cursor:"pointer" }}>
                  <div><span style={{ fontStyle:"italic", color:"#E8DCC8", fontSize:"0.84rem" }}>{d.name}</span><span style={{...S.badge(cc(d.cat)),marginLeft:6}}>{catLabel(d.cat)}</span></div>
                  <span style={{ color:"#F0A500", fontSize:"0.84rem" }}>{"★".repeat(myRatings[d.id])}{"☆".repeat(5-myRatings[d.id])}</span>
                </div>
              ))}
            </>
          )}
          <button onClick={()=>{setUser(null);setMySaved({});setMyRatings({});setJournalEntries([]);setTab("home");}} style={{ marginTop:18, padding:"6px 15px", background:"#1A1510", border:"1px solid #221808", color:"#5A4A38", borderRadius:20, cursor:"pointer", fontSize:"0.73rem", fontFamily:"Georgia,serif" }}>Sign out</button>
        </div>
      )}

      {/* DRINK MODAL */}
      {selectedDrink&&(()=>{
        const {avg,count,mine}=getDR(selectedDrink.id);
        return(
          <div style={S.overlay} onClick={()=>setSelectedDrink(null)}>
            <div style={S.modal} onClick={e=>e.stopPropagation()}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${cc(selectedDrink.cat)},transparent)`, borderRadius:"14px 14px 0 0" }} />
              <button style={S.closeBtn} onClick={()=>setSelectedDrink(null)}>✕</button>
              <div style={S.badge(cc(selectedDrink.cat))}>{catLabel(selectedDrink.cat)}</div>
              {selectedDrink.submittedBy&&<div style={{ fontSize:"0.61rem", color:"#5A4030", marginTop:3 }}>Shared by {selectedDrink.submittedBy}{selectedDrink.where?` · ${selectedDrink.where}`:""}</div>}
              <h2 style={{ fontSize:"1.3rem", fontStyle:"italic", color:"#E8DCC8", margin:"7px 0 5px" }}>{selectedDrink.name}</h2>
              {selectedDrink.spirit&&<div style={{ fontSize:"0.69rem", color:cc(selectedDrink.cat), marginBottom:6 }}>{selectedDrink.spirit}</div>}
              <div style={{ marginBottom:4 }}><Stars avg={avg} count={count} color={cc(selectedDrink.cat)} /></div>
              <div style={{ marginBottom:13 }}>
                <div style={{ fontSize:"0.63rem", color:"#5A4030", marginBottom:4 }}>YOUR RATING</div>
                {[1,2,3,4,5].map(n=>(
                  <button key={n} onClick={()=>rateDrink(selectedDrink.id,n)} style={{ background:"transparent", border:"none", color:(mine||0)>=n?"#F0A500":"#2A2010", cursor:"pointer", fontSize:"1.15rem", padding:"0 2px" }}>★</button>
                ))}
                <span style={{ fontSize:"0.62rem", color:"#3A2E20", marginLeft:4 }}>{mine?`${mine}/5`:"tap to rate"}</span>
              </div>
              <div style={{ fontSize:"0.67rem", color:cc(selectedDrink.cat), textTransform:"uppercase", letterSpacing:"1.5px", marginBottom:7 }}>Ingredients</div>
              {selectedDrink.ingredients.map((ing,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:7, padding:"5px 0", borderBottom:"1px solid #1A1510", fontSize:"0.79rem", color:"#C8A97E" }}>
                  <span style={{ color:cc(selectedDrink.cat), fontSize:"0.59rem", marginTop:3 }}>▸</span><span>{ing}</span>
                </div>
              ))}
              {selectedDrink.garnish&&<div style={{ marginTop:8, padding:"7px 11px", background:"#1A1510", borderRadius:7, fontSize:"0.72rem", color:"#C8A97E", fontStyle:"italic" }}><span style={{ color:cc(selectedDrink.cat) }}>Garnish: </span>{selectedDrink.garnish}</div>}
              {selectedDrink.notes&&<div style={{ marginTop:7, padding:"7px 11px", background:"#1A1510", borderRadius:7, fontSize:"0.72rem", color:"#8A7A64", fontStyle:"italic" }}>"{selectedDrink.notes}"</div>}
              <div style={{ display:"flex", gap:6, marginTop:13 }}>
                <button style={S.aBtn(cc(selectedDrink.cat))} onClick={()=>toggleSaved(selectedDrink.id)}>{mySaved[selectedDrink.id]?"✓ Saved":"+ Save"}</button>
                {isPremium&&selectedDrink.cat!=="community"&&<button style={S.aBtn(PREMIUM_COLOR)} onClick={()=>{setJDrink(selectedDrink);setSelectedDrink(null);setTab("journal");}}>📓 Log it</button>}
                {selectedDrink.cat!=="community"&&<button style={S.aBtn("#C8A97E")} onClick={()=>{setTab("barcard");setSelectedDrink(null);}}>Bartender →</button>}
              </div>
              {!isPremium&&selectedDrink.cat!=="community"&&(
                <div onClick={()=>{setSelectedDrink(null);setShowPremium(true);}} style={{ marginTop:9, padding:"7px 11px", background:PREMIUM_COLOR+"10", border:`1px solid ${PREMIUM_COLOR}30`, borderRadius:7, fontSize:"0.68rem", color:PREMIUM_COLOR, cursor:"pointer", textAlign:"center" }}>
                  ⭐ Upgrade to log this in your Tasting Journal
                </div>
              )}
              <div style={{ textAlign:"center", marginTop:10, fontSize:"0.58rem", color:"#2A2010", fontStyle:"italic" }}>
                {selectedDrink.cat==="community"?"Community submission":`From "A Dab of This, A Dab of That" — Andrew Flannigan`}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
