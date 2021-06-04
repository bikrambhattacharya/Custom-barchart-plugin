import React from 'react';
import { PanelProps, DataFrameView } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css } from 'emotion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, ResponsiveContainer } from 'recharts';
import { ColorPicker, stylesFactory, useTheme } from '@grafana/ui';

interface LegendProps {
  payload?: any;
  options: any;
  onOptionsChange: any;
}
const CustomizedLegend: React.FC<LegendProps> = ({ payload, options, onOptionsChange }) => {
  const styles = getStyles();
  return (
    <div className={styles.legendWrapper}>
      {payload.map((entry: any, index: number) => {
        return (
          <div key={`item-${index}`} className={styles.legendItemWrapper}>
            <div className={styles.legendColor}>
              <ColorPicker
                color={entry.color}
                onChange={(color) => {
                  let newOptions = { ...options };
                  newOptions.layers[index] = color;
                  onOptionsChange(newOptions);
                }}
              />
            </div>{' '}
            {entry.value}
          </div>
        );
      })}
    </div>
  );
};

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height, onOptionsChange }) => {
  const styles = getStyles();
  const theme = useTheme();

  if (data.series.length === 0) {
    return <div className={styles.messageWrapper}>No data available</div>;
  }
  let timeData: any[] = data.request?.targets.filter((d: any) => d.format === 'time_series');
  if (timeData.length > 0) {
    return <div className={styles.messageWrapper}>Only table data is supported in this chart</div>;
  }
  if (data.series.length > 1) {
    return <div className={styles.messageWrapper}>Only one query is supported in this chart</div>;
  }

  let dataArray = new DataFrameView(data.series[0]).toArray();

  if (options.xaxis == null) {
    return <div className={styles.messageWrapper}>Select a data-key for X axis</div>;
  }
  const oldValuePresentInData = data.series[0].fields.filter((od: any) => od.name === options.xaxis.value);
  if (oldValuePresentInData.length === 0) {
    return <div className={styles.messageWrapper}>Select a data-key for X axis</div>;
  }
  return (
    <ResponsiveContainer width={width} height={height}>
      <BarChart
        layout={options.alignment}
        data={dataArray}
        margin={
          options.alignment === 'horizontal'
            ? { top: 5, right: 5, bottom: 5, left: 5 }
            : { top: 5, right: 5, left: 15, bottom: 5 }
        }
      >
        <CartesianGrid />
        {options.alignment === 'horizontal'
          ? [
              <XAxis
                key="xaxis"
                dataKey={options.xaxis.value}
                tick={{ fontSize: 12, fill: theme.isDark ? '#ffffff' : '#000000' }}
              />,
              <YAxis key="yaxis" tick={{ fontSize: 12, fill: theme.isDark ? '#ffffff' : '#000000' }} />,
            ]
          : [
              <XAxis key="xaxis" type="number" tick={{ fontSize: 12, fill: theme.isDark ? '#ffffff' : '#000000' }} />,
              <YAxis
                key="yaxis"
                type="category"
                dataKey={options.xaxis.value}
                tick={{ fontSize: 12, fill: theme.isDark ? '#ffffff' : '#000000' }}
              />,
            ]}
        <Tooltip />
        <Legend
          align="left"
          iconType="line"
          content={<CustomizedLegend options={options} onOptionsChange={onOptionsChange} />}
        />
        {data.series[0].fields
          .filter((srs) => srs.name !== options.xaxis.value && srs.type !== 'string')
          .map((srs, index) => (
            <Bar key={`${srs.name}-${index}`} dataKey={`${srs.name}`} stackId="stack" fill={options.layers[index]}>
              <LabelList dataKey={`${srs.name}`} position="middle" />
            </Bar>
          ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

const getStyles = stylesFactory(() => {
  return {
    legendWrapper: css`
      display: flex;
    `,
    legendItemWrapper: css`
      display: flex;
      align-items: center;
      margin-right: 10px;
    `,
    legendColor: css`
      margin-right: 6px;
      & div {
        height: 6px !important;
        border-radius: 0px !important;
      }
    `,
    messageWrapper: css`
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    `,
  };
});
