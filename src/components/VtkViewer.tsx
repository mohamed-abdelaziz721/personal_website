import { useEffect, useRef } from 'react';

interface Props {
  url: string;
  height?: number;
}

export default function VtkViewer({ url, height = 500 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const vtk = await import('@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow');
      const vtkHttpDataSetReader = await import('@kitware/vtk.js/IO/Core/HttpDataSetReader');
      const vtkActor = await import('@kitware/vtk.js/Rendering/Core/Actor');
      const vtkMapper = await import('@kitware/vtk.js/Rendering/Core/Mapper');

      const fullScreenRenderer = vtk.default.newInstance({ rootContainer: containerRef.current!, background: [0.1, 0.1, 0.1] });
      const renderer = fullScreenRenderer.getRenderer();
      const renderWindow = fullScreenRenderer.getRenderWindow();

      const reader = vtkHttpDataSetReader.default.newInstance({ fetchGzip: true });
      const actor = vtkActor.default.newInstance();
      const mapper = vtkMapper.default.newInstance();

      actor.setMapper(mapper);
      mapper.setInputConnection(reader.getOutputPort());
      renderer.addActor(actor);

      await reader.setUrl(url);
      await reader.loadData();
      renderer.resetCamera();
      renderWindow.render();

      cleanup = () => fullScreenRenderer.delete();
    })();

    return () => cleanup?.();
  }, [url]);

  return <div ref={containerRef} style={{ height, width: '100%' }} />;
}
