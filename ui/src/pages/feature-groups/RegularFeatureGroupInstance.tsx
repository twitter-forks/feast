import React, { useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  EuiPageHeader,
  EuiPageContent,
  EuiPageContentBody,
} from "@elastic/eui";

import { FeatureGroupIcon32 } from "../../graphics/FeatureGroupIcon";

import { useMatchExact, useMatchSubpath } from "../../hooks/useMatchSubpath";
import { FeastFeatureGroupType } from "../../parsers/feastFeatureGroups";
import RegularFeatureGroupOverviewTab from "./RegularFeatureGroupOverviewTab";
import FeatureGroupSummaryStatisticsTab from "./FeatureGroupSummaryStatisticsTab";

import {
  useRegularFeatureGroupCustomTabs,
  useRegularFeatureGroupCustomTabRoutes,
} from "../../custom-tabs/TabsRegistryContext";
import FeatureFlagsContext from "../../contexts/FeatureFlagsContext";

interface RegularFeatureInstanceProps {
  data: FeastFeatureGroupType;
}

const RegularFeatureInstance = ({ data }: RegularFeatureInstanceProps) => {
  const { enabledFeatureStatistics } = useContext(FeatureFlagsContext);
  const navigate = useNavigate();

  const { customNavigationTabs } = useRegularFeatureGroupCustomTabs(navigate);
  let tabs = [
    {
      label: "Overview",
      isSelected: useMatchExact(""),
      onClick: () => {
        navigate("");
      },
    },
  ];

  let statisticsIsSelected = useMatchSubpath("statistics");
  if (enabledFeatureStatistics) {
    tabs.push({
      label: "Statistics",
      isSelected: statisticsIsSelected,
      onClick: () => {
        navigate("statistics");
      },
    });
  }

  tabs.push(...customNavigationTabs);

  const TabRoutes = useRegularFeatureGroupCustomTabRoutes();

  return (
    <React.Fragment>
      <EuiPageHeader
        restrictWidth
        iconType={FeatureGroupIcon32}
        pageTitle={`${data.spec.name}`}
        tabs={tabs}
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
              element={<RegularFeatureGroupOverviewTab data={data} />}
            />
            <Route
              path="/statistics"
              element={<FeatureGroupSummaryStatisticsTab />}
            />
            {TabRoutes}
          </Routes>
        </EuiPageContentBody>
      </EuiPageContent>
    </React.Fragment>
  );
};

export default RegularFeatureInstance;
