## Hópverkefni 2 Vefforritun 1

# Meðlimir (2): Hekla Scheving Th. og Kolfinna Kolbeinsdóttir
- Netfang: hst10@hi.is og kok38@hi.is
- Github: Heklast og KolfinnaK

Við erum **tvær** og erum því að útfæra eftirfarandi aukaverkefni: 

* **Birting á námsefni, gildir sem tvö auka verkefni**
Efnið sem gefið er í data/html/lectures.json, data/css/lectures.json, data/js/lectures.json skal birta á sérstakri síðu.

* **Birting á lykilhugtökum**
Efnið sem gefið er í data/html/keywords.json, data/css/keywords.json, data/js/keywords.json skal birta á sérstakri síðu.

## Að keyra verkefnið

Keyra skal verkefnið með skipun í terminal:  
npm install  
npm run dev - keyrir server með vite  

Auka:
npm run build - til að builda verkefnið  
npm run preview - hægt að previewa buildið  
npm run lint - keyrir eslint og stylelint og leitar að villum, villulaust  

## Uppsetning

* Við tókum css skrá úr verkefni 5 eins og sagt var í fyrirlestri að mætti. Allt í einni css skrá (style.css), engar scss skrár.
* Skipt í möppur: data, fonts, img, lib. data inniheldur efnið um allar síður, fonts er letur, img eru myndir og lib inniheldur .js skrár í components og pages möppum m.a. Main.js skrá og index.html er í rótinni.
* show-keywords.js og show-lectures.js eru skrár sem gerðar voru til að sýna námsefni og lykilhugtök (aukaverkefnin sem voru útfærð).
* Haus og fótur helst eins milli síðna.


## Útfærsla
**Birting á námsefni, gildir sem tvö auka verkefni**
Útfærðum þetta þannig að þegar ýtt er á námsefni takkann færðu val á fyrirlestrum (lista af heiti þeirra) og þegar þú velur ákveðinn fyrirlestur færðu nánari námsefni fyrir hann. 

* Ný skrá: show-lectures.js var búin til til að útfæra birtingu á námsefni.
* showLecturesList: Þetta fall birtir lista/yfirlit yfir fyrirlestra fyrir valið efni og með því að smella á hlekki færðu nánari upplýsingar um fyrirlestur sem var valinn.
* showLectureDetail: Sér um að birta innihald fyrirlestrarins, þar sem gögn eins og text, heading, quote, image, list og code eru birt á viðeigandi hátt.
* Uppfærsla á main.js til að höndla leiðakerfi fyrir námsefni:
  * main.js greinir URL-viðföng (eins og type, content, og lectureSlug) til að ákvarða hvaða efni skal birta
  * Leiðakerfi fyrir námsefni:
    * Þegar content=lectures er í slóðinni, sækir main.js viðkomandi lectures.json skrá og sýnir lista yfir fyrirlestra með showLecturesList.
    * Ef tiltekinn fyrirlestur (lectureSlug) er specified, kallar kóðinn á showLectureDetail til að birta efni hans.
* History API: history.pushState gerir kleift að fletta á milli fyrirlestra án þess að hlaða síðuna að nýju, og popstate endurritar innihaldið við til baka og áfram.
* fetcher: Sækir gögn úr réttri lectures.json skrá.
* Dýnamísk birting á gögnum: Með showLecturesList og showLectureDetail er DOM uppfært með lista yfir fyrirlestra eða smáatriðum fyrir valinn fyrirlestur.
* Hnappar í renderSubpage (t.d. „Námsefni“) vísa á námsefnissíður með breytingu á URL og kalla á render til að birta viðeigandi efni.

**Birting á lykilhugtökum**
* Lykilhugtökin voru birt á svipaðan hátt og námsefnið. 
* Ný skrá var búin til: show-keywords.js
* Í henni er showKeywordsList sem birtir lista af öllum lykilhugtökum fyrir valið efni.
* showKeywordDetail sýnir síðan innihald þess lykilhugtaks sem er valið.
* Í main.js, ef content=keywords þá sækir fallið keywords.json og notar síðan showKeywordsList til að birta lista yfir hugtökin.
* Inn í showKeywordsList er síðan listener settur þannig kallað er á showKeywordDetail fyrir það hugtak sem ýtt var á.
* History API: history.pushState gerir kleift að fletta á milli fyrirlestra án þess að hlaða síðuna að nýju, og popstate endurritar innihaldið við til baka og áfram.
* Sjá í showKeywordDetail hvernig details eru birt. Fyrst er titill síðan, ef það er orð á ensku fyrir þetta hugtak, þá er það birt boldað og síðan kemur lýsingin.
* Hnappar í renderSubpage (t.d. „Námsefni“) vísa á námsefnissíður með breytingu á URL og kalla á render til að birta viðeigandi efni.



