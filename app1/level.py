import pandas as pd
import datetime
from datetime import date, timedelta
import math
from statistics import median




class LevelDate():
    def __init__(self,start_date,end_date,level):

        self.start_date = start_date
        self.end_date = end_date
        self.level = level
        self.current = datetime.datetime.now().date()

        my_file2 = pd.read_csv('./app1/media/all_appl.csv')

        data2 = pd.DataFrame(data=my_file2, index=None)

        data2['Date2'] = pd.to_datetime(data2['Date'])
        data2['month_first_day'] = data2['Date2'].dt.to_period('M').dt.start_time
        data2['month_end_day'] = data2['Date2'].dt.to_period('M').dt.end_time
        data2['month_end_day'] = pd.to_datetime(data2['month_end_day']).dt.date
        data2['month_end_day'] = pd.to_datetime(data2['month_end_day'])
        data2['Month_Year'] = data2['Date2'].dt.strftime('%b-%Y')
    
        data2['year_first_day'] = data2['Date2'].dt.to_period('Y').dt.start_time
        data2['year_end_day'] = data2['Date2'].dt.to_period('Y').dt.end_time
        data2['year_end_day'] = pd.to_datetime(data2['year_end_day']).dt.date
        data2['year_end_day'] = pd.to_datetime(data2['year_end_day'])
        data2['Year'] = data2['Date2'].dt.strftime('%Y')
     
        data2['quarter_first_day'] = data2['Date2'].dt.to_period('Q').dt.start_time
        data2['quarter_end_day'] = data2['Date2'].dt.to_period('Q').dt.end_time
        data2['quarter_end_day'] = pd.to_datetime(data2['quarter_end_day']).dt.date
        data2['quarter_end_day'] = pd.to_datetime(data2['quarter_end_day'])
        data2['Year_Quarter'] = 'Q' + data2['Date2'].dt.quarter.astype(str) + ' - '+ data2['Date2'].dt.year.astype(str)
     
        data2['week_first_day'] = data2['Date2'].dt.to_period('W').dt.start_time
        data2['week_end_day'] = data2['Date2'].dt.to_period('W').dt.end_time
        data2['week_end_day'] = pd.to_datetime(data2['week_end_day']).dt.date
        data2['week_end_day'] = pd.to_datetime(data2['week_end_day'])
        data2['Year_Week'] = data2['Date2'].dt.strftime('W%W - %Y')
        data2['Year_Week'] = data2['Year_Week'].replace({'W00': 'W52'}, regex=True)
        data2['Year_Week'] = data2['Year_Week']+" ("+data2['week_first_day'].dt.strftime("%d/%m")+" - "+data2['week_end_day'].dt.strftime("%d/%m")+")"

        appl_mth = pd.DataFrame(data2.groupby(['month_first_day','month_end_day', 'Month_Year' ])['applications'].sum())
        appl_mth = appl_mth.reset_index()
        appl_mth = appl_mth.rename(columns = {'month_first_day': 'Period_Start_Date', \
                                              'month_end_day': 'Period_End_Date', \
                                                'Month_Year': 'Period_Value'},\
                                               inplace = False)
        appl_mth['Period_Level'] = 'Month'
        appl_mth = appl_mth[['Period_Start_Date', 'Period_End_Date', 'Period_Value', 'Period_Level', 'applications']]

        appl_yr = pd.DataFrame(data2.groupby(['year_first_day','year_end_day', 'Year' ])['applications'].sum())
        appl_yr = appl_yr.reset_index()
        appl_yr = appl_yr.rename(columns = {'year_first_day': 'Period_Start_Date', \
                                              'year_end_day': 'Period_End_Date', \
                                                'Year': 'Period_Value'},\
                                               inplace = False)
        appl_yr['Period_Level'] = 'Year'
        appl_yr = appl_yr[['Period_Start_Date', 'Period_End_Date', 'Period_Value', 'Period_Level', 'applications']]

        appl_qtr = pd.DataFrame(data2.groupby(['quarter_first_day','quarter_end_day', 'Year_Quarter' ])['applications'].sum())
        appl_qtr = appl_qtr.reset_index()
        appl_qtr = appl_qtr.rename(columns = {'quarter_first_day': 'Period_Start_Date', \
                                              'quarter_end_day': 'Period_End_Date', \
                                                'Year_Quarter': 'Period_Value'},\
                                               inplace = False)
        appl_qtr['Period_Level'] = 'Quarter'
        appl_qtr = appl_qtr[['Period_Start_Date', 'Period_End_Date', 'Period_Value', 'Period_Level', 'applications']]

        appl_wk = pd.DataFrame(data2.groupby(['week_first_day','week_end_day', 'Year_Week' ])['applications'].sum())
        appl_wk = appl_wk.reset_index()
        appl_wk = appl_wk.rename(columns = {'week_first_day': 'Period_Start_Date', \
                                              'week_end_day': 'Period_End_Date', \
                                                'Year_Week': 'Period_Value'},\
                                               inplace = False)
        appl_wk['Period_Level'] = 'Week'
        appl_wk = appl_wk[['Period_Start_Date', 'Period_End_Date', 'Period_Value', 'Period_Level', 'applications']]

        appl_day=data2
        appl_day['Period_Start_Date'] = data2['Date2']
        appl_day['Period_End_Date'] = data2['Date2']
        appl_day['Period_Value'] = data2['Date2'].dt.strftime('%d-%b-%Y')
        appl_day['Period_Level'] = 'Day'
        appl_day = appl_day[['Period_Start_Date', 'Period_End_Date', 'Period_Value', 'Period_Level', 'applications']]

        appl_period = appl_day.append([appl_wk, appl_mth, appl_qtr, appl_yr])

        self.level_data = appl_period


    def l_data(self):
        self.level_data['Period_Start_Date'] = pd.to_datetime(self.level_data.Period_Start_Date,dayfirst=True)

        self.level_data['Period_End_Date'] = pd.to_datetime(self.level_data.Period_End_Date,dayfirst=True)

        self.level_data['Period_Start_Date'] =self.level_data['Period_Start_Date'].dt.date
        self.level_data['Period_End_Date'] =self.level_data['Period_End_Date'].dt.date
     
        filter_data = self.level_data[self.level_data["Period_Level"]==self.level]
        filter_data2 = filter_data[(filter_data["Period_Start_Date"]>=self.start_date)]
        filter_data3 = filter_data2[(filter_data2["Period_End_Date"]<=self.end_date)]


        contex = self.level_d(filter_data3,filter_data)

        return contex
        




    def level_d(self,data2,data0):

        f_all_max_scale0 = data0[['applications']].max()
        f_all_max_scale = math.ceil(f_all_max_scale0['applications']/1000)*1000
        print("f_all_max_scale",f_all_max_scale)

        bardatah = data2[['Period_Value','Period_Start_Date','applications']]
        x= self.current
        bardatah.loc[bardatah.Period_Start_Date >= x,'applications']=0





        labelvaluesa = data2["Period_Value"].to_list()
        barvaluesh = bardatah['applications'].to_list()
        l_barvaluesh = bardatah['applications'].to_list()
        # print(l_barvaluesh)


        bardataf = data2[['Period_Value','Period_Start_Date','applications']]
        bardataf.loc[bardatah.Period_Start_Date < x,'applications']=0
        barvaluesf = bardataf['applications'].to_list()
        r_barvaluesf = bardataf['applications'].to_list()

        final_list = barvaluesf
        final_list.extend(barvaluesh)

        final_list_trunc = [i for i in final_list if i > 0]

        
        len_label=len(final_list_trunc)
        avg_value = 0 if len_label == 0 else format(round(sum(final_list)/len_label),">7,d")
        med_value = format(round(median(final_list_trunc)),">7,d")
        l_len_label=len([x for x in l_barvaluesh if x > 0])
        l_barvaluesh_med = [i for i in l_barvaluesh if i != 0]
        l_avg_value = 0 if l_len_label == 0 else format(round(sum(l_barvaluesh)/l_len_label),">7,d")
        r_len_label=len([x for x in r_barvaluesf if x > 0])
        r_barvaluesf_med = [i for i in r_barvaluesf if i != 0]
        r_avg_value = 0 if r_len_label == 0 else format(round(sum(r_barvaluesf)/r_len_label),">7,d")


        min_value = min(i for i in final_list if i > 0)
        max_value = max(final_list)

        data_min_fn = data2.loc[data2['applications'] == min_value]
        dt_min_fn = data_min_fn.iloc[0]['Period_Value']

        data_max_fn = data2.loc[data2['applications'] == max_value]
        dt_max_fn = data_max_fn.iloc[0]['Period_Value']

        try:
            l_min_value = min(i for i in l_barvaluesh if i > 0)
            l_max_value = max(l_barvaluesh)
            l_data_min_fn = bardatah.loc[bardatah['applications'] == l_min_value]
            l_dt_min_fn = l_data_min_fn.iloc[0]['Period_Value']
            l_data_max_fn = bardatah.loc[bardatah['applications'] == l_max_value]
            l_dt_max_fn = l_data_max_fn.iloc[0]['Period_Value']
            l_med_value = round(median(l_barvaluesh_med))
        except:
            l_min_value = 0
            l_max_value = 0
            l_dt_min_fn = date.today()
            l_dt_max_fn = date.today()
            l_med_value = 0

        try:
            r_max_value = max(r_barvaluesf)
            r_min_value = min(i for i in r_barvaluesf if i > 0)
            r_data_min_fn = bardataf.loc[bardataf['applications'] == r_min_value]
            r_dt_min_fn = r_data_min_fn.iloc[0]['Period_Value']
            r_data_max_fn = bardataf.loc[bardataf['applications'] == r_max_value]
            r_dt_max_fn = r_data_max_fn.iloc[0]['Period_Value']
            r_med_value = round(median(r_barvaluesf_med))

        except:
            r_min_value = 0
            r_max_value = 0
            r_dt_min_fn = date.today()
            r_dt_max_fn = date.today()
            r_med_value = 0

        min_value = format(min_value,">7,d")
        l_min_value = format(l_min_value,">7,d")
        r_min_value = format(r_min_value,">7,d")
        max_value = format(max_value,">7,d")
        l_max_value = format(l_max_value,">7,d")
        r_max_value = format(r_max_value,">7,d")
        l_med_value = format(l_med_value,">7,d")
        r_med_value = format(r_med_value,">7,d")

        contex1 =   {'labelvaluesa': labelvaluesa,
        'barvaluesh': barvaluesh,
        'barvaluesf': barvaluesf,
        'f_all_max_scale': f_all_max_scale,
        "max":max_value,
        "l_max":l_max_value,
        "r_max":r_max_value,
        "min":min_value,
        "l_min":l_min_value,
        "r_min":r_min_value,
        "avg":avg_value,
        "l_avg":l_avg_value,
        "r_avg":r_avg_value,
        "med":med_value,
        "l_med":l_med_value,
        "r_med":r_med_value,
        "dt_min_fn":dt_min_fn,
        "dt_max_fn":dt_max_fn,
        "l_dt_min_fn":l_dt_min_fn,
        "l_dt_max_fn":l_dt_max_fn,
        "r_dt_min_fn":r_dt_min_fn,
        "r_dt_max_fn":r_dt_max_fn
        }
        # print("labels,barvaluesh,barvaluesf,max,min,avg",len(labelvaluesa),len(barvaluesh),len(barvaluesf),max_value,min_value,avg_value)
        return contex1
    