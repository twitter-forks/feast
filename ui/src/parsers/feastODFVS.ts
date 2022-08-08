import { z } from "zod";
import { FeastFeatureColumnSchema } from "./feastFeatureGroups";
import { FEAST_FEATURE_VALUE_TYPES } from "./types";

const FeatureGroupProjectionSchema = z.object({
  featureGroupProjection: z.object({
    featureGroupName: z.string(),
    featureColumns: z.array(FeastFeatureColumnSchema),
  }),
});

const RequestDataSourceSchema = z.object({
  requestDataSource: z.object({
    type: z.string(),
    name: z.string(),
    requestDataOptions: z.object({
      schema: z.record(z.nativeEnum(FEAST_FEATURE_VALUE_TYPES)),
    }),
  }),
});

const ODFVInputsSchema = z.union([
  FeatureGroupProjectionSchema,
  RequestDataSourceSchema,
]);

const FeastODFVSchema = z.object({
  spec: z.object({
    name: z.string(),
    features: z.array(FeastFeatureColumnSchema),
    sources: z.record(ODFVInputsSchema),
    userDefinedFunction: z.object({
      name: z.string(),
      body: z.string(),
    }),
  }),
  meta: z.object({
    createdTimestamp: z.string().transform((val) => new Date(val)),
    lastUpdatedTimestamp: z.string().transform((val) => new Date(val)),
  }),
});

type FeastODFVType = z.infer<typeof FeastODFVSchema>;
type RequestDataSourceType = z.infer<typeof RequestDataSourceSchema>;
type FeatureGroupProjectionType = z.infer<typeof FeatureGroupProjectionSchema>;

export { FeastODFVSchema };
export type { FeastODFVType, RequestDataSourceType, FeatureGroupProjectionType };
