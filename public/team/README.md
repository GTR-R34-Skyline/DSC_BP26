# Team Images Directory

Place your team domain images in this folder.

## Image Naming Convention

Name your images using lowercase team names with `.png` extension:

- `app.png` - For the App domain
- `web.png` - For the Web domain
- `ml.png` - For the ML domain
- `core.png` - For the Core team
- `ops.png` - For the Ops domain
- `mark.png` - For the Mark domain
- `prob.png` - For the Prob domain

## Image Requirements

- **Format**: PNG (recommended), JPG, or WebP
- **Recommended Dimensions**:
  - Top/Bottom domains: 1200x900px (4:3 aspect ratio)
  - Core team: 1600x685px (21:9 aspect ratio) or similar wide format
- **File Size**: Keep images optimized (under 500KB recommended)
- **Quality**: High quality images that represent each domain/team

## How It Works

The component will automatically:

1. Display the image if it exists
2. Fall back to a placeholder SVG if the image is missing or fails to load

Simply add your images to this folder with the correct names, and they will appear automatically on the team page.
