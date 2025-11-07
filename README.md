# Paint Alkalmazás Kaleidoszkóp Móddal

Egy egyszerű, de funkciókban gazdag paint alkalmazás böngészőben, speciális kaleidoszkóp móddal és modern felhasználói felülettel.

## Funkciók

### Rajzolási eszközök
- **Szabadkézi rajzolás**: Ecset eszköz folyamatos rajzoláshoz
- **Vonal**: Egyenes vonalak rajzolása
- **Téglalap**: Téglalapok rajzolása (keretes vagy kitöltött)
- **Kör**: Körök rajzolása (keretes vagy kitöltött)
- **Háromszög**: Háromszögek rajzolása (keretes vagy kitöltött)
- **Pipetta**: Színminta vevő eszköz - kattints a vászonra, hogy a színt felszívd
- **Radír**: Rajzolt elemek törlése
- **Kitöltés opció**: Kapcsoló az alakzatok (téglalap, kör, háromszög) kitöltéséhez

### Színek és testreszabás
- **Színpaletta**: 24 előre definiált szín változatos árnyalatokkal
- **Egyéni színválasztó**: Bármilyen szín kiválasztása
- **Pipetta eszköz**: Színek felvétele közvetlenül a vászonról
- **Ecsetméret**: 1-50 pixel közötti méret beállítása
  - Csúszka a gyors beállításhoz
  - Numerikus input a pontos értékhez

### Speciális funkciók
- **Kaleidoszkóp mód**: A rajzolt vonalak és alakzatok szimmetrikusan ismétlődnek több tengely körül
- **Tengelyek száma**: 2-12 tengely közötti beállítás (alapértelmezett: 6)
  - Spinner gombok (+/-) a könnyű állításhoz
  - Numerikus input a pontos értékhez
- **Visszavonás/Újra**: Akár 50 lépés visszavonása és újra alkalmazása
- **Vászon törlése**: Teljes vászon törlése egy kattintással
- **Mentés**: Rajz exportálása PNG formátumban időbélyeggel

## Használat

1. Nyisd meg az `index.html` fájlt egy modern böngészőben
2. Válassz egy eszközt:
   - **Ecset**: Szabadkézi rajzolás
   - **Vonal**: Egyenes vonalak (húzd az egeret a kezdő- és végpontok között)
   - **Téglalap/Kör/Háromszög**: Alakzatok (húzd az egeret a méret meghatározásához)
   - **Pipetta**: Kattints egy színre a vásznon, hogy átvedd
   - **Radír**: Töröld a rajzolt elemeket
3. Válassz színt:
   - Kattints a palettán egy előre definiált színre
   - Használd az egyéni színválasztót
   - Pipetta eszközzel vedd fel a színt a vászonról
4. Állítsd be az ecsetméretet a csúszkával vagy írd be pontosan
5. **Kitöltés**: Jelöld be az alakzatok kitöltéséhez
6. Rajzolj a vásznon!

### Kaleidoszkóp mód használata

1. Kapcsold be a "Kaleidoszkóp mód" kapcsolót
2. Állítsd be a tengelyek számát (2-12) a spinner gombokkal vagy írj be értéket
3. Rajzolj a vásznon - a vonalaid és alakzataid szimmetrikusan ismétlődnek!
4. Kipróbálható:
   - Ecset mozgásokkal érdekes spirálok
   - Kitöltött alakzatokkal mandala-szerű minták
   - Különböző tengelyszámokkal (3, 4, 6, 8, 12)
   - Vékony vonalakkal finom, részletes minták

### Rajz mentése

1. Kattints a **"💾 Mentés"** gombra
2. A rajz automatikusan letöltődik PNG formátumban
3. A fájlnév tartalmazza az időbélyeget: `paint-drawing-YYYY-MM-DD-HH-MM.png`

## Technikai részletek

- **HTML5 Canvas** API a rajzoláshoz
- Modern, gradient alapú dizájn
- Reszponzív elrendezés
- Érintőképernyő támogatás mobilon
- 1000x600 pixel vászon méret
- Teljes undo/redo történet (50 lépés)
- PNG export támogatás
- Moduláris JavaScript struktúra

## Új funkciók (v2.0)

✨ **Új eszközök:**
- Vonal eszköz egyenes vonalakhoz
- Háromszög eszköz
- Pipetta (eyedropper) színminta vételhez

🎨 **Kitöltés opció:**
- Téglalap, kör és háromszög kitöltése

🌈 **Bővített színpaletta:**
- 24 szín (12-ről növelve)
- Pasztell, élénk és földszínek

💾 **Mentés funkció:**
- Rajz exportálása PNG-ként
- Automatikus időbélyeg

⚙️ **Javított UI:**
- Numerikus input az ecsetmérethez
- Spinner gombok a tengelyszám állításához
- Jobb használhatóság

## Tippek

- **Házikó rajzolásához**: Használd a téglalap és háromszög eszközöket kitöltéssel
- **Kaleidoszkóp mód**: Téglalapokkal, körökkel és háromszögekkel is működik!
- **Részletes minták**: Használj vékony ecsetet (1-3px) és kaleidoszkóp módot
- **Színválasztás**: Pipetta eszközzel vedd fel a vászonról a pontos színt
- **Szimmetria**: Próbálj ki különböző tengelyszámokat (3, 4, 6, 8, 12)
- **Mentés**: Az undo funkció akár 50 lépést is visszavonhat, utána mentheted a rajzot

Jó rajzolást! 🎨✨
