#! /usr/bin/env python3

from enum import Enum

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

    with open(filename) as f:

        for line in f.readlines()[2:]:
            imgfile, category = line.split()
            typ = cat_type[int(category)]
            images_by_type[typ].append(imgfile)

    return images_by_type

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
