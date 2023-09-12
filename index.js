// file input query selector
const input = document.querySelector('input')
// output element
const output = document.querySelector('#output')

// file input event listener
input.addEventListener('input', event => {
    // clear previous web output
    output.innerHTML = ''
    // get spread sheet file
    const file = event.target.files[0]
    // create file reader
    const reader = new FileReader()
    // file read listener
    reader.addEventListener('load', event => {
        // get file data
        const data = new Uint8Array(event.target.result)
        // create workbook from file data
        const book = XLSX.read(data, { type: 'array' })
        // for each shhet name
        book.SheetNames.forEach(name => {
            // convert to json
            const json = XLSX.utils.sheet_to_json(book.Sheets[name], { header: 1 })
            // console log 
            display(name, json)
        })
    })
    // read file as buffer
    reader.readAsArrayBuffer(file)
})

// method to display on web
const display = (name, data) => {
    let html = ''
    html += `<h4>${name}</h4>`
    html += `<table border="1">`
    data.forEach(row => {
        html += `<tr>`
        row.forEach(cell => {
            html += `<td>${cell}</td>`
        })
        html += `</tr>`
    })
    html += `</table>`
    output.innerHTML += html
}