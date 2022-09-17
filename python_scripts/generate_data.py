import json
import requests

word_list = [
    "love",
    "trample", 
    "bread",
    "door",
    "chin",
    "engine",
    "buttocks",
    "goose",
    "ask",
    "water",
    "large",
    "cool",
    "delicious",
    "difference",
    "fair",
    "get",
    "go",
    "idea",
    "important",
    "kill",
    "neat",
    "mark",
    "old",
    "new",
    "predicament",
    "slow",
    "ugly",
    "trouble",
    "take"
]

DICT_API = "https://api.dictionaryapi.dev/api/v2/entries/en/"

THES_API_KEY = "fdaaf2075b91b0fc3c194f7a80fb6a2f"

THES_API = "https://words.bighugelabs.com/api/2/" + THES_API_KEY + "/"

words = []

for word in word_list:
    EXAMPLE_WORD = word
    response = requests.get(DICT_API + EXAMPLE_WORD)
    definition = json.loads(response.text)

    obj = {}

    obj['word'] = definition[0]['word']

    text = definition[0]['meanings'][0]['definitions'][0]['definition']

    obj['definition'] = text;

    thes_response = requests.get(THES_API + EXAMPLE_WORD + "/json")
    thes_json = json.loads(thes_response.text)

    try:
        syns = thes_json['noun']['syn']
    except:
        syns = []

    try:
        ants = thes_json['noun']['ant']
    except:
        ants = []

    obj['syns'] = syns
    obj['ants'] = ants

    words.append(obj)

out = {"words": words}

print(json.dumps(out))
