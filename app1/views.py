import calendar
import datetime
import json
import math
import os
import time
from datetime import date, datetime, timedelta
from http.client import HTTPResponse
# from statistics import median
# from sys import exec_prefix
# from time import strptime
# from pyhive import hive
# from sqlalchemy import *
import yfinance as yf



import numpy as np
import pandas as pd
from dateutil.relativedelta import relativedelta
from django.conf import settings
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, redirect
# from django.urls import reverse
# from django.views.decorators.clickjacking import xframe_options_exempt
# from django.views.decorators.csrf import csrf_exempt
# from django.views.decorators.http import require_http_methods
from numpy.lib import setdiff1d
# from app1.hive_sql import execute_sql
from .helper import investment_insights

portfolio_df = pd.DataFrame([{"Type": "", "Stock": "", "Amount": ""}])
portfolio_df.to_csv("app1/data/portfolio2.csv", index=False)

def fundomatic(request):
    return render(request, "app1/fundometic.html")


def strategy_form(request):
    if request.method == 'POST':
        age = request.POST.get('age')
        gender = request.POST.get('gender')
        annual_income = request.POST.get('annual_income')
        investment_amount = request.POST.get('investment_amount')
        expected_return = request.POST.get('expected_return')
        time_horizon = request.POST.get('time_horizon')
        dependents = request.POST.get('dependents')
        market_correction = request.POST.get('market_correction')
        return_preference = request.POST.get('return_preference')

        # Print the form data to the console
        print(f"Client Age: {age}")
        print(f"Client Gender: {gender}")
        print(f"Annual Income: {annual_income}")
        print(f"Amount to be Invested: {investment_amount}")
        print(f"Expected Return: {expected_return}")
        print(f"Time Horizon: {time_horizon}")
        print(f"Dependents: {dependents}")
        print(f"Market Correction: {market_correction}")
        print(f"Return Preference: {return_preference}")
        return render(request, "app1/strategy.html")

    
    return render(request, "app1/strategy_form.html")


def strategy(request):
    if request.method == 'POST':
        age = request.POST.get('age')
        gender = request.POST.get('gender')
        annual_income = request.POST.get('annual_income')
        investment_amount = request.POST.get('investment_amount')
        expected_return = request.POST.get('expected_return')
        time_horizon = request.POST.get('time_horizon')
        dependents = request.POST.get('dependents')
        market_correction = request.POST.get('market_correction')
        return_preference = request.POST.get('return_preference')

        # Print the form data to the console
        print(f"Client Age: {age}")
        print(f"Client Gender: {gender}")
        print(f"Annual Income: {annual_income}")
        print(f"Amount to be Invested: {investment_amount}")
        print(f"Expected Return: {expected_return}")
        print(f"Time Horizon: {time_horizon}")
        print(f"Dependents: {dependents}")
        print(f"Market Correction: {market_correction}")
        print(f"Return Preference: {return_preference}")
        
        

        
        # strategy = investment_insights("Inverstor",age,gender,annual_income,
        #     dependents,market_correction,return_preference,investment_amount,expected_return,time_horizon
        # )
        strategy = [
            {
                "Investment Category": "Equities",
                "Name": "Reliance Industries Ltd",
                "Description": "A leading Indian multinational conglomerate company",
                "Symbol": "RELIANCE",
                "Current Market Price": "2,300 INR",
                "Investment Percentage": "30%",
                "Investment Amount": "300,000 INR",
                "Investment Summary": "Long term growth, blue-chip stock, consistent returns"
            },
            {
                "Investment Category": "Mutual Funds",
                "Name": "HDFC Balanced Advantage Fund",
                "Description": "Hybrid mutual fund, investing both in stocks and fixed income securities",
                "Symbol": "HDFCBAF",
                "Current Market Price": "NA",
                "Investment Percentage": "40%",
                "Investment Amount": "400,000 INR",
                "Investment Summary": "Balanced growth, regular income, medium risk"
            },
            {
                "Investment Category": "Bonds",
                "Name": "Government of India 7-year bond",
                "Description": "Government backed bond, safe and secure",
                "Symbol": "GOI7YR",
                "Current Market Price": "NA",
                "Investment Percentage": "30%",
                "Investment Amount": "300,000 INR",
                "Investment Summary": "Low risk, steady income stream, capital protection"
            }
        ]
        data = []
        for i in strategy:
            temp_list = [
                i["Symbol"],
                i["Name"],
                i["Investment Category"],
                i["Investment Amount"],
            ]
            data.append(temp_list)

        context = {
            # "data": [
            #         ["TCS", "Tata Consultancy Services Limited", "stock", 10000],
            #         ["RELIANCE", "Reliance Industries", "stock", 10000],
            #         ["HDFCBANK", "HDFC Bank", "stock", 10000],
            #     ],
            "data" : data,
            "column_names": [
                { "title": 'Symbol' },
                { "title": 'Name' },
                { "title": 'Type' },
                { "title": 'Investment Amount' },
            ]
        }
        return render(request, "app1/strategy.html", context)

    return HTTPResponse("Page not found!")


def update_portfolio(request):
    if request.method == 'POST':
        time.sleep(0.25)
        print(request.POST)
        data = request.POST.getlist('data[]')
        print(data)

        portfolio_df = pd.DataFrame([{"Type": data[2], "stock": data[0], "Amount": data[3]}])
        portfolio_df.to_csv("app1/data/portfolio2.csv",  mode='a', header=False, index=False)
        return JsonResponse({"message": f"successfully saved {data[1]}!"})


def get_stock_insight(symbol):
    stock = yf.Ticker(symbol+'.NS')
    data = stock.history(period="1mo")
    data2 = data.reset_index()
    data2[["Date", "Date2"]] = data2["Date"].astype(str).str.split(" ", n=1, expand=True)
    data2 = data2[["Date", "Close"]]
    labels = data2["Date"].to_list()
    prices = data2["Close"].to_list()
    data = {
        "labels": labels,
        "prices": prices
    }
    return data


def portfolio(request):
    # df = pd.read_excel("app1/data/portfolio2.xlsx")
    df = pd.read_csv("app1/data/portfolio2.csv")
    df = df.dropna()
    print(df)

    stock_df = df[df["Type"] == 'Equities']
    # if len(stock_df) != 0:
    symbol_list = stock_df["Stock"].tolist()
    insights = get_stock_insight(symbol_list[0])
    # symbol_list = df["symbol"].tolist()
    # symbol = symbol_list[0]
    # stock = yf.Ticker(symbol+'.NS')
    # print(stock.info)
    # time.sleep(1)

    data_dict = df.to_dict('split')
    data = data_dict["data"]
    columns = []
    for i in data_dict["columns"]:
        columns.append(
            { "title": i }
        )
    print(data, columns)
    context = {
            # "data": [
            #         ["TCS", "Tata Consultancy Services Limited", "stock", 10000],
            #         ["RELIANCE", "Reliance Industries", "stock", 10000],
            #         ["HDFCBANK", "HDFC Bank", "stock", 10000],
            #     ],
            "data" : data,
            "column_names": columns,
            "insights": insights
        }
    return render(request, "app1/portfolio.html", context)


def upload_portfolio(request):
    if request.method == 'POST':
        stock_1 = request.POST.get('stock_1')
        stock_2 = request.POST.get('stock_2')
        stock_3 = request.POST.get('stock_3')

        print(f"stock_1: {(stock_1)}")
        print(f"stock_2: {(stock_2)}")
        print(f"stock_3: {(stock_1)}")
        return redirect("/portfolio_insight", )

    return render(request, "app1/upload_portfolio.html")

def portfolio_insight(request):
    context = {
        "data_portfolio": [
                ["Equities", 
                "TCS", 
                "NSE: TCS", 
                "Based on the online data the share value has been seen to rise by 4% in the last month",
                "Considering the client's medium risk appetite, Holding the TCS shares would be a good decision for now"],
                ["Equities", 
                "Tata Motors", 
                "NSE: TATAMOTORS",
                 "The share has seen a decrease of 2% in the last month",
                 "Given the client's medium risk profile, it's recommended to Sell Tata Motors shares and reallocate funds to a better performing stock"],
                ["Equities",
                 "HDFC",
                  "NSE: HDFC",
                   "HDFC has been quite stable with an increase of 1% in share value in the last month",
                   "Considering the client's medium risk profile and the stable performance of HDFC, it's advised to Hold the shares"],
            ],
        "column_names": [
            { "title": 'Investment Category' },
            { "title": 'Name' },
            { "title": 'Symbol' },
            { "title": 'Performance' },
            {"title": 'Future Suggestions'}
        ]
    }

    return render(request, "app1/portfolio_insight.html", context)



