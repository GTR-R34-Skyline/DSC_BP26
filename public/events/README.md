# Event Gallery Images Directory

Store event gallery images organized by event name.

## Directory Structure

```
/public/events/
  ├── blueprints/
  │   ├── gallery-1.jpg
  │   ├── gallery-2.jpg
  │   ├── gallery-3.jpg
  │   └── gallery-4.jpg
  ├── devcon/
  │   ├── gallery-1.jpg
  │   ├── gallery-2.jpg
  │   └── ...
  ├── visualizing-web/
  │   ├── gallery-1.jpg
  │   └── ...
  ├── dprep/
  │   ├── gallery-1.jpg
  │   └── ...
  └── visualizing-web-2025/
      ├── gallery-1.jpg
      └── ...
```

## Image Naming Convention

- Use lowercase event names for folder names
- Number images sequentially: `gallery-1.jpg`, `gallery-2.jpg`, etc.
- Supported formats: JPG, PNG, WebP

## Image Requirements

- **Recommended Dimensions**: Varying sizes work well for masonry layout
  - Wide images: 1600x900px or similar
  - Tall images: 800x1200px or similar
  - Square images: 1200x1200px or similar
- **File Size**: Keep images optimized (under 500KB each recommended)
- **Quality**: High quality images showcasing the event

## How It Works

1. Add images to the appropriate event folder
2. The gallery will automatically display in a premium masonry grid layout
3. Click any image to view in full-screen lightbox
4. Navigate between images using arrow buttons or keyboard arrows
