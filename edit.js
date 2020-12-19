function showalldata(){
    let view = document.getElementById('show');
    let urls = "http://localhost:36633/ServiceWarung/webresources/warung.barang";

    $.ajax ({
        url: urls,
        method: 'GET',
        success: function (xml){
            console.log(xml);
            let table = xml2html (xml);
            view.innerHTML = table;
        },
        fail: function (e) {alert('error');}
    })
    //view.innerHTML = "Show here";
}

function xml2html (xml) {
    let sdata = xml.getElementsByTagName('barang').length;
    let table = "<table border='1' align='center'>";
    table += '<tr> <th>ID</th> <th>NAMA DAGANGAN</th> <th>HARGA</th> <th>JUMLAH</th> </tr>'
    for (row=0;row<sdata;row++){
        let id = xml.getElementsByTagName("id")[row].childNodes[0].nodeValue;
        let namadagangan = xml.getElementsByTagName("namadagangan")[row].childNodes[0].nodeValue;
        let harga = xml.getElementsByTagName("harga")[row].childNodes[0].nodeValue;
        let jumlah = xml.getElementsByTagName("jumlah")[row].childNodes[0].nodeValue;
        table += '<tr> <td>'+id+'</td> <td>'+namadagangan+'</td> <td>'+harga+'</td> <td>'+jumlah+'</td></tr>'
    }
    table += "</table>";
    return table;

}

function findbyid (){
    let view = document.getElementById('data');
    let idobj = document.getElementById('inputid');
    let idn = idobj.elements[0].value;
    let url = 'http://localhost:36633/ServiceWarung/webresources/warung.barang';
    let nurl = url + '/' +idn;
    $.ajax ({
        url : nurl,
        method : 'GET',
        dataType: 'xml',
        success : function (resp) {
            if (resp != null){
                let id = resp.getElementsByTagName("id")[0].childNodes[0].nodeValue;
                let namadagangan = resp.getElementsByTagName("namadagangan")[0].childNodes[0].nodeValue;
                let harga = resp.getElementsByTagName("harga")[0].childNodes[0].nodeValue;
                let jumlah = resp.getElementsByTagName("jumlah")[0].childNodes[0].nodeValue;
                let html = '<table border="1" align="center">';
                    html += '<th>ID</th><th>NAMA DAGANGAN</th><th>HARGA</th><th>JUMLAH</th><tr>'
                    html += '<td>'+id+'</td><td>'+namadagangan+'</td><td>'+harga+'</td><td>'+jumlah+'</td>';
                    html += '</tr></table>';
                view.innerHTML = html;

            }
            else {view.innerHTML = 'tidak ada data';}
        },
        fail: function (e) {}
    })
}

function deletebyid(){
    let view = document.getElementById('delete');
    let idobj = document.getElementById('inputid');
    let idn = idobj.elements[0].value;
    let url = 'http://localhost:36633/ServiceWarung/webresources/warung.barang';
    let nurl = url + '/' +idn;
    $.ajax ({
        url : nurl,
        method : 'DELETE',
        dataType: 'xml',
        success : function (resp) {
            view.innerHTML = idn + ' Berhasil DiHapus';
        },
        fail: function (e) {
            view.innerHTML = 'Gagal';
        }
    })
    
}

function createdata(){
    let urls = "http://localhost:36633/ServiceWarung/webresources/warung.barang";
    let view = document.getElementById('add');
    let idinput = document.getElementById('inputid');
    let ids = idinput.elements[0].value;
    let namadagangans = idinput.elements[1].value;
    let hargas= idinput.elements[2].value;
    let jumlahs= idinput.elements[2].value;
    let xml =
            '<barang>' +
            '<id>' + ids + '</id>' +
            '<namadagangan>' + namadagangans + '</namadagangan>' +
            '<harga>' + hargas + '</harga>' +
            '<jumlah>' + jumlahs + '</jumlah>' +
            '</barang>';
    $.ajax ({
        url : urls,
        method : 'POST',
        contentType: 'application/xml',
        data: xml,
        success : function (resp) {
            view.innerHTML = ''+namadagangans+' Berhasil ditambahkan';
        },
        fail: function (e) {
            view.innerHTML = 'Data gagal disimpan';
        }
    })
}

function findforupdate(){
    let id = document.getElementById("id").value;
    findforedit (id);
}

function findforedit (id){
    let url = 'http://localhost:36633/ServiceWarung/webresources/warung.barang';
    let nurl = url + '/' +id;
    $.ajax ({
        url : nurl,
        method : 'GET',
        dataType: 'xml',
        success : function (resp) {
            if (resp != null){
                let id = resp.getElementsByTagName("id")[0].childNodes[0].nodeValue;
                let namadagangan = resp.getElementsByTagName("namadagangan")[0].childNodes[0].nodeValue;
                let harga = resp.getElementsByTagName("harga")[0].childNodes[0].nodeValue;
                let jumlah = resp.getElementsByTagName("jumlah")[0].childNodes[0].nodeValue;
                document.getElementById("nid").value=id;
                document.getElementById("nnamadagangan").value=namadagangan;
                document.getElementById("nharga").value=harga;
                document.getElementById("njumlah").value=jumlah;
            }
            else {view.innerHTML = 'tidak ada data';}
        },
        fail: function (e) {}
    })
}

function update (){
    let urls = "http://localhost:36633/ServiceWarung/webresources/warung.barang/";
    let view = document.getElementById('data');
    let idinput = document.getElementById('inputid');
    let id = idinput.elements[0].value;
    let namadagangan = idinput.elements[1].value;
    let harga = idinput.elements[2].value;
    let jumlah = idinput.elements[3].value;
    
    let xml = '<barang>';
    xml += '<id>'+id+'</id><namadagangan>'+namadagangan+'</namadagangan><harga>'+harga+'</harga><jumlah>'+jumlah+'</jumlah>';
    xml += '</barang>';
    urls += id;
            $.ajax ({
                url : urls,
                method : 'PUT',
                contentType: 'application/xml',
                data: xml,
                success : function (resp) {
                    view.innerHTML = 'ID: ' + id + ' Berhasil diupdated';
                 },
         fail: function (e) {
            view.innerHTML = 'Update Gagal';
    }
})
}