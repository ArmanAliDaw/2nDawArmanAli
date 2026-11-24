import csv

Ano_Final = 2025
Ano_Base = 2014

# def load_data():
#     with open(".\data\Taula_estadistica_actualizado.csv", mode="r", encoding="latin-1", newline="") as file:
#         reader = csv.DictReader(file, delimiter=";")
#         data = list(reader)
#         for item in data:
#             item["nivell"] = getNivell(item)
#         return data

def load_data():
    with open("./data/Taula_estadistica_actualizado.csv", mode="r", encoding="latin-1", newline="") as file:
        reader = csv.DictReader(file, delimiter=";")
        data = []
        for row in reader:
            item = {}
            for clau, valor in row.items():
                if clau is None:          # columnas sobrantes: se ignoran
                    continue
                nom_clau = clau.strip().replace("ï»¿", "").replace("\ufeff", "")
                if valor is None:         # celdas que faltan
                    valor = "-"
                item[nom_clau] = valor.strip()
            data.append(item)

    primera = list(data[0].keys())[0]     # nombre real de la primera columna
    for item in data:
        item["Territorio"] = item[primera]
        item["nivell"] = getNivell(item)
    return data

def getNivell(item):
    nom = item["Territorio"]
    if nom == "Catalunya":
        return "Catalunya"
    if nom.startswith("Metropolit"):
        return "Ambit metropolita"

    if nom == "Barcelona":
        return "Ciutat"
    if item["2000"] != "-":
        return "Districte"
    return "Barrio"

def toNumber(text):
    if text == "-":
        return None
    return float(text.replace(",", "."))

def getNivells(data):
    nivells = []
    for item in data:
        nivells.append(item["nivell"])
    return sorted(list(set(nivells)))

def filterNivell(data, nivell):
    return [item for item in data if item["nivell"] == nivell]

def getCards(data):
    cards = []
    for item in data:
        anitguo = toNumber(item[str(Ano_Base)])
        actual = toNumber(item[str(Ano_Final)])
        if anitguo is None or actual is None:
            continue
        cards.append({
            "territori": item["Territorio"],
            "territori": item["Territorio"],
            "nivell": item["nivell"],
            "lloguer": actual,
            "lloguer_base": anitguo,
            "diferencia": actual - anitguo,
            "variacio": (actual - anitguo) / anitguo * 100,
        })
    return cards

def sortCards(cards, order , direccio):
    clau = {"nom": "territori", "lloguer": "lloguer", "variacio": "variacio"}[order]
    return sorted(cards, key=lambda c: c[clau], reverse=(direccio == "desc"))

def searchName(cards, text):
    return [card for card in cards if text.lower() in card["territori"].lower()]

def getTerritorio(data, nom):
    for item in data:
        if item["Territorio"] == nom:
            return item
    return None

def getInsights(cards):
    if len(cards)==0:
        return None
    caro = sortCards(cards, "lloguer", "desc")[0]
    barato = sortCards(cards, "lloguer", "asc")[0]
    return {"caro": caro, "barato": barato, "total": len(cards)}

def getYears(item):
    years = []
    anterior = None
    for columna in item:
        if columna.isdigit():
            valor = toNumber(item[columna])
            if valor is None:
                continue
            canvi = None
            if anterior is not None:
                canvi = (valor - anterior)/ anterior *100
            years.append({"any": int(columna), "lloguer": valor, "canvi":canvi})
            anterior = valor
    return years

def sortYears(years, order, direccio):
    clau = {"any": "any", "lloguer": "lloguer", "canvi": "canvi"}[order]
    return sorted(years, key=lambda y: y[clau] or 0, reverse=(direccio == "desc"))

def getInsightYears(years):
    if not years:
        return None
    caro = sortYears(years, "lloguer", "desc")[0]
    barato = sortYears(years, "lloguer", "asc")[0]
    return {"caro": caro, "barato": barato, "total": len(years)}