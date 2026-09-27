# LIWA's Wardrobe — Website

Ladies & Gents Unstitched online store. Static website: GitHub Pages, Netlify ya kisi bhi hosting par free chal sakti hai.

## Pages
| File | Kya hai |
|---|---|
| `index.html` | Home page (3D hanger, collections, Fabric Finder) |
| `shop.html` | Tamam suits, filters ke saath |
| `product.html?id=LW-101` | Har suit ka apna page |
| `fabric-guide.html` | Fabric glossary + gents metre calculator |
| `about.html`, `contact.html`, `policies.html` | About, contact + FAQ, policies |

## Sab se zaroori file: `data.js`
Website ki saari maloomat isi ek file mein hai:

1. **WhatsApp number, email, Facebook/Instagram link** — `SETTINGS` ke andar badlein.
   - `whatsapp` mein number `92` se shuru, bina `0` ke. Maslan `0300 1234567` → `923001234567`.
2. **Delivery charges, free delivery limit, advance discount, exchange days** — bhi `SETTINGS` mein.
3. **Suits** — `PRODUCTS` list mein. Naya suit add karne ke liye ek line copy karein aur naam, price, `id` badal dein. `id` har suit ka alag hona chahiye.
4. **Asal photos** — photo ka naam suit ke code se rakhein (maslan `LW-101-1.jpg`, `LW-101-2.jpg`), GitHub par baqi files ke saath upload karein, aur `data.js` mein suit ke andar likhein:
   `img:['LW-101-1.jpg','LW-101-2.jpg']`
   Pehli photo card par, doosri mouse le jane par dikhti hai. Jab tak photo nahi, design wala pattern dikhta hai.
5. **Sold out** — suit mein `stock:false` likh dein.
6. **Sale** — `o:` mein purani price aur `t:'sale'` likhein; % khud calculate hoga.
7. **Customer reviews** — `REVIEWS` mein sirf asli reviews likhein. Khaali ho to section chhupa rehta hai.

## GitHub Pages par live karna
1. github.com par login → **New repository** → naam `liwas-wardrobe` → **Public** → Create.
2. **Add file → Upload files** → is folder ki saari files (`Ctrl + A`) drag karein → **Commit changes**.
3. **Settings → Pages** → Source: **Deploy from a branch** → Branch: **main**, folder **/ (root)** → Save.
4. 1–2 minute baad link milega: `https://USERNAME.github.io/liwas-wardrobe/`

Baad mein koi file badalni ho: GitHub par file kholein → pencil (✏) → edit → **Commit changes**.

## Orders kaise aate hain
Customer bag mein suits daal kar naam, phone, city, address bharta hai aur "Place order on WhatsApp" dabata hai.
Order number (maslan `LW-260927-481`), suits, total aur address ke saath message client ke WhatsApp par khulta hai.
