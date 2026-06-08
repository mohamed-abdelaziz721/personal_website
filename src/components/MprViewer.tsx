import { useEffect, useRef } from 'react';

interface Props {
  imageIds: string[];
  height?: number;
}

export default function MprViewer({ imageIds, height = 400 }: Props) {
  const axialRef = useRef<HTMLDivElement>(null);
  const sagittalRef = useRef<HTMLDivElement>(null);
  const coronalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!axialRef.current || !sagittalRef.current || !coronalRef.current) return;
    if (imageIds.length === 0) return;

    let destroyed = false;

    (async () => {
      const { RenderingEngine, Enums } = await import('@cornerstonejs/core');
      const { init: initCornerstone } = await import('@cornerstonejs/core');
      const { init: initTools, ToolGroupManager, ZoomTool, PanTool, StackScrollMouseWheelTool, addTool, Enums: ToolEnums } = await import('@cornerstonejs/tools');

      await initCornerstone();
      await initTools();

      addTool(ZoomTool);
      addTool(PanTool);
      addTool(StackScrollMouseWheelTool);

      const renderingEngineId = 'mprEngine';
      const engine = new RenderingEngine(renderingEngineId);

      const viewportInputs = [
        { viewportId: 'axial',    element: axialRef.current!,    type: Enums.ViewportType.STACK },
        { viewportId: 'sagittal', element: sagittalRef.current!, type: Enums.ViewportType.STACK },
        { viewportId: 'coronal',  element: coronalRef.current!,  type: Enums.ViewportType.STACK },
      ];

      engine.setViewports(viewportInputs);

      const toolGroup = ToolGroupManager.createToolGroup('mprGroup');
      toolGroup?.addTool(ZoomTool.toolName);
      toolGroup?.addTool(PanTool.toolName);
      toolGroup?.addTool(StackScrollMouseWheelTool.toolName);
      toolGroup?.setToolActive(ZoomTool.toolName, { bindings: [{ mouseButton: ToolEnums.MouseBindings.Secondary }] });
      toolGroup?.setToolActive(PanTool.toolName, { bindings: [{ mouseButton: ToolEnums.MouseBindings.Auxiliary }] });
      toolGroup?.setToolActive(StackScrollMouseWheelTool.toolName);

      ['axial', 'sagittal', 'coronal'].forEach((id) => toolGroup?.addViewport(id, renderingEngineId));

      const axialViewport = engine.getViewport('axial') as any;
      await axialViewport.setStack(imageIds);
      engine.renderViewports(['axial', 'sagittal', 'coronal']);
    })();

    return () => { destroyed = true; };
  }, [imageIds]);

  const panelStyle = { height, flex: 1, background: '#000', borderRadius: 8, overflow: 'hidden' };

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <div ref={axialRef}    style={panelStyle} />
      <div ref={sagittalRef} style={panelStyle} />
      <div ref={coronalRef}  style={panelStyle} />
    </div>
  );
}
