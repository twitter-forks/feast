import {
  useLoadOnDemandFeatureGroup,
  useLoadRegularFeatureGroup,
} from "../pages/feature-groups/useLoadFeatureGroup";
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

// Type for Regular Feature Group Custom Tabs
type RegularFeatureGroupQueryReturnType = ReturnType<
  typeof useLoadRegularFeatureGroup
>;
interface RegularFeatureGroupCustomTabProps {
  id: string | undefined;
  feastObjectQuery: RegularFeatureGroupQueryReturnType;
}
interface RegularFeatureGroupCustomTabRegistrationInterface
  extends CustomTabRegistrationInterface {
  Component: ({
    id,
    feastObjectQuery,
    ...args
  }: RegularFeatureGroupCustomTabProps) => JSX.Element;
}

// Type for OnDemand Feature Group Custom Tabs
type OnDemandFeatureGroupQueryReturnType = ReturnType<
  typeof useLoadOnDemandFeatureGroup
>;
interface OnDemandFeatureGroupCustomTabProps {
  id: string | undefined;
  feastObjectQuery: OnDemandFeatureGroupQueryReturnType;
}
interface OnDemandFeatureGroupCustomTabRegistrationInterface
  extends CustomTabRegistrationInterface {
  Component: ({
    id,
    feastObjectQuery,
    ...args
  }: OnDemandFeatureGroupCustomTabProps) => JSX.Element;
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
  RegularFeatureGroupQueryReturnType,
  RegularFeatureGroupCustomTabRegistrationInterface,
  RegularFeatureGroupCustomTabProps,
  OnDemandFeatureGroupQueryReturnType,
  OnDemandFeatureGroupCustomTabProps,
  OnDemandFeatureGroupCustomTabRegistrationInterface,
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
