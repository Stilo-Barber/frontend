import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Menu from '../components/menu';
import Loading from '../components/loading';


const RouteWrapper = ({ component, isProtected, isAdminProtected, ...rest }) => {
  const isSigned = useSelector((state) => state.auth.signed);
  const isAdmin = useSelector((state) => state.user.admin);

  if (isProtected && !isSigned) return <Redirect to="/login" />;

  if (!isProtected && isSigned && isAdmin) return <Redirect to="/admin" />;

  if (!isProtected && isSigned) return <Redirect to="/" />;

  if (isAdminProtected && !isAdmin) return <Redirect to="/" />;



  if (!isAdminProtected) {
    return <Route component={component} {...rest} />; 
  } else {
    return (
      <Menu show={!!isSigned}>
        <Suspense fallback={<Loading />}>
          <Route component={component} {...rest} />
        </Suspense>
      </Menu>
    )
  }
};

export default RouteWrapper;
