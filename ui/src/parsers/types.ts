enum FEAST_FCO_TYPES {
  dataSource = "dataSource",
  entity = "entity",
  featureView = "featureView",
  model = "model",
}

enum FEAST_FEATURE_VALUE_TYPES {
  FLOAT = "FLOAT",
  INT64 = "INT64",
  STRING = "STRING",
  BOOL = "BOOL",
  BYTES = "BYTES",
  INT32 = "INT32",
  DOUBLE = "DOUBLE",
  UNIX_TIMESTAMP = "UNIX_TIMESTAMP",
  INVALID = "INVALID",
  BYTES_LIST = "BYTES_LIST",
  STRING_LIST = "STRING_LIST",
  INT32_LIST = "INT32_LIST",
  INT64_LIST = "INT64_LIST",
  DOUBLE_LIST = "DOUBLE_LIST",
  FLOAT_LIST = "FLOAT_LIST",
  BOOL_LIST = "BOOL_LIST",
  UNIX_TIMESTAMP_LIST = "UNIX_TIMESTAMP_LIST",
  NULL = "NULL"
}

export { FEAST_FCO_TYPES, FEAST_FEATURE_VALUE_TYPES };
