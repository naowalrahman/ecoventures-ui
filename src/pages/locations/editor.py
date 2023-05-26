import json
# import random
# #import matplotlib.colors;

# def randomChooser(colors):
#     colorsCopy = colors.copy();
#     text = colorsCopy.pop(0);  #second
#     background = colorsCopy.pop(0); #first
#     return [background, text];

# with open ('./country-colors-true.json', 'r', encoding="utf-8") as f:
#     data = json.load(f)

# newDict = {}
# for i in data:
#     newDict[i] = randomChooser(data[i])



# with open ("./country-colors-true-single.json", 'w') as f:
#     json.dump(newDict, f, indent=4)
	



with open ("./country-colors-true-single.json", "r", encoding="utf-8") as f:
	data = json.load(f)

# with open ("./country-flag-true.json", "r") as f:
# 	dataFlag = json.load(f)


with open ("../countryCards.css", "w") as f:
	f.write("")


with open ("../countryCards.css", "a") as f:
	for i in data:
		unchanged = i
		i = i.replace("(", "")
		i = i.replace(")", "")
		i = i.replace(" ", "")
		i = i.replace("'", "")
		i = i.replace(".", "")
		i = i.replace(",", "")
		if "Ivoire" in i:
			print(i)
		#print(i + "\n")
		f.write(f""".{i}-country {{
	background-color: {data[unchanged][0]};
}}
.{i}-text {{
	color:{data[unchanged][1]};
}}
.{i}-dist {{
	background-color: {data[unchanged][1]};
}}
.{i}-country:hover {{
	background-color: {data[unchanged][1]};
	transition: 0.3s;
}}
.{i}-country:hover .{i}-text {{
	color:{data[unchanged][0]};
	transition: 0.3s;
}}

.{i}-country:hover .{i}-dist {{
	background-color: {data[unchanged][0]};
	transition:0.3s;
}}
""")
		