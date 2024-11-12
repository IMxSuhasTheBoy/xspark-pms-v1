"use client";

import { useGetTeamsQuery } from "@/state/api";
import { useAppSelector } from "@/app/redux";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import Header from "@/components/Header";

const Teams = () => {
  const { data: teams, isLoading, isError } = useGetTeamsQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !teams) return <div>Error fetching teams</div>;

  const CustomToolbar = () => (
    <GridToolbarContainer className="toolbar flex gap-2">
      <GridToolbarQuickFilter />
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "teamName", headerName: "Team Name", width: 200 },
    {
      field: "productOwnerUsername",
      headerName: "Product Owner",
      width: 200,
    },
    {
      field: "projectManagerUsername",
      headerName: "Project Manager",
      width: 200,
    },
  ];

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Teams" />
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={teams || []}
          columns={columns}
          pagination
          slots={{
            toolbar: CustomToolbar,
          }}
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </div>
  );
};

export default Teams;