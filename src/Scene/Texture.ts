import { ConfettiTextureRef, TextureID } from '../types';
import { TextureLoader, Texture, MeshBasicMaterial } from 'three';

function TextureFactory (loader: TextureLoader, textureRef: ConfettiTextureRef) {
  return loader.load(textureRef.url)
}

export class TextureStore {
  private loader = new TextureLoader()
  private textures: { [textureId: string]: Texture } = {}

  store (textureRef: ConfettiTextureRef) {
    this.textures = { ...this.textures, [textureRef.id]: TextureFactory(this.loader, textureRef) }
  }

  applyTextureMap (material: MeshBasicMaterial, textureId: TextureID) {
    const newMaterial = material.clone()
    if (this.textures[textureId]) newMaterial.map = this.textures[textureId]
    return newMaterial
  }

  applyAlphaMap (material: MeshBasicMaterial, textureId: TextureID) {
    const newMaterial = material.clone()
    if (this.textures[textureId]) newMaterial.alphaMap = this.textures[textureId]
    return newMaterial
  }
}