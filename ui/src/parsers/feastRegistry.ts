import { z } from "zod";
import { FeastDatasourceSchema } from "./feastDatasources";
import { FeastEntitySchema } from "./feastEntities";
import { FeastModelSchema } from "./feastModels";
import { FeastFeatureViewSchema } from "./feastFeatureViews";
import { FeastSavedDatasetSchema } from "./feastSavedDataset";
import { FeastODFVSchema } from "./feastODFVS";

const FeastRegistrySchema = z.object({
  project: z.string(),
  dataSources: z.array(FeastDatasourceSchema).optional(),
  entities: z.array(FeastEntitySchema).optional(),
  featureViews: z.array(FeastFeatureViewSchema).optional(),
  onDemandFeatureViews: z.array(FeastODFVSchema).optional(),
  models: z.array(FeastModelSchema).optional(),
  savedDatasets: z.array(FeastSavedDatasetSchema).optional(),
});

type FeastRegistryType = z.infer<typeof FeastRegistrySchema>;

export { FeastRegistrySchema };
export type { FeastRegistryType };
