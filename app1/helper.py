import openai
import os
openai.api_type = 
openai.api_base = 
openai.api_version = 
openai.api_key = 
       

def investment_insights(user,age,gender,income,input1,input2,input3,invest_amount,return_percent,tenure):
    messages = [{"role": "user", "content":f"""
    Context: You are an investment consultant at a big firm. You deal mainly in indian markets, securities, bonds and help in people wealth management.
    Objective: Provide user with the name of the stock,options,security or bond and the amount to be invested based on the risk appetite of the user and create an investment summary based on the type of the user.Summarise the investment strategy in the terms of name of the stock/bond/equities within each of the section and what percentage of the amount should be invested in each one of them depending on the conditions provided by the user.
    Data: Consider the current data present online for different stocks, mutual funds bonds and securities and study their month over month, year on year trend and their respective returns on a long term and short term basis on the risk factor associated with the type of security. Please consider these financial securities in terms on indian markets.
    Please consider the risk profile of the user on the basis of the following data. Each question tells the constrain and the risk value associated with that constraint.

    Q1.How many people dependent on your income?
    0-2 dependents are High risk-taker
    2-4 dependents are Medium risk-taker
    >5 dependents are Low risk-taker

    Q2.Due to general market correction, one of your investments loses 14% of its value a short time after you buy it. What do you do?
    Buy more shares at the depreciated value are High risk-taker
    Wait for the market price to rise and sell are Med risk-taker
    Sell at whatever price available and recover are Low risk-taker

    Q3. Which return would you prefer more for a 5-year horizon?
    15%,20%,-25%,12%,20% are Med risk-taker
    5%,7%,10%,12%,15% are Low risk-taker
    -5%,-8%,9%,12%,35% are High risk-taker

    query:
    1.The client name is {user}.The age of the client is {age} years and gender is {gender}. The annual income is around {income} million inr. The total dependant in family of the user is {input1}.Due to market fluctuations if one of the user's investments loses its value after buying, he is most likely to {input2}.The ideal return the user would opt for a 5 years horizon in {input3}.The amount that needs to be invested {invest_amount} million. The client is expecting a cumulative return of {return_percent} percent over a period of {tenure} years.

    Constraints:
    1.Provide investment strategies by providing the name of stock/mutual_funds/bonds/equitites in each of the categories of the financial security after considering the client nature and going through the data.
    2.Provide an overall insight for the investment.
    3.Keep the summary in layman terms so that it is easily understandable and explainable to the client.
    4.Provide the answer only in json format with the category of the investment(e.g. Equities, mutual funds, bonds), name of the stock/bond/equity,short description of the stock/bond/equity, their NSE/BSE symbol,current stock price, the amount/percentage to be invested,summary of the investment as keys. 
    5.The keys should be named as Inverstment Category, Name, Description, Symbol,Current Market Price,Investment Percentage,Investment Amount, Investment Summary


    """}]

    response = openai.ChatCompletion.create(
    engine="dsad_gpt_4",
    messages = messages,
    temperature=0.9,
    max_tokens=800,
    top_p=0.95,
    frequency_penalty=0,
    presence_penalty=0,
    stop=None)

    return(response['choices'][0]['message']['content'])

def investment_recommendations(user,age,gender,income,input1,input2,input3,invest_amount,return_percent,tenure,**kwargs):
    list1 = []
    list2 = []
    for key, value in kwargs.items():
        list1.append(key)
        list2.append(value)
    messages = [{"role": "user", "content":f"""
    Context: You are an investment consultant at a big firm. You deal mainly in indian markets, securities, bonds and help in people wealth management.
    Objective: Provide user with insights & performance of their invested portfolios using market data and suggest whether to sell, buy or hold analysing the historical share prices
    Data: Consider the current data present online for different stocks, mutual funds bonds and securities and study their month over month, year on year trend and their respective returns on a long term and short term basis on the risk factor associated with the type of security. Please consider these financial securities in terms on indian markets.
    Please consider the risk profile of the user on the basis of the following data. Each question tells the constrain and the risk value associated with that constraint.

    Q1.How many people dependent on your income?
    0-2 dependents are High risk-taker
    2-4 dependents are Medium risk-taker
    >5 dependents are Low risk-taker

    Q2.Due to general market correction, one of your investments loses 14% of its value a short time after you buy it. What do you do?
    Buy more shares at the depreciated value are High risk-taker
    Wait for the market price to rise and sell are Med risk-taker
    Sell at whatever price available and recover are Low risk-taker

    Q3. Which return would you prefer more for a 5-year horizon?
    15%,20%,-25%,12%,20% are Med risk-taker
    5%,7%,10%,12%,15% are Low risk-taker
    -5%,-8%,9%,12%,35% are High risk-taker

    query:
    1.The client name is {user}.The age of the client is {age} years and gender is {gender}. The annual income is around {income} million inr. The total dependant in family of the user is {input1}.Due to market fluctuations if one of the user's investments loses its value after buying, he is most likely to {input2}.The ideal return the user would opt for a 5 years horizon in {input3}.The amount that needs to be invested {invest_amount} million. The client is expecting a cumulative return of {return_percent} percent over a period of {tenure} years. The list of securities that the user has invested in are {list1} and they are {list2} respectively.

    Instructions:
    1.Summarise the past 1 month performance of the above stocks/mutual funds and predict whether to buy, sell or hold based on the user profile and its risk appetite
    2.Provide the answer only in json format with the category of the investment(e.g. Equities, mutual funds, bonds),names of stock/mutual funds/bonds, their NSE/BSE symbol, insights on their last 1 month performance and prediction to buy, sell or hold as the keys
    3.Keep the names of the keys as Inverstment Category, Name, Symbol, Performance, Future Suggestions


    """}]

    response = openai.ChatCompletion.create(
    engine="dsad_gpt_4",
    messages = messages,
    temperature=0.9,
    max_tokens=800,
    top_p=0.95,
    frequency_penalty=0,
    presence_penalty=0,
    stop=None)

    return(response['choices'][0]['message']['content'])




        