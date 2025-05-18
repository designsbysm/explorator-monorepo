import request, { gql } from "graphql-request";
import { useEffect, useState } from "react";

import { apiURL } from "@/config.mjs";

/**
 * @typedef {object} TestProps
 * @property {React.ReactNode} [children]
 * @property {string} name
 *
 * @param {TestProps} props
 * @returns {React.JSX.Element}
 */
const Test = ({ children, name }) => {
  /**
   * @type {useState<ShipComponents[]>}
   */
  // @ts-expect-error
  const [components, setComponents] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await request(
        `${apiURL}/graphql`,
        gql`
          {
            allShipComponents(orderBy: NAME_ASC) {
              nodes {
                name
                type
                size
                class
                grade
              }
            }
          }
        `
      ).catch(console.error);

      setComponents(data?.allShipComponents?.nodes ?? []); // }
    })();
  }, []);

  useEffect(() => {
    components.forEach(({ name, type }) => {
      console.log(name, type);
    });
  }, [components]);

  return (
    <>
      <h2>{name}</h2>
      {children}
    </>
  );
};

export default Test;
