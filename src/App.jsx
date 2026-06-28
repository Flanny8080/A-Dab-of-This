import { useState, useEffect } from "react";
import { StatusBar, Style } from '@capacitor/status-bar';


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

const CLASSIC_DRINKS = [
  { id: 1000, cat: "martinis", name: "Vesper Martini", ingredients: ["3 oz. Gin", "1 oz. Vodka", "½ oz. Lillet Blanc"], garnish: "Lemon Twist", source: "classic" },
  { id: 1001, cat: "martinis", name: "Negroni", ingredients: ["1 oz. Gin", "1 oz. Campari", "1 oz. Sweet Vermouth"], garnish: "Orange Peel", source: "classic" },
  { id: 1002, cat: "martinis", name: "Boulevardier", ingredients: ["1 oz. Bourbon", "1 oz. Campari", "1 oz. Sweet Vermouth"], garnish: "Orange Peel", source: "classic" },
  { id: 1003, cat: "martinis", name: "Negroni Sbagliato", ingredients: ["1 oz. Campari", "1 oz. Sweet Vermouth", "1 oz. Prosecco"], garnish: "Orange Peel", source: "classic" },
  { id: 1004, cat: "martinis", name: "Martinez", ingredients: ["1½ oz. Gin", "1½ oz. Sweet Vermouth", "¼ oz. Maraschino Liqueur", "Dash Bitters"], garnish: "Lemon Twist", source: "classic" },
  { id: 1005, cat: "martinis", name: "Tuxedo Cocktail", ingredients: ["1½ oz. Gin", "1½ oz. Dry Vermouth", "¼ oz. Maraschino Liqueur", "Dash Orange Bitters"], garnish: "Lemon Twist", source: "classic" },
  { id: 1006, cat: "martinis", name: "Bronx Cocktail", ingredients: ["1½ oz. Gin", "½ oz. Dry Vermouth", "½ oz. Sweet Vermouth", "½ oz. Orange Juice"], garnish: "Orange Twist", source: "classic" },
  { id: 1007, cat: "martinis", name: "Hanky Panky", ingredients: ["1½ oz. Gin", "1½ oz. Sweet Vermouth", "¼ oz. Fernet-Branca"], garnish: "Orange Peel", source: "classic" },
  { id: 1008, cat: "martinis", name: "Black Manhattan", ingredients: ["2 oz. Rye Whiskey", "1 oz. Amaro Averna", "Dash Bitters"], garnish: "Cherry", source: "classic" },
  { id: 1009, cat: "martinis", name: "Rye Manhattan", ingredients: ["2 oz. Rye Whiskey", "1 oz. Sweet Vermouth", "Dash Bitters"], garnish: "Cherry", source: "classic" },
  { id: 1010, cat: "martinis", name: "Brooklyn Cocktail", ingredients: ["2 oz. Rye Whiskey", "1 oz. Dry Vermouth", "¼ oz. Maraschino Liqueur", "¼ oz. Amer Picon"], garnish: "Cherry", source: "classic" },
  { id: 1011, cat: "martinis", name: "Vodka Gibson", ingredients: ["2 oz. Vodka", "Dash Dry Vermouth"], garnish: "Onion", source: "classic" },
  { id: 1012, cat: "martinis", name: "Smoky Martini", ingredients: ["2 oz. Gin", "¼ oz. Scotch", "Dash Dry Vermouth"], garnish: "Lemon Twist", source: "classic" },
  { id: 1013, cat: "martinis", name: "Espresso Martini", ingredients: ["1½ oz. Vodka", "1 oz. Coffee Liqueur", "½ oz. Fresh Espresso", "¼ oz. Simple Syrup"], garnish: "Coffee Beans", source: "classic" },
  { id: 1014, cat: "martinis", name: "French Martini", ingredients: ["1½ oz. Vodka", "½ oz. Chambord", "1 oz. Pineapple Juice"], garnish: "Lemon Twist", source: "classic" },
  { id: 1015, cat: "martinis", name: "Cosmopolitan", ingredients: ["1½ oz. Vodka", "½ oz. Triple Sec", "½ oz. Cranberry Juice", "¼ oz. Lime Juice"], garnish: "Lime Wheel", source: "classic" },
  { id: 1016, cat: "martinis", name: "Appletini", ingredients: ["1½ oz. Vodka", "1 oz. Sour Apple Schnapps", "Splash Apple Juice"], garnish: "Apple Slice", source: "classic" },
  { id: 1017, cat: "martinis", name: "Lychee Martini", ingredients: ["1½ oz. Vodka", "1 oz. Lychee Liqueur", "Splash Lychee Juice"], garnish: "Lychee", source: "classic" },
  { id: 1018, cat: "martinis", name: "Saketini", ingredients: ["2 oz. Gin", "1 oz. Sake"], garnish: "Cucumber Slice", source: "classic" },
  { id: 1019, cat: "martinis", name: "Casino Cocktail", ingredients: ["2 oz. Gin", "¼ oz. Maraschino Liqueur", "¼ oz. Lemon Juice", "Dash Orange Bitters"], garnish: "Cherry", source: "classic" },
  { id: 1020, cat: "one_liquor", name: "Paloma", ingredients: ["1½ oz. Tequila", "Grapefruit Soda"], garnish: "Lime Wedge, Salt Rim", source: "classic" },
  { id: 1021, cat: "one_liquor", name: "Ranch Water", ingredients: ["1½ oz. Tequila", "Topo Chico", "Lime Juice"], garnish: "Lime Wedge", source: "classic" },
  { id: 1022, cat: "one_liquor", name: "Tequila & Soda", ingredients: ["1½ oz. Tequila", "Club Soda"], garnish: "Lime Wedge", source: "classic" },
  { id: 1023, cat: "one_liquor", name: "Moscow Mule", ingredients: ["2 oz. Vodka", "Ginger Beer"], garnish: "Lime Wedge", source: "classic" },
  { id: 1024, cat: "one_liquor", name: "Dark 'n' Stormy", ingredients: ["2 oz. Dark Rum", "Ginger Beer"], garnish: "Lime Wedge", source: "classic" },
  { id: 1025, cat: "one_liquor", name: "Cape Codder", ingredients: ["1½ oz. Vodka", "Cranberry Juice"], garnish: "Lime Wedge", source: "classic" },
  { id: 1026, cat: "one_liquor", name: "Greyhound", ingredients: ["1½ oz. Vodka", "Grapefruit Juice"], garnish: "", source: "classic" },
  { id: 1027, cat: "one_liquor", name: "Vodka Soda", ingredients: ["1½ oz. Vodka", "Club Soda"], garnish: "Lime Wedge", source: "classic" },
  { id: 1028, cat: "one_liquor", name: "Gin Buck", ingredients: ["1½ oz. Gin", "Ginger Ale", "Lemon Juice"], garnish: "Lemon Wedge", source: "classic" },
  { id: 1029, cat: "one_liquor", name: "Whiskey Ginger", ingredients: ["1½ oz. Whiskey", "Ginger Ale"], garnish: "Lime Wedge", source: "classic" },
  { id: 1030, cat: "one_liquor", name: "Rum & Ginger", ingredients: ["1½ oz. Rum", "Ginger Beer"], garnish: "Lime Wedge", source: "classic" },
  { id: 1031, cat: "one_liquor", name: "Highball", ingredients: ["1½ oz. Whiskey", "Club Soda"], garnish: "Lemon Twist", source: "classic" },
  { id: 1032, cat: "one_liquor", name: "Mizuwari", ingredients: ["2 oz. Whisky", "Cold Water"], garnish: "", source: "classic" },
  { id: 1033, cat: "one_liquor", name: "Salty Chihuahua", ingredients: ["1½ oz. Tequila", "Grapefruit Juice"], garnish: "Salt Rim", source: "classic" },
  { id: 1034, cat: "one_liquor", name: "Vodka Cranberry", ingredients: ["1½ oz. Vodka", "Cranberry Juice"], garnish: "Lime Wedge", source: "classic" },
  { id: 1035, cat: "one_liquor", name: "Tequila Paloma Spicy", ingredients: ["1½ oz. Tequila", "Grapefruit Soda", "2 Jalapeño Slices"], garnish: "Lime Wedge", source: "classic" },
  { id: 1036, cat: "one_liquor", name: "Rum Swizzle", ingredients: ["2 oz. Rum", "Soda Water", "Dash Bitters"], garnish: "Mint", source: "classic" },
  { id: 1037, cat: "one_liquor", name: "Brandy & Soda", ingredients: ["1½ oz. Brandy", "Club Soda"], garnish: "Lemon Twist", source: "classic" },
  { id: 1038, cat: "one_liquor", name: "Gin Rickey", ingredients: ["2 oz. Gin", "Club Soda", "½ Lime, squeezed"], garnish: "Lime Wedge", source: "classic" },
  { id: 1039, cat: "one_liquor", name: "Caipirinha", ingredients: ["2 oz. Cachaça", "2 tsp Sugar", "½ Lime, cut into wedges — muddle"], garnish: "Lime Wedge", source: "classic" },
  { id: 1040, cat: "one_liquor", name: "Cuba Libre Classic", ingredients: ["2 oz. Rum", "Coke", "Lime Juice"], garnish: "Lime Wedge", source: "classic" },
  { id: 1041, cat: "one_liquor", name: "Whiskey Smash", ingredients: ["2 oz. Bourbon", "4 Mint Leaves", "½ Lemon, muddled", "½ oz. Simple Syrup"], garnish: "Mint Sprig", source: "classic" },
  { id: 1042, cat: "one_liquor", name: "Penicillin", ingredients: ["2 oz. Scotch", "¾ oz. Lemon Juice", "¾ oz. Honey-Ginger Syrup", "Float Islay Scotch"], garnish: "Candied Ginger", source: "classic" },
  { id: 1043, cat: "one_liquor", name: "Pisco Sour Simple", ingredients: ["2 oz. Pisco", "1 oz. Lime Juice", "¾ oz. Simple Syrup"], garnish: "Bitters Dash", source: "classic" },
  { id: 1044, cat: "sours", name: "Amaretto Sour", ingredients: ["2 oz. Amaretto", "1 oz. Lemon Juice", "½ oz. Simple Syrup"], garnish: "Cherry, Orange Slice", source: "classic" },
  { id: 1045, cat: "sours", name: "Pisco Sour", ingredients: ["2 oz. Pisco", "1 oz. Lime Juice", "¾ oz. Simple Syrup", "1 Egg White"], garnish: "Bitters Drops", source: "classic" },
  { id: 1046, cat: "sours", name: "New York Sour", ingredients: ["2 oz. Whiskey", "1 oz. Lemon Juice", "¾ oz. Simple Syrup", "Float Red Wine"], garnish: "Lemon Wheel", source: "classic" },
  { id: 1047, cat: "sours", name: "Gin Sour", ingredients: ["2 oz. Gin", "¾ oz. Lemon Juice", "¾ oz. Simple Syrup"], garnish: "Lemon Wheel", source: "classic" },
  { id: 1048, cat: "sours", name: "Brandy Sour", ingredients: ["2 oz. Brandy", "¾ oz. Lemon Juice", "¾ oz. Simple Syrup"], garnish: "Lemon Wheel", source: "classic" },
  { id: 1049, cat: "sours", name: "Penicillin Sour", ingredients: ["2 oz. Scotch", "¾ oz. Honey Syrup", "¾ oz. Lemon Juice"], garnish: "Ginger", source: "classic" },
  { id: 1050, cat: "sours", name: "Clover Club", ingredients: ["1½ oz. Gin", "½ oz. Lemon Juice", "½ oz. Raspberry Syrup", "1 Egg White"], garnish: "Raspberries", source: "classic" },
  { id: 1051, cat: "sours", name: "Whiskey Smash Sour", ingredients: ["2 oz. Bourbon", "¾ oz. Lemon Juice", "½ oz. Simple Syrup", "Mint"], garnish: "Mint Sprig", source: "classic" },
  { id: 1053, cat: "sours", name: "John Collins", ingredients: ["2 oz. Whiskey", "¾ oz. Lemon Juice", "½ oz. Simple Syrup", "Top with Club Soda"], garnish: "Lemon Wheel", source: "classic" },
  { id: 1054, cat: "sours", name: "Bee's Knees", ingredients: ["2 oz. Gin", "¾ oz. Lemon Juice", "¾ oz. Honey Syrup"], garnish: "Lemon Twist", source: "classic" },
  { id: 1055, cat: "sours", name: "Hemingway Daiquiri", ingredients: ["2 oz. Light Rum", "¾ oz. Lime Juice", "½ oz. Grapefruit Juice", "¼ oz. Maraschino Liqueur"], garnish: "Lime Wheel", source: "classic" },
  { id: 1056, cat: "sours", name: "Whiskey Daisy", ingredients: ["2 oz. Whiskey", "¾ oz. Lemon Juice", "½ oz. Grenadine"], garnish: "Orange Slice", source: "classic" },
  { id: 1057, cat: "sours", name: "Southside", ingredients: ["2 oz. Gin", "¾ oz. Lime Juice", "¾ oz. Simple Syrup", "6 Mint Leaves"], garnish: "Mint Sprig", source: "classic" },
  { id: 1058, cat: "sours", name: "Gold Rush", ingredients: ["2 oz. Bourbon", "¾ oz. Lemon Juice", "¾ oz. Honey Syrup"], garnish: "Lemon Twist", source: "classic" },
  { id: 1059, cat: "sours", name: "Paper Plane", ingredients: ["¾ oz. Bourbon", "¾ oz. Amaro Nonino", "¾ oz. Aperol", "¾ oz. Lemon Juice"], garnish: "", source: "classic" },
  { id: 1060, cat: "sours", name: "Brown Derby", ingredients: ["2 oz. Bourbon", "1 oz. Grapefruit Juice", "½ oz. Honey Syrup"], garnish: "Grapefruit Twist", source: "classic" },
  { id: 1061, cat: "frozen", name: "Frozen Margarita", ingredients: ["2 oz. Tequila", "1 oz. Triple Sec", "1 oz. Lime Juice", "1 cup Ice — blend"], garnish: "Lime Wheel, Salt Rim", source: "classic" },
  { id: 1062, cat: "frozen", name: "Frozen Daiquiri", ingredients: ["2 oz. Light Rum", "1 oz. Lime Juice", "½ oz. Simple Syrup", "1 cup Ice — blend"], garnish: "Lime Wheel", source: "classic" },
  { id: 1063, cat: "frozen", name: "Frozen Mudslide", ingredients: ["1 oz. Vodka", "1 oz. Kahlua", "1 oz. Bailey's", "Cream", "1 cup Ice — blend"], garnish: "Whipped Cream", source: "classic" },
  { id: 1064, cat: "frozen", name: "Frozen Pina Colada", ingredients: ["2 oz. Rum", "2 oz. Pineapple Juice", "1 oz. Coconut Cream", "1 cup Ice — blend"], garnish: "Pineapple Wedge", source: "classic" },
  { id: 1065, cat: "frozen", name: "Frozen Peach Daiquiri", ingredients: ["1½ oz. Light Rum", "1 Peach, sliced", "1 oz. Lime Juice", "1 cup Ice — blend"], garnish: "Peach Slice", source: "classic" },
  { id: 1066, cat: "frozen", name: "Frozen Sex on the Beach", ingredients: ["1 oz. Vodka", "½ oz. Peach Schnapps", "Cranberry Juice", "Pineapple Juice", "1 cup Ice — blend"], garnish: "Orange Slice", source: "classic" },
  { id: 1067, cat: "frozen", name: "Frozen Mango Margarita", ingredients: ["2 oz. Tequila", "1 oz. Triple Sec", "1 cup Frozen Mango", "1 oz. Lime Juice — blend"], garnish: "Lime Wheel", source: "classic" },
  { id: 1068, cat: "frozen", name: "Frozen Watermelon Daiquiri", ingredients: ["2 oz. Light Rum", "1 cup Watermelon", "1 oz. Lime Juice — blend"], garnish: "Watermelon Wedge", source: "classic" },
  { id: 1069, cat: "frozen", name: "Frosé", ingredients: ["3 oz. Rosé Wine, frozen", "1 oz. Vodka", "½ oz. Strawberry Puree", "½ oz. Lemon Juice — blend"], garnish: "Strawberry", source: "classic" },
  { id: 1070, cat: "frozen", name: "Frozen Hurricane", ingredients: ["1 oz. Light Rum", "1 oz. Dark Rum", "Passion Fruit Juice", "Orange Juice", "1 cup Ice — blend"], garnish: "Orange Slice", source: "classic" },
  { id: 1071, cat: "frozen", name: "Frozen Irish Coffee", ingredients: ["1½ oz. Irish Whiskey", "1 oz. Coffee Liqueur", "Cold Brew Coffee", "1 cup Ice — blend"], garnish: "Whipped Cream", source: "classic" },
  { id: 1072, cat: "two_liquor", name: "Last Word", ingredients: ["¾ oz. Gin", "¾ oz. Maraschino Liqueur", "¾ oz. Green Chartreuse", "¾ oz. Lime Juice"], garnish: "", source: "classic" },
  { id: 1073, cat: "two_liquor", name: "Corpse Reviver No. 2", ingredients: ["¾ oz. Gin", "¾ oz. Triple Sec", "¾ oz. Lillet Blanc", "¾ oz. Lemon Juice", "Dash Absinthe"], garnish: "", source: "classic" },
  { id: 1074, cat: "two_liquor", name: "Vieux Carré", ingredients: ["1 oz. Rye Whiskey", "1 oz. Cognac", "1 oz. Sweet Vermouth", "Dash Bénédictine"], garnish: "Cherry", source: "classic" },
  { id: 1075, cat: "two_liquor", name: "Bee Sting", ingredients: ["1½ oz. Tequila", "½ oz. Triple Sec", "Honey, Lime"], garnish: "Lime Wheel", source: "classic" },
  { id: 1076, cat: "two_liquor", name: "Suffering Bastard", ingredients: ["1 oz. Gin", "1 oz. Brandy", "½ oz. Lime Juice", "Ginger Beer"], garnish: "Mint, Cucumber", source: "classic" },
  { id: 1077, cat: "two_liquor", name: "Algonquin", ingredients: ["1½ oz. Rye Whiskey", "¾ oz. Dry Vermouth", "¾ oz. Pineapple Juice"], garnish: "", source: "classic" },
  { id: 1078, cat: "two_liquor", name: "Greenpoint", ingredients: ["2 oz. Rye Whiskey", "½ oz. Sweet Vermouth", "¼ oz. Yellow Chartreuse", "Dash Bitters"], garnish: "Cherry", source: "classic" },
  { id: 1079, cat: "two_liquor", name: "Naked and Famous", ingredients: ["¾ oz. Mezcal", "¾ oz. Yellow Chartreuse", "¾ oz. Aperol", "¾ oz. Lime Juice"], garnish: "", source: "classic" },
  { id: 1080, cat: "two_liquor", name: "Tequila Old Fashioned", ingredients: ["2 oz. Tequila", "¼ oz. Agave Syrup", "Dash Bitters"], garnish: "Orange Twist", source: "classic" },
  { id: 1081, cat: "two_liquor", name: "Mezcal Negroni", ingredients: ["1 oz. Mezcal", "1 oz. Campari", "1 oz. Sweet Vermouth"], garnish: "Orange Peel", source: "classic" },
  { id: 1082, cat: "two_liquor", name: "Sazerac", ingredients: ["2 oz. Rye Whiskey", "¼ oz. Absinthe rinse", "Sugar Cube", "Dash Peychaud's Bitters"], garnish: "Lemon Twist", source: "classic" },
  { id: 1083, cat: "two_liquor", name: "Trinidad Sour", ingredients: ["1½ oz. Angostura Bitters", "¾ oz. Orgeat", "¾ oz. Lemon Juice", "¾ oz. Rye Whiskey"], garnish: "", source: "classic" },
  { id: 1084, cat: "two_liquor", name: "Aviation", ingredients: ["2 oz. Gin", "½ oz. Maraschino Liqueur", "½ oz. Lemon Juice", "¼ oz. Crème de Violette"], garnish: "Cherry", source: "classic" },
  { id: 1085, cat: "two_liquor", name: "Blood and Sand", ingredients: ["¾ oz. Scotch", "¾ oz. Cherry Brandy", "¾ oz. Sweet Vermouth", "¾ oz. Orange Juice"], garnish: "Orange Slice", source: "classic" },
  { id: 1086, cat: "two_liquor", name: "Knickerbocker", ingredients: ["1½ oz. Rum", "½ oz. Triple Sec", "Lime Juice, Raspberry Syrup"], garnish: "Lime Wheel", source: "classic" },
  { id: 1087, cat: "two_liquor", name: "Whiskey Smash Two Liquor", ingredients: ["1½ oz. Bourbon", "½ oz. Triple Sec", "Mint, Lemon"], garnish: "Mint Sprig", source: "classic" },
  { id: 1088, cat: "two_liquor", name: "Champs-Élysées", ingredients: ["1½ oz. Cognac", "½ oz. Green Chartreuse", "½ oz. Lemon Juice", "¼ oz. Simple Syrup"], garnish: "", source: "classic" },
  { id: 1089, cat: "two_liquor", name: "El Diablo", ingredients: ["1½ oz. Tequila", "½ oz. Crème de Cassis", "Lime, Ginger Beer"], garnish: "Lime Wedge", source: "classic" },
  { id: 1090, cat: "two_liquor", name: "Tipperary", ingredients: ["1½ oz. Irish Whiskey", "1 oz. Sweet Vermouth", "½ oz. Green Chartreuse"], garnish: "", source: "classic" },
  { id: 1091, cat: "two_liquor", name: "Widow's Kiss", ingredients: ["1½ oz. Apple Brandy", "¾ oz. Bénédictine", "¾ oz. Yellow Chartreuse", "Dash Bitters"], garnish: "Cherry", source: "classic" },
  { id: 1092, cat: "tropics", name: "Painkiller", ingredients: ["2 oz. Dark Rum", "4 oz. Pineapple Juice", "1 oz. Orange Juice", "1 oz. Coconut Cream"], garnish: "Nutmeg, Pineapple", source: "classic" },
  { id: 1093, cat: "tropics", name: "Bahama Mama", ingredients: ["1 oz. Light Rum", "1 oz. Dark Rum", "½ oz. Coconut Rum", "Pineapple, Orange Juice", "Grenadine"], garnish: "Pineapple Wedge", source: "classic" },
  { id: 1094, cat: "tropics", name: "Jungle Bird", ingredients: ["1½ oz. Dark Rum", "¾ oz. Campari", "¾ oz. Pineapple Juice", "½ oz. Lime Juice", "¼ oz. Simple Syrup"], garnish: "Pineapple Wedge", source: "classic" },
  { id: 1095, cat: "tropics", name: "Scorpion", ingredients: ["1 oz. Light Rum", "1 oz. Brandy", "1 oz. Orange Juice", "½ oz. Lime Juice", "½ oz. Orgeat"], garnish: "Mint, Orange Slice", source: "classic" },
  { id: 1096, cat: "tropics", name: "Trader Vic's Mai Tai", ingredients: ["2 oz. Aged Rum", "½ oz. Lime Juice", "½ oz. Orange Curacao", "¼ oz. Orgeat"], garnish: "Mint, Lime Shell", source: "classic" },
  { id: 1097, cat: "tropics", name: "Navy Grog", ingredients: ["1 oz. Light Rum", "1 oz. Dark Rum", "1 oz. Demerara Rum", "Lime, Grapefruit, Honey"], garnish: "Mint", source: "classic" },
  { id: 1098, cat: "tropics", name: "Three Dots and a Dash", ingredients: ["1 oz. Dark Rum", "1 oz. Light Rum", "½ oz. Falernum", "Orange, Lime, Pineapple Juice"], garnish: "Cherries", source: "classic" },
  { id: 1099, cat: "tropics", name: "Fog Cutter", ingredients: ["1½ oz. Light Rum", "½ oz. Brandy", "½ oz. Gin", "Lemon, Orange Juice", "Orgeat"], garnish: "Mint", source: "classic" },
  { id: 1100, cat: "tropics", name: "Bushwacker", ingredients: ["1 oz. Rum", "1 oz. Coconut Rum", "Kahlua, Cream, Pineapple Juice"], garnish: "Whipped Cream", source: "classic" },
  { id: 1101, cat: "tropics", name: "Chi Chi", ingredients: ["1½ oz. Vodka", "Pineapple Juice", "Coconut Cream"], garnish: "Pineapple Wedge", source: "classic" },
  { id: 1102, cat: "tropics", name: "Coco Loco", ingredients: ["1½ oz. Tequila", "1 oz. Coconut Rum", "Pineapple Juice"], garnish: "Pineapple Wedge", source: "classic" },
  { id: 1103, cat: "tropics", name: "Bermuda Rum Swizzle", ingredients: ["1 oz. Dark Rum", "1 oz. Light Rum", "Pineapple, Orange Juice", "Dash Bitters"], garnish: "Mint", source: "classic" },
  { id: 1104, cat: "tropics", name: "Tiki Punch", ingredients: ["1 oz. Dark Rum", "1 oz. Light Rum", "Passion Fruit Juice", "Lime Juice", "Grenadine"], garnish: "Pineapple Wedge", source: "classic" },
  { id: 1105, cat: "tropics", name: "Test Pilot", ingredients: ["1½ oz. Light Rum", "½ oz. Dark Rum", "Falernum, Lime, Triple Sec", "Dash Bitters"], garnish: "Lime Wheel", source: "classic" },
  { id: 1106, cat: "tropics", name: "Pearl Diver", ingredients: ["1 oz. Light Rum", "1 oz. Dark Rum", "Passion Fruit, Lime, Grenadine"], garnish: "Mint", source: "classic" },
  { id: 1107, cat: "tropics", name: "Tortuga", ingredients: ["1½ oz. Spiced Rum", "Pineapple Juice", "Coconut Cream", "Splash Grenadine"], garnish: "Cherry", source: "classic" },
  { id: 1108, cat: "dessert", name: "Chocolate Martini", ingredients: ["1½ oz. Vodka", "1 oz. Dark Crème de Cacao", "½ oz. Cream"], garnish: "Chocolate Shavings", source: "classic" },
  { id: 1109, cat: "dessert", name: "White Chocolate Martini", ingredients: ["1½ oz. Vodka", "1 oz. White Crème de Cacao", "Cream"], garnish: "White Chocolate Curl", source: "classic" },
  { id: 1110, cat: "dessert", name: "Tiramisu Martini", ingredients: ["1 oz. Vodka", "1 oz. Coffee Liqueur", "½ oz. Bailey's", "Cream"], garnish: "Cocoa Powder", source: "classic" },
  { id: 1111, cat: "dessert", name: "Key Lime Pie Martini", ingredients: ["1 oz. Vodka", "1 oz. White Crème de Cacao", "½ oz. Lime Juice", "Cream"], garnish: "Graham Cracker Rim", source: "classic" },
  { id: 1112, cat: "dessert", name: "Mudslide", ingredients: ["1 oz. Vodka", "1 oz. Kahlua", "1 oz. Bailey's", "Cream"], garnish: "Chocolate Drizzle", source: "classic" },
  { id: 1113, cat: "dessert", name: "Caramel Apple Martini", ingredients: ["1½ oz. Vodka", "1 oz. Butterscotch Schnapps", "½ oz. Apple Juice"], garnish: "Caramel Drizzle", source: "classic" },
  { id: 1114, cat: "dessert", name: "Snickers Martini", ingredients: ["1 oz. Vodka", "½ oz. Kahlua", "½ oz. Crème de Cacao", "½ oz. Hazelnut Liqueur", "Cream"], garnish: "Chocolate Drizzle", source: "classic" },
  { id: 1115, cat: "dessert", name: "Peanut Butter Cup Martini", ingredients: ["1 oz. Vodka", "1 oz. Crème de Cacao", "½ oz. Frangelico", "Cream"], garnish: "Chocolate Shavings", source: "classic" },
  { id: 1116, cat: "dessert", name: "Cookies and Cream Martini", ingredients: ["1½ oz. Vodka", "1 oz. White Crème de Cacao", "Cream"], garnish: "Crushed Cookie", source: "classic" },
  { id: 1117, cat: "dessert", name: "Black Forest Martini", ingredients: ["1 oz. Vodka", "1 oz. Dark Crème de Cacao", "½ oz. Cherry Brandy", "Cream"], garnish: "Cherry", source: "classic" },
  { id: 1118, cat: "dessert", name: "Toasted S'more Martini", ingredients: ["1 oz. Vodka", "1 oz. Chocolate Liqueur", "½ oz. Marshmallow Vodka", "Cream"], garnish: "Graham Cracker Rim", source: "classic" },
  { id: 1119, cat: "coffee", name: "Irish Coffee", ingredients: ["1½ oz. Irish Whiskey", "Hot Coffee", "1 tsp Brown Sugar"], garnish: "Whipped Cream", source: "classic" },
  { id: 1120, cat: "coffee", name: "Spanish Coffee", ingredients: ["1 oz. Brandy", "½ oz. Triple Sec", "Hot Coffee"], garnish: "Whipped Cream", source: "classic" },
  { id: 1121, cat: "coffee", name: "Mexican Coffee", ingredients: ["1 oz. Tequila", "½ oz. Kahlua", "Hot Coffee"], garnish: "Whipped Cream", source: "classic" },
  { id: 1122, cat: "coffee", name: "Hot Toddy", ingredients: ["2 oz. Whiskey", "1 tbsp Honey", "Hot Water", "Lemon Juice"], garnish: "Lemon Wheel, Cinnamon Stick", source: "classic" },
  { id: 1123, cat: "coffee", name: "Hot Buttered Rum", ingredients: ["2 oz. Dark Rum", "1 tbsp Butter", "Brown Sugar", "Hot Water"], garnish: "Cinnamon Stick", source: "classic" },
  { id: 1124, cat: "coffee", name: "Mulled Wine", ingredients: ["6 oz. Red Wine", "Orange Slices", "Cinnamon, Cloves", "1 tbsp Honey"], garnish: "Orange Slice", source: "classic" },
  { id: 1125, cat: "coffee", name: "Café Brulot", ingredients: ["1 oz. Brandy", "Hot Coffee", "Orange Peel, Cloves", "1 tsp Sugar"], garnish: "Orange Twist", source: "classic" },
  { id: 1126, cat: "coffee", name: "Tom and Jerry", ingredients: ["1 oz. Brandy", "½ oz. Dark Rum", "Hot Milk", "1 Egg, beaten"], garnish: "Nutmeg", source: "classic" },
  { id: 1127, cat: "coffee", name: "Hot Apple Cider Toddy", ingredients: ["2 oz. Spiced Rum", "Hot Apple Cider", "Cinnamon Stick"], garnish: "Apple Slice", source: "classic" },
  { id: 1128, cat: "coffee", name: "Vienna Coffee", ingredients: ["1 oz. Brandy", "Hot Coffee", "Whipped Cream"], garnish: "Chocolate Shavings", source: "classic" },
  { id: 1129, cat: "coffee", name: "Calypso Coffee", ingredients: ["1 oz. Dark Rum", "½ oz. Tia Maria", "Hot Coffee"], garnish: "Whipped Cream", source: "classic" },
  { id: 1130, cat: "coffee", name: "Bourbon Hot Chocolate", ingredients: ["1½ oz. Bourbon", "Hot Chocolate"], garnish: "Marshmallows", source: "classic" },
  { id: 1131, cat: "wine", name: "Bellini", ingredients: ["2 oz. Peach Puree", "Prosecco"], garnish: "", source: "classic" },
  { id: 1132, cat: "wine", name: "Aperol Spritz", ingredients: ["3 oz. Prosecco", "2 oz. Aperol", "Splash Club Soda"], garnish: "Orange Slice", source: "classic" },
  { id: 1133, cat: "wine", name: "Kir Royale Classic", ingredients: ["½ oz. Crème de Cassis", "Champagne"], garnish: "", source: "classic" },
  { id: 1134, cat: "wine", name: "Sangria", ingredients: ["6 oz. Red Wine", "1 oz. Brandy", "Orange, Apple Slices", "Splash Soda"], garnish: "Fruit Garnish", source: "classic" },
  { id: 1135, cat: "wine", name: "White Sangria", ingredients: ["6 oz. White Wine", "1 oz. Triple Sec", "Peach, Berries"], garnish: "Fruit Garnish", source: "classic" },
  { id: 1136, cat: "wine", name: "Death in the Afternoon", ingredients: ["1 oz. Absinthe", "Champagne"], garnish: "", source: "classic" },
  { id: 1137, cat: "wine", name: "Black Velvet", ingredients: ["3 oz. Stout Beer", "3 oz. Champagne"], garnish: "", source: "classic" },
  { id: 1138, cat: "wine", name: "Champagne Mimosa Twist", ingredients: ["Champagne", "Splash Grand Marnier", "Orange Juice"], garnish: "Orange Twist", source: "classic" },
  { id: 1139, cat: "wine", name: "Poinsettia", ingredients: ["1 oz. Triple Sec", "Cranberry Juice", "Champagne"], garnish: "Lime Wheel", source: "classic" },
  { id: 1141, cat: "wine", name: "Hugo Spritz", ingredients: ["2 oz. Prosecco", "½ oz. Elderflower Syrup", "Splash Soda", "Mint"], garnish: "Mint Sprig", source: "classic" },
  { id: 1142, cat: "wine", name: "Lillet Spritz", ingredients: ["2 oz. Lillet Blanc", "Tonic Water"], garnish: "Orange Wheel", source: "classic" },
  { id: 1144, cat: "shooters", name: "Jager Bomb", ingredients: ["Jagermeister", "Energy Drink"], garnish: "", source: "classic" },
  { id: 1145, cat: "shooters", name: "Irish Car Bomb", ingredients: ["Irish Cream", "Irish Whiskey", "dropped into Stout Beer"], garnish: "", source: "classic" },
  { id: 1146, cat: "shooters", name: "Buttery Nipple", ingredients: ["Butterscotch Schnapps", "Bailey's"], garnish: "", source: "classic" },
  { id: 1149, cat: "shooters", name: "Surfer on Acid", ingredients: ["Coconut Rum", "Jagermeister", "Pineapple Juice"], garnish: "", source: "classic" },
  { id: 1150, cat: "shooters", name: "Three Wise Men", ingredients: ["Jack Daniels", "Johnnie Walker", "Jim Beam"], garnish: "", source: "classic" },
  { id: 1151, cat: "shooters", name: "Pickleback", ingredients: ["Whiskey", "Pickle Juice chaser"], garnish: "", source: "classic" },
  { id: 1152, cat: "shooters", name: "Royal Flush", ingredients: ["Crown Royal", "Peach Schnapps", "Cranberry Juice"], garnish: "", source: "classic" },
  { id: 1153, cat: "shooters", name: "Vegas Bomb", ingredients: ["Crown Royal", "Peach Schnapps", "Red Bull"], garnish: "", source: "classic" },
  { id: 1154, cat: "shooters", name: "Duck Fart", ingredients: ["Kahlua", "Bailey's", "Crown Royal"], garnish: "", source: "classic" },
  { id: 1155, cat: "shooters", name: "Skittle Bomb", ingredients: ["Vodka", "Triple Sec", "Sour Mix"], garnish: "", source: "classic" },
  { id: 1156, cat: "shooters", name: "Prairie Fire", ingredients: ["Tequila", "Tabasco"], garnish: "", source: "classic" },
  { id: 1157, cat: "shooters", name: "Russian Quaalude", ingredients: ["Vodka", "Bailey's", "Hazelnut Liqueur"], garnish: "", source: "classic" },
  { id: 1159, cat: "martinis", name: "Dirty Vodka Martini", ingredients: ["2 oz. Vodka", "Dash Dry Vermouth", "Bar spoon Olive Juice"], garnish: "Olive", source: "classic" },
  { id: 1160, cat: "martinis", name: "Reverse Martini", ingredients: ["2 oz. Dry Vermouth", "1 oz. Gin"], garnish: "Olive", source: "classic" },
  { id: 1161, cat: "martinis", name: "50/50 Martini", ingredients: ["1½ oz. Gin", "1½ oz. Dry Vermouth"], garnish: "Lemon Twist", source: "classic" },
  { id: 1162, cat: "martinis", name: "Pink Gin", ingredients: ["2 oz. Gin", "Dash Angostura Bitters"], garnish: "", source: "classic" },
  { id: 1163, cat: "one_liquor", name: "Gin and Juice", ingredients: ["1½ oz. Gin", "Orange Juice"], garnish: "Orange Slice", source: "classic" },
  { id: 1164, cat: "one_liquor", name: "Whiskey Neat", ingredients: ["2 oz. Whiskey"], garnish: "", source: "classic" },
  { id: 1165, cat: "one_liquor", name: "Tequila Shot Lime", ingredients: ["1½ oz. Tequila", "Lime, Salt"], garnish: "Lime Wedge", source: "classic" },
  { id: 1166, cat: "one_liquor", name: "Rum Punch Simple", ingredients: ["2 oz. Rum", "Orange Juice", "Pineapple Juice", "Grenadine"], garnish: "Orange Slice", source: "classic" },
  { id: 1167, cat: "one_liquor", name: "Black and Tan", ingredients: ["Pale Ale", "Stout — layered"], garnish: "", source: "classic" },
  { id: 1168, cat: "one_liquor", name: "Shandy", ingredients: ["Beer", "Lemonade"], garnish: "Lemon Wedge", source: "classic" },
  { id: 1169, cat: "one_liquor", name: "Michelada", ingredients: ["Beer", "Lime Juice", "Hot Sauce", "Salt Rim"], garnish: "Lime Wedge", source: "classic" },
  { id: 1170, cat: "sours", name: "Algonquin Sour", ingredients: ["2 oz. Rye", "¾ oz. Lemon Juice", "½ oz. Pineapple Syrup"], garnish: "", source: "classic" },
  { id: 1171, cat: "sours", name: "Pegu Club", ingredients: ["2 oz. Gin", "¾ oz. Triple Sec", "¾ oz. Lime Juice", "Dash Bitters"], garnish: "Lime Wheel", source: "classic" },
  { id: 1172, cat: "sours", name: "Ward 8 Classic", ingredients: ["2 oz. Whiskey", "¾ oz. Lemon Juice", "¾ oz. Orange Juice", "½ oz. Grenadine"], garnish: "Cherry", source: "classic" },
  { id: 1173, cat: "two_liquor", name: "Remember the Maine", ingredients: ["2 oz. Rye", "¾ oz. Sweet Vermouth", "½ oz. Cherry Brandy", "Dash Absinthe"], garnish: "Cherry", source: "classic" },
  { id: 1174, cat: "two_liquor", name: "Earl Grey MarTEAni", ingredients: ["2 oz. Gin", "1 oz. Earl Grey Syrup", "¾ oz. Lemon Juice"], garnish: "Lemon Twist", source: "classic" },
  { id: 1175, cat: "two_liquor", name: "Kentucky Mule", ingredients: ["2 oz. Bourbon", "Ginger Beer", "Lime Juice"], garnish: "Lime Wedge", source: "classic" },
  { id: 1176, cat: "two_liquor", name: "Mexican Mule", ingredients: ["2 oz. Tequila", "Ginger Beer", "Lime Juice"], garnish: "Lime Wedge", source: "classic" },
  { id: 1177, cat: "tropics", name: "Royal Hawaiian", ingredients: ["1½ oz. Gin", "1 oz. Pineapple Juice", "½ oz. Orgeat", "½ oz. Lemon Juice"], garnish: "Pineapple Wedge", source: "classic" },
  { id: 1178, cat: "tropics", name: "Saturn", ingredients: ["1½ oz. Gin", "½ oz. Passion Fruit Syrup", "½ oz. Orgeat", "½ oz. Lemon Juice"], garnish: "Lemon Twist", source: "classic" },
  { id: 1179, cat: "tropics", name: "Zombie Punch", ingredients: ["1 oz. Light Rum", "1 oz. Dark Rum", "½ oz. Apricot Brandy", "Lime, Grenadine"], garnish: "Mint", source: "classic" },
  { id: 1180, cat: "dessert", name: "Banana Cream Pie Martini", ingredients: ["1 oz. Vodka", "1 oz. Banana Liqueur", "½ oz. Bailey's", "Cream"], garnish: "Banana Slice", source: "classic" },
  { id: 1181, cat: "dessert", name: "Red Velvet Martini", ingredients: ["1 oz. Vodka", "1 oz. White Crème de Cacao", "Splash Grenadine", "Cream"], garnish: "Chocolate Shavings", source: "classic" },
  { id: 1182, cat: "coffee", name: "Keoke Coffee", ingredients: ["1 oz. Brandy", "½ oz. Kahlua", "½ oz. Crème de Cacao", "Hot Coffee"], garnish: "Whipped Cream", source: "classic" },
  { id: 1183, cat: "coffee", name: "Jamaican Coffee", ingredients: ["1 oz. Dark Rum", "½ oz. Coffee Liqueur", "Hot Coffee"], garnish: "Whipped Cream", source: "classic" },
  { id: 1184, cat: "wine", name: "Spritz Veneziano", ingredients: ["3 oz. Prosecco", "2 oz. Select Aperitivo", "Splash Soda"], garnish: "Olive", source: "classic" },
  { id: 1186, cat: "shooters", name: "Fireball Shot", ingredients: ["Cinnamon Whiskey"], garnish: "", source: "classic" },
  { id: 1188, cat: "shooters", name: "Cement Mixer", ingredients: ["Bailey's", "Lime Juice"], garnish: "", source: "classic" },
];

const DRINK_METHODS = {
  1: { method: "Stir", directions: null },
  2: { method: "Stir", directions: null },
  3: { method: "Stir", directions: null },
  4: { method: "Stir", directions: null },
  5: { method: "Stir", directions: null },
  6: { method: "Stir", directions: null },
  7: { method: "Stir", directions: null },
  8: { method: "Stir", directions: null },
  9: { method: "Stir", directions: null },
  10: { method: "Stir", directions: null },
  11: { method: "Stir", directions: null },
  12: { method: "Stir", directions: null },
  13: { method: "Stir", directions: null },
  14: { method: "Stir", directions: null },
  15: { method: "Build", directions: null },
  16: { method: "Build", directions: null },
  17: { method: "Build", directions: null },
  18: { method: "Build", directions: null },
  19: { method: "Build", directions: null },
  20: { method: "Build", directions: null },
  21: { method: "Build", directions: null },
  22: { method: "Build", directions: null },
  23: { method: "Build", directions: null },
  24: { method: "Build", directions: null },
  25: { method: "Build", directions: null },
  26: { method: "Build", directions: null },
  27: { method: "Build", directions: null },
  28: { method: "Build", directions: null },
  29: { method: "Build", directions: null },
  30: { method: "Build", directions: null },
  31: { method: "Build", directions: null },
  32: { method: "Build", directions: null },
  33: { method: "Build", directions: null },
  34: { method: "Build", directions: null },
  35: { method: "Build", directions: null },
  36: { method: "Build", directions: null },
  37: { method: "Build", directions: "Build Southern Comfort, sloe gin, and orange juice over ice. Float Galliano on top by pouring slowly over the back of a spoon." },
  38: { method: "Build", directions: null },
  39: { method: "Build", directions: null },
  40: { method: "Build", directions: null },
  41: { method: "Build", directions: null },
  42: { method: "Build", directions: null },
  43: { method: "Build", directions: null },
  44: { method: "Build", directions: null },
  45: { method: "Build", directions: null },
  46: { method: "Build", directions: null },
  47: { method: "Build", directions: null },
  48: { method: "Build", directions: null },
  49: { method: "Build", directions: null },
  50: { method: "Build", directions: null },
  51: { method: "Shake", directions: null },
  52: { method: "Build", directions: null },
  53: { method: "Build", directions: "Build Southern Comfort, sloe gin, orange juice, and sour mix over ice. Float 151 rum on top by pouring slowly over the back of a spoon." },
  54: { method: "Shake", directions: null },
  55: { method: "Shake", directions: null },
  56: { method: "Shake", directions: null },
  57: { method: "Shake", directions: null },
  58: { method: "Shake", directions: null },
  59: { method: "Shake", directions: null },
  60: { method: "Shake", directions: null },
  61: { method: "Shake", directions: null },
  62: { method: "Shake", directions: null },
  63: { method: "Shake", directions: null },
  64: { method: "Shake", directions: null },
  65: { method: "Shake", directions: null },
  66: { method: "Shake", directions: null },
  67: { method: "Blend", directions: null },
  68: { method: "Blend", directions: null },
  69: { method: "Blend", directions: null },
  70: { method: "Stir", directions: null },
  71: { method: "Stir", directions: null },
  72: { method: "Stir", directions: null },
  73: { method: "Build", directions: null },
  74: { method: "Shake", directions: null },
  75: { method: "Shake", directions: null },
  76: { method: "Build", directions: null },
  77: { method: "Build", directions: "Muddle sugar and bitters in the glass. Add ice and bourbon, stir well, and top with soda." },
  78: { method: "Build", directions: null },
  79: { method: "Shake", directions: null },
  80: { method: "Build", directions: null },
  81: { method: "Shake", directions: null },
  82: { method: "Stir", directions: null },
  83: { method: "Stir", directions: null },
  84: { method: "Build", directions: "Muddle mint leaves with sugar and a dash of water in the glass. Fill with crushed ice, add bourbon, and stir gently." },
  85: { method: "Shake", directions: null },
  86: { method: "Stir", directions: null },
  87: { method: "Stir", directions: null },
  88: { method: "Build", directions: null },
  89: { method: "Shake", directions: null },
  90: { method: "Stir", directions: null },
  91: { method: "Shake", directions: null },
  92: { method: "Shake", directions: null },
  93: { method: "Shake", directions: null },
  94: { method: "Shake", directions: null },
  95: { method: "Build", directions: null },
  96: { method: "Shake", directions: null },
  97: { method: "Shake", directions: null },
  98: { method: "Stir", directions: null },
  99: { method: "Stir", directions: null },
  100: { method: "Stir", directions: null },
  101: { method: "Shake", directions: null },
  102: { method: "Shake", directions: null },
  103: { method: "Shake", directions: null },
  104: { method: "Shake", directions: null },
  105: { method: "Shake", directions: null },
  106: { method: "Shake", directions: null },
  107: { method: "Blend", directions: null },
  108: { method: "Shake", directions: null },
  109: { method: "Shake", directions: null },
  110: { method: "Shake", directions: null },
  111: { method: "Shake", directions: "Shake all ingredients except the 151 rum float with ice. Strain into glass over fresh ice. Float 151 rum on top by pouring slowly over the back of a spoon." },
  112: { method: "Shake", directions: null },
  113: { method: "Build", directions: null },
  114: { method: "Build", directions: null },
  115: { method: "Shake", directions: null },
  116: { method: "Shake", directions: null },
  117: { method: "Shake", directions: "Shake tequila, triple sec, lime juice, and sour mix with ice. Strain into a salt-rimmed glass. Float Grand Marnier on top by pouring slowly over the back of a spoon." },
  118: { method: "Build", directions: "Muddle mint leaves, lime, and sugar in the glass. Add ice and rum, top with club soda, and stir." },
  119: { method: "Shake", directions: null },
  120: { method: "Shake", directions: null },
  121: { method: "Build", directions: null },
  122: { method: "Shake", directions: "Shake light rum, cr\u00e8me de banana, grenadine, and blackberry brandy with sour mix. Strain over ice. Float dark rum on top by pouring slowly over the back of a spoon." },
  123: { method: "Shake", directions: null },
  124: { method: "Shake", directions: null },
  125: { method: "Shake", directions: null },
  126: { method: "Shake", directions: null },
  127: { method: "Shake", directions: null },
  128: { method: "Shake", directions: null },
  129: { method: "Shake", directions: null },
  130: { method: "Shake", directions: null },
  131: { method: "Shake", directions: null },
  132: { method: "Shake", directions: null },
  133: { method: "Shake", directions: null },
  134: { method: "Shake", directions: null },
  135: { method: "Shake", directions: null },
  136: { method: "Shake", directions: null },
  137: { method: "Shake", directions: null },
  138: { method: "Build", directions: "Add Frangelico, Bailey's, and Kahlua to a warm mug. Top with hot coffee, stir, and finish with whipped cream." },
  139: { method: "Build", directions: "Add butterscotch schnapps to a warm mug. Top with hot coffee and finish with whipped cream." },
  140: { method: "Build", directions: "Add amaretto and cr\u00e8me de cacao to a warm mug. Top with hot coffee and finish with whipped cream." },
  141: { method: "Build", directions: "Add Kahlua, Bailey's, and Frangelico to a warm mug. Top with hot coffee and finish with whipped cream." },
  142: { method: "Build", directions: "Add Grand Marnier, Kahlua, and Bailey's to a warm mug. Top with hot coffee and finish with whipped cream." },
  143: { method: "Build", directions: "Add Bailey's and Frangelico to a warm mug. Top with hot coffee and finish with whipped cream." },
  144: { method: "Build", directions: "Add honey and bourbon (or scotch) to a mug. Pour boiling water over, stir well, and garnish with a cinnamon stick." },
  145: { method: "Build", directions: null },
  146: { method: "Build", directions: null },
  147: { method: "Build", directions: null },
  148: { method: "Build", directions: null },
  149: { method: "Build", directions: null },
  150: { method: "Build", directions: null },
  151: { method: "Build", directions: "Place a sugar cube in the glass, add a dash of bitters, and fill with champagne." },
  152: { method: "Build", directions: null },
  153: { method: "Shake", directions: "Shake gin, sour mix, and lemon juice with ice. Strain into a flute and top with champagne." },
  154: { method: "Shake", directions: null },
  155: { method: "Shake", directions: null },
  156: { method: "Shake", directions: null },
  157: { method: "Build", directions: null },
  158: { method: "Layer", directions: "Pour strawberry schnapps into the glass. Slowly drop Bailey's in drop by drop so it curdles into 'brain' strands rather than mixing." },
  159: { method: "Shake", directions: null },
  160: { method: "Build", directions: "Dissolve cherry Jell-O in boiling water, stir in vodka, and chill until set." },
  161: { method: "Shake", directions: null },
  162: { method: "Shake", directions: null },
  163: { method: "Shake", directions: null },
  164: { method: "Shake", directions: null },
  165: { method: "Shake", directions: null },
  166: { method: "Layer", directions: "Layer carefully in order: Kahlua first, then Bailey's, then peppermint schnapps on top, pouring each slowly over the back of a spoon." },
  167: { method: "Shake", directions: null },
  168: { method: "Build", directions: null },
  169: { method: "Build", directions: null },
  170: { method: "Shake", directions: null },
  171: { method: "Layer", directions: "Layer carefully in order: Kahlua first, then Bailey's, then Grand Marnier on top, pouring each slowly over the back of a spoon to keep the layers distinct." },
  172: { method: "Layer", directions: "Layer carefully in order: Kahlua first, then Bailey's, then 151 rum on top, pouring each slowly over the back of a spoon to keep the layers distinct." },
  173: { method: "Layer", directions: "Layer in reverse order: vodka first (bottom), then Bailey's, then Kahlua on top, pouring each slowly over the back of a spoon so the layers stay separate." },
  174: { method: "Build", directions: null },
  175: { method: "Layer", directions: "Layer amaretto and Chambord, then float 151 rum on top and carefully ignite. Extinguish before drinking and serve with a half glass of beer as a chaser." },
  176: { method: "Shake", directions: null },
  177: { method: "Shake", directions: null },
  178: { method: "Build", directions: null },
  179: { method: "Build", directions: null },
  180: { method: "Build", directions: null },
  181: { method: "Build", directions: null },
  182: { method: "Shake", directions: null },
  183: { method: "Shake", directions: null },
};

const DRINK_CALENDAR = {
  "01-01": { holiday: "National Bloody Mary Day", drinkName: "Bloody Mary", blurb: "The ultimate hangover cure and brunch staple, built on the bold pairing of vodka and tomato juice." },
  "01-11": { holiday: "National Hot Toddy Day", drinkName: "Hot Toddy", blurb: "A warm whiskey classic that's been soothing colds (and bad days) for centuries." },
  "02-22": { holiday: "National Margarita Day", drinkName: "Margarita", blurb: "America's most popular tequila cocktail gets its own day \u2014 salt rim optional, but recommended." },
  "02-27": { holiday: "National Kahlua Day", drinkName: "Black Russian", blurb: "A coffee liqueur so good it gets its own holiday \u2014 shown here at its smoothest." },
  "03-03": { holiday: "International Irish Whiskey Day", drinkName: "Hot Tamale", blurb: "A nod to Irish whiskey's warming, honeyed character." },
  "03-21": { holiday: "World Vermouth Day", drinkName: "Manhattan", blurb: "Vermouth is the unsung hero behind some of the world's most iconic cocktails." },
  "03-24": { holiday: "National Cocktail Day", drinkName: "Old Fashion", blurb: "A celebration of the cocktail itself \u2014 and there's no better place to start than where it all began." },
  "03-27": { holiday: "International Whisk(e)y Day", drinkName: "Whiskey Sour", blurb: "Honoring the spirit that built entire chapters of this book." },
  "04-07": { holiday: "National Beer Day", drinkName: "Black and Tan", blurb: "Prohibition's end in 1933 gets celebrated with a classic beer-forward pour." },
  "04-09": { holiday: "National Gin & Tonic Day", drinkName: "Gin & Tonic", blurb: "Two ingredients, endless refreshment \u2014 the easiest classic in the book." },
  "05-13": { holiday: "World Cocktail Day", drinkName: "Sazerac", blurb: "Marking the day the word 'cocktail' first appeared in print \u2014 celebrated with one of the oldest cocktails on record." },
  "05-25": { holiday: "National Wine Day", drinkName: "Sangria", blurb: "A day to celebrate wine in all its forms, including the ones mixed into a pitcher." },
  "05-30": { holiday: "National Mint Julep Day", drinkName: "Mint Julep", blurb: "The official drink of the Kentucky Derby, built on muddled mint and bourbon." },
  "06-04": { holiday: "National Cognac Day", drinkName: "Sidecar", blurb: "Cognac's elegance shines in this classic French sour." },
  "06-14": { holiday: "National Bourbon Day", drinkName: "Manhattan", blurb: "America's native spirit deserves a toast \u2014 Whiskey B. all the way." },
  "06-19": { holiday: "National Martini Day", drinkName: "Martini", blurb: "Shaken or stirred, dry or dirty \u2014 June 19th is all about the original mixed drink." },
  "06-26": { holiday: "Tropical Cocktails Day", drinkName: "Mai Tai", blurb: "An excuse to bring a little island escape into any backyard." },
  "07-02": { holiday: "National Anisette Day", drinkName: "Sambuca", blurb: "A licorice-forward liqueur that shows up across the shooters chapter." },
  "07-10": { holiday: "National Pina Colada Day", drinkName: "Pina Colada", blurb: "Rum, pineapple, and coconut cream \u2014 the official taste of vacation." },
  "07-11": { holiday: "National Mojito Day", drinkName: "Mojito", blurb: "Mint, lime, rum, and soda \u2014 Cuba's gift to summer." },
  "07-14": { holiday: "National Grand Marnier Day", drinkName: "Top Shelf / Cadillac Margarita", blurb: "Grand Marnier's orange-cognac blend turns a good margarita into a great one." },
  "07-19": { holiday: "National Daiquiri Day", drinkName: "Daiquiri", blurb: "Before the blenders and the flavors, it was just rum, lime, and sugar \u2014 and it's still the best version." },
  "07-24": { holiday: "National Tequila Day", drinkName: "Tequila Sunrise", blurb: "A day built entirely around agave, sunshine, and a salted rim." },
  "07-27": { holiday: "National Scotch Day", drinkName: "Rob Roy", blurb: "Marking the day Scotland's whiskies were first taxed \u2014 fittingly, with Scotland's signature Manhattan." },
  "08-08": { holiday: "National Frozen Custard Day", drinkName: "Brandy Alexander", blurb: "Creamy, dessert-like, and the closest thing to drinking custard." },
  "08-30": { holiday: "World Mai Tai Day", drinkName: "Mai Tai", blurb: "Trader Vic's tiki classic gets a worldwide toast." },
  "09-04": { holiday: "National Vodka Day", drinkName: "Vodka Martini", blurb: "The world's most versatile spirit, served at its cleanest." },
  "10-04": { holiday: "National Vodka Day", drinkName: "Cosmopolitan", blurb: "A second nod to vodka's versatility, by way of a 90s icon." },
  "10-08": { holiday: "National Harvey Wallbanger Day", drinkName: "Harvey Wallbanger", blurb: "Vodka, Galliano, and orange juice \u2014 a drink as fun to make as it is to say." },
  "10-16": { holiday: "National Liqueur Day", drinkName: "Grasshopper", blurb: "A celebration of the bottles that turn good cocktails into great ones." },
  "11-14": { holiday: "National Champagne Day", drinkName: "French 75", blurb: "Bubbles deserve more than just a toast \u2014 this gin-and-champagne classic earns the spotlight." },
  "11-23": { holiday: "National Espresso Day", drinkName: "Espresso Martini", blurb: "Coffee and vodka collide in one of the most requested drinks at any bar." },
  "12-05": { holiday: "Repeal Day", drinkName: "Old Fashion", blurb: "Marking the end of Prohibition in 1933 \u2014 celebrated properly, with a true original." },
  "12-14": { holiday: "National Screwdriver Day", drinkName: "Screwdriver", blurb: "Vodka and orange juice \u2014 proof that simple is sometimes best." },
  "12-20": { holiday: "National Sangria Day", drinkName: "Sangria", blurb: "A fruity, wine-based classic to close out the year." },
  "12-31": { holiday: "New Year's Eve", drinkName: "Champagne Cocktail", blurb: "A sugar cube, a dash of bitters, and a flute of champagne \u2014 the perfect way to ring in the new year." },
};

const CAT_COLORS = {
  martinis:"#7B68C8", one_liquor:"#C8821A", sours:"#A8A020", frozen:"#4A9CC8",
  two_liquor:"#A0522D", tropics:"#2E8B57", dessert:"#C84B8A",
  coffee:"#6B4226", wine:"#8B1A4A", shooters:"#C84040", community:"#4A8B8B",
};
const cc = (cat) => CAT_COLORS[cat] || "#C8821A";
const getMethod = (id) => DRINK_METHODS[id] || { method: "Build", directions: null };
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

let _sbToken = null;
const _sb = {
  _h: () => ({ "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${_sbToken || SUPABASE_ANON_KEY}` }),
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
  try {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/signup`, { method: "POST", headers: this._h(), body: JSON.stringify({ email, password }) });
    const d = await r.json();
    if (!r.ok) return { user: null, error: d.error_description || d.msg };
    if (d.access_token) _sbToken = d.access_token;
    return { user: d.user, error: null, access_token: d.access_token || null };
  } catch { return { user: null, error: "network" }; }
},
  async signIn(email, password) {
  try {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, { method: "POST", headers: this._h(), body: JSON.stringify({ email, password }) });
    const d = await r.json();
    if (!r.ok) return { user: null, error: d.error_description || d.msg };
    _sbToken = d.access_token;
    return { user: d.user, error: null, access_token: d.access_token };
  } catch { return { user: null, error: "network" }; }
},
  async delete(table, q = "") {
  try { const r = await fetch(`${this._url(table)}${q}`, { method: "DELETE", headers: this._h() }); return r.ok ? { error: null } : { error: "delete error" }; } catch { return { error: "network" }; }
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

async function loadUserData(u) {
  const { data } = await _sb.select("profiles", `?id=eq.${u.id}`);
  const p = data?.[0] || {};
  setUser({ id: u.id, email: u.email, username: p.username || u.email, is_premium: !!p.is_premium });
  setMyBar(Array.isArray(p.my_bar) ? p.my_bar : []);

  const { data: ratingsData } = await _sb.select("ratings", `?user_id=eq.${u.id}`);
  if (ratingsData) {
    const ratingsMap = {};
    ratingsData.forEach(r => { ratingsMap[r.drink_id] = r.stars; });
    setMyRatings(ratingsMap);
  }

  const { data: journalData } = await _sb.select("journal_entries", `?user_id=eq.${u.id}&order=created_at.desc`);
  if (journalData) {
    setJournalEntries(journalData.map(j => ({
      id: j.id, drinkId: j.drink_id, drinkName: j.drink_name,
      notes: j.personal_notes, where: j.tried_where,
      wouldOrderAgain: j.would_order_again, createdAt: j.created_at
    })));
  }

  const { data: savedData } = await _sb.select("saved_drinks", `?user_id=eq.${u.id}`);
  if (savedData) {
    const savedMap = {};
    savedData.forEach(s => { savedMap[s.drink_id] = true; });
    setMySaved(savedMap);
  }
}
  
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
  const { user: u, error, access_token } = await _sb.signIn(authEmail, authPass);
  if (error) { setAuthErr(error); setAuthBusy(false); return; }
  localStorage.setItem("dab_session", JSON.stringify({ access_token, user: { id: u.id, email: u.email } }));
  await loadUserData(u);
}
    setShowAuth(false); setAuthEmail(""); setAuthPass(""); setAuthUser(""); setAuthBusy(false);
  }

  // ── Navigation ────────────────────────────────────────────────────────────
  const [tab, setTab] = useState("home");
  const [activeCat, setActiveCat] = useState("martinis");
  const [communityTab, setCommunityTab] = useState("browse");
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [bartenderView, setBartenderView] = useState(null); // { drink, list } for fullscreen bar card swipe view
  const [barCardSearch, setBarCardSearch] = useState("");
  const [surpriseDrink, setSurpriseDrink] = useState(null);

function getTodaysDrink() {
  const today = new Date();
  const key = `${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;
  const entry = DRINK_CALENDAR[key];
  if (entry) {
    const drink = allDrinks.find(d => d.name.toLowerCase() === entry.drinkName.toLowerCase());
    if (drink) return { drink, holiday: entry.holiday, blurb: entry.blurb };
  }
  // Fallback: deterministic "random" pick based on day of year, so it's stable all day
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(),0,0)) / 86400000);
  const pick = BOOK_DRINKS[dayOfYear % BOOK_DRINKS.length];
  return { drink: pick, holiday: null, blurb: null };
}

function surpriseMe() {
  const pool = allDrinks.filter(d => d.cat !== "community");
  const pick = pool[Math.floor(Math.random() * pool.length)];
  setSurpriseDrink(pick);
}
  const [search, setSearch] = useState("");
  const [activeSpirit, setActiveSpirit] = useState(null);
  const [showPremium, setShowPremium] = useState(false);

  // ── Shared storage ────────────────────────────────────────────────────────
  const [communityRatings, setCommunityRatings] = useState({});
  const [communityDrinks, setCommunityDrinks] = useState([]);
  const [storageReady, setStorageReady] = useState(false);

useEffect(() => {
  StatusBar.setBackgroundColor({ color: '#0A0806' }).catch(() => {});
  StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
}, []);
  
  useEffect(() => {
  const saved = localStorage.getItem("dab_session");
  if (saved) {
    try {
      const { access_token, user: u } = JSON.parse(saved);
      if (access_token && u) { _sbToken = access_token; loadUserData(u); }
    } catch {}
  }
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

// ── AI Chat ───────────────────────────────────────────────────────────────
const [chatOpen, setChatOpen] = useState(false);
const [chatMessages, setChatMessages] = useState([
  { role: "assistant", content: "Hey! I'm your AI bartender 🍸 Ask me anything — what to order, what's in a drink, which spirit suits your mood, or what you can make with what you've got." }
]);
const [chatInput, setChatInput] = useState("");
const [chatBusy, setChatBusy] = useState(false);

async function sendChat() {
  if (!chatInput.trim() || chatBusy) return;
  const userMsg = { role: "user", content: chatInput.trim() };
  const newMessages = [...chatMessages, userMsg];
  setChatMessages(newMessages);
  setChatInput("");
  setChatBusy(true);

  const savedNames = savedDrinks.map(d => d.name).join(", ") || "none yet";
  const ratedList = BOOK_DRINKS.filter(d => myRatings[d.id])
    .map(d => `${d.name} (${myRatings[d.id]}/5)`).join(", ") || "none yet";
  const userName = user?.username || "friend";

  const systemPrompt = `You are a witty, fun AI bartender for the cocktail app "A Dab of This, A Dab of That" by Andrew Flannigan — a bartender who wrote his recipe book during a military deployment in Afghanistan. You know every drink in the book. Be clever, warm, and occasionally make a good drink pun. Keep responses concise (2-4 sentences usually). Never be boring.

The user's name is ${userName}.
Their saved drinks: ${savedNames}.
Their rated drinks: ${ratedList}.

Here are all 183 drinks in the book by category:
${BOOK_CATEGORIES.map(cat => {
  const drinks = BOOK_DRINKS.filter(d => d.cat === cat.id);
  return `${cat.label}: ${drinks.map(d => `${d.name} (${d.ingredients.join(", ")})`).join(" | ")}`;
}).join("\n")}

Spirits guide covers: Whiskey, Bourbon, Scotch, Rum, Gin, Vodka, Tequila, Brandy & Cognac.

When recommending drinks, reference the actual recipes. If someone asks what they can make with specific spirits, check the ingredients above. Have fun with it.`;

  try {
    const response = await fetch("https://a-dab-of-this.vercel.app/api/chat", {
      method: "POST",
      headers: { "Content-Type":  "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system: systemPrompt,
        messages: newMessages.map(m => ({ role: m.role, content: m.content })),
      }),
    });
    const data = await response.json();
    console.log("API response:", JSON.stringify(data));
    const reply = data.content?.[0]?.text || "Sorry, I spilled my drink. Try again?";
    setChatMessages(msgs => [...msgs, { role: "assistant", content: reply }]);
  } catch {
    setChatMessages(msgs => [...msgs, { role: "assistant", content: "Lost my train of thought — probably had one too many. Try again!" }]);
  }
  setChatBusy(false);
}
  
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

async function toggleMyBarSpirit(s) {
  const updated = myBar.includes(s) ? myBar.filter(x => x !== s) : [...myBar, s];
  setMyBar(updated);
  if (user && SUPABASE_URL !== "YOUR_SUPABASE_URL") {
    await _sb.upsert("profiles", { id: user.id, username: user.username, my_bar: updated }, "id");
  }
}

async function clearMyBar() {
  setMyBar([]);
  setBarResults(null);
  if (user && SUPABASE_URL !== "YOUR_SUPABASE_URL") {
    await _sb.upsert("profiles", { id: user.id, username: user.username, my_bar: [] }, "id");
  }
}
  
  async function toggleSaved(id) {
  if (!user) { setShowAuth(true); return; }
  const willSave = !mySaved[id];
  setMySaved(s => ({ ...s, [id]: !s[id] }));
  if (SUPABASE_URL !== "YOUR_SUPABASE_URL") {
    if (willSave) {
      await _sb.upsert("saved_drinks", { user_id: user.id, drink_id: String(id) }, "user_id,drink_id");
    } else {
      await _sb.delete("saved_drinks", `?user_id=eq.${user.id}&drink_id=eq.${String(id)}`);
    }
  }
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
  const allDrinks = [...BOOK_DRINKS, ...CLASSIC_DRINKS, ...communityDrinks];
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
{d.source === "classic" && <div style={{ display:"inline-block", fontSize:"0.58rem", color:"#7A9CC8", background:"#4A8CC820", border:"1px solid #4A8CC840", borderRadius:10, padding:"1px 7px", marginBottom:5 }}>Classic Cocktail</div>}
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
           <button onClick={async ()=>{
  // Production: trigger Google Play Billing via Capacitor
  // import { InAppPurchase2 } from '@ionic-native/in-app-purchase-2';
  if(!user){setShowPremium(false);setShowAuth(true);return;}
  setUser(u=>({...u,is_premium:true}));
  setShowPremium(false);
  // Persist premium status to Supabase so it survives logout/login
 if (SUPABASE_URL !== "YOUR_SUPABASE_URL") {
  await _sb.upsert("profiles", { id: user.id, username: user.username, is_premium: true }, "id");
}
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
              {[[BOOK_DRINKS.length + CLASSIC_DRINKS.length,"Total Recipes"],["10","Chapters"],["8","Spirits"],[communityDrinks.length||"0","Community"]].map(([n,l])=>(
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

{(() => {
  const { drink, holiday, blurb } = getTodaysDrink();
  return (
    <div style={S.sec}>
      <div style={S.sttl}>{holiday ? `🎉 ${holiday}` : "✨ Drink of the Day"}</div>
      <div style={{ background:"#111008", border:`1px solid ${cc(drink.cat)}40`, borderRadius:12, padding:16, display:"flex", gap:14, alignItems:"center", cursor:"pointer" }} onClick={()=>setSelectedDrink(drink)}>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:"1.05rem", fontStyle:"italic", color:"#E8DCC8", marginBottom:4 }}>{drink.name}</div>
          {blurb && <div style={{ fontSize:"0.72rem", color:"#8A7A64", lineHeight:1.5, marginBottom:6 }}>{blurb}</div>}
          <div style={{ fontSize:"0.62rem", color:cc(drink.cat) }}>{catLabel(drink.cat)} · Tap to see recipe →</div>
        </div>
      </div>
    </div>
  );
})()}

<div style={{ padding:"0 20px 6px" }}>
  <button onClick={surpriseMe} style={{ width:"100%", padding:11, background:"linear-gradient(135deg,#7B68C8,#A088E8)", border:"none", borderRadius:8, color:"#0A0806", fontSize:"0.85rem", fontFamily:"Georgia,serif", fontStyle:"italic", fontWeight:"bold", cursor:"pointer" }}>
    🎲 Surprise Me
  </button>
</div>
          
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
                  <div style={{ fontSize:"0.59rem", color:cc(cat.id), marginTop:2 }}>{allDrinks.filter(d=>d.cat===cat.id && d.cat !== "community").length} drinks</div>
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
          <button onClick={surpriseMe} style={{ width:"100%", padding:9, marginBottom:10, background:"linear-gradient(135deg,#7B68C8,#A088E8)", border:"none", borderRadius:8, color:"#0A0806", fontSize:"0.8rem", fontFamily:"Georgia,serif", fontStyle:"italic", fontWeight:"bold", cursor:"pointer" }}>
  🎲 Surprise Me
</button>
          {!search && (
            <div style={{ display:"flex", gap:5, overflowX:"auto", paddingBottom:8, marginBottom:10 }}>
              {BOOK_CATEGORIES.map(cat=>(
                <button key={cat.id} onClick={()=>setActiveCat(cat.id)} style={{ padding:"4px 11px", border:`1px solid ${activeCat===cat.id?cc(cat.id):cc(cat.id)+"40"}`, borderRadius:20, background:activeCat===cat.id?cc(cat.id)+"25":"transparent", color:activeCat===cat.id?cc(cat.id):"#5A4A38", cursor:"pointer", fontSize:"0.66rem", whiteSpace:"nowrap", flexShrink:0 }}>
                  {cat.emoji} {cat.label}
                </button>
              ))}
            </div>
          )}
          <div style={S.sttl}>{search?`"${search}" — ${searchResults.length} found`:`${catLabel(activeCat)} — ${allDrinks.filter(d=>d.cat===activeCat).length} drinks`}</div>
          <div style={S.grid}>{(search?searchResults:allDrinks.filter(d=>d.cat===activeCat)).map(d=><DrinkCard key={d.id} d={d} showCat={!!search} />)}</div>
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
          <p style={{ color:"#5A4030", fontSize:"0.72rem", marginBottom:12 }}>Show this to your bartender. Every recipe, exactly as written.</p>
<input
  style={{...S.input,marginBottom:16}}
  placeholder="Search for a drink..."
  value={barCardSearch}
  onChange={e=>setBarCardSearch(e.target.value)}
/>
          {BOOK_CATEGORIES.map(cat=>{
  const catDrinksAll = allDrinks.filter(d=>d.cat===cat.id);
  const catDrinksFiltered = barCardSearch.trim()
    ? catDrinksAll.filter(d=>d.name.toLowerCase().includes(barCardSearch.toLowerCase()))
    : catDrinksAll;
  if (barCardSearch.trim() && catDrinksFiltered.length === 0) return null;
  return (
  <div key={cat.id} style={{ marginBottom:18 }}>
    <div style={{ fontSize:"0.65rem", color:cc(cat.id), textTransform:"uppercase", letterSpacing:"2px", marginBottom:6, display:"flex", alignItems:"center", gap:5 }}>{cat.emoji} {cat.label}</div>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:6 }}>
      {(() => { const catDrinks = catDrinksFiltered; return catDrinks.map(d=>{
                  const {avg,count}=getDR(d.id);
                  return (
                    <div key={d.id} onClick={()=>setBartenderView({ drink: d, list: catDrinks })} style={{ background:"#111008", border:`1px solid ${cc(d.cat)}28`, borderRadius:7, padding:"9px 10px", position:"relative", overflow:"hidden", cursor:"pointer" }}>
                      <div style={{ position:"absolute", top:0, left:0, width:3, height:"100%", background:cc(d.cat) }} />
                      <div style={{ paddingLeft:8 }}>
                        <div style={{ fontStyle:"italic", color:"#E8DCC8", fontSize:"0.81rem", marginBottom:3 }}>{d.name}</div>
                        {d.ingredients.map((ing,i)=><div key={i} style={{ fontSize:"0.64rem", color:"#7A6A55", lineHeight:1.58 }}>{ing}</div>)}
                        {d.garnish?<div style={{ fontSize:"0.59rem", color:cc(d.cat), marginTop:2 }}>— {d.garnish}</div>:null}
                        {avg&&<div style={{ marginTop:4 }}><Stars avg={avg} count={count} color={cc(d.cat)} size="0.68rem" /></div>}
                      </div>
                    </div>
                  );
                }); })()}
              </div>
            </div>
          );
        })}
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
                <button key={s} onClick={()=>toggleMyBarSpirit(s)} style={{ padding:"4px 11px", border:`1px solid ${myBar.includes(s)?PREMIUM_COLOR:"#2A2010"}`, borderRadius:20, background:myBar.includes(s)?PREMIUM_COLOR+"25":"transparent", color:myBar.includes(s)?PREMIUM_COLOR:"#5A4A38", cursor:"pointer", fontSize:"0.68rem" }}>
                  {myBar.includes(s)?"✓ ":""}{s}
                </button>
              ))}
            </div>
            <div style={{ display:"flex", gap:7 }}>
              <button onClick={runBarFilter} style={{ flex:1, padding:9, background:`linear-gradient(135deg,${PREMIUM_COLOR},#E8C840)`, border:"none", borderRadius:8, color:"#0A0806", fontSize:"0.8rem", fontFamily:"Georgia,serif", fontStyle:"italic", fontWeight:"bold", cursor:"pointer" }}>
                Find my drinks →
              </button>
              {myBar.length>0&&<button onClick={clearMyBar} style={{ padding:"9px 12px", background:"#1A1510", border:"1px solid #221808", color:"#5A4A38", borderRadius:8, cursor:"pointer", fontSize:"0.73rem" }}>Clear</button>}
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
          <button onClick={()=>{_sbToken=null;localStorage.removeItem("dab_session");setUser(null);setMySaved({});setMyRatings({});setMyBar([]);setJournalEntries([]);setTab("home");}}>Sign out</button>
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
              {selectedDrink.source==="classic"&&<div style={{ display:"inline-block", fontSize:"0.63rem", color:"#7A9CC8", background:"#4A8CC820", border:"1px solid #4A8CC840", borderRadius:10, padding:"2px 9px", marginTop:4 }}>Classic Cocktail</div>}
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
                {selectedDrink.cat!=="community"&&<button style={S.aBtn("#C8A97E")} onClick={()=>{
  const catList = allDrinks.filter(d=>d.cat===selectedDrink.cat);
  setBartenderView({ drink: selectedDrink, list: catList });
  setSelectedDrink(null);
}}>Bartender →</button>}
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

{/* FULLSCREEN BARTENDER VIEW */}
{bartenderView && (() => {
  const { drink, list } = bartenderView;
  const idx = list.findIndex(d => d.id === drink.id);
  const goTo = (newIdx) => {
    if (newIdx < 0 || newIdx >= list.length) return;
    setBartenderView({ drink: list[newIdx], list });
  };
  let touchStartX = 0;
  return (
    <div
      style={{ position:"fixed", inset:0, background:"#0A0806", zIndex:400, display:"flex", flexDirection:"column", padding:"24px 22px" }}
      onTouchStart={e => { touchStartX = e.touches[0].clientX; }}
      onTouchEnd={e => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (dx > 60) goTo(idx - 1);
        else if (dx < -60) goTo(idx + 1);
      }}
    >
      <button onClick={()=>setBartenderView(null)} style={{ alignSelf:"flex-end", background:"#1A1510", border:"none", color:"#C8A97E", width:38, height:38, borderRadius:"50%", cursor:"pointer", fontSize:"1.1rem", marginBottom:14 }}>✕</button>
      <div style={{ flex:1, overflowY:"auto" }}>
        <div style={{ height:4, background:cc(drink.cat), borderRadius:2, marginBottom:18 }} />
        <div style={S.badge(cc(drink.cat))}>{catLabel(drink.cat)}</div>
        <h1 style={{ fontSize:"2.1rem", fontStyle:"italic", color:"#E8DCC8", margin:"10px 0 6px", lineHeight:1.15 }}>{drink.name}</h1>
        <div style={{ fontSize:"0.95rem", color:cc(drink.cat), marginBottom:18, textTransform:"uppercase", letterSpacing:"1px" }}>{getMethod(drink.id).method}</div>
        {drink.ingredients.map((ing, i) => (
          <div key={i} style={{ fontSize:"1.35rem", color:"#E8DCC8", padding:"12px 0", borderBottom:"1px solid #1A1510", lineHeight:1.4 }}>
            {ing}
          </div>
        ))}
        {getMethod(drink.id).directions && (
  <div style={{ marginTop:18, padding:"14px 16px", background:cc(drink.cat)+"15", border:`1px solid ${cc(drink.cat)}40`, borderRadius:10, fontSize:"1.05rem", color:"#C8A97E", lineHeight:1.6 }}>
    <span style={{ color:cc(drink.cat), fontWeight:"bold" }}>Directions: </span>{getMethod(drink.id).directions}
  </div>
)}
{drink.garnish && (
  <div style={{ marginTop:14, padding:"14px 16px", background:"#1A1510", borderRadius:10, fontSize:"1.15rem", color:"#C8A97E", fontStyle:"italic" }}>
    <span style={{ color:cc(drink.cat) }}>Garnish: </span>{drink.garnish}
  </div>
)}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:18, paddingTop:14, borderTop:"1px solid #1A1510" }}>
        <button onClick={()=>goTo(idx-1)} disabled={idx<=0} style={{ background:"none", border:"none", color:idx<=0?"#2A2010":"#C8A97E", fontSize:"1.6rem", cursor:idx<=0?"default":"pointer", padding:"6px 16px" }}>←</button>
        <span style={{ fontSize:"0.7rem", color:"#5A4030" }}>{idx+1} of {list.length} · swipe to browse</span>
        <button onClick={()=>goTo(idx+1)} disabled={idx>=list.length-1} style={{ background:"none", border:"none", color:idx>=list.length-1?"#2A2010":"#C8A97E", fontSize:"1.6rem", cursor:idx>=list.length-1?"default":"pointer", padding:"6px 16px" }}>→</button>
      </div>
    </div>
  );
})()}

  {surpriseDrink && (
    <div style={S.overlay} onClick={()=>setSurpriseDrink(null)}>
      <div style={{...S.modal,maxWidth:380,textAlign:"center"}} onClick={e=>e.stopPropagation()}>
        <button style={S.closeBtn} onClick={()=>setSurpriseDrink(null)}>✕</button>
        <div style={{ fontSize:"2rem", marginBottom:8 }}>🎲</div>
        <div style={{ fontSize:"0.7rem", color:"#5A4030", textTransform:"uppercase", letterSpacing:"2px", marginBottom:10 }}>Your Surprise Drink</div>
        <h2 style={{ fontSize:"1.4rem", fontStyle:"italic", color:"#E8DCC8", marginBottom:14 }}>{surpriseDrink.name}</h2>
        <div style={{ display:"flex", gap:8, justifyContent:"center" }}>
          <button style={S.aBtn(cc(surpriseDrink.cat))} onClick={()=>{setSelectedDrink(surpriseDrink);setSurpriseDrink(null);}}>See Recipe →</button>
          <button style={S.aBtn("#7B68C8")} onClick={surpriseMe}>🎲 Again</button>
        </div>
      </div>
    </div>
  )}      
      
      {/* AI CHAT */}
<div style={{ position:"fixed", bottom:20, right:20, zIndex:300 }}>
  {chatOpen && (
    <div style={{ position:"absolute", bottom:60, right:0, width:320, height:440, background:"#111008", border:"1px solid #221808", borderRadius:14, display:"flex", flexDirection:"column", overflow:"hidden", boxShadow:"0 8px 32px rgba(0,0,0,0.7)" }}>
      <div style={{ background:"linear-gradient(135deg,#1A1208,#111008)", borderBottom:"1px solid #221808", padding:"11px 14px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <div style={{ fontSize:"0.85rem", fontStyle:"italic", background:"linear-gradient(135deg,#F0A500,#C8821A)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>🍸 AI Bartender</div>
          <div style={{ fontSize:"0.58rem", color:"#3A2E20", textTransform:"uppercase", letterSpacing:"1px" }}>Powered by Claude</div>
        </div>
        <button onClick={()=>setChatOpen(false)} style={{ background:"#1A1510", border:"none", color:"#7A6A55", width:24, height:24, borderRadius:"50%", cursor:"pointer", fontSize:"0.75rem" }}>✕</button>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:12, display:"flex", flexDirection:"column", gap:9 }}>
        {chatMessages.map((m, i) => (
          <div key={i} style={{ display:"flex", justifyContent:m.role==="user"?"flex-end":"flex-start" }}>
            <div style={{ maxWidth:"82%", padding:"8px 11px", borderRadius:m.role==="user"?"12px 12px 3px 12px":"12px 12px 12px 3px", background:m.role==="user"?"linear-gradient(135deg,#C8821A,#F0A500)":"#1A1510", color:m.role==="user"?"#0A0806":"#C8A97E", fontSize:"0.76rem", lineHeight:1.6, fontStyle:m.role==="assistant"?"italic":"normal" }}>
              {m.content}
            </div>
          </div>
        ))}
        {chatBusy && (
          <div style={{ display:"flex", justifyContent:"flex-start" }}>
            <div style={{ padding:"8px 14px", borderRadius:"12px 12px 12px 3px", background:"#1A1510", color:"#5A4030", fontSize:"0.76rem", fontStyle:"italic" }}>Shaking something up...</div>
          </div>
        )}
      </div>
      <div style={{ borderTop:"1px solid #221808", padding:10, display:"flex", gap:7 }}>
        <input
          style={{ ...S.input, flex:1, padding:"7px 10px", fontSize:"0.76rem" }}
          placeholder="Ask your bartender..."
          value={chatInput}
          onChange={e=>setChatInput(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&sendChat()}
        />
        <button onClick={sendChat} disabled={chatBusy} style={{ padding:"7px 12px", background:"linear-gradient(135deg,#C8821A,#F0A500)", border:"none", borderRadius:7, color:"#0A0806", cursor:"pointer", fontSize:"0.8rem", fontWeight:"bold", opacity:chatBusy?0.5:1 }}>→</button>
      </div>
    </div>
  )}
  <button onClick={()=>setChatOpen(o=>!o)} style={{ width:50, height:50, borderRadius:"50%", background:"linear-gradient(135deg,#C8821A,#F0A500)", border:"none", cursor:"pointer", fontSize:"1.4rem", boxShadow:"0 4px 16px rgba(200,130,26,0.4)", display:"flex", alignItems:"center", justifyContent:"center" }}>
    🍸
  </button>
</div>
      
    </div>
  );
}
