import React from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import {
  EuiPageHeader,
  EuiPageContent,
  EuiPageContentBody,
} from "@elastic/eui";

import { ModelIcon32 } from "../../graphics/ModelIcon";
import { useMatchExact } from "../../hooks/useMatchSubpath";
import ModelOverviewTab from "./ModelOverviewTab";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

import {
  useModelCustomTabs,
  useModelCustomTabRoutes,
} from "../../custom-tabs/TabsRegistryContext";

const ModelInstance = () => {
  const navigate = useNavigate();
  let { modelName } = useParams();

  useDocumentTitle(`${modelName} | Model`);

  const { customNavigationTabs } = useModelCustomTabs(navigate);
  const CustomTabRoutes = useModelCustomTabRoutes();

  return (
    <React.Fragment>
      <EuiPageHeader
        restrictWidth
        iconType={ModelIcon32}
        pageTitle={`Model: ${modelName}`}
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
            <Route path="/" element={<ModelOverviewTab />} />
            {CustomTabRoutes}
          </Routes>
        </EuiPageContentBody>
      </EuiPageContent>
    </React.Fragment>
  );
};

export default ModelInstance;
