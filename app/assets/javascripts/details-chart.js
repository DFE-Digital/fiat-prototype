// Details pie charts — by type and by local authority (Highcharts P1 / P2)

window.FIAT = window.FIAT || {}

window.FIAT.initDetailsChart = function () {
  const tableView = document.getElementById('details-table-view')
  const chartView = document.getElementById('details-chart-view')
  const showChart = document.getElementById('details-show-chart')
  const showTable = document.getElementById('details-show-table')
  const typeEl = document.getElementById('details-chart')
  const laEl = document.getElementById('details-la-chart')

  if (!tableView || !chartView || !showChart || !showTable || !typeEl || !laEl || typeof Highcharts === 'undefined') {
    return
  }

  const exportMenu = {
    buttons: {
      contextButton: {
        menuItems: ['viewFullscreen', 'separator', 'downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG']
      }
    }
  }

  const pieOptions = {
    allowPointSelect: true,
    cursor: 'pointer',
    showInLegend: true,
    dataLabels: {
      enabled: true,
      format: '{point.name}: {point.y}'
    }
  }

  let typeChart
  let laChart

  function createCharts () {
    if (!typeChart) {
      typeChart = Highcharts.chart(typeEl, {
        chart: { type: 'pie', styledMode: true },
        title: { text: 'Academies by type', align: 'left' },
        tooltip: { pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.0f}%)' },
        legend: { align: 'left', verticalAlign: 'top', symbolHeight: 14, symbolWidth: 14 },
        exporting: exportMenu,
        credits: { enabled: false },
        plotOptions: { pie: pieOptions },
        series: [{
          name: 'Academies',
          colorByPoint: true,
          data: [
            { name: 'Academy sponsor led', y: 2 },
            { name: 'Free schools', y: 1 },
            { name: 'Academy converter', y: 1 }
          ]
        }]
      })
    }

    if (!laChart) {
      laChart = Highcharts.chart(laEl, {
        chart: { type: 'pie', styledMode: true },
        title: { text: 'Academies by local authority', align: 'left' },
        tooltip: { pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.0f}%)' },
        legend: { align: 'left', verticalAlign: 'top', symbolHeight: 14, symbolWidth: 14 },
        exporting: exportMenu,
        credits: { enabled: false },
        plotOptions: { pie: pieOptions },
        series: [{
          name: 'Academies',
          colorByPoint: true,
          data: [
            { name: 'Sheffield', y: 1 },
            { name: 'London', y: 1 },
            { name: 'Darlington', y: 2 }
          ]
        }]
      })
    }
  }

  showChart.addEventListener('click', function (e) {
    e.preventDefault()
    tableView.hidden = true
    chartView.hidden = false
    createCharts()
    setTimeout(function () {
      if (typeChart) typeChart.reflow()
      if (laChart) laChart.reflow()
    }, 50)
    showTable.focus()
  })

  showTable.addEventListener('click', function (e) {
    e.preventDefault()
    chartView.hidden = true
    tableView.hidden = false
    showChart.focus()
  })
}
