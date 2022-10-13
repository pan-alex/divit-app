import React from "react";
import { group } from "./Classes";

const Information = ({
    tableManager,
    totalCount = tableManager.rowsApi.totalRows,
    pageSize = tableManager.paginationApi.pageSize,
    pageCount = tableManager.paginationApi.pageRows.length,
    selectedCount = tableManager.rowSelectionApi.selectedRowsIds.length,
}) => {
    const {
        config: {
            isPaginated,
            tableHasSelection,
            texts: {
                totalRows: totalRowsText,
                rows: rowsText,
                selected: selectedText,
            },
            icons: { clearSelection: clearSelectionIcon },
            additionalProps: { information: additionalProps = {} },
        },
        paginationApi: { page },
        rowSelectionApi: { setSelectedRowsIds },
    } = tableManager;

    let classNames = (
        "rgt-footer-items-information " + (additionalProps.className || "")
    ).trim();

    // **Load in custom props
    const { member, setMembersState } = additionalProps.props;

    return (
        <div {...additionalProps} className={classNames}>
            {totalRowsText} {totalCount || 0}&nbsp;
            {!isPaginated
                ? ""
                : `| ${rowsText} ${
                      !pageCount
                          ? "0"
                          : `${pageSize * (page - 1) + 1} - ${
                                pageSize * (page - 1) + pageCount
                            }`
                  }`}{" "}
            {tableHasSelection ? (
                <React.Fragment>
                    {`| ${selectedCount} ${selectedText}`}
                    {selectedCount ? (
                        <span
                            className="rgt-footer-clear-selection-button rgt-clickable"
                            // **Modify default component to delete rows instead of clear selection**
                            onClick={
                                () => {
                                    let rows = tableManager.rowsApi.rows
                                    let selected = tableManager.rowSelectionApi.selectedRowsIds
                                    let newRows = (rows.filter(row => !selected.includes(row.id)))
                                    tableManager.rowsApi.rows = newRows;
                                    group.replaceTransactions(member, newRows);
                                    setMembersState()
                                    setSelectedRowsIds([]);
                                }
                            }
                        >
                            {clearSelectionIcon}
                        </span>
                    ) : null}
                </React.Fragment>
            ) : (
                ""
            )}
        </div>
    );
};

export default Information;
