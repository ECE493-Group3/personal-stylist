#! /usr/bin/env python
"""Draft Convolutional Neural Network Estimator for Top/Bottom/Full-body task, built with tf.layers."""

import os
import numpy as np
import tensorflow as tf

tf.logging.set_verbosity(tf.logging.INFO)

DATA_DIRECTORY = 'DATA'
RESCALE_SIZE = [250, 250]
SAMPLE_CATEGORY_IMG_FILE = "sample_category_img.txt"

def prepare_dataset():
    """Prepares dataset from img files"""

    filenames = []
    labels = []
    with open(SAMPLE_CATEGORY_IMG_FILE, 'r') as tsv_f:
        for line in tsv_f.readlines():
            imgfile, cat = line.split('\t')
            filenames.append(os.path.join(DATA_DIRECTORY, imgfile))
            labels.append(int(cat))

    dataset = tf.data.Dataset.from_tensor_slices((tf.constant(filenames), tf.constant(labels)))

    def format_images(filename, label):
        img_string = tf.read_file(filename)
        decoded = tf.image.decode_jpeg(img_string)
        resized = tf.image.resize_images(decoded, RESCALE_SIZE)
        return resized, label

    dataset.map(format_images)

if __name__=="__main__":
    prepare_dataset()

