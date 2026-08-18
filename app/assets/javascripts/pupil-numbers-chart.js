// Pupil numbers chart for the Graphs / Highcharts prototype.
// Called from graphs/highcharts/layouts/main.njk after Highcharts has loaded.

window.FIAT = window.FIAT || {}

window.FIAT.initPupilNumbersChart = function () {
  const tableView = document.getElementById('pupil-numbers-table-view')
  const chartView = document.getElementById('pupil-numbers-chart-view')
  const showChartButton = document.getElementById('pupil-numbers-show-chart')
  const showTableButton = document.getElementById('pupil-numbers-show-table')
  const container = document.getElementById('pupil-numbers-chart')

  if (!tableView || !chartView || !showChartButton || !showTableButton || !container) {
    return
  }

  if (typeof Highcharts === 'undefined') {
    return
  }

  // Avoid binding listeners more than once
  if (tableView.getAttribute('data-toggle-ready') === 'true') {
    return
  }
  tableView.setAttribute('data-toggle-ready', 'true')

  let chart

  function createChart () {
    if (chart || container.getAttribute('data-chart-ready') === 'true') {
      return
    }
    container.setAttribute('data-chart-ready', 'true')

    const categories = [
      'Super sweet biscuit academy',
      'Crunchy ginger nut school',
      'Double chocolate bourbon academy',
      'Scottish shortbread school'
    ]

    chart = Highcharts.chart('pupil-numbers-chart', {
      chart: {
        type: 'bar',
        styledMode: true
      },
      title: {
        text: 'Pupil numbers and capacity',
        align: 'left'
      },
      xAxis: {
        categories: categories,
        title: {
          text: 'Academy',
          margin: 40
        },
        accessibility: {
          description: 'Academies in the trust'
        }
      },
      yAxis: {
        min: 0,
        tickInterval: 200,
        title: {
          text: 'Number of pupils',
          margin: 30
        },
        accessibility: {
          description: 'Number of pupils'
        }
      },
      legend: {
        align: 'left',
        verticalAlign: 'top',
        symbolHeight: 14,
        symbolWidth: 14
      },
      tooltip: {
        shared: true,
        valueSuffix: ' pupils'
      },
      exporting: {
        buttons: {
          contextButton: {
            // Default menu minus 'viewData' (View / Hide data table)
            menuItems: [
              'viewFullscreen',
              'separator',
              'downloadPNG',
              'downloadJPEG',
              'downloadPDF',
              'downloadSVG'
            ]
          }
        }
      },
      series: [
        {
          name: 'Pupil numbers',
          data: [675, 993, 840, 481]
        },
        {
          name: 'Pupil capacity',
          data: [502, 1150, 900, 1538]
        }
      ],
      credits: {
        enabled: false
      },
      accessibility: {
        description:
          'Horizontal bar chart comparing pupil numbers and pupil capacity for four academies in the trust.'
      }
    })
  }

  function showChartView () {
    tableView.hidden = true
    chartView.hidden = false
    createChart()
    window.setTimeout(function () {
      if (chart) {
        chart.reflow()
      }
    }, 50)
    showTableButton.focus()
  }

  function showTableView () {
    chartView.hidden = true
    tableView.hidden = false
    showChartButton.focus()
  }

  showChartButton.addEventListener('click', function (event) {
    event.preventDefault()
    showChartView()
  })

  showTableButton.addEventListener('click', function (event) {
    event.preventDefault()
    showTableView()
  })
}
