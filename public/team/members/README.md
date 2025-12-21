# Team Member Photos Directory

Store individual team member photos in this folder.

## Naming Convention

Use **lowercase first name only**:

### Format: `firstname.png`

**Examples:**

- `arshad.png` - For "Arshad Ahmed"
- `guru.png` - For "Guru Prasath M"
- `saravanan.png` - For "Saravanan R"
- `balakrishna.png` - For "Balakrishna"
- `dinesh.png` - For "Dinesh Karthik" or "Dinesh"
- `apporva.png` - For "Apporva GVL"
- `jashwanth.png` - For "Jashwanth"
- `kaviya.png` - For "Kaviya"
- `rushil.png` - For "Rushil Palayil"
- `sanjana.png` - For "Sanjana Praveen Kumar"
- `bhuvaneshraj.png` - For "Bhuvaneshraj B Y"
- `harini.png` - For "Harini V"
- `hrithik.png` - For "Hrithik Mageshkumar"
- `anirudh.png` - For "Anirudh R"
- `mridula.png` - For "Mridula S A"
- `prarthana.png` - For "Prarthana"
- `janani.png` - For "Janani H"
- `deepan.png` - For "Deepan KR"
- `rishivel.png` - For "Rishivel"
- `hannah.png` - For "Hannah Felin"
- `srinidhi.png` - For "Srinidhi Sarasija"
- `navya.png` - For "Navya"
- `logeshwaran.png` - For "Logeshwaran"

## Rules:

1. Extract **first name only** (first word before space)
2. Convert to **lowercase**
3. Use **PNG format** (recommended)

## Image Requirements

- **Format**: PNG (recommended), JPG, or WebP
- **Recommended Dimensions**: 600x600px (square) or 600x800px (portrait)
- **File Size**: Keep images optimized (under 200KB recommended)
- **Quality**: High quality headshots or profile photos
- **Aspect Ratio**: Square or portrait (vertical) works best

## Usage in Code

The component will automatically look for images matching the pattern:

- Name: "Arshad Ahmed" → Image: `/team/members/arshad.png`
- Name: "Guru Prasath M" → Image: `/team/members/guru.png`
- Name: "Balakrishna" → Image: `/team/members/balakrishna.png`

## ⚠️ Note on Duplicate First Names

Some team members share the same first name:

- **Dinesh**: Both "Dinesh Karthik" (Web) and "Dinesh" (Marketing) → `dinesh.png`
- **Harini**: Both "Harini V" in Ops and Prob → `harini.png`

If you need to distinguish between members with the same first name, you can:

1. Use the same photo for both members
2. Or rename one to include a distinguishing feature (but this requires code changes)

## Current Team Members Needing Photos:

### App Domain:

- `arshad.png`
- `guru.png`
- `saravanan.png`

### Web Domain:

- `balakrishna.png`
- `dinesh.png`
- `apporva.png`
- `jashwanth.png`
- `kaviya.png`

### Marketing Domain:

- `dinesh.png` (shared with Web)
- `srinidhi.png`
- `navya.png`
- `logeshwaran.png`

### Ops Domain:

- `rushil.png`
- `sanjana.png`
- `bhuvaneshraj.png`
- `harini.png` (shared with Prob)
- `hrithik.png`

### Prob Domain:

- `harini.png` (shared with Ops)
- `anirudh.png`
- `mridula.png`
- `prarthana.png`

### ML Domain:

- `janani.png`
- `deepan.png`
- `rishivel.png`
- `hannah.png`
