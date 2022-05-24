
import {Bar } from 'react-chartjs-2'
const BarChart = () => {
return (
    <div>
    <Bar
     data={{
        labels: ['January', 'February', 'March',
        'April', 'May'],
datasets: [
 {
   label: 'Visitors',
   backgroundColor: 'red',
   borderColor: 'rgba(0,0,0,1)',
   borderWidth: 0,
   data: [65, 59, 80, 81, 56, 66, 70]
 },
 {  label: 'Borrowers',
 backgroundColor: 'green',
 borderColor: 'rgba(0,0,0,1)',
 borderWidth: 0,
 data: [65, 59, 80, 81, 56, 66, 70]}
]
     }}
     options= {{
        plugins: {
            responsiveness:true
        },
        legend:{
          display:true,
          position:'top',
          labels: {
            usePointStyle: true,
            boxWidth: 6
          }
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display:false
                },
                barPercentage: 0.5
            }], }
    }}
    />
</div>
);
}

export default BarChart;