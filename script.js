var dataAnalisis = [];

function hitungSukuBunga() {
    var modalInput = document.getElementById('modal');
    var persenInput = document.getElementById('persen');
    var bulanInput = document.getElementById('bulan');

    // Convert input values to numbers
    var modal = parseFloat(modalInput.value);
    var persen = parseFloat(persenInput.value);
    var bulan = parseFloat(bulanInput.value);

    // Check if any input is not a valid number
    if (isNaN(modal) || isNaN(persen) || isNaN(bulan)) {
        alert("Masukkan angka yang valid untuk modal, persentase bunga, dan jangka waktu.");
        return;
    }

    // Perform calculation
    var hasil = ((modal * persen * bulan / 12) * 0.8) / bulan;

    // Add calculation result to the table
    tambahDataKeTabel(modal, persen, bulan, hasil.toFixed(2));

    // Add calculation result to the dataAnalisis array
    dataAnalisis.push({ modal: modal, persen: persen, bulan: bulan, hasil: hasil.toFixed(2) });

    // Reset input values
    modalInput.value = '';
    persenInput.value = '';
    bulanInput.value = '';

    // Add options to the dropdowns for data selection
    populateDropdownOptions();
}

function tambahDataKeTabel(modal, persen, bulan, hasil) {
    var tabelHasil = document.getElementById('tabelHasil');

    var row = tabelHasil.insertRow();
    var cellModal = row.insertCell(0);
    var cellPersen = row.insertCell(1);
    var cellBulan = row.insertCell(2);
    var cellHasil = row.insertCell(3);

    cellModal.innerHTML = modal;
    cellPersen.innerHTML = persen;
    cellBulan.innerHTML = bulan;
    cellHasil.innerHTML = hasil;
}

function populateDropdownOptions() {
    var selectData1 = document.getElementById('selectData1');
    var selectData2 = document.getElementById('selectData2');

    // Remove old options
    selectData1.innerHTML = '<option selected disabled>Pilih Data Pertama</option>';
    selectData2.innerHTML = '<option selected disabled>Pilih Data Kedua</option>';

    // Add new options
    for (var i = 0; i < dataAnalisis.length; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.text = 'Data ' + (i + 1);
        selectData1.add(option.cloneNode(true));
        selectData2.add(option);
    }
}

function bandingkanDataTerpilih() {
    var hasilBanding = document.getElementById('hasilBanding');
    var selectData1 = document.getElementById('selectData1');
    var selectData2 = document.getElementById('selectData2');

    var indexData1 = selectData1.value;
    var indexData2 = selectData2.value;

    // Check if the user selected the same data
    if (indexData1 === indexData2) {
        hasilBanding.innerHTML = "Pilih dua data yang berbeda untuk membandingkan.";
        return;
    }

    // Check if the user selected the default option
    if (indexData1 === 'Pilih Data Pertama' || indexData2 === 'Pilih Data Kedua') {
        hasilBanding.innerHTML = "Pilih dua data untuk membandingkan.";
        return;
    }

    // Compare interest rates from the selected data
    var perbandingan = parseFloat(dataAnalisis[indexData2].hasil) - parseFloat(dataAnalisis[indexData1].hasil);

    hasilBanding.innerHTML = "Perbandingan bunga dari Data " + (parseInt(indexData1) + 1) + " ke Data " + (parseInt(indexData2) + 1) + ": " + perbandingan.toFixed(2);

    // Close the modal
    $('#modalPilihData').modal('hide');
}
function resetData() {
  // Konfirmasi sebelum mereset
  var konfirmasi = confirm("Apakah Anda yakin ingin mereset semua data?");

  if (konfirmasi) {
      // Reset array dan tabel
      dataAnalisis = [];
      var tabelHasil = document.getElementById('tabelHasil');
      tabelHasil.innerHTML = '';

      // Reset dropdown
      var selectData1 = document.getElementById('selectData1');
      var selectData2 = document.getElementById('selectData2');
      selectData1.innerHTML = '<option selected disabled>Pilih Data Pertama</option>';
      selectData2.innerHTML = '<option selected disabled>Pilih Data Kedua</option>';

      // Reset hasil perbandingan
      var hasilBanding = document.getElementById('hasilBanding');
      hasilBanding.innerHTML = '';
  }
}