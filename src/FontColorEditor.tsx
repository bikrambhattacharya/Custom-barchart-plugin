import React from 'react';
import { StandardEditorProps } from '@grafana/data';
import { Field, Button, ColorPicker } from '@grafana/ui';
import { ColorDot } from './ColorDot';

export const FontColorEditor: React.FC<StandardEditorProps<any>> = (props) => {
  return (
    <div>
      <Field label="Click to change the bar text font color">
        <ColorPicker
          color={props.value}
          onChange={(color) => {
            props.onChange(color);
          }}
        >
          {({ ref, showColorPicker, hideColorPicker }) => (
            <Button ref={ref} onMouseLeave={hideColorPicker} onClick={showColorPicker} variant="secondary">
              Open color picker <ColorDot color={props.value} />
            </Button>
          )}
        </ColorPicker>
      </Field>
    </div>
  );
};
