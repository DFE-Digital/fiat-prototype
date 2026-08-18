// Pupil numbers chart for the Graphs / Highcharts prototypes (P1 bar, P2 stacked).
// Called from highcharts-p1 / highcharts-p2 layouts after Highcharts has loaded.

window.FIAT = window.FIAT || {}

window.FIAT.initPupilNumbersChart = function () {
  const tableView = document.getElementById('pupil-numbers-table-view')
  const chartView = document.getElementById('pupil-numbers-chart-view')
  const showChartButton = document.getElementById('pupil-numbers-show-chart')
  const showTableButton = document.getElementById('pupil-numbers-show-table')
  const container = document.getElementById('pupil-numbers-chart')
  const stackedContainer = document.getElementById('pupil-numbers-stacked-chart')

  // Toggle needs the shared chrome; each prototype only has one chart type
  if (!tableView || !chartView || !showChartButton || !showTableButton) {
    return
  }

  if (!container && !stackedContainer) {
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

  const categories = [
    'Super sweet biscuit academy',
    'Crunchy ginger nut school',
    'Double chocolate bourbon academy',
    'Scottish shortbread school'
  ]

  const pupilNumbers = [675, 993, 840, 481]
  const pupilCapacity = [502, 1150, 900, 1538]

  // Occupancy stack: pupils within capacity + spare places + over capacity
  const pupilsWithinCapacity = pupilNumbers.map(function (pupils, i) {
    return Math.min(pupils, pupilCapacity[i])
  })
  const spareCapacity = pupilNumbers.map(function (pupils, i) {
    return Math.max(0, pupilCapacity[i] - pupils)
  })
  const overCapacity = pupilNumbers.map(function (pupils, i) {
    return Math.max(0, pupils - pupilCapacity[i])
  })

  const sharedExporting = {
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
  }

  let chart
  let stackedChart

  function createCharts () {
    if (container && !chart && container.getAttribute('data-chart-ready') !== 'true') {
      container.setAttribute('data-chart-ready', 'true')

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
        exporting: sharedExporting,
        series: [
          {
            name: 'Pupil numbers',
            data: pupilNumbers
          },
          {
            name: 'Pupil capacity',
            data: pupilCapacity
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

    if (stackedContainer && !stackedChart && stackedContainer.getAttribute('data-chart-ready') !== 'true') {
      stackedContainer.setAttribute('data-chart-ready', 'true')

      stackedChart = Highcharts.chart('pupil-numbers-stacked-chart', {
        chart: {
          type: 'bar',
          styledMode: true
        },
        title: {
          text: 'How full is each academy?',
          align: 'left'
        },
        subtitle: {
          text: 'Stacked view of pupil numbers against capacity',
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
          reversedStacks: false, // first series at the start; over capacity at the end
          title: {
            text: 'Number of pupils',
            margin: 30
          },
          accessibility: {
            description: 'Number of pupils'
          },
          stackLabels: {
            enabled: true
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
        plotOptions: {
          series: {
            stacking: 'normal'
          }
        },
        exporting: sharedExporting,
        series: [
          {
            name: 'Pupil numbers',
            data: pupilsWithinCapacity
          },
          {
            name: 'Capacity',
            data: spareCapacity
          },
          {
            name: 'Over capacity',
            data: overCapacity
          }
        ],
        credits: {
          enabled: false
        },
        accessibility: {
          description:
            'Stacked horizontal bar chart showing pupil numbers, capacity and over capacity for each academy.'
        }
      })
    }
  }

  function reflowCharts () {
    window.setTimeout(function () {
      if (chart) {
        chart.reflow()
      }
      if (stackedChart) {
        stackedChart.reflow()
      }
    }, 50)
  }

  function showChartView () {
    tableView.hidden = true
    chartView.hidden = false
    createCharts()
    reflowCharts()
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
