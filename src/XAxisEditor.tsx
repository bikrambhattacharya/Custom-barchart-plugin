import React, { useState, useEffect } from 'react';
import { StandardEditorProps } from '@grafana/data';
import { Select, Field } from '@grafana/ui';

export const XAxisEditor: React.FC<StandardEditorProps<any>> = (props) => {
  const [options, setOptions] = useState([]);
  const [oldKeyV, setOldKeyV] = useState(true);
  useEffect(() => {
    if (props.context.data?.length !== 0) {
      let datas = props.context.data[0].fields.map((f: any) => {
        return { label: f.name, value: f.name };
      });
      setOptions(datas);
    }
  }, [props.context.data]);
  if (props.context.data?.length === 0) {
    return <div />;
  }
  if (props.value) {
    const oldValuePresentInData = props.context.data[0].fields.filter((od: any) => od.name === props.value.label);
    if (oldValuePresentInData.length === 0 && oldKeyV) {
      setOldKeyV(false);
    }
  }
  return (
    <div>
      <Field label="Select a data-key for X Axis">
        <Select
          value={oldKeyV ? props.value : { label: 'Choose', value: 'Choose' }}
          options={options}
          onChange={(selectableValue) => {
            setOldKeyV(true);
            props.onChange(selectableValue);
          }}
        />
      </Field>
    </div>
  );
};
