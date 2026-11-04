import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { CanvasTexture, SRGBColorSpace } from 'three';
import {
  AppWindow, Workflow, MessageCircle, Search, ShoppingBag, MousePointer2,
  BarChart3, Layers, Rocket, Bot, Palette, Mic, Eye, Smartphone, Database,
  Code2, Send, Gauge,
} from 'lucide-react';

export const SERVICE_ICONS = [AppWindow, Workflow, MessageCircle, Search, ShoppingBag];
export const EXTRA_ICONS = [
  MousePointer2, BarChart3, Layers, Rocket, Bot, Palette, Mic, Eye,
  Smartphone, Database, Code2, Send, Gauge,
];

const SIZE = 256;

export function iconTexture(Icon) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = SIZE;
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;

  const svg = renderToStaticMarkup(
    createElement(Icon, { size: SIZE * 0.46, color: '#ffffff', strokeWidth: 1.75, absoluteStrokeWidth: false })
  );
  const img = new Image();
  img.onload = () => {
    const ctx = canvas.getContext('2d');
    const s = SIZE * 0.46;
    ctx.drawImage(img, (SIZE - s) / 2, (SIZE - s) / 2, s, s);
    texture.needsUpdate = true;
  };
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  return texture;
}
