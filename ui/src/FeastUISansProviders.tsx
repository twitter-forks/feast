import React from "react";

import "@elastic/eui/dist/eui_theme_light.css";
import "./index.css";

import { Routes, Route } from "react-router-dom";
import { EuiProvider, EuiErrorBoundary } from "@elastic/eui";

import ProjectOverviewPage from "./pages/ProjectOverviewPage";
import Layout from "./pages/Layout";
import NoMatch from "./pages/NoMatch";
import DatasourceIndex from "./pages/data-sources/Index";
import DatasetIndex from "./pages/saved-data-sets/Index";
import EntityIndex from "./pages/entities/Index";
import EntityInstance from "./pages/entities/EntityInstance";
import FeatureInstance from "./pages/features/FeatureInstance";
import ModelIndex from "./pages/models/Index";
import FeatureGroupIndex from "./pages/feature-groups/Index";
import FeatureGroupInstance from "./pages/feature-groups/FeatureGroupInstance";
import ModelInstance from "./pages/models/ModelInstance";
import DataSourceInstance from "./pages/data-sources/DataSourceInstance";
import RootProjectSelectionPage from "./pages/RootProjectSelectionPage";
import DatasetInstance from "./pages/saved-data-sets/DatasetInstance";
import NoProjectGuard from "./components/NoProjectGuard";

import FeatureGroupAddition from "./pages/feature-groups/Addition";
import FeatureAddition from "./pages/features/Addition";
import EntityAddition from "./pages/entities/Addition";
import ModelAddition from "./pages/models/Addition";


import TabsRegistryContext, {
  FeastTabsRegistryInterface,
} from "./custom-tabs/TabsRegistryContext";
import FeatureFlagsContext, {
  FeatureFlags,
} from "./contexts/FeatureFlagsContext";
import {
  ProjectListContext,
  ProjectsListContextInterface,
} from "./contexts/ProjectListContext";

interface FeastUIConfigs {
  tabsRegistry: FeastTabsRegistryInterface;
  featureFlags?: FeatureFlags;
  projectListPromise?: Promise<any>;
}

const defaultProjectListPromise = () => {
  return fetch("/projects-list.json", {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return res.json();
  });
};

const FeastUISansProviders = ({
  feastUIConfigs,
}: {
  feastUIConfigs?: FeastUIConfigs;
}) => {
  const projectListContext: ProjectsListContextInterface =
    feastUIConfigs?.projectListPromise
      ? {
          projectsListPromise: feastUIConfigs?.projectListPromise,
          isCustom: true,
        }
      : { projectsListPromise: defaultProjectListPromise(), isCustom: false };

  return (
    <EuiProvider colorMode="light">
      <EuiErrorBoundary>
        <TabsRegistryContext.Provider
          value={feastUIConfigs?.tabsRegistry || {}}
        >
          <FeatureFlagsContext.Provider
            value={feastUIConfigs?.featureFlags || {}}
          >
            <ProjectListContext.Provider value={projectListContext}>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<RootProjectSelectionPage />} />
                  <Route path="/p/:projectName/*" element={<NoProjectGuard />}>
                    <Route index element={<ProjectOverviewPage />} />
                    <Route path="data-source/" element={<DatasourceIndex />} />
                    <Route
                      path="data-source/:dataSourceName/*"
                      element={<DataSourceInstance />}
                    />
                    <Route
                      path="feature-group/"
                      element={<FeatureGroupIndex />}
                    />
                    <Route
                      path="feature-group-addition/"
                      element={<FeatureGroupAddition />}
                    />
                    <Route path="feature-group/:featureGroupName/*" element={<FeatureGroupInstance />}>
                    </Route>
                    <Route
                        path="feature-group/:FeatureGroupName/feature/:FeatureName/*"
                        element={<FeatureInstance />}
                      />
                    <Route
                      path="feature-addition/"
                      element={<FeatureAddition />}
                    />
                    <Route
                      path="model/"
                      element={<ModelIndex />}
                    />
                    <Route
                      path="model/:modelName/*"
                      element={<ModelInstance />}
                    />
                    <Route
                      path="model-addition/"
                      element={<ModelAddition />}
                    />
                    <Route path="entity/" element={<EntityIndex />} />
                    <Route
                      path="entity/:entityName/*"
                      element={<EntityInstance />}
                    />
                    <Route
                      path="entity-addition/"
                      element={<EntityAddition />}
                    />
                    <Route path="data-set/" element={<DatasetIndex />} />
                    <Route
                      path="data-set/:datasetName/*"
                      element={<DatasetInstance />}
                    />
                  </Route>
                </Route>
                <Route path="*" element={<NoMatch />} />
              </Routes>
            </ProjectListContext.Provider>
          </FeatureFlagsContext.Provider>
        </TabsRegistryContext.Provider>
      </EuiErrorBoundary>
    </EuiProvider>
  );
};

export default FeastUISansProviders;
export type { FeastUIConfigs };

