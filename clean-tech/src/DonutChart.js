import React from 'react'
import {Doughnut, defaults } from 'react-chartjs-2'
import { useState, useEffect } from "react";
import axios from "axios"

const DonutC = () => {

  var ageData = { Ages_25 : 601, Ages_50 : 1354, Ages_75 : 375, Ages_100 : 0}
  const [ loading, setloading] = useState('Yes')

  useEffect( () => {

    const conn = async() => {
    setloading('Yes')
    try {
			  await axios.get("/getAges", {
			})
      .then((responce) => {
        
        var data = responce.data

        ageData = {
          Ages_25 : parseInt(data['Ages_25']),
          Ages_50 : parseInt(data['Ages_50']),
          Ages_75 : parseInt(data['Ages_75']),
          Ages_100 : parseInt(data['Ages_100'])
        }

        // setAgeData(ages)
        console.log(ageData)
        setloading('No')

      })
		} catch (error) {
			console.error(error)
		}}
    conn()
  },[]);


  return (
    <div>
        <Doughnut
        data ={ {
          labels: ['5-25','25-50','50-75','75-100'],
          datasets: [
              {
                  label: 'Ages',
                  data: [601,1354,375,0],
                  borderColor: ['rgba(255,206,86,0.2)'],
                  backgroundColor: ['rgba(232,99,132,1)',
                  'rgba(232,211,6,1)',
                  'rgba(54,162,235,1)',
                  'rgba(255,159,64,1)',
                  'rgba(153,102,255,1)' ],
                  pointBackgroundColor: 'rgba(255,206,86,0.2)',
              }
              
          ]
      } }
      options = {{
        plugins: {
            title: {
                display: true,
                text: 'Doughnut Chart',
                color:'blue',
                font: {
                    size:34
                },
                padding:{
                    top:30,
                    bottom:30
                },
                responsive:true,
                animation:{
                    animateScale: true,
                               }
            },
            legend:{
              display:true,
              position:'top',
              labels: {
                usePointStyle: true,
                boxWidth: 6,
                fontColor: "black"
              }
            }
        }
        
    } }
    
        />
    </div>
  )
}

export default DonutC
