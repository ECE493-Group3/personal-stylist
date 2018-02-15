#! /usr/bin/env python

import datetime
import json
import sys

def create_classifier_json(api_key):
    # Assumes the zip files are created and correctly named
    from watson_developer_cloud import VisualRecognitionV3

    visual_recognition = VisualRecognitionV3('2016-05-20', api_key=api_key)

    with open('top_positive_examples.zip', 'rb') as topf, \
         open('bottom_positive_examples.zip', 'rb') as bottomf, \
         open('fullbody_positive_examples.zip', 'rb') as fullbodyf:
             model = visual_recognition.create_classifier(
                     'clothestype',
                     top_positive_examples=topf,
                     bottom_positive_examples=bottomf,
                     fullbody_positive_examples=fullbodyf)

             return json.dumps(model, indent=2)

if __name__=="__main__":
    if len(sys.argv) != 2:
        print('Pass in the api key the only argument')
        exit(1)

    print(create_classifier_json(sys.argv[1]))
