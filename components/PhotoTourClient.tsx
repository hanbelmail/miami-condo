'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '@/app/photo-tour/phototour.module.css';

const photoData = {
  'Living Room': {
    subtitle: 'Air conditioning · Heating · TV',
    images: [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ==/original/2d53d324-6454-4c82-8fee-7bf6306ce35d.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ==/original/1e96df36-4d3b-4018-b146-6f1727a8d2d4.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ%3D%3D/original/89aa41c8-57f6-44d9-909a-738ae3f6222d.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ%3D%3D/original/c8fe6816-8d4f-4005-9bae-36f5e8facc59.jpeg?im_w=720'
    ]
  },
  'Full Kitchen': {
    subtitle: 'Fully equipped kitchen with modern appliances',
    images: [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ%3D%3D/original/6edec68e-ea4e-4337-b42e-957a36a49a02.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ%3D%3D/original/d7306360-3502-4f91-8b41-2ced7f5bea1b.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ%3D%3D/original/7df7994c-04d8-4038-8570-5a1359564646.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ%3D%3D/original/a7c7b980-f933-47e7-9cda-0ef6330531b7.jpeg?im_w=720'
    ]
  },
  'Dining Area': {
    subtitle: 'Spacious dining area with ocean views',
    images: [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ%3D%3D/original/e85189aa-a99e-4f3a-bd9b-d56b326ac7e3.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ==/original/cb3a0f12-8149-4766-911c-da1354bc93cc.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ%3D%3D/original/750d8ac0-f7a1-4116-a3da-16225ffae52d.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ==/original/14ac4a32-d107-461b-b5f9-7d28b8b5305e.jpeg?im_w=720'
    ]
  },
  'Bedroom 1': {
    subtitle: 'Comfortable bedroom with premium bedding',
    images: [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ==/original/dac691be-704d-472f-8e89-283aed908503.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ%3D%3D/original/2a71c088-4aa3-479c-902c-6c9c62a863a3.jpeg?im_w=720'
    ]
  },
  'Bedroom 2': {
    subtitle: 'Second bedroom with city views',
    images: [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ%3D%3D/original/9b202a01-d928-4425-918a-2b254f53c121.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ==/original/ca245e14-fa0d-4f19-afd4-844b1c8b578f.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ==/original/9ba04018-5e29-4eae-bebe-a31fa2f50dd8.jpeg?im_w=720'
    ]
  },
  'Bathrooms': {
    subtitle: 'Two full bathrooms with modern fixtures',
    images: [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ%3D%3D/original/dcd44878-7dd2-4205-8e24-b55714a29859.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ%3D%3D/original/7a455443-3d8b-433f-afd6-1d906c6b6350.jpeg?im_w=720'
    ]
  },
  'Balcony': {
    subtitle: '47th floor views of ocean and skyline',
    images: [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ%3D%3D/original/fbe694dd-55b6-4f73-b55f-6a21492b5c91.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ%3D%3D/original/2e88c7c6-670f-40e1-a45c-2faf281bb170.jpeg?im_w=720'
    ]
  },
  'Laundry': {
    subtitle: 'In-unit washer and dryer',
    images: [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1091400351345330535/original/ca7628f3-341f-4d10-94ac-429728438678.jpeg?im_w=720'
    ]
  },
  'Gym': {
    subtitle: 'Building fitness center',
    images: [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ%3D%3D/original/976a03fb-ce6a-48d1-8a03-8b27e06af651.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ%3D%3D/original/dbf08aae-db1b-4d5b-a2e5-bd979fca7d02.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ%3D%3D/original/98577eed-f973-45c2-9ada-1267a831ee6b.jpeg?im_w=720'
    ]
  },
  'Building': {
    subtitle: 'Luxury high-rise building amenities',
    images: [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ==/original/3e4ac1d1-07c5-4db1-93dd-fe95de17dede.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ==/original/e371886a-98c1-436d-ac3d-247385e557aa.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ==/original/559996c6-4bd9-48c9-899a-e57b93de76ee.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ%3D%3D/original/9af99286-ebc4-47a1-872d-0d2214d7913b.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ%3D%3D/original/84cf0704-b59b-4680-a72a-0195031a780e.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ==/original/e2619dac-7362-4dae-a5bf-29f3374b5e80.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ==/original/a9a7196a-ae38-49e5-b681-f0f99c7f98a6.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ==/original/c1c02f6a-d0b3-4716-9118-8528b9d2d45b.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ==/original/c7b348d7-2fba-4d02-8397-777e252a24c9.jpeg?im_w=720'
    ]
  },
  'Pool': {
    subtitle: 'Resort-style pool and deck',
    images: [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ%3D%3D/original/2a4c03c7-3cdd-4665-84b3-e058d82ddf44.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ==/original/13d246a9-d8bd-4c29-8a14-711b5e00555a.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ%3D%3D/original/df2aea00-fb3c-4a9a-9f4a-ed50f9d5b4d3.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ==/original/7ee21265-f314-45a7-99a3-e27b8adbb7e4.jpeg?im_w=720'
    ]
  }
};

export default function PhotoTourClient() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const categories = ['All', ...Object.keys(photoData)];
  
  // Flatten all images into a single array for lightbox navigation
  const allImages = Object.entries(photoData).flatMap(([section, data]) =>
    data.images.map(url => ({ url, section, subtitle: data.subtitle }))
  );

  const handleBack = () => {
    router.back();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Miami Luxury Condo - Photo Tour',
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  const scrollToSection = (category: string) => {
    setActiveCategory(category);
    if (category === 'All') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(category);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const openLightbox = (imageUrl: string) => {
    const index = allImages.findIndex(img => img.url === imageUrl);
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={handleBack} className={styles.backButton} aria-label="Go back">
          ←
        </button>
        <h1 className={styles.title}>Photo tour</h1>
        <button onClick={handleShare} className={styles.shareButton} aria-label="Share">
          ↗
        </button>
      </header>

      <nav className={styles.categoryNav}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => scrollToSection(category)}
            className={`${styles.categoryButton} ${activeCategory === category ? styles.active : ''}`}
          >
            {category}
          </button>
        ))}
      </nav>

      <main className={styles.content}>
        {Object.entries(photoData).map(([section, data]) => (
          <section key={section} id={section} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section}</h2>
            <p className={styles.sectionSubtitle}>{data.subtitle}</p>
            <div className={styles.imageGrid}>
              {data.images.map((url, index) => (
                <div 
                  key={index} 
                  className={styles.imageWrapper}
                  onClick={() => openLightbox(url)}
                >
                  <img
                    src={url}
                    alt={`${section} - Photo ${index + 1}`}
                    className={styles.image}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button 
            className={styles.lightboxClose} 
            onClick={closeLightbox}
            aria-label="Close"
          >
            ✕ Close
          </button>
          
          <div className={styles.lightboxCounter}>
            {currentImageIndex + 1} / {allImages.length}
          </div>

          <button
            className={styles.lightboxShare}
            onClick={(e) => {
              e.stopPropagation();
              handleShare();
            }}
            aria-label="Share"
          >
            ↗
          </button>

          <button
            className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            aria-label="Previous image"
          >
            ‹
          </button>

          <div 
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={allImages[currentImageIndex].url}
              alt={`${allImages[currentImageIndex].section} - ${allImages[currentImageIndex].subtitle}`}
              className={styles.lightboxImage}
            />
          </div>

          <button
            className={`${styles.lightboxNav} ${styles.lightboxNext}`}
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
