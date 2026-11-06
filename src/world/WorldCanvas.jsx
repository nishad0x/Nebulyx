import React, { useEffect, useRef, useState } from 'react';
import { worldState } from './store';

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function WorldCanvas() {
  const canvasRef = useRef(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    if (!hasWebGL()) {
      setFallback(true);
      document.documentElement.dataset.webgl = 'off';
      worldState.ready = true;
      return undefined;
    }
    document.documentElement.dataset.webgl = 'on';
    let world;
    let disposed = false;
    const onResize = () => world?.resize();
    import('./World').then(({ default: World }) => {
      if (disposed) return;
      try {
        world = new World(canvasRef.current);
        world.start();
        worldState.ready = true;
        if (import.meta.env.DEV) window.__world = world;
        window.addEventListener('resize', onResize);
      } catch {
        setFallback(true);
        document.documentElement.dataset.webgl = 'off';
        worldState.ready = true;
      }
    }).catch(() => {
      setFallback(true);
      document.documentElement.dataset.webgl = 'off';
      worldState.ready = true;
    });
    return () => {
      disposed = true;
      window.removeEventListener('resize', onResize);
      world?.dispose();
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed top-0 inset-x-0 h-[100lvh] -z-10 pointer-events-none">
      {fallback ? (
        <div className="world-fallback absolute inset-0" />
      ) : (
        <canvas ref={canvasRef} className="block w-full h-full" />
      )}
      <div className="world-light absolute inset-0" />
    </div>
  );
}
