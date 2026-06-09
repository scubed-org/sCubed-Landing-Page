import BannerImage from '../../public/images/Banner.jpg';
// import NYSABA2025Image from '../../public/images/NYSABA Event Banner.jpg';
import { HeroSliderItem } from '../components/HeroImageSlider';

export const heroSliderData: HeroSliderItem[] = [
  {
    id: 'empowering-practice',
    title:
      'All-in-one ABA platform built by BCBAs\nto get your clinic running fast.',
    mobileTitle:
      'All-in-one ABA platform built by BCBAs to get your clinic running fast.',
    description:
      'Simplify clinic management, streamline therapy, and see results faster.',
    supportingText:
      'Designed by clinicians for clinics, S Cubed makes migrating from other systems easy and helps your team deliver quality care from day one.',
    descriptionMaxWidth: '650px',
    image: {
      src: BannerImage,
      alt: 'S Cubed Practice Management Dashboard',
      width: 1920,
      height: 800,
    },
    link: {
      href: 'https://calendly.com/scubed-info/30min',
      text: 'Book a 20-Minute Demo',
      calendlyPopup: true,
    },
    contentAlign: 'center',
  },
];
