// import React, { useState, useEffect } from "react";
import GridTable from "@nadavshaar/react-grid-table";
import getColumns from "./SyncTableGetColumns";


const SyncTable = ( {member, transactions, setMembersState} ) => {
    // const [isLoading, setLoading] = useState(false);

    return (
          <GridTable
            columns={getColumns({ transactions, member, setMembersState})}
            rows={transactions}
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
