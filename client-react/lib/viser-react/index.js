import * as VR from 'viser-react'

let moduleList = ['Slider', 'Plugin', 'Path', 'JitterPoint', 'Sankey', 'Edge', 'Heatmap', 'Contour', 'Polygon', 'Candle', 'Box', 'Schema', 'Pyramid', 'Funnel', 'Point', 'DodgeInterval', 'StackInterval', 'Interval', 'DodgeBar', 'StackBar', 'Bar', 'SmoothArea', 'StackArea', 'Area', 'DashLine', 'SmoothLine', 'Sector', 'Pie', 'Line', 'Brush', 'Series', 'Axis', 'Guide', 'Legend', 'Tooltip', 'Coord', 'LiteChart', 'Facet', 'FacetView', 'View', 'Chart', 'Global', 'registerShape', 'registerAnimation']

let ViserReact = {}

moduleList.forEach(moduleName => {
	ViserReact[moduleName] = VR[moduleName]
})

window.ViserReact = ViserReact