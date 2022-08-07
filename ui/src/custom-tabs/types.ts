import {
  useLoadOnDemandFeatureView,
  useLoadRegularFeatureView,
} from "../pages/feature-views/useLoadFeatureView";
import useLoadFeature from "../pages/features/useLoadFeature";
import useLoadModel from "../pages/models/useLoadModel";
import useLoadDataSource from "../pages/data-sources/useLoadDataSource";
import useLoadEntity from "../pages/entities/useLoadEntity";
import useLoadDataset from "../pages/saved-data-sets/useLoadDataset";

interface CustomTabRegistrationInterface {
  label: string;
  path: string;
  Component: (...args: any[]) => JSX.Element;
}

// Type for Regular Feature View Custom Tabs
type RegularFeatureViewQueryReturnType = ReturnType<
  typeof useLoadRegularFeatureView
>;
interface RegularFeatureViewCustomTabProps {
  id: string | undefined;
  feastObjectQuery: RegularFeatureViewQueryReturnType;
}
interface RegularFeatureViewCustomTabRegistrationInterface
  extends CustomTabRegistrationInterface {
  Component: ({
    id,
    feastObjectQuery,
    ...args
  }: RegularFeatureViewCustomTabProps) => JSX.Element;
}

// Type for OnDemand Feature View Custom Tabs
type OnDemandFeatureViewQueryReturnType = ReturnType<
  typeof useLoadOnDemandFeatureView
>;
interface OnDemandFeatureViewCustomTabProps {
  id: string | undefined;
  feastObjectQuery: OnDemandFeatureViewQueryReturnType;
}
interface OnDemandFeatureViewCustomTabRegistrationInterface
  extends CustomTabRegistrationInterface {
  Component: ({
    id,
    feastObjectQuery,
    ...args
  }: OnDemandFeatureViewCustomTabProps) => JSX.Element;
}

// Type for Entity Custom Tabs
interface EntityCustomTabProps {
  id: string | undefined;
  feastObjectQuery: ReturnType<typeof useLoadEntity>;
}
interface EntityCustomTabRegistrationInterface
  extends CustomTabRegistrationInterface {
  Component: ({
    id,
    feastObjectQuery,
    ...args
  }: EntityCustomTabProps) => JSX.Element;
}

// Type for Feature Custom Tabs
interface FeatureCustomTabProps {
  id: string | undefined;
  feastObjectQuery: ReturnType<typeof useLoadFeature>;
}
interface FeatureCustomTabRegistrationInterface
  extends CustomTabRegistrationInterface {
  Component: ({
    id,
    feastObjectQuery,
    ...args
  }: FeatureCustomTabProps) => JSX.Element;
}


// Type for Model Custom Tabs
interface ModelCustomTabProps {
  id: string | undefined;
  feastObjectQuery: ReturnType<typeof useLoadModel>;
}
interface ModelCustomTabRegistrationInterface
  extends CustomTabRegistrationInterface {
  Component: ({
    id,
    feastObjectQuery,
    ...args
  }: ModelCustomTabProps) => JSX.Element;
}

// Type for Data Source Custom Tabs
interface DataSourceCustomTabProps {
  id: string | undefined;
  feastObjectQuery: ReturnType<typeof useLoadDataSource>;
}
interface DataSourceCustomTabRegistrationInterface
  extends CustomTabRegistrationInterface {
  Component: ({
    id,
    feastObjectQuery,
    ...args
  }: DataSourceCustomTabProps) => JSX.Element;
}

// Type for Data Source Custom Tabs
interface DatasetCustomTabProps {
  id: string | undefined;
  feastObjectQuery: ReturnType<typeof useLoadDataset>;
}
interface DatasetCustomTabRegistrationInterface
  extends CustomTabRegistrationInterface {
  Component: ({
    id,
    feastObjectQuery,
    ...args
  }: DatasetCustomTabProps) => JSX.Element;
}

export type {
  CustomTabRegistrationInterface,
  RegularFeatureViewQueryReturnType,
  RegularFeatureViewCustomTabRegistrationInterface,
  RegularFeatureViewCustomTabProps,
  OnDemandFeatureViewQueryReturnType,
  OnDemandFeatureViewCustomTabProps,
  OnDemandFeatureViewCustomTabRegistrationInterface,
  ModelCustomTabRegistrationInterface,
  ModelCustomTabProps,
  DataSourceCustomTabRegistrationInterface,
  DataSourceCustomTabProps,
  EntityCustomTabRegistrationInterface,
  EntityCustomTabProps,
  FeatureCustomTabRegistrationInterface,
  FeatureCustomTabProps,
  DatasetCustomTabRegistrationInterface,
  DatasetCustomTabProps,
};
