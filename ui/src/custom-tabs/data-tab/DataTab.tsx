import React from "react";
import { z } from "zod";
import {
  EuiCode,
  EuiFlexGroup,
  EuiHorizontalRule,
  EuiTable,
  EuiTitle,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiPanel,
  EuiFlexItem,
  EuiTableRow,
  EuiTableRowCell,
} from "@elastic/eui";
import DataQuery from "./DataQuery";

const DataRow = z.object({
  name: z.string(),
  value: z.string(),
});

type DataRowType = z.infer<typeof DataRow>;

const LineHeightProp: React.CSSProperties = {
  lineHeight: 1,
}

const EuiDataRow = ({name, value}: DataRowType) => {
  return (
    <EuiTableRow>
      <EuiTableRowCell>
        {name}
      </EuiTableRowCell>
      <EuiTableRowCell textOnly={false}>
        <EuiCode data-code-language="text">
          <pre style={LineHeightProp}>
            {value}
          </pre>
        </EuiCode>
      </EuiTableRowCell>
    </EuiTableRow>
  );
}

const DataTable = (data: any) => {
  var items: DataRowType[] = [];

  for (let element in data.data){
    const row: DataRowType = {
      name: element,
      value: JSON.stringify(data.data[element], null, 2),
    };
    items.push(row);
    console.log(row);
  }

  return (
    <EuiTable>
      <EuiTableHeader>
        <EuiTableHeaderCell>
          Data Item Name
        </EuiTableHeaderCell>
        <EuiTableHeaderCell>
          Data Item Value
        </EuiTableHeaderCell>
      </EuiTableHeader>
      {items.map((item) => {
        return <EuiDataRow name={item.name} value={item.value} />
      })}
    </EuiTable>
  )
}

const DataTab = () => {
  const data = DataQuery().data;

  return (
    <React.Fragment>
    {data && (
      <React.Fragment>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiPanel hasBorder={true}>
            <EuiTitle size="xs">
              <h3>Properties</h3>
            </EuiTitle>
            <EuiHorizontalRule margin="xs" />
            <DataTable data={data} />
          </EuiPanel>
          </EuiFlexItem>
        </EuiFlexGroup>
      </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default DataTab;
