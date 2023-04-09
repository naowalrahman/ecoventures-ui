import json
import random
#import matplotlib.colors;

def randomChooser(colors):
    colorsCopy = colors.copy();
    text = colorsCopy.pop(0);
    background = colorsCopy.pop(0);
    return [background, text];

with open ('./country-colors-true.json', 'r', encoding="utf-8") as f:
    data = json.load(f)

newDict = {}
for i in data:
    newDict[i] = randomChooser(data[i])



with open ("./country-colors-true-single.json", 'w') as f:
    json.dump(newDict, f, indent=4)
    

# with open ('./country-colors.json', 'r') as f:
#     data = json.load(f)

# newDict = {}
# for i in data:
#     newDict[i['name']] =  i['colors']
#     if len(i['colors']) < 3: 
#         print(f"colors for country {i['name']} are {i['colors']}") 
    # else:
    #     print("didnt happen")

# with open ('./country-colors-true.json', 'w') as g:
#     json.dump(newDict, g, indent=4)



# Output : 