import React, { ReactNode, useContext } from "react";

const AppContext = React.createContext<Common.IApplication>(null as any);

export const AppProvider = ({
  children,
  application
}: {
  application: Common.IApplication;
  children: ReactNode;
}) => {
  return (
    <AppContext.Provider value={application}>{children}</AppContext.Provider>
  );
};

export function useApplication(application?: Common.IApplication) {
  const app = useContext(AppContext);
  return application || app;
}
