import { z } from "zod";

const histogramSchema = z.array(
  z.object({
    x0: z.number(),
    x1: z.number(),
    count: z.number(),
  })
);

const numericColumnSummaryStaticsSchema = z.object({
  name: z.string(),
  valueType: z.literal("INT64"),
  sampleValues: z.array(z.number()),
  histogram: histogramSchema.optional(),
  proportionOfZeros: z.number().optional(),
  proportionMissing: z.number().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
});

const stringColumnSummaryStaticsSchema = z.object({
  name: z.string(),
  valueType: z.literal("STRING"),
  sampleValues: z.array(z.string()),
});

const columnsSummaryStatisticsSchema = z.union([
  numericColumnSummaryStaticsSchema,
  stringColumnSummaryStaticsSchema,
]);

const featureGroupSummaryStatisticsSchema = z.object({
  columnsSummaryStatistics: z.record(columnsSummaryStatisticsSchema),
});

type FeatureGroupSummaryStatisticsType = z.infer<
  typeof featureGroupSummaryStatisticsSchema
>;

type NumericColumnSummaryStatisticType = z.infer<
  typeof numericColumnSummaryStaticsSchema
>;
type StringColumnSummaryStatisticType = z.infer<
  typeof stringColumnSummaryStaticsSchema
>;

type HistogramDataType = z.infer<typeof histogramSchema>;

export { featureGroupSummaryStatisticsSchema };
export type {
  FeatureGroupSummaryStatisticsType,
  HistogramDataType,
  NumericColumnSummaryStatisticType,
  StringColumnSummaryStatisticType,
};
