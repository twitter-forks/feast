import React, { useContext } from "react";

import {
  EuiPageHeader,
  EuiPageContent,
  EuiPageContentBody,
  EuiLoadingSpinner,
  EuiTitle,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFieldSearch,
  EuiButton,
} from "@elastic/eui";

import { ModelIcon32 } from "../../graphics/ModelIcon";

import useLoadRegistry from "../../queries/useLoadRegistry";
import ModelListingTable from "./ModelListingTable";
import {
  useSearchQuery,
  useTagsWithSuggestions,
  filterInputInterface,
  tagTokenGroupsType,
} from "../../hooks/useSearchInputWithTags";
import { FeastModelType } from "../../parsers/feastModels";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import RegistryPathContext from "../../contexts/RegistryPathContext";
import ModelIndexEmptyState from "./ModelIndexEmptyState";
import TagSearch from "../../components/TagSearch";
import { useModelTagsAggregation } from "../../hooks/useTagsAggregation";

const useLoadModels = () => {
  const registryUrl = useContext(RegistryPathContext);
  const registryQuery = useLoadRegistry(registryUrl);

  const data =
    registryQuery.data === undefined
      ? undefined
      : registryQuery.data.objects.models;

  return {
    ...registryQuery,
    data,
  };
};

const shouldIncludeFSsGivenTokenGroups = (
  entry: FeastModelType,
  tagTokenGroups: tagTokenGroupsType
) => {
  return Object.entries(tagTokenGroups).every(([key, values]) => {
    const entryTagValue = entry.spec.tags ? entry.spec.tags[key] : undefined;

    if (entryTagValue) {
      return values.every((value) => {
        return value.length > 0 ? entryTagValue.indexOf(value) >= 0 : true; // Don't filter if the string is empty
      });
    } else {
      return false;
    }
  });
};

const filterFn = (
  data: FeastModelType[],
  filterInput: filterInputInterface
) => {
  let filteredByTags = data;

  if (Object.keys(filterInput.tagTokenGroups).length) {
    filteredByTags = data.filter((entry) => {
      return shouldIncludeFSsGivenTokenGroups(
        entry,
        filterInput.tagTokenGroups
      );
    });
  }

  if (filterInput.searchTokens.length) {
    return filteredByTags.filter((entry) => {
      return filterInput.searchTokens.find((token) => {
        return token.length >= 3 && entry.spec.name.indexOf(token) >= 0;
      });
    });
  }

  return filteredByTags;
};

const Index = () => {
  const { isLoading, isSuccess, isError, data } = useLoadModels();
  const tagAggregationQuery = useModelTagsAggregation();

  useDocumentTitle(`Models | Feast`);

  const { searchString, searchTokens, setSearchString } = useSearchQuery();

  const {
    currentTag,
    tagsString,
    tagTokenGroups,
    tagKeysSet,
    tagSuggestions,
    suggestionMode,
    setTagsString,
    acceptSuggestion,
    setCursorPosition,
  } = useTagsWithSuggestions(tagAggregationQuery.data);

  const filterResult = data
    ? filterFn(data, { tagTokenGroups, searchTokens })
    : data;

  return (
    <React.Fragment>
      <EuiPageHeader
        restrictWidth
        iconType={ModelIcon32}
        pageTitle="Models"
      />
      <EuiPageContent
        hasBorder={false}
        hasShadow={false}
        paddingSize="none"
        color="transparent"
        borderRadius="none"
      >
        <EuiPageContentBody>
        <EuiFlexItem grow={1}>
          <EuiButton href="model-addition">
            Add New Entity
          </EuiButton>
        </EuiFlexItem>
          {isLoading && (
            <p>
              <EuiLoadingSpinner size="m" /> Loading
            </p>
          )}
          {isError && <p>We encountered an error while loading.</p>}
          {isSuccess && !data && <ModelIndexEmptyState />}
          {isSuccess && filterResult && (
            <React.Fragment>
              <EuiFlexGroup>
                <EuiFlexItem grow={2}>
                  <EuiTitle size="xs">
                    <h2>Search</h2>
                  </EuiTitle>
                  <EuiFieldSearch
                    value={searchString}
                    fullWidth={true}
                    onChange={(e) => {
                      setSearchString(e.target.value);
                    }}
                  />
                </EuiFlexItem>
                <EuiFlexItem grow={3}>
                  <TagSearch
                    currentTag={currentTag}
                    tagsString={tagsString}
                    setTagsString={setTagsString}
                    acceptSuggestion={acceptSuggestion}
                    tagSuggestions={tagSuggestions}
                    suggestionMode={suggestionMode}
                    setCursorPosition={setCursorPosition}
                  />
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiSpacer size="m" />
              <ModelListingTable
                models={filterResult}
                tagKeysSet={tagKeysSet}
              />
            </React.Fragment>
          )}
        </EuiPageContentBody>
      </EuiPageContent>
    </React.Fragment>
  );
};

export default Index;
