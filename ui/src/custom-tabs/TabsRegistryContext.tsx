import React, { useEffect, useState } from "react";

import {
  useResolvedPath,
  resolvePath,
  useLocation,
  NavigateFunction,
  Route,
} from "react-router-dom";

import RegularFeatureGroupCustomTabLoadingWrapper from "../utils/custom-tabs/RegularFeatureGroupCustomTabLoadingWrapper";
import OnDemandFeatureGroupCustomTabLoadingWrapper from "../utils/custom-tabs/OnDemandFeatureGroupCustomTabLoadingWrapper";
import ModelCustomTabLoadingWrapper from "../utils/custom-tabs/ModelCustomTabLoadingWrapper";
import FeatureCustomTabLoadingWrapper from "../utils/custom-tabs/FeatureCustomTabLoadingWrapper";
import DataSourceCustomTabLoadingWrapper from "../utils/custom-tabs/DataSourceCustomTabLoadingWrapper";
import EntityCustomTabLoadingWrapper from "../utils/custom-tabs/EntityCustomTabLoadingWrapper";
import DatasetCustomTabLoadingWrapper from "../utils/custom-tabs/DatasetCustomTabLoadingWrapper";

import {
  RegularFeatureGroupCustomTabRegistrationInterface,
  OnDemandFeatureGroupCustomTabRegistrationInterface,
  ModelCustomTabRegistrationInterface,
  FeatureCustomTabRegistrationInterface,
  DataSourceCustomTabRegistrationInterface,
  EntityCustomTabRegistrationInterface,
  DatasetCustomTabRegistrationInterface,
  CustomTabRegistrationInterface,
} from "./types";

interface FeastTabsRegistryInterface {
  RegularFeatureGroupCustomTabs?: RegularFeatureGroupCustomTabRegistrationInterface[];
  OnDemandFeatureGroupCustomTabs?: OnDemandFeatureGroupCustomTabRegistrationInterface[];
  ModelCustomTabs?: ModelCustomTabRegistrationInterface[];
  FeatureCustomTabs?: FeatureCustomTabRegistrationInterface[];
  DataSourceCustomTabs?: DataSourceCustomTabRegistrationInterface[];
  EntityCustomTabs?: EntityCustomTabRegistrationInterface[];
  DatasetCustomTabs?: DatasetCustomTabRegistrationInterface[];
}

interface NavigationTabInterface {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const TabsRegistryContext = React.createContext<FeastTabsRegistryInterface>({});

const useGenericCustomTabsNavigation = <
  T extends CustomTabRegistrationInterface
>(
  entries: T[],
  navigate: NavigateFunction
) => {
  // Check for Duplicates
  const arrayOfPaths = entries.map((tab) => tab.path);

  const duplicatedPaths = arrayOfPaths.filter(
    (item, index) => arrayOfPaths.indexOf(item) !== index
  );

  // Throw error if multiple custom tabs being registered to the same path
  if (duplicatedPaths.length) {
    throw new Error(
      `More than one tabs registered for path url: ${duplicatedPaths.join(
        ", "
      )}`
    );
  }

  const [customNavigationTabs, setTabs] = useState<NavigationTabInterface[]>(
    []
  );

  const featureGroupRoot = useResolvedPath(""); // Root of Feature Group Section
  const { pathname } = useLocation(); // Current Location

  useEffect(() => {
    setTabs(
      entries.map(({ label, path }) => {
        const resolvedTabPath = resolvePath(path, featureGroupRoot.pathname);

        return {
          label,
          // Can't use the match hooks here b/c we're in a loop due
          // to React hooks needing a predictable number of
          // hooks to be run. See: https://reactjs.org/docs/hooks-rules.html
          isSelected: pathname === resolvedTabPath.pathname,
          onClick: () => {
            navigate(path);
          },
        };
      })
    );
  }, [pathname, navigate, featureGroupRoot.pathname, entries]);

  return {
    customNavigationTabs,
  };
};

// Creating Routes
interface InnerComponent<T> {
  label: string;
  path: string;
  Component: (props: T) => JSX.Element;
}
type WrapperComponentType<T> = ({
  Component,
}: {
  Component: (props: T) => JSX.Element;
}) => JSX.Element;

const genericCustomTabRoutes = <T,>(
  tabs: InnerComponent<T>[],
  WrapperComponent: WrapperComponentType<T>
) => {
  return tabs.map(({ path, Component }) => {
    const WrappedComponent = () => {
      return <WrapperComponent Component={Component} />;
    };

    return (
      <Route key={path} path={`/${path}/*`} element={<WrappedComponent />} />
    );
  });
};

// Navigation Hooks for Each Custom Tab Type
const useRegularFeatureGroupCustomTabs = (navigate: NavigateFunction) => {
  const { RegularFeatureGroupCustomTabs } =
    React.useContext(TabsRegistryContext);

  return useGenericCustomTabsNavigation<RegularFeatureGroupCustomTabRegistrationInterface>(
    RegularFeatureGroupCustomTabs || [],
    navigate
  );
};

const useOnDemandFeatureGroupCustomTabs = (navigate: NavigateFunction) => {
  const { OnDemandFeatureGroupCustomTabs } =
    React.useContext(TabsRegistryContext);

  return useGenericCustomTabsNavigation<OnDemandFeatureGroupCustomTabRegistrationInterface>(
    OnDemandFeatureGroupCustomTabs || [],
    navigate
  );
};

const useModelCustomTabs = (navigate: NavigateFunction) => {
  const { ModelCustomTabs } = React.useContext(TabsRegistryContext);

  return useGenericCustomTabsNavigation<ModelCustomTabRegistrationInterface>(
    ModelCustomTabs || [],
    navigate
  );
};

const useFeatureCustomTabs = (navigate: NavigateFunction) => {
  const { FeatureCustomTabs } = React.useContext(TabsRegistryContext);

  return useGenericCustomTabsNavigation<FeatureCustomTabRegistrationInterface>(
    FeatureCustomTabs || [],
    navigate
  );
};

const useDataSourceCustomTabs = (navigate: NavigateFunction) => {
  const { DataSourceCustomTabs } = React.useContext(TabsRegistryContext);

  return useGenericCustomTabsNavigation<DataSourceCustomTabRegistrationInterface>(
    DataSourceCustomTabs || [],
    navigate
  );
};

const useEntityCustomTabs = (navigate: NavigateFunction) => {
  const { EntityCustomTabs } = React.useContext(TabsRegistryContext);

  return useGenericCustomTabsNavigation<EntityCustomTabRegistrationInterface>(
    EntityCustomTabs || [],
    navigate
  );
};

const useDatasetCustomTabs = (navigate: NavigateFunction) => {
  const { DatasetCustomTabs } = React.useContext(TabsRegistryContext);

  return useGenericCustomTabsNavigation<DatasetCustomTabRegistrationInterface>(
    DatasetCustomTabs || [],
    navigate
  );
};

// Routes for Each Custom Tab Type
const useRegularFeatureGroupCustomTabRoutes = () => {
  const { RegularFeatureGroupCustomTabs } =
    React.useContext(TabsRegistryContext);

  return genericCustomTabRoutes(
    RegularFeatureGroupCustomTabs || [],
    RegularFeatureGroupCustomTabLoadingWrapper
  );
};

const useOnDemandFeatureGroupCustomTabRoutes = () => {
  const { OnDemandFeatureGroupCustomTabs } =
    React.useContext(TabsRegistryContext);

  return genericCustomTabRoutes(
    OnDemandFeatureGroupCustomTabs || [],
    OnDemandFeatureGroupCustomTabLoadingWrapper
  );
};

const useModelCustomTabRoutes = () => {
  const { ModelCustomTabs } = React.useContext(TabsRegistryContext);

  return genericCustomTabRoutes(
    ModelCustomTabs || [],
    ModelCustomTabLoadingWrapper
  );
};

const useEntityCustomTabRoutes = () => {
  const { EntityCustomTabs } = React.useContext(TabsRegistryContext);

  return genericCustomTabRoutes(
    EntityCustomTabs || [],
    EntityCustomTabLoadingWrapper
  );
};

const useDataSourceCustomTabRoutes = () => {
  const { DataSourceCustomTabs } = React.useContext(TabsRegistryContext);

  return genericCustomTabRoutes(
    DataSourceCustomTabs || [],
    DataSourceCustomTabLoadingWrapper
  );
};

const useFeatureCustomTabRoutes = () => {
  const { FeatureCustomTabs } = React.useContext(TabsRegistryContext);

  return genericCustomTabRoutes(
    FeatureCustomTabs || [],
    FeatureCustomTabLoadingWrapper
  );
};

const useDatasetCustomTabRoutes = () => {
  const { DatasetCustomTabs } = React.useContext(TabsRegistryContext);

  return genericCustomTabRoutes(
    DatasetCustomTabs || [],
    DatasetCustomTabLoadingWrapper
  );
};

export default TabsRegistryContext;
export {
  // Navigation
  useRegularFeatureGroupCustomTabs,
  useOnDemandFeatureGroupCustomTabs,
  useModelCustomTabs,
  useFeatureCustomTabs,
  useDataSourceCustomTabs,
  useEntityCustomTabs,
  useDatasetCustomTabs,
  // Routes
  useRegularFeatureGroupCustomTabRoutes,
  useOnDemandFeatureGroupCustomTabRoutes,
  useModelCustomTabRoutes,
  useFeatureCustomTabRoutes,
  useDataSourceCustomTabRoutes,
  useEntityCustomTabRoutes,
  useDatasetCustomTabRoutes,
};

export type { FeastTabsRegistryInterface };
