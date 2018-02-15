#! /usr/bin/env python3

import os
import shutil
import random
from enum import Enum

NUMBER_OF_IMAGES_UPLOAD = 1500
TOTAL_IMAGES = 289222

class ClothesType(Enum):
    Top = 1
    Bottom = 2
    FullBody = 3

def get_category_types():
    FILENAME = 'list_category_cloth.txt'

    cat_type = {}
    cats = {}

    with open(FILENAME) as f:

        for cat_number, line in enumerate(f.readlines()[2:]):
            cat, typ = line.split()
            cat_type[cat_number + 1] = ClothesType(int(typ))
            cats[cat_number + 1] = cat

    return cat_type, cats

def divide_by_categories(cat_type):
    filename = 'list_category_img.txt'

    images_by_type = {t: [] for t in ClothesType}

    random.seed()
    images_to_be_used = set(random.sample(range(TOTAL_IMAGES), NUMBER_OF_IMAGES_UPLOAD))

    with open(filename) as f:

        for i, line in enumerate(f.readlines()[2:]):
            if i not in images_to_be_used:
                continue

            imgfile, category = line.split()
            typ = cat_type[int(category)]
            images_by_type[typ].append(imgfile)

    return images_by_type

def make_folders(types):

    for typ in ClothesType:
        directory = str(typ).lower().replace('.', '_')

        if not os.path.exists(directory):
            os.mkdir(directory)

        for imgfile in types[typ]:
            copy_name = imgfile.replace(os.path.sep, '_')
            shutil.copy2(imgfile, os.path.join(directory, copy_name))

if __name__=="__main__":
    t, n = get_category_types()

    print('The categories are: ')
    print(n)
    print()

    print('The types of each category are: ')
    print(t)
    print()

    types = divide_by_categories(t)

    for typ in ClothesType:
        filename = str(typ).lower().replace('.', '_') + '.txt'
        with open(filename, 'w') as f:
            for cloth in types[typ]:
                f.write(cloth + '\n')

    print("Making directories. Assumes image data is in directory img")
    make_folders(types)

    print("Done")
