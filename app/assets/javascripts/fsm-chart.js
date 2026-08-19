// Free school meals — grouped horizontal bar chart (Highcharts P1 / P2)

window.FIAT = window.FIAT || {}

window.FIAT.initFsmChart = function () {
  const tableView = document.getElementById('fsm-table-view')
  const chartView = document.getElementById('fsm-chart-view')
  const showChart = document.getElementById('fsm-show-chart')
  const showTable = document.getElementById('fsm-show-table')
  const chartEl = document.getElementById('fsm-chart')

  if (!tableView || !chartView || !showChart || !showTable || !chartEl || typeof Highcharts === 'undefined') {
    return
  }

  let chart

  function createChart () {
    if (chart) return

    chart = Highcharts.chart(chartEl, {
      chart: { type: 'bar', styledMode: true },
      title: { text: 'Free school meal eligibility', align: 'left' },
      xAxis: {
        categories: [
          'Super sweet biscuit academy',
          'Crunchy ginger nut school',
          'Double chocolate bourbon academy',
          'Scottish shortbread school'
        ],
        title: { text: 'Academy', margin: 40 },
        accessibility: {
          description: 'Academies in the trust'
        }
      },
      yAxis: {
        min: 0,
        max: 100,
        tickInterval: 20,
        title: { text: 'Percentage of pupils', margin: 30 },
        labels: { format: '{value}%' },
        accessibility: {
          description: 'Percentage of pupils eligible for free school meals'
        }
      },
      legend: { align: 'left', verticalAlign: 'top', symbolHeight: 14, symbolWidth: 14 },
      tooltip: { shared: true, valueSuffix: '%' },
      exporting: {
        buttons: {
          contextButton: {
            menuItems: [
              'viewFullscreen',
              'printChart',
              'separator',
              'downloadPNG',
              'downloadJPEG',
              'downloadPDF',
              'downloadSVG'
            ]
          }
        }
      },
      credits: { enabled: false },
      series: [
        { name: 'Pupils eligible for free school meals', data: [61.3, 42.0, 27.8, 24.3] },
        { name: 'Local authority average 2023/24', data: [43.7, 24.2, 19.6, 19.6] },
        { name: 'National average 2023/24', data: [24.9, 25.6, 25.6, 25.6] }
      ],
      accessibility: {
        description:
          'Horizontal bar chart comparing free school meal eligibility with local authority and national averages for each academy. Super sweet biscuit academy is well above both averages; Scottish shortbread school is closest to the national average.',
        linkedDescription: '#fsm-description'
      }
    })
  }

  showChart.addEventListener('click', function (e) {
    e.preventDefault()
    tableView.hidden = true
    chartView.hidden = false
    createChart()
    if (chart) setTimeout(function () { chart.reflow() }, 50)
    showTable.focus()
  })

  showTable.addEventListener('click', function (e) {
    e.preventDefault()
    chartView.hidden = true
    tableView.hidden = false
    showChart.focus()
  })
}
