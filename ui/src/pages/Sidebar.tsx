import React, { useContext, useState } from "react";

import { EuiIcon, EuiSideNav, htmlIdGenerator } from "@elastic/eui";
import { useNavigate, useParams } from "react-router-dom";
import { useMatchSubpath } from "../hooks/useMatchSubpath";
import useLoadRegistry from "../queries/useLoadRegistry";
import RegistryPathContext from "../contexts/RegistryPathContext";

import { EntityIcon16 } from "../graphics/EntityIcon";
import { FeatureGroupIcon16 } from "../graphics/FeatureGroupIcon";
import { ModelIcon16 } from "../graphics/ModelIcon";

const SideNav = () => {
  const registryUrl = useContext(RegistryPathContext);
  const { isSuccess, data } = useLoadRegistry(registryUrl);
  const { projectName } = useParams();

  const [isSideNavOpenOnMobile, setisSideNavOpenOnMobile] = useState(false);

  const navigate = useNavigate();

  const toggleOpenOnMobile = () => {
    setisSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const entitiesLabel = `Entities ${
    isSuccess && data?.objects.entities
      ? `(${data?.objects.entities?.length})`
      : ""
  }`;

  const featureGroupsLabel = `Feature Groups ${
    isSuccess && data?.mergedFVList && data?.mergedFVList.length > 0
      ? `(${data?.mergedFVList.length})`
      : ""
  }`;

  const modelsLabel = `Models ${
    isSuccess && data?.objects.models
      ? `(${data?.objects.models?.length})`
      : ""
  }`;

  const sideNav = [
    {
      name: "",
      id: htmlIdGenerator("basicExample")(),
      onClick: () => {
        navigate(`/p/${projectName}/`);
      },
      items: [
        {
          name: featureGroupsLabel,
          id: htmlIdGenerator("featureGroup")(),
          icon: <EuiIcon type={FeatureGroupIcon16} />,
          onClick: () => {
            navigate(`/p/${projectName}/feature-group`);
          },
          isSelected: useMatchSubpath("feature-group"),
        },
        {
          name: modelsLabel,
          id: htmlIdGenerator("model")(),
          icon: <EuiIcon type={ModelIcon16} />,
          onClick: () => {
            navigate(`/p/${projectName}/model`);
          },
          isSelected: useMatchSubpath("model"),
        },
                {
          name: entitiesLabel,
          id: htmlIdGenerator("entities")(),
          icon: <EuiIcon type={EntityIcon16} />,
          onClick: () => {
            navigate(`/p/${projectName}/entity`);
          },
          isSelected: useMatchSubpath("entity"),
        },
      ],
    },
  ];

  return (
    <EuiSideNav
      aria-label="Project Level"
      mobileTitle="Feast"
      toggleOpenOnMobile={() => toggleOpenOnMobile()}
      isOpenOnMobile={isSideNavOpenOnMobile}
      style={{ width: 192 }}
      items={sideNav}
    />
  );
};

export default SideNav;
