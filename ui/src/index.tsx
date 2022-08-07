import React from "react";
import ReactDOM from "react-dom";
import { QueryClient } from "react-query";
import FeastUI from "./FeastUI";

// How to add a Custom Tab
// 1. Pick which object type you want your tab
//    to be in. e.g. Feature View, Model, etc.
//
// 2. Write a regular React Component for Tab Content.
//    It will be passed props with data about the Feast FCO
//    e.g. RegularFeatureViewCustomTabProps, ModelCustomTabProps
//    See: types.ts in this folder
//
// 3. Register the tab in the appropriate array below. Each entry
//    is a record with three keys: label, path, and Component.
//    Import your component and pass it as Component
import DataTab from "./custom-tabs/data-tab/DataTab";
import RFVDemoCustomTab from "./custom-tabs/reguar-fv-demo-tab/DemoCustomTab";
import ODFVDemoCustomTab from "./custom-tabs/ondemand-fv-demo-tab/DemoCustomTab";
import FSDemoCustomTab from "./custom-tabs/model-demo-tab/DemoCustomTab";
import DSDemoCustomTab from "./custom-tabs/data-source-demo-tab/DemoCustomTab";
import EntDemoCustomTab from "./custom-tabs/entity-demo-tab/DemoCustomTab";
import DatasetDemoCustomTab from "./custom-tabs/dataset-demo-tab/DemoCustomTab";
import FDemoCustomTab from "./custom-tabs/feature-demo-tab/DemoCustomTab";

const queryClient = new QueryClient();

const tabsRegistry = {
  RegularFeatureViewCustomTabs: [
    {
      label: "Data Tab", // Navigation Label for the tab
      path: "data-tab", // Subpath for the tab
      Component: DataTab,
    },
  ],
  OnDemandFeatureViewCustomTabs: [
    {
      label: "Custom Tab Demo",
      path: "demo-tab",
      Component: ODFVDemoCustomTab,
    },
  ],
  ModelCustomTabs: [
    {
      label: "Custom Tab Demo",
      path: "fs-demo-tab",
      Component: FSDemoCustomTab,
    },
  ],
  DataSourceCustomTabs: [
    {
      label: "Custom Tab Demo",
      path: "fs-demo-tab",
      Component: DSDemoCustomTab,
    },
  ],
  EntityCustomTabs: [
    {
      label: "Data Tab", // Navigation Label for the tab
      path: "data-tab", // Subpath for the tab
      Component: DataTab,
    },
  ],
  DatasetCustomTabs: [
    {
      label: "Custom Tab Demo",
      path: "demo-tab",
      Component: DatasetDemoCustomTab,
    },
  ],
  FeatureCustomTabs: [
    {
      label: "Data Tab", // Navigation Label for the tab
      path: "data-tab", // Subpath for the tab
      Component: DataTab,
    },
  ],
};

ReactDOM.render(
  <React.StrictMode>
    <FeastUI
      reactQueryClient={queryClient}
      feastUIConfigs={{
        tabsRegistry: tabsRegistry,
      }}
    />
  </React.StrictMode>,
  document.getElementById("root")
);
