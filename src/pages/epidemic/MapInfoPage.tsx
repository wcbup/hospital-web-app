import React, { useEffect, useMemo } from 'react';
import * as echarts from 'echarts';
import EChartsReact from 'echarts-for-react';
import china from '../../libs/china.json';
import { useProvinceData } from '../../apis/epidemic';

const MapInfoPage: React.FC = () => {
  const { data } = useProvinceData();

  const option = useMemo<echarts.EChartsOption>(
    () =>
      data
        ? {
            title: {
              text: '中国疫情地图',
              subtext: data.updateTime,
              left: 550,
              top: 50,
              textStyle: {
                color: '#9c0505',
              },
            },
            tooltip: {
              trigger: 'item',
              formatter: '省份：{b}<br/>现有确诊 {c}',
            },
            series: [
              {
                type: 'map',
                map: 'china',
                label: {
                  show: true,
                  color: 'black',
                  align: 'center',
                },
                zoom: 1,
                roam: true,
                itemStyle: {
                  borderColor: 'blue',
                },
                emphasis: {
                  label: {
                    color: 'black',
                    fontSize: 10,
                  },
                  itemStyle: {
                    areaColor: 'lightyellow',
                  },
                },
                data: data.provinceData,
              },
            ],
            visualMap: {
              type: 'piecewise',
              show: true,
              splitNumber: 6,
              pieces: [
                { min: 10000 },
                { min: 1000, max: 9999 },
                { min: 100, max: 999 },
                { min: 10, max: 99 },
                { min: 1, max: 9 },
                { min: 0, max: 0 },
              ],
              inRange: {
                color: [
                  '#FFFFFF',
                  '#FDEBCA',
                  '#E25552',
                  '#CA2B2D',
                  '#831A26',
                  '#500312',
                ],
              },
            },
          }
        : {
            title: {
              text: '加载中...',
              left: 550,
              top: 50,
            },
          },
    [data],
  );

  useEffect(() => {
    echarts.registerMap('china', china as any);
  }, []);

  return (
    <EChartsReact style={{ width: '100%', height: '100%' }} option={option} />
  );
};

export default MapInfoPage;
