// import { group } from './Classes'
import React, { useState, useEffect } from "react";
import GridTable from "@nadavshaar/react-grid-table";
import getColumns from "./SyncTableGetColumns";


const SyncTable = ( {transactions} ) => {
    const [rowsData, setRowsData] = useState(transactions);
    // const [isLoading, setLoading] = useState(false);


    useEffect( () => {
      setRowsData(prev => [...prev])
    }, [])

    // useEffect(() => {
    //   setLoading(true);
    //   async () => {
    //     await setRowsData(transactions);
    //     setLoading(false);
    //   }
    // }, []);

    return (
          <GridTable
            columns={getColumns({ setRowsData })}
            rows={rowsData}
            isLoading={false}//{isLoading}
            onRowClick={({ rowIndex, data, column, isEdit, event }, tableManager) =>
              !isEdit &&
              tableManager.rowSelectionApi.getIsRowSelectable(data.id) &&
              tableManager.rowSelectionApi.toggleRowSelection(data.id)
            }
          />
    );
  };

  export default SyncTable;
