from PIL import Image
import numpy as np
import torch
from test_model import for_test
image_path="31_em_191_0.bmp"
image = Image.open(image_path).convert('L')
def imresize(im, sz):
    pil_im = Image.fromarray(im)
    return np.array(pil_im.resize(sz))


def resize(w_box, h_box, pil_image):
    w, h = pil_image.size
    f1 = 1.0 * w_box / w
    f2 = 1.0 * h_box / h
    factor = min([f1, f2])
    width = int(w * factor)
    height = int(h * factor)
    return pil_image.resize((width, height), Image.ANTIALIAS)

img_open2 = torch.from_numpy(np.array(image)).type(torch.FloatTensor)
img_open2 = img_open2 / 255.0
img_open2 = img_open2.unsqueeze(0)
img_open2 = img_open2.unsqueeze(0)
attention, prediction = for_test(img_open2)
global prediction_string
prediction_string = ''
print(prediction_string)
for i in range(attention.shape[0]):
    if prediction[i] == '<eol>':
        continue
    else:
        prediction_string = prediction_string + prediction[i]

print(prediction_string)