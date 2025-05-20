import React, { useRef, useEffect, useMemo } from 'react';
import * as d3 from 'd3';
import { SimulationData } from '../types';

interface StatusChartProps {
  data: SimulationData[];
}

export function StatusChart({ data }: StatusChartProps) {
  const ref = useRef<SVGSVGElement>(null);

  // Process data efficiently using `useMemo`
  const chartData = useMemo(() => {
    const counts = d3.rollup(
      data,
      (v) => v.length,
      (d) => d.status
    );
    return Array.from(counts, ([status, count]) => ({ status, count }));
  }, [data]);

  useEffect(() => {
    if (!ref.current || chartData.length === 0) return;
    
    drawChart(ref.current, chartData);
  }, [chartData]);

  return <svg ref={ref} width="100%" height="300" />;
}

/**
 * Handles chart rendering logic.
 * @param svgElement - Reference to the SVG element.
 * @param data - Processed data for visualization.
 */
function drawChart(svgElement: SVGSVGElement, data: { status: string; count: number }[]) {
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = 500 - margin.left - margin.right;
  const height = 250 - margin.top - margin.bottom;

  const svg = d3.select(svgElement);
  svg.selectAll('*').remove(); // Clear previous drawings

  const x = d3.scaleBand()
    .domain(data.map((d) => d.status))
    .range([0, width])
    .padding(0.1);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, (d) => d.count)!])
    .nice()
    .range([height, 0]);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // Draw Y-axis
  g.append('g').call(d3.axisLeft(y));

  // Draw X-axis
  g.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x));

  // Draw Bars
  g.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d) => x(d.status)!)
    .attr('y', (d) => y(d.count))
    .attr('width', x.bandwidth())
    .attr('height', (d) => height - y(d.count))
    .attr('fill', '#1976d2');
}