import React, { useState, useEffect } from "react";
import GridTable from "@nadavshaar/react-grid-table";
import getColumns from "./SyncTableGetColumns";
import Information from './SyncTableInformation'


const SyncTable = ( {member, transactions, setMembersState} ) => {
  // const [isLoading, setLoading] = useState(false);

    function handleSelectRow({ rowIndex, data, column, isEdit, event }, tableManager) {
      !isEdit &&
      tableManager.rowSelectionApi.getIsRowSelectable(data.id) &&
      tableManager.rowSelectionApi.toggleRowSelection(data.id)
    }

    return (
          <GridTable
            columns={getColumns({ member, setMembersState})}
            rows={transactions}
            isLoading={false}//{isLoading}
            onRowClick={
              ( { rowIndex, data, column, isEdit, event }, tableManager ) =>
                handleSelectRow({ rowIndex, data, column, isEdit, event }, tableManager)
            }
            additionalProps={{
              information: { // Additional Props for information component
                'props': {'member': member, 'setMembersState': setMembersState}
              }
            }}
            components={ {Information} }
          />
    );
  };

  export default SyncTable;
