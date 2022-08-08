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
  useDocumentTitle("ML Catalog");
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
            {isSuccess && `Don't be a maybe, join the effort!`}
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
                    Please check that <code>feature_store.yaml</code> file is
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
                    We’re on a mission to catalog all the models and ML features actively used at Twitter.
                  </p>
                  <p>
                  ML practitioners can discover features that are being used by other models or the tech stack the model is using.
                  They can peruse key pieces of information about features to make decisions on whether a feature is worth trying
                  out and where/who the features are coming from. Lastly, they’ll finally have a reliable, shared central repository
                  to store model and feature information. ML platform engineers can use the catalog to uncover and track the properties
                  of features and models to inform how they should continue designing Twitter’s ML platform. 
                  </p>
                  <p>
                    <strong>Partners </strong><br/>
                    <em>(as examples, haven't confirmed with everyone here yet that they're ok with being listed)</em><br/>
                    Core Features Foundational Modeling Team in GoldBird<br/>
                    ML Feature Management team in CXP<br/>
                    Ruhua Jiang - Tech lead of GoldBird's ARM team. "Some quote here"<br/>
                    ML Serving team in CXP<br/>
                    Sean Moon - Tech lead in Health ML Infra
                  </p>
                  <p>
                    Learn how to add to the catalog or make changes by visiting{' '}
                    <a href="https://docs.google.com/document/d/1MNrqj81y4fl7PWS6I1NxlccVZcx2X4Hd4CAESaR0YF8/edit#heading=h.b9bdzauwwzcq">
                    go/ml-catalog-docs.</a><br/>
                    <strong>Questions, concerns, ideas?</strong> Hit us up in{' '}
                    <a href="https://twitter.slack.com/archives/C03PKUEPYFJ">#ml-catalog</a>!
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
