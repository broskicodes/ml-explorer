import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export const Transformer = () => {
  const encoderRef = useRef<HTMLDivElement>(null);
  const decoderRef = useRef<HTMLDivElement>(null);
  const outputTfRef = useRef<HTMLDivElement>(null);
  const d3ContainerRef = useRef(null);

  const [toggle, setToggle] = useState(false);

  const handleMouseEnter = useCallback((ref: RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const transparentColor = getComputedStyle(ref.current).backgroundColor.replace("rgb", "rgba").replace(")", ", 0.8)");
      ref.current.style.backgroundColor = transparentColor;
    }
  }, []);

  const handleMouseLeave = useCallback((ref: RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const opaqueColor = getComputedStyle(ref.current).backgroundColor.replace("0.8", "1.0");
      ref.current.style.backgroundColor = opaqueColor;
    }
  }, [])

  useEffect(() => {
    if (d3ContainerRef.current) {
      const svg = d3.select(d3ContainerRef.current)
      svg.html('');

      const blkW = 192;
      const encH = 256;
      const decH = 384;

      const encx = 400;
      const ency = 915-256-256;
      const decx = encx+128+blkW;
      const decy = 915-256-256-128;
      
      svg.append('rect')
        .attr('x', encx)
        .attr('y', ency)
        .attr('width', blkW)
        .attr('height', encH)
        .attr('fill', "rgba(239, 235, 214, 1)")

      svg.append('text')
        .attr('x', encx+blkW/2)
        .attr('y', encx+encH/2)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .text('Encoder');

      svg.append('rect')
        .attr('x', decx)
        .attr('y', decy)
        .attr('width', blkW)
        .attr('height', decH)
        .attr('fill', "rgba(239, 235, 214, 1)")
      
      svg.append('text')
        .attr('x', decx+blkW/2)
        .attr('y', decy+decH/2)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .text('Decoder');

      svg.append('rect')
        .attr('x', encx+32)
        .attr('y', ency+encH+32)
        .attr('width', blkW-64)
        .attr('height', 40)
        .attr('fill', "rgba(194, 181, 112, 1.0)")
      
      svg.append('text')
        .attr('x', encx+32+(blkW-64)/2)
        .attr('y', ency+encH+32+40/2)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .text('Embedding');
      
      svg.append('rect')
        .attr('x', decx+32)
        .attr('y', decy+decH+32)
        .attr('width', blkW-64)
        .attr('height', 40)
        .attr('fill', "rgba(194, 181, 112, 1.0)")
      
      svg.append('text')
        .attr('x', decx+32+(blkW-64)/2)
        .attr('y', decy+decH+32+40/2)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .text('Embedding');

      svg.append('rect')
        .attr('x', decx+16)
        .attr('y', decy-80-32)
        .attr('width', blkW-32)
        .attr('height', 80)
        .attr('fill', "rgba(226, 210, 124, 1.0)")
      
      svg.append('text')
        .attr('x', decx+16+(blkW-32)/2)
        .attr('y', decy-80-32+80/2)
        .attr('text-anchor', 'middle')
        .append('tspan')
          .attr('x', decx+16+(blkW-32)/2)
          .attr('dy', '0')
          .text('Output')
        .append('tspan')
          .attr('x', decx+16+(blkW-32)/2)
          .attr('dy', '1em')
          .text('Transformation')

      

      // Draw the arrows
      svg.append('path')
        .attr('d', `M ${encx+32+(blkW-64)/2}, ${ency+encH+32} L ${encx+32+(blkW-64)/2}, ${ency+encH}`)
        .attr('stroke', 'black')
        .attr('fill', 'none')
        .attr('marker-end', 'url(#arrow)');

      svg.append('path')
        .attr('d', `M ${decx+32+(blkW-64)/2}, ${ency+encH+32} L ${decx+32+(blkW-64)/2}, ${ency+encH}`)
        .attr('stroke', 'black')
        .attr('fill', 'none')
        .attr('marker-end', 'url(#arrow)');

      svg.append('path')
        .attr('d', `M ${decx+32+(blkW-64)/2}, ${decy} L ${decx+32+(blkW-64)/2}, ${decy-32}`)
        .attr('stroke', 'black')
        .attr('fill', 'none')
        .attr('marker-end', 'url(#arrow)');

      svg.append('defs').append('marker')
        .attr('id', 'arrow')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 5)
        .attr('refY', 0)
        .attr('markerWidth', 8)
        .attr('markerHeight', 8)
        .attr('orient', 'auto-start-reverse')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', 'black');
    }
  }, [toggle]);

  return (
    <div className="diagram">
      <svg
        className="diagram"
        ref={d3ContainerRef}
        />
      <button className="absolute bottom-0 right-0" onClick={() => setToggle(!toggle)}>toggle</button>
    </div>
  )
}
{/* <div className="flex flex-row items-end space-x-32">
        <div className="flex flex-col space-y-8 items-center">
          <div 
            id="encoder" 
            className="block" 
            ref={encoderRef}
            onMouseEnter={() => handleMouseEnter(encoderRef)} 
            onMouseLeave={() => handleMouseLeave(encoderRef)}
            >
            Encoder
          </div>
          <div className="embedding">Embedding</div>
          <p>Input Sequence</p>
        </div>
        <div className="flex flex-col space-y-8 items-center">
          <p>Output Probabilities</p>
          <div 
            className="sub-block"
            ref={outputTfRef}
            onMouseEnter={() => handleMouseEnter(outputTfRef)}
            onMouseLeave={() => handleMouseLeave(outputTfRef)}
            >
            Output Transformation
          </div>
          <div 
            id="decoder" 
            className="block" 
            ref={decoderRef}
            onMouseEnter={() => handleMouseEnter(decoderRef)}
            onMouseLeave={() => handleMouseLeave(decoderRef)}
            >
            Decoder
          </div>
          <div className="embedding">Embedding</div>
          <p>Ouptut Sequence</p>
        </div>
      </div> */}