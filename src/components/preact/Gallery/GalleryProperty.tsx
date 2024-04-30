
import { clsx } from 'clsx';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { useEffect } from 'preact/hooks';
import { twMerge } from 'tailwind-merge';
interface Props {
    galleryID: string;
    images: string[];
    addStyles?: string;
    
}
export default function GalleryProperty({ addStyles,galleryID, images }: Props) {
    const baseStyles = 'pswp-gallery';
  useEffect(() => {
    let lightbox :PhotoSwipeLightbox | null = new PhotoSwipeLightbox({
      gallery: '#' + galleryID,
      children: 'a',
      pswpModule: () => import('photoswipe'),
    });
    lightbox.init();

    return () => {
      lightbox?.destroy();
      lightbox = null;
    };
  }, []);
  const styles = twMerge(clsx(baseStyles, addStyles));
  return (
    <div className={styles} id={galleryID}>
     {
    images[0]  ?  (
      <div className="col-span-1 h-100 animate-fadeIn">
        <a
          className="group rounded-xl hover:scale-105 transition-all relative aspect-squeare"
          href={images[0] && images[0]}
          target="_blank"
          key={galleryID + '-' + 0}
          data-cropped={true}
          data-pswp-width="2000"
          data-pswp-height="1600"
        >
          <img
            width={1600}
            height={900}
            src={images[0] && images[0]}
            alt="Imagen 1"
            loading="eager"
            className="rounded-xl aspect-square object-cover"
          />
         {/*  <img
            width={1600}
            height={900}
            src={images[0] && images[0]}
            alt="Imagen 1"
            loading="lazy"
            className=" rounded-xl aspect-square object-cover absolute inset-0 transition groud-hover:contrast-150 opacity-70 -z-10 "
          /> */}
        </a>
      </div>
    ) : (
      <div className="col-span-1 h-100">
        <div className="h-full bg-gray-200 rounded-xl aspect-square animate-pulse"></div>
      </div>
    )
  }

  <div className="grid grid-cols-2 gap-5">
    {
      images[1] ? (
        <div className="col-span-1 animate-fadeIn">
          <a
            className="group rounded-xl hover:scale-105 transition-all relative aspect-squeare"
            target="_blank"
            href={images[1] && images[1]}
            key={galleryID + '-' + 1}
            data-cropped="true"
            data-pswp-width="2000"
            data-pswp-height="1600"
          >
            <img
              width={500}
              height={500}
              src={images[1] && images[1]}
              alt="Imagen 1"
              loading="eager"
              className="rounded-xl aspect-square object-cover"
            />
          {/*   <img
              width={500}
              height={500}
              src={images[1] && images[1]}
              alt="Imagen 1"
              loading="eager"
              className="blur-lg absolute inset-0 transition groud-hover:contrast-150 opacity-70 -z-10 rounded object-cover"
            /> */}
          </a>
        </div>
      ):  (<div className="col-span-1">
      <div className=" bg-gray-200 rounded-xl aspect-square flex justify-center items-center animate-pulse"></div>
    </div>)
    }
    {
      images[2] ? (
        <div className="col-span-1 animate-fadeIn">
          <a
            className="group rounded-xl hover:scale-105 transition-all relative aspect-squeare"
            target="_blank"
            href={images[1] && images[2]}
            key={galleryID + '-' + 1}
            data-cropped="true"
            data-pswp-width="2000"
            data-pswp-height="1600"
          >
            <img
              width={500}
              height={500}
              src={images[2] && images[2]}
              alt="Imagen 1"
              loading="eager"
              className="rounded-xl aspect-square object-cover"
            />
           {/*  <img
              width={500}
              height={500}
              src={images[2] && images[2]}
              alt="Imagen 1"
              loading="eager"
              className="blur-lg absolute inset-0 transition groud-hover:contrast-150 opacity-70 -z-10 rounded object-cover"
            /> */}
          </a>
        </div>
      ) :(<div className="col-span-1">
      <div className=" bg-gray-200 rounded-xl aspect-square flex justify-center items-center animate-pulse"></div>
    </div>)
    }
    {
      images[3] ? (
        <div className="col-span-1 animate-fadeIn">
          <a
            className="group rounded-xl hover:scale-105 transition-all relative aspect-squeare"
            target="_blank"
            href={images[3]}
            key={galleryID + '-' + 3}
            data-cropped="true"
            data-pswp-width="2000"
            data-pswp-height="1600"
          >
            <img
              width={500}
              height={500}
              src={images[3] && images[3]}
              alt="Imagen 1"
              loading="eager"
              className="rounded-xl aspect-square object-cover"
            />
        {/*     <img
              width={500}
              height={500}
              src={images[3] && images[3]}
              alt="Imagen 1"
              loading="eager"
              className="blur-lg absolute inset-0 transition groud-hover:contrast-150 opacity-70 -z-10 rounded object-cover"
            /> */}
          </a>
        </div>
      ) :  (<div className="col-span-1">
      <div className=" bg-gray-200 rounded-xl aspect-square flex justify-center items-center animate-pulse"></div>
    </div>)
    }

    {
      images[4] ? (
        <div className="col-span-1 animate-fadeIn">
          <a
            className="group rounded-xl hover:scale-105 transition-all relative aspect-squeare"
            target="_blank"
            href={images[4]}
            key={galleryID + '-' + 4}
            data-cropped="true"
            data-pswp-width="2000"
            data-pswp-height="1600"
          >
            <img
              width={500}
              height={500}
              src={images[4] && images[4]}
              alt="Imagen 1"
              loading="eager"
              className="rounded-xl aspect-square object-cover"
            />
          {/*   <img
              width={500}
              height={500}
              src={images[4] && images[4]}
              alt="Imagen 1"
              loading="eager"
              className="blur-lg absolute inset-0 transition groud-hover:contrast-150 opacity-70 -z-10 rounded object-cover"
            /> */}
          </a>
        </div>
      ) : (<div className="col-span-1">
      <div className=" bg-gray-200 rounded-xl aspect-square flex justify-center items-center animate-pulse"></div>
    </div>)
    }

    {
      images?.length >= 5 && (
        <div className="hidden">
          {images.slice(5)?.map((image, index) => (
            <a
              className="group rounded-xl hover:scale-105 object-contain transition-all relative aspect-square"
              href={images[index + 5]}
              key={galleryID + '-' + index + 5}
              data-pswp-width="2000"
              data-pswp-height="1600"
              data-cropped="true"
            >
              <img
                loading="lazy"
                src={image}
                alt="Imagen"
                className="blur-lg absolute inset-0 transition groud-hover:contrast-150 opacity-70 -z-10 rounded object-cover"
              />
            </a>
          ))}
        </div>
      )
    }
    </div>
    </div>
  );
}
