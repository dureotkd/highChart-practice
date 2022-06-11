/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import "../index.css";

const initialOptions = {
  title: { text: "example" },
  chart: {
    type: "line",
    events: {
      load: function () {
        console.log("?");
      },
    },
  },
  xAxis: {
    categories: [],
  },
  plotOptions: {
    series: {
      cursor: "pointer",
      point: {
        events: {
          click: function () {
            console.log(this);
          },
          drag: function () {
            console.log(this);
          },
        },
      },
    },
  },
  series: [
    {
      dragDrop: {
        draggableY: true,
      },
      data: [10, 20, 300],
    },
  ],
};

const Article = () => {
  require("highcharts/modules/draggable-points")(Highcharts);

  const [options, setOptions] = React.useState(initialOptions);
  const [ref2, setRef] = React.useState({});

  let ref = React.useRef(null);

  React.useEffect(() => {
    // 옵션을 변경하면 자동으로 Highcharts가 갱신된다.

    const cloneInit = { ...initialOptions };
    cloneInit.series = [
      {
        name: "성민",
        data: [1, 2],
      },
      {
        name: "성민22",
        data: [5, 6],
      },
    ];

    cloneInit.xAxis = [
      {
        categories: ["123231", "123132132"],
      },
    ];

    setOptions(cloneInit);

    // setOptions({
    //   ...initialOptions,
    //   series: [0, 1, 2, 3],
    // });
  }, []);

  const callback = React.useCallback(
    (chart) => {
      setRef(chart);
      ref = chart;
    },
    [options]
  );

  const test = React.useCallback(async () => {
    const cloneInit = { ...options };
    cloneInit.xAxis[0].categories.push("helelloelde");
    setOptions(cloneInit);
    ref2.series[0].addPoint(500);
    // ref.series[0].addPoint(500);
    // console.log(cloneInit);
    // await wait(2000);
  }, [options]);

  return (
    <div>
      <HighchartsReact
        constructorType={"chart"}
        highcharts={Highcharts}
        options={options}
        callback={callback}
      />
      <button onClick={test}>GELLo</button>
    </div>
  );
};

function wait(s) {
  return new Promise((resolve) => setTimeout(resolve, s));
}

export default Article;
