
import { clsx } from 'clsx';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { twMerge } from 'tailwind-merge';
interface Props {
  galleryID: string;
  images: string[];
  addStyles?: string;

}

const loadImage = (image: string, setImageDimensions: (dimensions: { width: number; height: number }) => void) => {
  const img = new Image();
  img.onload = function () {
    setImageDimensions({ width: img.width, height: img.height });
  };
  img.src = image;
};


export default function GalleryProperty({ addStyles, galleryID, images }: Props) {
  const baseStyles = 'pswp-gallery';
  useEffect(() => {
    let lightbox: PhotoSwipeLightbox | null = new PhotoSwipeLightbox({
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
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }[]>([]);

  const loadImageCallback = useCallback((image: string) => {
    loadImage(image, (dimensions) => {
      setImageDimensions((oldDimensions) => [...oldDimensions, dimensions]);
    });
  }, []);

  useEffect(() => {
    images.forEach(loadImageCallback);
  }, [images, loadImageCallback]);

  return (
    <div className={styles} id={galleryID}>
      {
        images[0] ? (
          <div className="col-span-1 h-100 animate-fadeIn">
            <a
              className=""
              href={images[0] && images[0]}
              target="_blank"
              key={galleryID + '-' + 0}
              data-cropped={true}
              data-pswp-width={imageDimensions[0]?.width}
              data-pswp-height={imageDimensions[0]?.height}
            >
              <img
                width={1600}
                height={900}
                src={images[0] && images[0]}
                alt="Imagen 1"
                loading="eager"
                className="aspect-square object-cover relative  rounded-xl inset-0 transition groud-hover:contrast-150   "

              />
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

                target="_blank"
                href={images[1] && images[1]}
                key={galleryID + '-' + 1}
                data-cropped="true"
                data-pswp-width={imageDimensions[1]?.width}
                data-pswp-height={imageDimensions[1]?.height}
              >
                <img
                  width={500}
                  height={500}
                  src={images[1] && images[1]}
                  alt="Imagen 1"
                  loading="eager"
                  className="rounded-xl aspect-square object-cover"
                />
              </a>
            </div>
          ) : (<div className="col-span-1">
            <div className=" bg-gray-200 rounded-xl aspect-square flex justify-center items-center animate-pulse"></div>
          </div>)
        }
        {
          images[2] ? (
            <div className="col-span-1 animate-fadeIn">
              <a
                target="_blank"
                href={images[1] && images[2]}
                key={galleryID + '-' + 1}
                data-cropped="true"
                data-pswp-width={imageDimensions[2]?.width}
                data-pswp-height={imageDimensions[2]?.height}
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
          ) : (<div className="col-span-1">
            <div className=" bg-gray-200 rounded-xl aspect-square flex justify-center items-center animate-pulse"></div>
          </div>)
        }
        {
          images[3] ? (
            <div className="col-span-1 animate-fadeIn">
              <a
                target="_blank"
                href={images[3]}
                key={galleryID + '-' + 3}
                data-cropped="true"
                data-pswp-width={imageDimensions[3]?.width}
                data-pswp-height={imageDimensions[3]?.height}
              >
                <img
                  width={500}
                  height={500}
                  src={images[3] && images[3]}
                  alt="Imagen 1"
                  loading="eager"
                  className="rounded-xl aspect-square object-cover"
                />
              </a>
            </div>
          ) : (<div className="col-span-1">
            <div className=" bg-gray-200 rounded-xl aspect-square flex justify-center items-center animate-pulse"></div>
          </div>)
        }

        {
          images[4] ? (
            <div className="col-span-1 animate-fadeIn">
              <a
               
                target="_blank"
                href={images[4]}
                key={galleryID + '-' + 4}
                data-cropped="true"
                data-pswp-width={imageDimensions[4]?.width}
                data-pswp-height={imageDimensions[4]?.height}
              >
                <img
                  width={500}
                  height={500}
                  src={images[4] && images[4]}
                  alt="Imagen 1"
                  loading="eager"
                  className="rounded-xl aspect-square object-cover"
                />
            
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
                
                  href={images[index + 5]}
                  key={galleryID + '-' + index + 5}
                  data-pswp-width={imageDimensions[index + 5]?.width}
                  data-pswp-height={imageDimensions[index + 5]?.height}
                  data-cropped="true"
                  style={{
                    width: 'fit-content',
                    objectFit: 'contain'
                  }}
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
