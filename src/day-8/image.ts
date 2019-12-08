export interface NumberCount {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
  9: number;
}

export interface ImageSize {
  height: number;
  width: number;
}

export function countOccurences(numbers: number[]): NumberCount {
  const count: NumberCount = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  numbers.forEach(num => count[num]++);
  return count;
}

export function breakUpLayers({ height, width }: ImageSize, image: string): number[][] {
  const imageNumbers = image.split('').map(x => +x);
  const numberPerLayer = height * width;
  const layers = [];
  let index = 0;
  while (imageNumbers.length >= numberPerLayer) {
    layers[index] = imageNumbers.splice(0, numberPerLayer);
    index++;
  }
  return layers;
}

export function checksum(layers: NumberCount[]): number {
  let fewestZeroLayer: NumberCount = null;
  let fewestZeros = Infinity;
  layers.forEach(layer => {
    if (layer[0] < fewestZeros) {
      fewestZeros = layer[0];
      fewestZeroLayer = layer;
    }
  });
  return fewestZeroLayer[1] * fewestZeroLayer[2];
}

export function mergeLayers(layers: number[][]): string {
  const finalLayerArray: number[] = [];
  layers.forEach(layer => {
    layer.forEach((pixels, index) => {
      if (pixels !== 2 && finalLayerArray[index] === undefined) {
        finalLayerArray[index] = pixels;
      }
    });
  });
  return finalLayerArray.join('');
}

export function displayImage(size: ImageSize, image: string) {
  return '';
}
