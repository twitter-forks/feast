import React from "react";
import { z } from "zod";
import { useQuery } from "react-query";
import {
    EuiButton,
    EuiFlexGroup,
    EuiFieldText,
    EuiFormRow,
    EuiForm,
    EuiPanel,
    EuiFlexItem,
    EuiPageHeader,
    EuiPageContent,
    EuiPageContentBody,
    EuiLoadingContent,
    EuiEmptyPrompt,
  } from "@elastic/eui";
import { ModelIcon32 } from "../../graphics/ModelIcon";

const ColumnQuery = () => {
    const data_url = "http://0.0.0.0:8000/api/fetch_columns";
    const table = "model";
    return useQuery<any>(
        table,
        () => {
          return fetch(data_url, {method: "POST", headers: {'content-type': 'application/json'}, body: JSON.stringify(table)}).then((res) => res.json());
        }
    );
}

function form_submit(data: any) {
    console.log(data.all);
    var fields: string[] = [];
    var vals: any[] = [];
    for (let field of data.all) {
        if (field !== "model_name") {
            var val = (document.getElementsByName(field + "_col")[0] as HTMLInputElement).value;
            fields.push(field);
            if (val === ''){
                vals.push(undefined);
            }
            else {
                vals.push(val);
            }
        }
    }
    var model_name = (document.getElementsByName("model_name_col")[0] as HTMLInputElement).value;
    const data_url = "http://0.0.0.0:8000/api/add_models";
    data = [{"model_name": model_name, "metadata_fields": fields, "metadata_vals": vals}];
    fetch(data_url, {method: "POST", headers: {'content-type': 'application/json'}, body: JSON.stringify(data)})
    window.location.href = "./model"
}

const AddRow = z.object({
    name: z.string(),
});
type AdditionRowType = z.infer<typeof AddRow>;

const AdditionRow = ({name}: AdditionRowType) => {
    return (
        <EuiFormRow label={name}>
            <EuiFieldText name={name + "_col"} id={name + "_col"} />
        </EuiFormRow>
    )
}

const AdditionReqRow = ({name}: AdditionRowType) => {
    return (
        <EuiFormRow label={name + "*"}> 
            <EuiFieldText name={name + "_col"} id={name + "_col"} />
        </EuiFormRow>
    )
}

const AdditionForm = (data: any) => {
    console.log(data);
    return (
        <React.Fragment>
            {data.data.non_nullable.map((item: string) => {
                return <AdditionReqRow name={item} />
            })}
            {data.data.nullable.map((item: string) => {
                return <AdditionRow name={item} />
            })}
        </React.Fragment>
    );
}

const ModelAddition = () => {
    const { isLoading, isError, isSuccess, data } = ColumnQuery();
    if (isLoading) {
        // Handle Loading State
        // https://elastic.github.io/eui/#/display/loading
        return <EuiLoadingContent lines={3} />;
      }
    
      if (isError) {
        // Handle Data Fetching Error
        // https://elastic.github.io/eui/#/display/empty-prompt
        return (
          <EuiEmptyPrompt
            iconType="alert"
            color="danger"
            title={<h2>Unable to load</h2>}
            body={
              <p>
                There was an error loading the Dashboard application. Contact your
                administrator for help.
              </p>
            }
          />
        );
      }

    return (
        <React.Fragment>
        <EuiPageHeader
            restrictWidth
            iconType={ModelIcon32}
            pageTitle="Feature Groups"
        />
        <EuiPageContent
            hasBorder={false}
            hasShadow={false}
            paddingSize="none"
            color="transparent"
            borderRadius="none"
        >
        <EuiPageContentBody>
            <EuiForm component="form" id="data-form-tab">
                <EuiFlexGroup>
                <EuiFlexItem>
                    <EuiPanel hasBorder={true}>
                    <AdditionForm data={data}/>
                    <EuiButton fill onClick={() => {form_submit(data)}}>
                        Create New Feature Group
                    </EuiButton>
                    </EuiPanel>
                </EuiFlexItem>
                </EuiFlexGroup>
            </EuiForm>
        </EuiPageContentBody>
        </EuiPageContent>
        </React.Fragment>
    );
};

export default ModelAddition;
