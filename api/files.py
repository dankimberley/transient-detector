import json
import os
from datetime import datetime

os.makedirs('api/outputs', exist_ok=True)
file_name = os.path.join('api/outputs', datetime.now().strftime("%Y%m%d_%H%M%S") + '.json')

def write(data):
    with open(file_name, "w") as json_file:
        json.dump(data, json_file, indent=4)
    print('File has been saved as ' + file_name)
    
write([1, 2, 3, 4, 5])