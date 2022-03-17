import React, { useContext } from "react";

import {
  EuiPageContent,
  EuiPageContentBody,
  EuiText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTitle,
  EuiSpacer,
  EuiLoadingContent,
  EuiEmptyPrompt,
} from "@elastic/eui";

import { useDocumentTitle } from "../hooks/useDocumentTitle";
import ObjectsCountStats from "../components/ObjectsCountStats";
import ExplorePanel from "../components/ExplorePanel";
import useLoadRegistry from "../queries/useLoadRegistry";
import RegistryPathContext from "../contexts/RegistryPathContext";

const ProjectOverviewPage = () => {
  useDocumentTitle("Feast Home");
  const registryUrl = useContext(RegistryPathContext);
  const { isLoading, isSuccess, isError, data } = useLoadRegistry(registryUrl);

  return (
    <EuiPageContent
      hasBorder={false}
      hasShadow={false}
      paddingSize="none"
      color="transparent"
      borderRadius="none"
    >
      <EuiPageContentBody>
        <EuiTitle size="l">
          <h1>
            {isLoading && <EuiLoadingContent lines={1} />}
            {isSuccess && data?.project && `Project: ${data.project}`}
          </h1>
        </EuiTitle>
        <EuiSpacer />

        <EuiFlexGroup>
          <EuiFlexItem grow={2}>
            {isLoading && <EuiLoadingContent lines={4} />}
            {isError && (
              <EuiEmptyPrompt
                iconType="alert"
                color="danger"
                title={<h2>Error Loading Project Configs</h2>}
                body={
                  <p>
                    There was an error loading the Project Configurations.
                    Please check that <code>feature_store.json</code> file is
                    available and well-formed.
                  </p>
                }
              />
            )}
            {isSuccess &&
              (data?.description ? (
                <EuiText>
                  <pre>{data.description}</pre>
                </EuiText>
              ) : (
                <EuiText>
                  <p>
                    Welcome to the Twitter Feature Store production metadata store! If you
                    are new to Feature Store we suggest checking out our{' '}
                    <a href="http://go/fs2">DocBird page</a>.
                  </p>
                  <p>
                    If you are new to this project, we suggest
                    starting by exploring the Feature Services, as they
                    represent the collection of Feature Views serving a
                    particular model.
                  </p>
                  <p>
                    <strong>Questions?</strong>: Please reach out to the{' '}
                    <a href="https://twitter.slack.com/archives/C022QGCQCKV">#ml-platform-support</a> channel.
                  </p>
                </EuiText>
              ))}
            <ObjectsCountStats />
          </EuiFlexItem>
          <EuiFlexItem grow={1}>
            <ExplorePanel />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageContentBody>
    </EuiPageContent>
  );
};

export default ProjectOverviewPage;
