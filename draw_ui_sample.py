import cv2
import numpy as np

from test import data_prediction
from PIL import Image

class Drawer:
    def __init__(self):
        self.mouse_pressed = False
        self.img = np.zeros(shape=(255, 255, 3), dtype=np.uint8)
        self.char_color = (255, 255, 255)

    def draw(self):
        """
        Method to draw continuous multiple circles on an image. Like a paint brush.
        """

        self.reset()

        window_name = 'Draw character'

        cv2.namedWindow(winname=window_name)
        cv2.setMouseCallback(window_name=window_name, on_mouse=self.mouse_callback)

        # continue till ESC key is pressed
        while True:
            cv2.imshow(winname=window_name, mat=self.img)

            # ESC key pressed
            k = cv2.waitKey(delay=1) & 0xFF
            if k == 27:
                break

        cv2.destroyAllWindows()



    def mouse_callback(self, event, x, y, flags, params):
        """
        Callback method for drawing circles on an image
        """

        # left mouse button is pressed
        if event == cv2.EVENT_LBUTTONDOWN:
            self.mouse_pressed = True

        # mouse pointer has moved over the window
        elif event == cv2.EVENT_MOUSEMOVE:
            if self.mouse_pressed:
                cv2.rectangle(img=self.img,pt1=(x, y), pt2=(x + 3, y + 3) , color=self.char_color, thickness=-1)

        # left mouse button is released
        elif event == cv2.EVENT_LBUTTONUP:
            self.mouse_pressed = False
            cv2.rectangle(img=self.img, pt1=(x, y), pt2=(x + 3, y + 3), color=self.char_color, thickness=-1)

    def reset(self):
        # reset image
        self.img = np.zeros((1024, 1024, 3), np.uint8)



if __name__ == '__main__':
    test=Drawer()
    test.draw()
    image = Image.fromarray(test.img)
    image_8bit = image.convert("P")
    print(data_prediction(image_8bit))

    # image_8bit.save("test"+".bmp")
    cv2.destroyAllWindows()
