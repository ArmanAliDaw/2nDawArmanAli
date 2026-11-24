import os
from matplotlib.figure import Figure
from services.data_service import sortCards, Ano_Final

STATIC = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "static")

FONDO = "#141417"
TEXTO = "#EDEDEF"
BORDE = "#3a3a42"
ACENTO = "#F59E0B"


def saveFigure(figure, name):
    figure.savefig(os.path.join(STATIC, name), format="png",
                   bbox_inches="tight", facecolor=figure.get_facecolor())


def createGraph(cards, nivell):
    top = sortCards(cards, "lloguer", "desc")[:10]
    top.reverse()
    names = []
    prices = []
    for card in top:
        names.append(card["territori"])
        prices.append(card["lloguer"])

    altura = 1.5 + 0.5 * len(names)
    figure = Figure(figsize=(10, altura), facecolor=FONDO)
    axes = figure.subplots()
    axes.set_facecolor(FONDO)

    axes.barh(names, prices, height=0.5, color=ACENTO)

    for i in range(len(prices)):
        axes.text(prices[i], i, f"  {prices[i]:.0f} €", va="center", color=TEXTO)

    axes.set_xlim(0, max(prices) * 1.15)
    axes.set_title(f"Alquiler medio en {Ano_Final} ({nivell})", color=TEXTO)
    axes.set_xlabel("€ / mes", color=TEXTO)
    axes.tick_params(colors=TEXTO)
    axes.grid(axis="x", color=BORDE, alpha=0.5)
    axes.set_axisbelow(True)
    for spine in axes.spines.values():
        spine.set_color(BORDE)

    saveFigure(figure, "grafica.png")

def createGraphAno(nom, years):
    anos = []
    valors = []
    for y in years:
        anos.append(y["any"])
        valors.append(y["lloguer"])

    figure = Figure(figsize=(10, 4), facecolor=FONDO)
    axes = figure.subplots()
    axes.set_facecolor(FONDO)

    axes.plot(anos, valors, marker="o", color=ACENTO)
    axes.set_xticks(anos)
    axes.tick_params(axis="x", labelrotation=45)
    for i in range(len(anos)):
        axes.annotate(f"{valors[i]:.0f}", (anos[i], valors[i]),
                      textcoords="offset points", xytext=(0, 8),
                      ha="center", color=TEXTO, fontsize=8)
    axes.set_title(f"Evolución del alquiler en {nom} por Años", color=TEXTO)
    axes.set_ylabel("€ / mes", color=TEXTO)
    axes.tick_params(colors=TEXTO)
    axes.grid(color=BORDE, alpha=0.5)
    axes.set_axisbelow(True)
    for spine in axes.spines.values():
        spine.set_color(BORDE)

    saveFigure(figure, "grafica_anos.png")