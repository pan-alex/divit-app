import { group, Group } from './Classes'

function groupToJSON() {
    let a = document.createElement('a')
    let file = new Blob([JSON.stringify(group)], {type: 'application/json'})
    a.href = URL.createObjectURL(file)
    a.download = `divit-${new Date().toISOString()}.json`
    a.click()
}

function JSONToGroup(e) {
    let file = e.target.files[0]
    if (file) {
        console.log(file)
        let reader = new FileReader()
        reader.readAsText(file)
        reader.onload = (evt) => {
            console.log(reader.result)
            let newGroup = Group.prototype.objToGroup(JSON.parse(reader.result))
            newGroup.toLocalStorage()
            window.location.reload()
        }
    }
}

function transactionsToCSV() {
    let rows = 'Member ID,Member Name,Transaction ID,Date,Category,Note,Amount';
    for (let member of group.members) {
        for (let tx of member.transactions) {
            rows += `\n${member.id},${member.name},${tx.id},${tx.date},${tx.category},${tx.description},${tx.cost}`
        }
    }
    let a = document.createElement('a')
    let file = new Blob([rows], {type: 'application/csv'})
    a.href = URL.createObjectURL(file)
    a.download = `divit-${new Date().toISOString()}.csv`
    a.click()
}

function ExportAsJSON() {
    return (
        <button onClick={groupToJSON} className='btn btn-light'>
            Export JSON
        </button>
    )
}

function ImportAsJSON() {
    return (
        <div>
            <label className='btn btn-light' htmlFor='jsonUpload'>Import JSON</label>
            <input id='jsonUpload' type='file' accept='application/json' onChange={e => JSONToGroup(e)} name="fileInput"/>
        </div>
    )
}

function ExportAsCSV() {
    return (
        <button onClick={transactionsToCSV} className='btn btn-light'>
            Export CSV
        </button>
    )
}

export default function ImportExportData() {
    return (
        <div className='importExportData flex-center'>
            <ImportAsJSON />
            <ExportAsJSON />
            <ExportAsCSV />
        </div>
    )
}

