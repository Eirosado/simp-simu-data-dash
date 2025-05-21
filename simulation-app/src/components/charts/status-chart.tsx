import { useRef, useEffect, useMemo } from 'react';
import * as d3 from 'd3';
import { SimulationData } from '../../types/simu-data-types';

interface StatusChartProps {
  data: SimulationData[];
  statusColors: Record<SimulationData["status"], string>;
}

export function StatusChart({ data, statusColors }: StatusChartProps) {
  const ref = useRef<SVGSVGElement>(null);

  const chartData = useMemo(() => processChartData(data), [data]);

  useEffect(() => {
    if (!ref.current || chartData.length === 0) return;
    ChartRenderer(ref.current, chartData, statusColors);
  }, [chartData, statusColors]);

  return <svg ref={ref} width="100%" height="350" />;
}

function processChartData(data: SimulationData[]) {
  return Array.from(
    d3.rollup(data, (v) => v.length, (d) => d.status),
    ([status, count]) => ({ status, count })
  );
}

function ChartRenderer(svgElement: SVGSVGElement, data: { status: string; count: number }[], statusColors: Record<string, string>) {
  const margin = { top: 40, right: 40, bottom: 50, left: 60 };
  const width = 600 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const svg = d3.select(svgElement);
  svg.selectAll('*').remove();

  svg.attr('viewBox', `0 0 600 350`).attr('preserveAspectRatio', 'xMidYMid meet');

  const x = d3.scaleBand()
    .domain(data.map((d) => d.status))
    .range([0, width])
    .padding(0.1);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, (d) => d.count)!])
    .nice()
    .range([height, 0]);

  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  svg.append('text')
    .attr('x', width / 2 + margin.left)
    .attr('y', margin.top / 2)
    .attr('text-anchor', 'middle')
    .style('font-size', '18px')
    .style('fill', '#333')
    .text('Distribution of Status Categories');

  g.append('g').call(d3.axisLeft(y));
  g.append('text')
    .attr('x', -height / 2)
    .attr('y', -margin.left + 20)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .style('font-size', '14px')
    .text('Count');

  g.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x));

  g.append('text')
    .attr('x', width / 2)
    .attr('y', height + margin.bottom - 10)
    .attr('text-anchor', 'middle')
    .style('font-size', '14px')
    .text('Status Categories');

  g.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d) => x(d.status)!)
    .attr('y', (d) => y(d.count))
    .attr('width', x.bandwidth())
    .attr('height', (d) => height - y(d.count))
    .attr('fill', (d) => statusColors[d.status]);
}