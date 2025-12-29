import { proxy } from 'valtio';

export const state = proxy({
  layers: 2, 
  currentPart: 'bottomLayer',
  colors: {
    bottomLayer: '#ffffff',
    midLayer: '#ffffff',
    topLayer: '#ffffff',
    frosting: '#ffffff',
    sparkle: '#FFD700',
    flower: '#ffb7c5', // Default cherry blossom pink
  },
  frostingType: 'smooth',
  extraItem: 'none', // none, cherries, chocolate, berries, flowers
  showSparkles: false,
  logoTexture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 
  isRotating: true,
});