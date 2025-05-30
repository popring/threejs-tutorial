import { WebGLRenderer, ACESFilmicToneMapping } from 'three';

function createRenderer() {
  const renderer = new WebGLRenderer({
    antialias: true,
  });
  // 启用物理上正确的光照
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  return renderer;
}

export { createRenderer };