import { ConfettiMaterial } from '../types';
import { MeshBasicMaterial, Material } from 'three';
import { TextureStore } from './Texture';

function MaterialFactory (textureStore: TextureStore, materialRef: ConfettiMaterial) {
  let material = new MeshBasicMaterial({ color: materialRef.colour })
  if (materialRef.textureMap) material = textureStore.applyTextureMap(material, materialRef.textureMap)
  if (materialRef.alphaMap) material = textureStore.applyAlphaMap(material, materialRef.alphaMap)
  return  { material, ref: materialRef }
}

type MaterialWithTextureMetadata = {
  material: Material,
  ref: ConfettiMaterial
}

export class MaterialStore {
  private materials: MaterialWithTextureMetadata[] = []

  constructor (
    public textureStore: TextureStore
  ) { }

  store (materialRef: ConfettiMaterial) {
    this.materials.push(MaterialFactory(this.textureStore, materialRef))
  }

  clear () {
    this.materials = []
  }

  refresh () {
    this.materials = this.materials.map(materialWithMeta => MaterialFactory(this.textureStore, materialWithMeta.ref))
  }

  getRandom () {
    return this.materials[Math.floor(Math.random() * this.materials.length)].material
  }
}