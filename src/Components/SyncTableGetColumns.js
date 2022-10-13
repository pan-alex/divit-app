import { group } from './Classes'
import React from "react";


const EDIT_SVG = (
  <svg
    height="25"
    viewBox="0 0 25 25"
    width="25"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="#fff" stroke="#1856bf" transform="translate(4 4)">
      <path
        d="m8.24920737-.79402796c1.17157287 0 2.12132033.94974747 2.12132033 2.12132034v13.43502882l-2.12132033 3.5355339-2.08147546-3.495689-.03442539-13.47488064c-.00298547-1.16857977.94191541-2.11832105 2.11049518-2.12130651.00180188-.00000461.00360378-.00000691.00540567-.00000691z"
        transform="matrix(.70710678 .70710678 -.70710678 .70710678 8.605553 -3.271644)"
      />
      <path d="m13.5 4.5 1 1" />
    </g>
  </svg>
);
const CANCEL_SVG = (
  <svg
    height="25"
    viewBox="0 0 25 25"
    width="25"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" stroke="#dc1e1e" transform="translate(7 7)">
      <path d="m.5 10.5 10-10" />
      <path d="m10.5 10.5-10-10z" />
    </g>
  </svg>
);
const SAVE_SVG = (
  <svg
    height="25"
    viewBox="0 0 25 25"
    width="25"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m.5 5.5 3 3 8.028-8"
      fill="none"
      stroke="#4caf50"
      transform="translate(8 9)"
    />
  </svg>
);

const styles = {
  select: { margin: "0 20px" },
  buttonsCellContainer: {
    padding: "0 20px",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  editButton: {
    background: "#f3f3f3",
    outline: "none",
    cursor: "pointer",
    padding: 4,
    display: "inline-flex",
    border: "none",
    borderRadius: "50%",
    boxShadow: "1px 1px 2px 0px rgb(0 0 0 / .3)"
  },
  buttonsCellEditorContainer: {
    height: "100%",
    width: "100%",
    display: "inline-flex",
    padding: "0 20px",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  cancelButton: {
    background: "#f3f3f3",
    outline: "none",
    cursor: "pointer",
    marginRight: 10,
    padding: 2,
    display: "inline-flex",
    border: "none",
    borderRadius: "50%",
    boxShadow: "1px 1px 2px 0px rgb(0 0 0 / .3)"
  },
  saveButton: {
    background: "#f3f3f3",
    outline: "none",
    cursor: "pointer",
    padding: 2,
    display: "inline-flex",
    border: "none",
    borderRadius: "50%",
    boxShadow: "1px 1px 2px 0px rgb(0 0 0 / .3)"
  }
};

const getColumns = ({ member, setMembersState }) => {
  return [
    {
      id: "checkbox",
      visible: true,
      pinned: true,
      width: "54px"
    },
    {
        id: "2",
        field: "date",
        label: "Date",
        width: "150px",
        editorCellRenderer: ({
            tableManager,
            value,
            data,
            column,
            colIndex,
            rowIndex,
            onChange
        }) => (
            <input
            type='date'
            value={value}
            onChange={(e) =>
              onChange({ ...data, [column.field]: e.target.value })
            }
            />
        )
    },
    {
      id: "3",
      field: "category",
      label: "Category",
    },
    {
      id: "4",
      field: "description",
      label: "Note"
    },
    {
      id: "5",
      field: "cost",
      label: "Amount",
      width: "120px",
      cellRenderer: ({
        tableManager,
        value,
        data,
        column,
        colIndex,
        rowIndex
      }) => (
        <div className="rgt-cell-inner rgt-text-truncate" title={data['cost']}>
          {'$' + Number(data['cost']).toFixed(2)}
        </div>
        ),
      editorCellRenderer: ({
        tableManager,
        value,
        data,
        column,
        colIndex,
        rowIndex,
        onChange
      }) => (
          <input
          type='number'
          value={value}
          onKeyPress={(e) => {
            let val = e.key.charCodeAt(0)
            if ( (val < 48 && val !== 46) || (val > 57) ) e.preventDefault();
          }}
          onChange={(e) =>
            // onChange({ ...data, [column.field]: e.target.value})
            onChange({ ...data, [column.field]: e.target.value})
          }
          />
      )
    },
    {
      id: "buttons",
      width: "max-content",
      pinned: true,
      sortable: false,
      resizable: false,
      cellRenderer: ({
        tableManager,
        value,
        data,
        column,
        colIndex,
        rowIndex
      }) => (
        <div style={styles.buttonsCellContainer}>
          <button
            title="Edit"
            style={styles.editButton}
            onClick={(e) => {
              e.stopPropagation();
              tableManager.rowEditApi.setEditRowId(data.id);
            }}
          >
            {EDIT_SVG}
          </button>
        </div>
      ),
      editorCellRenderer: ({
        tableManager,
        value,
        data,
        column,
        colIndex,
        rowIndex,
        onChange
      }) => (
        <div style={styles.buttonsCellEditorContainer}>
          <button
            title="Cancel"
            style={styles.cancelButton}
            onClick={(e) => {
              e.stopPropagation();
              tableManager.rowEditApi.setEditRowId(null);
            }}
          >
            {CANCEL_SVG}
          </button>
          <button
            title="Save"
            style={styles.saveButton}
            onClick={(e) => {
              e.stopPropagation();
              let rowsClone = [...tableManager.rowsApi.rows];
              let updatedRowIndex = rowsClone.findIndex(
                (r) => r.id === data.id
              );
              rowsClone[updatedRowIndex] = data;
              group.replaceTransactions(member, rowsClone)
              setMembersState();
              tableManager.rowEditApi.setEditRowId(null);
            }}
          >
            {SAVE_SVG}
          </button>
        </div>
      )
    }
  ];
};

export default getColumns;
