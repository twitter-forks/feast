import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  EuiPageHeader,
  EuiPageContent,
  EuiPageContentBody,
} from "@elastic/eui";

import { FeatureGroupIcon32 } from "../../graphics/FeatureGroupIcon";
import { useMatchExact } from "../../hooks/useMatchSubpath";
import { FeastODFVType } from "../../parsers/feastODFVS";
import OnDemandFeatureGroupOverviewTab from "./OnDemandFeatureGroupOverviewTab";

import {
  useOnDemandFeatureGroupCustomTabs,
  useOnDemandFeatureGroupCustomTabRoutes,
} from "../../custom-tabs/TabsRegistryContext";

interface OnDemandFeatureInstanceProps {
  data: FeastODFVType;
}

const OnDemandFeatureInstance = ({ data }: OnDemandFeatureInstanceProps) => {
  const navigate = useNavigate();
  let { featureGroupName } = useParams();

  const { customNavigationTabs } = useOnDemandFeatureGroupCustomTabs(navigate);
  const CustomTabRoutes = useOnDemandFeatureGroupCustomTabRoutes();

  return (
    <React.Fragment>
      <EuiPageHeader
        restrictWidth
        iconType={FeatureGroupIcon32}
        pageTitle={`${featureGroupName}`}
        tabs={[
          {
            label: "Overview",
            isSelected: useMatchExact(""),
            onClick: () => {
              navigate("");
            },
          },
          ...customNavigationTabs,
        ]}
      />
      <EuiPageContent
        hasBorder={false}
        hasShadow={false}
        paddingSize="none"
        color="transparent"
        borderRadius="none"
      >
        <EuiPageContentBody>
          <Routes>
            <Route
              path="/"
              element={<OnDemandFeatureGroupOverviewTab data={data} />}
            />
            {CustomTabRoutes}
          </Routes>
        </EuiPageContentBody>
      </EuiPageContent>
    </React.Fragment>
  );
};

export default OnDemandFeatureInstance;
