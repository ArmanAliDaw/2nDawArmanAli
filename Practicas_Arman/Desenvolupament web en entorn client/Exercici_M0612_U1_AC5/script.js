// ==========================================
// DADES D'EXEMPLE
// ==========================================

let productes = [
  { id: 1, nom: "Portàtil Pro", categoria: "Electrònica", preu: 950, stock: 4, valoracions: [5, 4, 5] },
  { id: 2, nom: "Camiseta cotó", categoria: "Roba", preu: 18, stock: 25, valoracions: [4, 3, 4] },
  { id: 3, nom: "Auriculars", categoria: "Electrònica", preu: 45, stock: 0, valoracions: [2, 1, 3] },
  { id: 4, nom: "Llibre JS Avançat", categoria: "Llibres", preu: 32, stock: 12, valoracions: [5, 5, 4] },
  { id: 5, nom: "Teclat Mecànic", categoria: "Electrònica", preu: 80, stock: 8, valoracions: [4, 4, 5] }
];

let preus = [10, 20, 30, 45, 18];
let matriuNivells = [[1, 2], [3, [4, 5]], 6];
let etiquetes = ["js", "html", "css", "js", "react", "html"];

// // ==========================================
// // BLOC 1: VALORS DE RETORN I ESTAT DE LA LLISTA (MUTACIÓ BÀSICA)
// // ==========================================
// console.log("--- BLOC 1: Valors de retorn i estat de la llista ---");

// // 1. Afegeix el número 50 al final de 'preus': mostra el valor de retorn de push() I la llista resultant
// console.log("1. push -> retorn:", preus.push(50), "| Llista final:", preus);

// // 2. Elimina l'últim element de 'preus': mostra el valor de retorn de pop() I la llista resultant
// console.log("2. pop -> retorn:", preus.pop(-1), "| Llista final:", preus);

// // 3. Elimina el primer element de 'preus': mostra el valor de retorn de shift() I la llista resultant
// console.log("3. shift -> retorn:", preus.shift(1), "| Llista final:", preus);

// // 4. Afegeix el número 10 al principi de 'preus': mostra el valor de retorn d'unshift() I la llista resultant
// console.log("4. unshift -> retorn:", preus.unshift(10), "| Llista final:", preus);


// // ==========================================
// // BLOC 2: PRÀCTICA ESPECÍFICA AMB SPLICE
// // ==========================================
// console.log("\n--- BLOC 2: Pràctica amb splice (Modifica l'original) ---");

// let llistaSplice = ["A", "B", "C", "D", "E"];

// // 5. Elimina 2 elements a partir de l'índex 1: mostra els elements eliminats (retorn) I l'array resultant
// console.log("5. splice (eliminar 2 a l'índex 1) -> retorn:", llistaSplice.splice(1,2), "| Llista final:", llistaSplice);

// // 6. Insereix "X" i "Y" a l'índex 2 sense eliminar res: mostra el retorn I l'array resultant
// console.log("6. splice (inserir sense esborrar) -> retorn:", llistaSplice.splice(2, 0,"X","Y"), "| Llista final:", llistaSplice);

// // 7. Substitueix l'element de l'índex 0 pel valor "Z": mostra el retorn I l'array resultant
// console.log("7. splice (substituir 1 element) -> retorn:", llistaSplice.splice(0, 1,"Z"), "| Llista final:", llistaSplice);


// // ==========================================
// // BLOC 3: COMPARATIVA: MÈTODES MUTANTS VS. IMMUTABLES (ES2023)
// // ==========================================
// console.log("\n--- BLOC 3: Comparativa Mutants vs. Immutables ---");

// let base = [30, 10, 20, 50, 40];

// // --- A. Ordenació ---
// // 8a. Mutant: Ordena 'base' de menor a major amb .sort() (modifica l'original)
// console.log("8a. sort (Mutant) -> retorn:", base.sort((a,b)=> a-b), "| Original modificat:", base);

// // 8b. Immutable: Ordena una còpia de major a menor amb .toSorted() sense alterar 'base'
// console.log("8b. toSorted (Immutable) -> retorn:", base.toSorted((a,b)=> b-a), "| Original intacte:", base);

// // --- B. Invertir ---
// // 9a. Mutant: Inverteix 'base' amb .reverse() (modifica l'original)
// console.log("9a. reverse (Mutant) -> retorn:", base.reverse(), "| Original modificat:", base);

// // 9b. Immutable: Inverteix de manera immutable amb .toReversed()
// console.log("9b. toReversed (Immutable) -> retorn:", base.toReversed(), "| Original intacte:", base);

// // --- C. Canviar un element per índex ---
// // 10a. Mutant: Canvia l'element a l'índex 1 pel valor 99 fent assignació directa (base[1] = 99)
// base[1] = 99;
// console.log("10a. Assignació directa (Mutant) -> Original modificat:", base);

// // 10b. Immutable: Canvia l'element a l meitat / índex 1 amb .with(1, 99)
// console.log("10b. with (Immutable) -> retorn:", base.with(1,99), "| Original intacte:", base);

// // --- D. Eliminar / Inserir per índex ---
// // 11a. Mutant: Elimina 1 element a l'índex 2 amb .splice(2, 1)
// console.log("11a. splice (Mutant) -> esborrats:", base.splice(2,1), "| Original modificat:", base);

// // 11b. Immutable: Elimina 1 element a l'índex 2 amb .toSpliced(2, 1)
// console.log("11b. toSpliced (Immutable) -> retorn:", base.toSpliced(2,1), "| Original intacte:", base);


// // ==========================================
// // BLOC 4: TIPUS D'ITERACIÓ D'ARRAYS
// // ==========================================
// console.log("\n--- BLOC 4: Tipus d'Iteració ---");

// let noms = ["Anna", "Bernat", "Carla"];

// // 12. forEach simple: Imprimeix cada nom en una sola línia
// noms.forEach(nom => {console.log(nom)});

// // 13. forEach amb índex: Imprimeix "Índex [idx]: [nom]" en una sola línia
// for (let i = 0; i < noms.length; i++) {
//   console.log(i, noms[i])
// };

// // 14. for...of: Itera sobre els VALORS de 'noms' en una sola línia
// for (const nom of noms) {
//   console.log(nom);
// };

// // 15. for...in: Itera sobre les CLAUS / ÍNDEXS de 'noms' en una sola línia
// for (const nom in noms) {
//   console.log(nom, noms[nom])
// };


// ==========================================
// BLOC 5: PROGRAMACIÓ FUNCIONAL (MAP, FILTER, REDUCE, CERCA)
// ==========================================
console.log("\n--- BLOC 5: Programació Funcional i Cerca ---");

// // 16. map: Genera un array només amb els noms dels productes
// console.log("16. map (noms):",productes.map(producte => producte.nom));

// // 17. map compost: Genera un array d'objectes { nom, preuIva } amb preu * 1.21 amb 2 decimals (.toFixed(2))
// console.log("17. map (+IVA):", productes.map(p => ({nom: p.nom, preuIva: (p.preu * 1.21).toFixed(2)})));


// // 18. filter compost: Filtra productes de la categoria "Electrònica" AMB stock > 0
// console.log("18. filter (Electrònica en stock):", productes.filter(producte => producte.categoria == "Electrònica" && producte.stock > 0));

// // 19. reduce: Calcula el valor total de tot l'inventari sumant (preu * stock)
// console.log("19. reduce (total valor):", productes.reduce((total , producte) => total + (producte.preu * producte.stock),0));

// 20. reduce: Agrupa productes per categoria -> { Electrònica: [...], Roba: [...] }
console.log("20. reduce (agrupar per categoria):");

// // 21. findIndex: Troba l'índex del primer producte sense stock (stock === 0)
// console.log("21. findIndex (sense stock):", productes.findIndex(producte => producte.stock === 0));

// // 22. findLastIndex: Troba la DARRERA posició (índex) d'un producte de "Electrònica"
// console.log("22. findLastIndex (últim d'Electrònica):", productes.findLastIndex(producte => producte.categoria === "Electrònica"));

// // 23. flatMap: Extreu totes les valoracions jueves en un sol array d'un nivell
// console.log("23. flatMap (totes les valoracions):", productes.flatMap(producte => producte.valoracions));


// // ==========================================
// // BLOC 6: COL·LECCIONS MAP I SET
// // ==========================================
// console.log("\n--- BLOC 6: Comandes d'una línia amb Map i Set ---");

// // 24. Set: Elimina duplicats de 'etiquetes' convertint el Set directament a Array ([...new Set(...)])
// console.log("24. Set (eliminar duplicats):",([...new Set(etiquetes)]));

// let conjunt = new Set([1, 2, 3]);
// let mapa = new Map([["usr_1", "Joan"], ["usr_2", "Marta"]]);

// // 25. Set: Afegeix el valor 4 a 'conjunt' i comprova si existeix en la mateixa comanda (.add(4).has(4))
// console.log("25. Set (add + has):", conjunt.add(4).has(4));

// // 26. Map: Afegeix la clau "usr_3" amb valor "Albert" i obtén el valor de "usr_3" en la mateixa comanda (.set(...).get(...))
// console.log("26. Map (set + get):", mapa.set("usr_3", "Albert").get("usr_3"));

// // 27. Map: Converteix totes les claus de 'mapa' a un Array utilitzant Array.from()
// console.log("27. Map (Array de claus):", Array.from(mapa));

// // 28. Map: Itera en una sola línia amb .forEach i mostra per consola `Clau: ${k} -> Valor: ${v}`
// mapa.forEach((v, k) => console.log(`Clau: ${k} -> Valor: ${v}`));


// // ==========================================
// // BLOC 7: DOM - LLISTES VIVES (HTMLCollection) VS ESTÀTIQUES (NodeList)
// // ==========================================
// console.log("\n--- BLOC 7: DOM - Llistes Vives vs Estàtiques ---");

// // Preparem un element en memòria per provar el DOM
// let contenidor = document.createElement("div");
// contenidor.innerHTML = `<span class="item">A</span><span class="item">B</span>`;

// // A. HTMLCollection (getElementsByClassName) -> Llista VIVA (Live)
// let colViva = contenidor.getElementsByClassName("item");

// // B. NodeList (querySelectorAll) -> Llista ESTÀTICA (Static)
// let colEstatica = contenidor.querySelectorAll(".item");

// console.log("29a. Abans d'afegir element -> HTMLCollection (Viva):", colViva.length, "| NodeList (Estàtica):", colEstatica.length);

// // Inserim dinàmicament un nou element 'span' amb classe 'item' a 'contenidor'
// let nouItem = document.createElement("span");
// nouItem.className = "item";
// nouItem.textContent = "C";
// contenidor.appendChild(nouItem);

// // 29b. Comprova les longituds (.length) de colViva i colEstatica després d'afegir l'element al DOM
// console.log("29b. Després d'afegir element -> HTMLCollection (Viva):", colViva.length, "| NodeList (Estàtica):", colEstatica.length);

// // 30. Converteix la llista viva 'colViva' a un Array real amb Array.from() i extreu el textContent de cada element amb .map()
// console.log("30. Array real des de HTMLCollection ->", Array.from(colViva).map(c => c.textContent));


// ==========================================
// BLOC 8: PER QUÈ FALLEN AQUESTES COMANDES? (ERRORS HABITUALS)
// ==========================================
console.log("\n--- BLOC 8: Per què fallen aquestes comandes? ---");

// // Error 1: Comparar arrays amb ===
// console.log("Error 1:", [1, 2] === [1, 2]);
// // PER QUÈ RETORNA FALSE?

// // Error 2: Utilitzar typeof per detectar si és un Array
// console.log("Error 2:", typeof [1, 2]);
// // PER QUÈ RETORNA "object"?

// // Error 3: Intentar usar mètodes d'Array (.map) directament sobre una HTMLCollection
// try {
//   contenidor.getElementsByClassName("item").map(el => el.textContent);
// } catch (e) {
//   console.log("Error 3:", e.message);
// }
// // PER QUÈ FALLA?

// // Error 4: Utilitzar delete en un array per eliminar un element
// let llistaDelete = [10, 20, 30];
// delete llistaDelete[1];
// console.log("Error 4:", llistaDelete, "| Length:", llistaDelete.length);
// // PER QUÈ NO FA EL QUE S'ESPERA?

// // Error 5: Retorn d'objecte literal en funció fletxa de map sense parèntesis
// console.log("Error 5:", [1, 2].map(n => { val: n }));
// // PER QUÈ RETORNA [undefined, undefined]?

// // Error 6: Executar .sort() en números sense funció de comparació
// console.log("Error 6:", [5, 13, 1, 22, 4].sort());
// // PER QUÈ RETORNA [1, 13, 22, 4, 5]?

// // Error 7: Intentar fer 'for...of' sobre un Objecte literal
// try {
//   for (let x of { a: 1, b: 2 }) {}
// } catch (e) {
//   console.log("Error 7:", e.message);
// }
// // PER QUÈ FALLA?

// // Error 8: Passar un valor inicial incorrecte o no passar-ne cap a 'reduce' amb arrays d'objectes
// console.log("Error 8:", productes.reduce((acc, p) => acc + p.preu));
// // PER QUÈ RETORNA "[object Object]18453280"?

// // Error 9: Confondre .push() guardant la variable resultat
// let llistaPush = [1, 2, 3];
// llistaPush = llistaPush.push(4);
// console.log("Error 9:", llistaPush);
// // PER QUÈ SOBREESCRIU A 4?

// // Error 10: Intentar usar .includes() sobre un array d'objectes cercant per contingut
// console.log("Error 10:", productes.includes({ id: 1, nom: "Portàtil Pro", categoria: "Electrònica", preu: 950, stock: 4, valoracions: [5, 4, 5] }));
// // PER QUÈ RETORNA FALSE?

// // Error 11: Intentar accés per índex negatiu directe amb claudàtors
// console.log("Error 11:", preus[-1]);
// // PER QUÈ RETORNA UNDEFINED?

// // Error 12: Usar forEach intentant interrompre el bucle amb 'break' o 'return'
// [1, 2, 3, 4].forEach(n => {
//   if (n === 2) return; // Intentem fer un "continue" o sortir
//   console.log("Error 12 - forEach element:", n);
// });
// // PER QUÈ NO FA ALLÒ ESPERAT? 