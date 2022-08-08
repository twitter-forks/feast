import React, { useContext } from "react";

import {
  EuiPageHeader,
  EuiPageContent,
  EuiPageContentBody,
  EuiLoadingSpinner,
  EuiSpacer,
  EuiTitle,
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
} from "@elastic/eui";

import { FeatureGroupIcon32 } from "../../graphics/FeatureGroupIcon";

import useLoadRegistry from "../../queries/useLoadRegistry";
import FeatureGroupListingTable from "./FeatureGroupListingTable";
import {
  filterInputInterface,
  useSearchQuery,
  useTagsWithSuggestions,
} from "../../hooks/useSearchInputWithTags";
import { genericFVType, regularFVInterface } from "../../parsers/mergedFVTypes";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import RegistryPathContext from "../../contexts/RegistryPathContext";
import FeatureGroupIndexEmptyState from "./FeatureGroupIndexEmptyState";
import { useFeatureGroupTagsAggregation } from "../../hooks/useTagsAggregation";
import TagSearch from "../../components/TagSearch";

const useLoadFeatureGroups = () => {
  const registryUrl = useContext(RegistryPathContext);
  const registryQuery = useLoadRegistry(registryUrl);

  const data =
    registryQuery.data === undefined
      ? undefined
      : registryQuery.data.mergedFVList;

  return {
    ...registryQuery,
    data,
  };
};

const shouldIncludeFVsGivenTokenGroups = (
  entry: regularFVInterface,
  tagTokenGroups: Record<string, string[]>
) => {
  return Object.entries(tagTokenGroups).every(([key, values]) => {
    const entryTagValue = entry.object.spec.tags
      ? entry.object.spec.tags[key]
      : undefined;

    if (entryTagValue) {
      return values.every((value) => {
        return value.length > 0 ? entryTagValue.indexOf(value) >= 0 : true; // Don't filter if the string is empty
      });
    } else {
      return false;
    }
  });
};

const filterFn = (data: genericFVType[], filterInput: filterInputInterface) => {
  let filteredByTags = data;

  if (Object.keys(filterInput.tagTokenGroups).length) {
    filteredByTags = data.filter((entry) => {
      if (entry.type === "regular") {
        return shouldIncludeFVsGivenTokenGroups(
          entry,
          filterInput.tagTokenGroups
        );
      } else {
        return false; // ODFVs don't have tags yet
      }
    });
  }

  if (filterInput.searchTokens.length) {
    return filteredByTags.filter((entry) => {
      return filterInput.searchTokens.find((token) => {
        return token.length >= 3 && entry.name.indexOf(token) >= 0;
      });
    });
  }

  return filteredByTags;
};

const Index = () => {
  const { isLoading, isSuccess, isError, data } = useLoadFeatureGroups();
  const tagAggregationQuery = useFeatureGroupTagsAggregation();

  useDocumentTitle(`Feature Groups | Feast`);

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
        iconType={FeatureGroupIcon32}
        pageTitle="Feature Groups"
      />
      <EuiPageContent
        hasBorder={false}
        hasShadow={false}
        paddingSize="none"
        color="transparent"
        borderRadius="none"
      >
        <EuiPageContentBody>
          {isLoading && (
            <p>
              <EuiLoadingSpinner size="m" /> Loading
            </p>
          )}
          {isError && <p>We encountered an error while loading.</p>}
          {isSuccess && data?.length === 0 && <FeatureGroupIndexEmptyState />}
          {isSuccess && data && data.length > 0 && filterResult && (
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
                <EuiFlexItem grow={1}>
                <EuiTitle size="xs">
                    <h2>&nbsp;</h2>
                  </EuiTitle>
                  <EuiButton href="feature-group-addition">
                    Add New Feature Group
                  </EuiButton>
                </EuiFlexItem>
                <EuiFlexItem grow={1}>
                <EuiTitle size="xs">
                    <h2>&nbsp;</h2>
                  </EuiTitle>
                  <EuiButton href="feature-addition">
                    Add New Feature
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiSpacer size="m" />
              <FeatureGroupListingTable
                tagKeysSet={tagKeysSet}
                featureGroups={filterResult}
              />
            </React.Fragment>
          )}
        </EuiPageContentBody>
      </EuiPageContent>
    </React.Fragment>
  );
};

export default Index;
