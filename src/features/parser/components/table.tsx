import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useModel } from "../useModel";

export const Table = () => {
  const model = useModel();

  console.log(model.headers);
  return (
    <DataTable>
      {model.headers.map((header, index) => (
        <Column key={index} field={header} header={header} />
      ))}
    </DataTable>
  );
};
