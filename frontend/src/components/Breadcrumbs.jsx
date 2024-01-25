import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();

  let currentLink = "";

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, index, array) => {
      currentLink += `/${crumb}`;

      // Check if it's the last crumb
      const isLastCrumb = index === array.length - 1;

      const decodedCrumb = decodeURIComponent(crumb);

      return (
        <div className="crumb" key={decodedCrumb}>
          {isLastCrumb ? (
            <span>{decodedCrumb}</span>
          ) : (
            <Link to={currentLink}>{decodedCrumb}</Link>
          )}
        </div>
      );
    });

  return <div className="breadcrumbs py-2">{crumbs}</div>;
}
