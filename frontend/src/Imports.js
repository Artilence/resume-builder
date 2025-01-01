import Facebook from './assets/facebook.png';
import Instagram from './assets/instagram.png';
import LinkedIn from './assets/linkedin.png';
import Pintrest from './assets/pintrest.png';
import Youtube from './assets/youtube.png';

export const footerIcons = [
  {
    icon: Facebook,
    link: 'https://www.facebook.com/',
    hover: 'hover:bg-blue-600',
  },
  {
    icon: Pintrest,
    link: 'https://pintrest.com/',
    hover: 'hover:bg-red-600',
  },
  {
    icon: Instagram,
    link: 'https://www.instagram.com/',
    hover: 'hover:bg-[#E1306C]', // Instagram color using arbitrary values
  },
  {
    icon: LinkedIn,
    link: 'https://www.linkedin.com/',
    hover: 'hover:bg-blue-900',
  },
  {
    icon: Youtube,
    link: 'https://www.youtube.com/',
    hover: 'hover:bg-red-500',
  },
];

export const footerBottomLinks = [
  {
    title: 'Job Seekers',
    Links: [
      'create a resume',
      'resume examples',
      'resume templates',
      'cover letter templates',
      'Job Search',
    ],
  },
  {
    title: 'Career Resources',
    Links: ['Resume Help', 'Job Interview', 'career', 'cover Letter', 'blog'],
  },
  {
    title: 'Our company',
    Links: [
      'About us',
      'Pricing',
      'Sponsership program ',
      'Media Kit',
      'Affiliates',
    ],
  },
  {
    title: 'Support',
    Links: [
      'FAQ',
      'contact Us',
      'Terms of Service',
      'Privacy Policy',
      'Right of withdrawal',
      'Do not sell Do not share',
      'Status',
    ],
  },
];
