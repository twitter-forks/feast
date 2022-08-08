import React from "react";
import ReactDOM from "react-dom";
import { QueryClient } from "react-query";
import FeastUI from "./FeastUI";

// How to add a Custom Tab
// 1. Pick which object type you want your tab
//    to be in. e.g. Feature Group, Model, etc.
//
// 2. Write a regular React Component for Tab Content.
//    It will be passed props with data about the Feast FCO
//    e.g. RegularFeatureGroupCustomTabProps, ModelCustomTabProps
//    See: types.ts in this folder
//
// 3. Register the tab in the appropriate array below. Each entry
//    is a record with three keys: label, path, and Component.
//    Import your component and pass it as Component
import DataFormTab from "./custom-tabs/data-form-tab/DataFormTab";
import RFVDemoCustomTab from "./custom-tabs/reguar-fv-demo-tab/DemoCustomTab";
import ODFVDemoCustomTab from "./custom-tabs/ondemand-fv-demo-tab/DemoCustomTab";
import FSDemoCustomTab from "./custom-tabs/model-demo-tab/DemoCustomTab";
import EntDemoCustomTab from "./custom-tabs/entity-demo-tab/DemoCustomTab";
import FDemoCustomTab from "./custom-tabs/feature-demo-tab/DemoCustomTab";

const queryClient = new QueryClient();

const tabsRegistry = {
  RegularFeatureGroupCustomTabs: [
    {
      label: "Edit/Add Info",
      path: "metadata-update",
      Component: DataFormTab,
    }
  ],
  OnDemandFeatureGroupCustomTabs: [
    {
      label: "Custom Tab Demo",
      path: "demo-tab",
      Component: ODFVDemoCustomTab,
    },
  ],
  ModelCustomTabs: [
    {
      label: "Edit/Add Info",
      path: "metadata-update",
      Component: DataFormTab,
    }
  ],
  EntityCustomTabs: [
    {
      label: "Edit/Add Info",
      path: "metadata-update",
      Component: DataFormTab,
    }
  ],
  FeatureCustomTabs: [
    {
      label: "Edit/Add Info",
      path: "metadata-update",
      Component: DataFormTab,
    }
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
