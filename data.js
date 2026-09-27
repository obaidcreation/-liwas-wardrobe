/* =========================================================
   LIWA's Wardrobe — STORE DATA
   Is file mein sab kuch badal sakte hain: number, prices, suits.
   Edit karne ke baad file save karein, website khud update ho jayegi.
   ========================================================= */

const SETTINGS = {
  brand: "LIWA's Wardrobe",
  tagline: "Your Style, Your Choice.",
  whatsapp: "923000000000",          // 92 + number, bina 0 ke. Maslan 03001234567 => 923001234567
  whatsappDisplay: "0300 0000000",
  email: "yourname@gmail.com",
  facebook: "https://www.facebook.com/",   // apne page ka poora link
  instagram: "https://www.instagram.com/", // apne profile ka poora link
  instagramHandle: "@liwaswardrobe",
  city: "Attock, Pakistan",
  deliveryCharge: 250,               // Rs
  freeDeliveryAbove: 5000,           // is se zyada order par delivery free
  advanceDiscount: 5,                // % discount agar customer advance payment kare
  exchangeDays: 7,
  paymentAccounts: "Easypaisa / JazzCash: 0300 0000000 (Account title: LIWA's Wardrobe)"
};

/* Product fields:
   id     : unique code (SKU)
   n      : naam
   w      : "L" ladies, "G" gents
   f      : fabric
   pc     : pieces (3 / 2) — ladies ke liye; gents ke liye meter (m)
   p      : price (Rs)
   o      : purani price (sale ho to), warna hata dein
   t      : "new" | "season" | "sale" | ""  (badge)
   work   : printed / embroidered / plain etc
   pal,m  : jab tak asal photo nahi, ye rang aur pattern dikhenge
   img    : asal photos ka array, maslan ["LW-101-1.jpg","LW-101-2.jpg"] (photos GitHub par baqi files ke saath upload karein)
   d      : description
   stock  : false likhein to "Sold out" dikhega
*/
const PRODUCTS = [
  {id:'LW-101',n:'Gulnaar',w:'L',f:'Lawn',pc:3,p:3450,o:4600,t:'sale',work:'Printed',pal:['#f6e7ea','#a3302f','#2f5d3a'],m:'flower',d:'Soft printed lawn shirt in a rose and leaf motif, paired with a printed chiffon dupatta and dyed cambric trouser.'},
  {id:'LW-102',n:'Sunehri',w:'L',f:'Lawn',pc:3,p:4250,t:'new',work:'Embroidered',pal:['#f7eedb','#b8863b','#151311'],m:'jaal',d:'Embroidered lawn front with gold-tone threadwork, printed back and sleeves, and a printed lawn dupatta.'},
  {id:'LW-103',n:'Firozi',w:'L',f:'Lawn',pc:3,p:3650,t:'new',work:'Digital print',pal:['#dff1ef','#1f7a6b','#b8863b'],m:'lotus',d:'Digital print lawn in a fresh turquoise palette with a matching chiffon dupatta.'},
  {id:'LW-104',n:'Gulabi',w:'L',f:'Lawn',pc:3,p:3250,o:3950,t:'sale',work:'Printed',pal:['#fbe3e6','#c0476a','#2f5d3a'],m:'flower',d:'Light pink printed lawn with a soft lawn dupatta. An easy everyday summer suit.'},
  {id:'LC-201',n:'Neelam',w:'L',f:'Cotton',pc:3,p:2950,t:'season',work:'Printed',pal:['#e8ecf8','#27336b','#d9b36a'],m:'lotus',d:'Breathable pure cotton with a lotus print. Softens with every wash.'},
  {id:'LC-202',n:'Mahtab',w:'L',f:'Cotton',pc:2,p:2450,t:'new',work:'Printed',pal:['#fbf1cf','#c98a0e','#2f5d3a'],m:'dots',d:'Shirt and trouser in soft cotton with a playful dot print. No dupatta.'},
  {id:'LL-301',n:'Zaitoon',w:'L',f:'Linen',pc:3,p:4150,t:'new',work:'Printed',pal:['#e9e6d6','#5d6b3a','#a3302f'],m:'leaf',d:'Textured linen with an olive leaf print. Comfortable for early summer and autumn.'},
  {id:'LK-401',n:'Shahana',w:'L',f:'Khaddar',pc:3,p:3950,t:'season',work:'Block print',pal:['#3d2230','#d9b36a','#e9c4c0'],m:'block',d:'Warm khaddar with a block print and matching khaddar dupatta.'},
  {id:'LK-402',n:'Sarmai',w:'L',f:'Khaddar',pc:3,p:4650,t:'season',work:'Embroidered',pal:['#233a4a','#e9c4c0','#d9b36a'],m:'flower',d:'Deep blue khaddar with an embroidered neckline and printed shawl dupatta.'},
  {id:'LR-501',n:'Kashmiri',w:'L',f:'Karandi',pc:3,p:5450,t:'season',work:'Embroidered',pal:['#6b2a26','#f0cfa0','#2d2230'],m:'leaf',d:'Rich karandi weave with an embroidered front for cold winter days.'},
  {id:'LF-601',n:'Anaar',w:'L',f:'Chiffon',pc:3,p:8950,o:12500,t:'sale',work:'Handwork',pal:['#5a1c24','#d9b36a','#f3e6d3'],m:'jaal',d:'Chiffon with handwork, organza sleeves and an embroidered dupatta. Made for weddings and Eid.'},
  {id:'LF-602',n:'Noor',w:'L',f:'Chiffon',pc:3,p:9450,t:'new',work:'Sequins',pal:['#f4e9f1','#8b3a6b','#d9b36a'],m:'jaal',d:'Pastel chiffon with sequin detailing for evening events.'},
  {id:'GW-701',n:'Classic White',w:'G',f:'Wash & Wear',pc:4,p:2850,t:'new',work:'Plain',pal:['#f4f3ef','#dcd8cc'],m:'weave',d:'Premium wash & wear. Easy care, wrinkle resistant and ready for daily wear.'},
  {id:'GW-702',n:'Midnight Navy',w:'G',f:'Wash & Wear',pc:4,p:2650,o:3400,t:'sale',work:'Plain',pal:['#1d2640','#2b3656'],m:'weave',d:'Soft-finish wash & wear in deep navy.'},
  {id:'GW-703',n:'Sky Blue',w:'G',f:'Wash & Wear',pc:4,p:2550,o:2950,t:'sale',work:'Plain',pal:['#dde7ef','#c7d6e3'],m:'weave',d:'Light sky blue wash & wear for summer.'},
  {id:'GB-801',n:'Ivory Boski',w:'G',f:'Boski',pc:4,p:6450,t:'new',work:'Plain',pal:['#efe2c3','#dcc79a'],m:'twill',d:'Pure boski silk with a natural sheen. A classic for Eid and weddings.'},
  {id:'GC-901',n:'Sand Cotton',w:'G',f:'Cotton',pc:4,p:3250,t:'season',work:'Plain',pal:['#d9c7a5','#c6b28c'],m:'weave',d:'100% cotton suiting in a warm sand shade.'},
  {id:'GL-911',n:'Olive Linen',w:'G',f:'Linen',pc:4,p:3650,t:'new',work:'Textured',pal:['#6f7458','#5f6449'],m:'twill',d:'Breathable linen with a textured finish.'},
  {id:'GK-921',n:'Charcoal Karandi',w:'G',f:'Karandi',pc:4.5,p:4450,t:'season',work:'Textured',pal:['#3a3a3c','#2c2c2e'],m:'twill',d:'Winter karandi in charcoal grey.'},
  {id:'GK-922',n:'Brown Khaddar',w:'G',f:'Khaddar',pc:4.5,p:3850,t:'season',work:'Plain',pal:['#6b4a33','#5a3d29'],m:'weave',d:'Traditional pure khaddar in earthy brown.'}
];

/* Fabric Glossary — Fabric Guide page par dikhta hai */
const FABRICS = [
  {n:'Lawn',s:'summer',who:'L',feel:'Thin, soft, breathable',best:'Daily wear in hot weather',care:'Wash separately in cold water. Iron on medium.'},
  {n:'Cotton',s:'summer',who:'LG',feel:'Soft, durable, cool',best:'Daily and office wear',care:'Machine wash cold. Softens with every wash.'},
  {n:'Linen',s:'summer',who:'LG',feel:'Textured and airy',best:'Early summer, autumn, casual events',care:'Hand wash cold. Iron while slightly damp.'},
  {n:'Wash & Wear',s:'all',who:'G',feel:'Smooth, wrinkle resistant',best:'Everyday wear, office, travel',care:'Machine wash. Needs very little ironing.'},
  {n:'Latha',s:'summer',who:'G',feel:'Crisp and light',best:'Hot summer days',care:'Wash cold. Iron on medium heat.'},
  {n:'Boski',s:'all',who:'G',feel:'Silky with a natural sheen',best:'Eid, weddings, Jummah',care:'Dry clean recommended.'},
  {n:'Khaddar',s:'winter',who:'LG',feel:'Thick, rough, warm',best:'Winter daily wear',care:'Wash inside out in cold water to protect print.'},
  {n:'Karandi',s:'winter',who:'LG',feel:'Heavy, textured, rich look',best:'Winter events and outings',care:'Dry clean or gentle hand wash.'},
  {n:'Marina',s:'winter',who:'L',feel:'Soft, light, warm',best:'Comfortable winter daily wear',care:'Gentle wash cold. Do not wring.'},
  {n:'Chiffon',s:'all',who:'L',feel:'Light, sheer, flowing',best:'Weddings, Eid, formal dinners',care:'Dry clean only.'},
  {n:'Organza',s:'all',who:'L',feel:'Crisp, sheer, shiny',best:'Formal events, dupattas and sleeves',care:'Dry clean only.'},
  {n:'Jacquard',s:'all',who:'L',feel:'Pattern woven into the fabric',best:'Semi-formal and festive',care:'Dry clean recommended.'}
];

/* Asal customer reviews (screenshots se likh kar) yahan add karein.
   Jab tak khaali hai, website par reviews section nahi dikhega.
   Maslan: {name:'Ayesha, Lahore', text:'Kapra bohat achha tha', stars:5} */
const REVIEWS = [];
