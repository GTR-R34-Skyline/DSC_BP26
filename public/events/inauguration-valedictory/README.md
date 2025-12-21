# Inauguration and Valedictory Gallery

Place event images for the "Inauguration and Valedictory" event in this folder.

Recommended naming:

```
/public/events/inauguration-valedictory/
  ├── 1.png
  ├── 2.png
  ├── 3.png
  └── 4.png
```

After adding images, wire them in `dsc-web/app/events/page.tsx` under the event with title "Inauguration and Valedictory" by updating the `gallery` array to these paths:

```
"/events/inauguration-valedictory/1.png",
"/events/inauguration-valedictory/2.png",
"/events/inauguration-valedictory/3.png",
"/events/inauguration-valedictory/4.png",
```

