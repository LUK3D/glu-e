import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath } from 'reactflow';


// const onEdgeClick = (evt:any, id:any) => {
//   evt.stopPropagation();
//   alert(`remove ${id}`);
// };

export default function CustomEdge({
//   id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const [edgePath, 
    // labelX, labelY
] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={{...style, strokeWidth:5, stroke:'#7D5BED' }} interactionWidth={20} />
      <EdgeLabelRenderer>
        {/* <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <button className="edgebutton" onClick={(event) => onEdgeClick(event, id)}>
            ×
          </button>
        </div> */}
      </EdgeLabelRenderer>
    </>
  );
}