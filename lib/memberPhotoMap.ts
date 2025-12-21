/**
 * Mapping of team member names to their photo filenames
 * This allows flexibility in naming images while keeping member names consistent
 */
export const memberPhotoMap: Record<string, string> = {
  // App Domain
  "Arshad Ahmed": "arshad.png",
  "Guru Prasath M": "guru.png",
  "Saravanan R": "saravanan.png",

  // Web Domain
  "Balakrishna": "bala.png",
  "Dineshl": "dineshl.png", // Web team Dineshl (Associate)
  "Apporva GVL": "apoorva.png", // Note: folder has "apoorva.png" not "apporva"
  "Jashwanth": "jashwant.png", // Note: folder has "jashwant.png"
  "Kaviya": "kaviya.png",

  // Marketing Domain
  "Dinesh": "dinesh.png", // Marketing team Dinesh (Associate)
  "Srinidhi Sarasija": "srinidhi_sarasija.png",
  "Navya": "navya.png",
  "Logeshwaran": "logeshwaran.png",

  // Ops Domain
  "Mohammed Faraaz": "faraaz.png", // Operations Head and Treasurer
  "Rushil Palayil": "rushil.png",
  "Sanjana Praveen Kumar": "sanjana.png",
  "Bhuvaneshraj B Y": "buvaneshraaj.png", // Note: folder spelling is "buvaneshraaj"
  "Harini V": "harini v.png", // Note: folder has "harini v.png" (with space)
  "Hrithik Mageshkumar": "hirthik.png", // Note: folder has "hirthik.png"

  // Prob Domain
  "Harini": "harini.png", // Problem Solving team Harini (Associate)
  "Anirudh R": "anirudh.png",
  "Mridula S A": "mridula.png",
  "Prarthana": "prarthana.png",

  // ML Domain
  "Janani H": "janani.png",
  "Deepan KR": "deepan.png",
  "Rishivel": "rishivel.png",
  "Hannah Felin": "hannah.png",

  // Core Team
  "Vishva K": "Vishva.png",
  "Kabilan": "kabilan.png",
  "Sarvesh": "sarvesh.png",
  "Ayush Nytik Joshi": "ayush.png",
  "Bershay": "bershay.png",
  "Varshitha": "varshitha.png",
  "Srinidhi K": "srinidhi.png",
  "Shashank": "shashank.png",
  "Raghul": "raghul.png",
  "Faraaz": "faraaz.png",
};

/**
 * Get the photo path for a team member
 * Images are stored in /team/members/Team Reveal Post/
 */
export const getMemberPhotoPath = (memberName: string): string => {
  const filename = memberPhotoMap[memberName];
  if (filename) {
    // Use the path directly - Next.js/React will handle URL encoding automatically
    return `/team/members/Team Reveal Post/${filename}`;
  }
  // Fallback: try first name if no mapping exists
  const firstName = memberName.split(" ")[0].toLowerCase();
  return `/team/members/Team Reveal Post/${firstName}.png`;
};

