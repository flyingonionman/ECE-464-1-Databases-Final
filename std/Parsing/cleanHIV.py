import numpy as np
import pandas as pd

def cleanHIV(filename, fout):
    df = pd.read_csv(filename)
    ageranges = df['AGE'].values
    lower = np.empty(len(df))
    upper = np.empty(len(df))
    weird = []
    #Fix Age Ranges
    for i in range(len(ageranges)):
        temp = ageranges[i]
        temp = temp.split('-')
        if(len(temp) == 2):
            lower[i] = int(temp[0])
            upper[i] = int(temp[1])
        else:
            temp = ageranges[i]
            if temp == "All":
                lower[i] = 0
                upper[i] = 120
            elif (temp.find('+') != -1):
                lower[i] = int(temp.split('+')[0])
                upper[i] = 120
            else:
                weird.append([i,ageranges[i]])
    if len(weird) == 0:
        print("Ages Clean!")
    else:
        print(weird)
        return
    #Fix Dashes
    for i in range(len(df)):
        df['NEIGHBORHOOD'][i] = df['NEIGHBORHOOD'][i].replace("-", "and")
    #Fix Asterisks
    df.replace(to_replace = '*', value = 'NULL')

    df['LOWER'] = lower
    df['UPPER'] = lower
    df = df.drop('AGE',axis = 1)
    df.to_csv(fout, index=False, encoding='utf8')
    print("HIV Saved to: '{}'".format(fout))
    return 

def seeNames(filename):
    df = pd.read_csv(filename)
    hood = df['NEIGHBORHOOD'].values
    names = {}
    for i in range(len(hood)):
        if hood[i] in names:
            #continue
            names.update({hood[i]:names[hood[i]]+1})
        else:
            names.update({hood[i]:1})
    
def cleanText(filename):
    f = open(filename,'r')
    if f.mode != 'r':
        print("Can't Read File")
        return
    contents = f.read()
    contents = contents.replace('\n',' ').replace('\r',' ').replace('\t',' ').replace(',', ' ').split(' ')
    zips = []
    for i in range(len(contents)):
        if contents[i].isnumeric():
            zips.append(int(contents[i]))
        else:
            continue
    print(zips)

def MakeNeighborhoodToZipTable(filename):
    NeighToZips = {
        'High Bridge and Morrisania' : [10451, 10452, 10456] ,
        'East Harlem' : [10029, 10035] ,
        'Greenwich Village and SoHo' : [10012, 10013, 10014] ,
        'Long Island City and Astoria' : [11101, 11102, 11103, 11104, 11105, 11106] ,
        'Upper Eastside' : [10021, 10028, 10044, 10065, 10075, 10128] ,
        'West Queens' : [11374, 11375, 11379, 11385] ,
        'Chelsea and Clinton' : [10001, 10011, 10018, 10019, 10020, 10036] ,
        'Southeast Queens' : [11004, 11005, 11411, 11413, 11422, 11426, 11427, 11428, 11429] ,
        'Unknown' : [] ,
        'East New York' : [11207, 11208] ,
        'East Flatbush and Flatbush' : [11203, 11210, 11225, 11226] ,
        'Greenpoint' : [11211, 11222] ,
        'Canarsie and Flatlands' : [11234, 11236, 11239] ,
        'Port Richmond' : [10302, 10303, 10310] ,
        'Central Harlem and Morningside Heights' : [10026, 10027, 10030, 10037, 10039] ,
        'Hunts Point and Mott Haven' : [10454, 10455, 10459, 10474] ,
        'Williamsburg and Bushwick' : [11206, 11221, 11237] ,
        'Jamaica' : [11412, 11423, 11432, 11433, 11434, 11435, 11436] ,
        'Lower Manhattan' : [10004, 10005, 10006, 10007, 10038, 10280] ,
        'Pelham and Throgs Neck' : [10461, 10462,10464, 10465, 10472, 10473] ,
        'Crotona and Tremont' : [10453, 10457, 10460] ,
        'Fordham and Bronx Park' : [10458, 10467, 10468] ,
        'Ridgewood and Forest Hills' : [11374, 11375, 11379, 11385] ,
        'Downtown and Heights and Park Slope' : [11201, 11205, 11215, 11217, 11231] ,
        'Kingsbridge and Riverdale' : [10463, 10471] ,
        'Flushing and Clearview' : [11354, 11355, 11356, 11357, 11358, 11359, 11360] ,
        'Washington Heights and Inwood' : [10031, 10032, 10033, 10034, 10040] ,
        'Stapleton and St. George' : [10301, 10304, 10305] ,
        'Willowbrook' : [10314] ,
        'Union Square and Lower Eastside' : [10002, 10003, 10009] ,
        'Borough Park' : [11204, 11218, 11219, 11230] ,
        'South Beach and Tottenville' : [10306, 10307, 10308, 10309, 10312] ,
        'Fresh Meadows' : [11365, 11366, 11367] ,
        'Bayside and Little Neck' : [11361, 11362, 11363, 11364] ,
        'Sunset Park' : [11220, 11232] ,
        'Southwest Queens' : [11414, 11415, 11416, 11417, 11418, 11419, 11420, 11421] ,
        'Upper Westside' : [10023, 10024, 10025] ,
        'Coney Island and Sheepshead Bay' : [11223, 11224, 11229, 11235] ,
        'Rockaway' : [11691, 11692, 11693, 11694, 11695, 11697] ,
        'Gramercy Park and Murray Hill' : [10010, 10016, 10017, 10022] ,
        'Bensonhurst and Bay Ridge' : [11209, 11214, 11228] ,
        'Bedford Stuyvesant and Crown Heights' : 	[11212, 11213, 11216, 11233, 11238] ,
        'Northeast Bronx' : [10466, 10469, 10470, 10475] ,
        'All' : [10453, 10457, 10460, 10458, 10467, 10468, 10451, 10452, 10456, 10454, 10455, 10459, 10474, 10463, 10471, 10466, 10469, 10470, 10475, 10461, 10462, 10464, 10465, 10472, 10473, 11212, 11213, 11216, 11233, 11238, 11209, 11214, 11228, 11204, 11218, 11219, 11230, 11234, 11236, 11239, 11223, 11224, 11229, 11235, 11201, 11205, 11215, 11217, 11231, 11203, 11210, 11225, 11226, 11207, 11208, 11211, 11222, 11220, 11232, 11206, 11221, 
11237, 10026, 10027, 10030, 10037, 10039, 10001, 10011, 10018, 10019, 10020, 10036, 10029, 10035, 10010, 10016, 10017, 10022, 10012, 10013, 10014, 10004, 10005, 10006, 10007, 10038, 10280, 10002, 10003, 10009, 10021, 10028, 10044, 10065, 10075, 10128, 10023, 10024, 10025, 10031, 10032, 10033, 10034, 10040, 11361, 11362, 11363, 11364, 11354, 11355, 11356, 11357, 11358, 11359, 11360, 11365, 11366, 11367, 11412, 11423, 11432, 11433, 11434, 11435, 11436, 11101, 11102, 11103, 11104, 11105, 11106, 11374, 11375, 11379, 11385, 11691, 11692, 11693, 11694, 11695, 11697, 11004, 11005, 11411, 11413, 11422, 11426, 11427, 11428, 11429, 11414, 11415, 11416, 11417, 11418, 11419, 11420, 11421, 11368, 11369, 11370, 11372, 11373, 11377, 11378, 10302, 10303, 
10310, 10306, 10307, 10308, 10309, 10312, 10301, 10304, 10305, 10314]
    }
    hoods = []
    zips = []
    for hood in NeighToZips:
        values = NeighToZips[hood]
        if values == []:
            continue
        for i in range(len(values)):
            hoods.append(hood)
            zips.append(values[i])
    df = pd.DataFrame({'Zipcode': zips,
                'Neighborhood': hoods})  
    df.to_csv(filename, index=False, encoding='utf8')
    print("Zips Saved to: '{}'".format(filename))
def main():
    cleanHIV('HIV_AIDS_Diagnoses_by_Neighborhood__Age_Group__and_Race_Ethnicity.csv', 'HIVAIDS.csv')
    #seeNames('HIVAIDS.csv')
    #cleanText('RawZips.txt')
    MakeNeighborhoodToZipTable('ZipstoNeigh.csv')

if __name__ == "__main__":
    main()


