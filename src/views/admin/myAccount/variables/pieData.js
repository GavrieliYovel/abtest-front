import axios from "axios";

export const pieChartOptions = {
    labels: ["used", "total", "Empty"],
    colors: ["#4318FF", "#6AD2FF", "#EFF4FB"],
    chart: {
        width: "50px",
    },
    states: {
        hover: {
            filter: {
                type: "none",
            },
        },
    },
    legend: {
        show: false,
    },
    dataLabels: {
        enabled: false,
    },
    hover: { mode: null },
    plotOptions: {
        donut: {
            expandOnClick: false,
            donut: {
                labels: {
                    show: false,
                },
            },
        },
    },
    fill: {
        colors: ["#4318FF", "#6AD2FF", "#EFF4FB"],
    },
    tooltip: {
        enabled: true,
        theme: "dark",
    },
};

// Total Spent Default
