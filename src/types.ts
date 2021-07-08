type alignment = 'horizontal' | 'vertical';

export interface SimpleOptions {
  alignment: alignment;
  layers: [];
  xaxis: {
    label: string;
    value: string;
  };
  fontColor: string;
  fontSize: {
    label: string;
    value: string;
  };
}
