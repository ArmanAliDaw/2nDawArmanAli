import os

from flask import Flask, render_template, request, abort
from services.data_service import load_data, getNivells, filterNivell,getCards,searchName,sortCards,getTerritorio,getYears,getInsights,sortYears,getInsightYears
from services.graph_service import createGraph, createGraphAno

app = Flask(__name__)

@app.route('/')
def dashboard():
    data = load_data()
    nivell = request.args.get("nivell", "tots")
    search = request.args.get("search", "")
    order = request.args.get("order", "lloguer")
    direccion = request.args.get("direccion", "desc")
    vista = request.args.get("vista", "tarjetas")

    cards = getCards(data)
    if nivell != "tots":
        cards = filterNivell(cards, nivell)
    if search:
        cards = searchName(cards, search)
    cards = sortCards(cards, order, direccion)
    insights = getInsights(cards)
    if vista != "tarjetas" and nivell != "tots" and len(cards) > 0:
        createGraph(cards, nivell)
    
    return render_template(
        "dashboard.html",
        cards = cards,
        nivells = getNivells(data),
        nivell=nivell,
        search = search,
        order = order,
        direccion=direccion,
        vista=vista,
        insights=insights
        
    )

@app.route('/territorio/<nom>')
def detail(nom):
    item = getTerritorio(load_data(), nom)
    if item is None:
            abort(404)
    order = request.args.get("order", "any")
    direccion = request.args.get("direccion", "asc")
    years = getYears(item)
    insightYears = getInsightYears(years)
    createGraphAno(nom, years)
    years = sortYears(years, order, direccion)
    return render_template(
        "detail.html",
        nom=nom,
        nivell=item["nivell"],
        years=years,
        order = order,
        direccion = direccion,
        insightYears = insightYears,
    )

if __name__ == '__main__':
    app.run(debug=True)