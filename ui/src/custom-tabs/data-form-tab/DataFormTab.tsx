import React from 'react';
import {
  EuiButton,
  EuiFlexGroup,
  EuiFieldText,
  EuiFormRow,
  EuiForm,
  EuiPanel,
  EuiFlexItem,
} from "@elastic/eui";
import DataFormQuery from "./DataFormQuery";

const LineHeightProp: React.CSSProperties = {
  lineHeight: 1,
}

function form_submit() {
  var field = (document.getElementsByName("metadata_field")[0] as HTMLInputElement).value;
  var val = (document.getElementsByName("metadata_val")[0] as HTMLInputElement).value;
  DataFormQuery(field, val);
}

const DataFormTab = () => {
  return (
    <React.Fragment>
    <EuiForm component="form" id="data-form-tab">
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiPanel hasBorder={true}>
            <EuiFormRow label="Text field" helpText="I am some friendly help text.">
              <EuiFieldText name="metadata_field" id="metadata_field" />
            </EuiFormRow>
            <EuiFormRow label="Text field" helpText="I am some friendly help text.">
              <EuiFieldText name="metadata_val" id="metadata_val" />
            </EuiFormRow>
            <EuiButton fill onClick={() => {form_submit()}}>
              Set Metadata
            </EuiButton>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiForm>
    </React.Fragment>
  );
};

export default DataFormTab;
