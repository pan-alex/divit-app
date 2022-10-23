// import React, { useState, useEffect } from "react";
import GridTable from "@nadavshaar/react-grid-table";
import getColumns from "./SyncTableGetColumns";
import Information from './SyncTableInformation'
import { useContext } from 'react'
import { GroupContext } from '../App'

const SyncTable = ( {member, transactions } ) => {
  const [, setMembersState] = useContext(GroupContext)
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
                'props': {'member': member}
              }
            }}
            components={ {Information} }
          />
    );
  };

  export default SyncTable;
