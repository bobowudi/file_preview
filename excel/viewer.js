/* parse workbook */
let fileUrl = ''
const fileBtn = document.querySelector('#fileBtn')
fileBtn.addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.addEventListener('change', (e) => {
    console.log('e', input.files[0]);
    fileUrl = URL.createObjectURL(input.files[0])
    showFile()
  })
  input.click()
})

const showFile = () => {
  var xhr = new XMLHttpRequest
  xhr.onload = function () {
    const workbook = XLSX.read(xhr.response);
    var sheetName = workbook.SheetNames
    var divHtml = "";
    sheetName.forEach(function (item, index, arr) {
      var sheet = workbook.Sheets[sheetName[index]]
      divHtml += "<p class=\"sheetName\">" + item + "</p>"
      divHtml += XLSX.utils.sheet_to_html(sheet);
    });

    const content = document.getElementById("excelPreview");
    content.innerHTML = divHtml;
  }
  xhr.onerror = function () {
    reject(new TypeError('Local request failed'))
  }
  xhr.open('GET', fileUrl, true)
  xhr.responseType = "arraybuffer";
  xhr.send(null)
}



// const params = new URLSearchParams(window.location.search);
// const fileUrl = params.get("file");
// var xhr = new XMLHttpRequest
// xhr.onload = function () {
//   const workbook = XLSX.read(xhr.response);
//   var sheetName = workbook.SheetNames
//   var divHtml = "";
//   sheetName.forEach(function(item,index,arr){
//     var sheet = workbook.Sheets[sheetName[index]]
//     divHtml += "<p class=\"sheetName\">" + item + "</p>"
//     divHtml += XLSX.utils.sheet_to_html(sheet);
//   });

//   const content = document.getElementById("excelPreview");
//   content.innerHTML = divHtml;
// }
// xhr.onerror = function () {
//   reject(new TypeError('Local request failed'))
// }
// xhr.open('GET', fileUrl, true)
// xhr.responseType = "arraybuffer";
// xhr.send(null)
