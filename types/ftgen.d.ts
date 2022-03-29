declare module "ftgen" {
  
  type Font = {
    otype: opentype.Font,
    cache: Map,
    out: string,
  }

  type Texture = {
    text: string,
    path: string,
    isEmpty: boolean,
    width: number,
    height: number,
    abs_path: string,
  }

  function getFont(path: string, out: string): Font;
  export function generateTexture(font: Font, str: string): Texture;
  
}