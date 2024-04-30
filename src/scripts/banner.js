// banner.js

export function setupHeroScript(props,idSection) {
    let currentImageIndex = 0;
    let intervalId = null;
  
    function changeImage() {
      currentImageIndex = (currentImageIndex + 1) % props.images.length;
      const imgElement = document.getElementById(idSection);
      if (imgElement) {
        imgElement.src = props.images[currentImageIndex];
      }
    }
  
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        if (!intervalId) {
          // Inicia el intervalo solo si no está ya en marcha
          intervalId = setInterval(() => {
            changeImage();
          }, props.interval);
        }
      } else {
        // Detén el intervalo cuando el documento no está visible
        if (intervalId !== null) {
          clearInterval(intervalId);
        }
        intervalId = null;
      }
    });
  
    return {
      currentImageIndex,
    };
  }
  