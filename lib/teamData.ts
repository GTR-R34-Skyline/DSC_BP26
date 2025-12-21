export interface TeamMember {
  role: string;
  name: string;
  linkedin?: string;
  instagram?: string;
  leadType?: string; // For Core team leads to show specific lead type
}

export interface DomainTeam {
  id: string;
  name: string;
  members: TeamMember[];
}

export const teamData: Record<string, DomainTeam> = {
  app: {
    id: "app",
    name: "App Development",
    members: [
      { role: "Associate", name: "Arshad Ahmed", linkedin: "https://linkedin.com/in/anonymous-pro", instagram: "https://instagram.com/anonymous-pro" },
      { role: "Member", name: "Guru Prasath M", linkedin: "https://linkedin.com/in/anonymous-pro", instagram: "https://instagram.com/anonymous-pro" },
      { role: "Member", name: "Saravanan R", linkedin: "https://linkedin.com/in/anonymous-pro", instagram: "https://instagram.com/anonymous-pro" },
    ],
  },
  web: {
    id: "web",
    name: "Web Development",
    members: [
      { role: "Associate", name: "Balakrishna", linkedin: "https://www.linkedin.com/in/balakrishnan-r-5a1006278?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/bala_krishnan_.r?igsh=MXhmejg5M3hhM2puMg==&utm_source=ig_contact_invite" },
      { role: "Associate", name: "Dineshl", linkedin: "https://www.linkedin.com/in/dinesh-karthik-2776dk?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/maddy.x_27?igsh=Yzc3b3BpcXJrNTB4" },
      { role: "Member", name: "Apporva GVL", linkedin: "https://www.linkedin.com/in/gvl-apoorva-3061ba328?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/gvl.apoorva_376?igsh=ZzEwdnZzYWduYzVm" },
      { role: "Member", name: "Jashwanth", linkedin: "https://www.linkedin.com/in/b-jashwanth-shankar-791a27327?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/jashwanth_shankar?igsh=MXBxMDZ0aTB1emZtaw==" },
      { role: "Member", name: "Kaviya", linkedin: "https://www.linkedin.com/in/kaviya-babu-752063327/", instagram: "" },
    ],
  },
  mark: {
    id: "mark",
    name: "Marketing",
    members: [
      { role: "Associate", name: "Dinesh", linkedin: "https://linkedin.com/in/anonymous-pro", instagram: "https://instagram.com/anonymous-pro" },
      { role: "Member", name: "Srinidhi Sarasija", linkedin: "https://linkedin.com/in/anonymous-pro", instagram: "https://instagram.com/anonymous-pro" },
      { role: "Member", name: "Navya", linkedin: "https://linkedin.com/in/anonymous-pro", instagram: "https://instagram.com/anonymous-pro" },
      { role: "Member", name: "Logeshwaran", linkedin: "https://linkedin.com/in/anonymous-pro", instagram: "https://instagram.com/anonymous-pro" },
    ],
  },
  ops: {
    id: "ops",
    name: "Operations",
    members: [
      { role: "Treasurer", name: "Mohammed Faraaz", linkedin: "https://linkedin.com/in/anonymous-pro", instagram: "https://instagram.com/anonymous-pro" },
      { role: "Associate", name: "Rushil Palayil", linkedin: "https://linkedin.com/in/anonymous-pro", instagram: "https://instagram.com/anonymous-pro" },
      { role: "Associate", name: "Sanjana Praveen Kumar", linkedin: "https://linkedin.com/in/anonymous-pro", instagram: "https://instagram.com/anonymous-pro" },
      { role: "Member", name: "Bhuvaneshraj B Y", linkedin: "https://linkedin.com/in/anonymous-pro", instagram: "https://instagram.com/anonymous-pro" },
      { role: "Member", name: "Harini V", linkedin: "https://linkedin.com/in/anonymous-pro", instagram: "https://instagram.com/anonymous-pro" },
      { role: "Member", name: "Hrithik Mageshkumar", linkedin: "https://linkedin.com/in/anonymous-pro", instagram: "https://instagram.com/anonymous-pro" },
    ],
  },
  prob: {
    id: "prob",
    name: "Problem Solving",
    members: [
      { role: "Associate", name: "Harini", linkedin: "https://linkedin.com/in/anonymous-pro", instagram: "https://instagram.com/anonymous-pro" },
      { role: "Associate", name: "Anirudh R", linkedin: "https://linkedin.com/in/anonymous-pro", instagram: "https://instagram.com/anonymous-pro" },
      { role: "Member", name: "Mridula S A", linkedin: "https://linkedin.com/in/anonymous-pro", instagram: "https://instagram.com/anonymous-pro" },
      { role: "Member", name: "Prarthana", linkedin: "https://linkedin.com/in/anonymous-pro", instagram: "https://instagram.com/anonymous-pro" },
    ],
  },
  ml: {
    id: "ml",
    name: "Machine Learning",
    members: [
      { role: "Associate", name: "Janani H", linkedin: "https://linkedin.com/in/anonymous-pro", instagram: "https://instagram.com/anonymous-pro" },
      { role: "Associate", name: "Deepan KR", linkedin: "https://linkedin.com/in/anonymous-pro", instagram: "https://instagram.com/anonymous-pro" },
      { role: "Member", name: "Rishivel", linkedin: "https://linkedin.com/in/anonymous-pro", instagram: "https://instagram.com/anonymous-pro" },
      { role: "Member", name: "Hannah Felin", linkedin: "https://linkedin.com/in/anonymous-pro", instagram: "https://instagram.com/anonymous-pro" },
    ],
  },
  core: {
    id: "core",
    name: "Core",
    members: [
      { role: "Head Lead", name: "Vishva K", linkedin: "https://www.linkedin.com/in/vishva-k-609a0a2b9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/vishva.152?igsh=MXg3NWFtbTJrOHNhZg==" },
      { role: "Domain Leads", name: "Kabilan", linkedin: "https://linkedin.com/in/anonymous-pro", instagram: "https://instagram.com/anonymous-pro", leadType: "Operations" },
      { role: "Domain Leads", name: "Sarvesh", linkedin: "https://www.linkedin.com/in/sarvesh-ragav/", instagram: "https://www.instagram.com/1_1.sarvesh.1_1/", leadType: "Web Development" },
      { role: "Domain Leads", name: "Ayush Nytik Joshi", linkedin: "https://www.linkedin.com/in/ayushnytikjoshi?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "", leadType: "Machine Learning" },
      { role: "Domain Leads", name: "Bershay", linkedin: "https://linkedin.com/in/anonymous-pro", instagram: "https://instagram.com/anonymous-pro", leadType: "App Development" },
      { role: "Domain Leads", name: "Varshitha", linkedin: "https://www.linkedin.com/in/varshitha-m-408823319?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "", leadType: "Problem Solving" },
      { role: "Domain Leads", name: "Srinidhi K", linkedin: "https://www.linkedin.com/in/srinidhi-k-2a487131a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/srinidoi._.06?igsh=bGRyNmE4NzJkdmV1", leadType: "Marketing" },
      { role: "Domain Leads", name: "Shashank", linkedin: "https://www.linkedin.com/in/shashank-murari-b88180300/", instagram: "", leadType: "Tech" },
      { role: "Domain Leads", name: "Raghul", linkedin: "https://www.linkedin.com/in/raghulsah", instagram: "https://www.instagram.com/1nsxne.exe/", leadType: "Design" },
    ],
  },
};
