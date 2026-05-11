import BannerImage from '../../public/images/Banner.jpg';
// Slide 3 - Mother's Journey
import BackgroundThreeSlide from '../../public/images/background-image-three-slide.png';
import RightImageThreeSlide from '../../public/images/right-image-three-slide.png';
// import NYSABA2025Image from '../../public/images/NYSABA Event Banner.jpg';
import { HeroSliderItem } from '../components/HeroImageSlider';

export const heroSliderData: HeroSliderItem[] = [
  {
    id: 'empowering-practice',
    title:
      'ABA Practice Management Software\nThat Empowers Your Practice\nAnd The People You Serve',
    mobileTitle:
      'ABA Practice Management Software That Empowers Your Practice And The People You Serve',
    description:
      'S Cubed is an all-in-one platform with powerful clinical tools, applied behavior analysis (ABA) data collection, and therapy practice management features, built to streamline operations and improve outcomes. Whether supporting healthcare clinics, ABA services, or school-based programs, S Cubed helps you deliver exceptional care with less hassle and greater efficiency.',
    image: {
      src: BannerImage,
      alt: 'S Cubed Practice Management Dashboard',
      width: 1920,
      height: 800,
    },
    link: {
      href: '/subscribe?plan=free',
      text: 'Start 30 Days Free Trial Today',
    },
    contentAlign: 'center',
  },
  {
    id: 'from-mothers-journey',
    title: "From a Mother's Journey Became a Lifeline for Families",
    description:
      'How <a href="https://www.trevorsplace.net/" target="_blank" rel="noopener noreferrer">Trevor\'s Place</a> & <a href="https://scubed.io/">S Cubed</a> are transforming therapy and family communication through innovation and compassion.',
    layoutMode: 'split',
    backgroundImage: {
      src: BackgroundThreeSlide,
      alt: 'As featured in USA Today Background',
      position: 'center center',
    },
    splitImage: {
      src: RightImageThreeSlide,
      alt: "Mother's Journey - Top 10 Trailblazing Entrepreneurs",
    },
    link: {
      href: 'https://www.usatoday.com/story/special/contributor-content/2025/08/28/from-playing-school-to-building-trevors-place-how-one-mothers-journey-became-a-lifeline-for-families/85873205007/',
      text: "As featured in 'USA Today'",
      mobileText: "As in 'USA Today'",
      external: true,
    },
  },
];
