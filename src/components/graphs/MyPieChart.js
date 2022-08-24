// import React, { PureComponent , Component } from 'react';
// import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';


// // const data = [
// //   { name: 'Group A', value: 400 },
// //   { name: 'Group B', value: 300 },
// //   { name: 'Group C', value: 300 },
// //   { name: 'Group D', value: 200 },
// // ];
// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// export default class MyPieChart extends PureComponent {
// //   static demoUrl = 'https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o';
  
//   render() {
//     return (
//       <PieChart width={400} height={400} onMouseEnter={this.onPieEnter}>
//         <Pie
//           data={this.props.docs}
//           cx={120}
//           cy={200}
//           innerRadius={60}
//           outerRadius={80}
//           fill="#8884d8"
//           paddingAngle={5}
//           dataKey="value"
//           margin={{ top: 50, right: 0, left: 100, bottom: 0 }}
//         >
//           {this.props.docs.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         {/* <Pie
//           data={this.props.docs}
//           cx={420}
//           cy={200}
//           startAngle={180}
//           endAngle={0}
//           innerRadius={60}
//           outerRadius={80}
//           fill="#8884d8"
//           paddingAngle={5}
//           dataKey="value"
//         >
//           {this.props.docs.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie> */}
//       </PieChart>
//     );
//   }
// }


import React, { PureComponent } from 'react';
import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


let renderLabel = function(entry) {
  return entry.year;
}
export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/pie-chart-in-responsive-container-qyv6t';

  render() {
    return (
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie nameKey='name' dataKey='value'  data={this.props.docs} fill="#8884d8" label={[renderLabel(this.props.docs)]} >
            {this.props.docs.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            </Pie>
            <Legend/>
            <Tooltip/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}



