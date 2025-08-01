const deleteForms = document.querySelectorAll(".form-delete");

deleteForms.forEach((form) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Stop form dari submit langsung

    Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Aksi ini tidak bisa dibatalkan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        form.submit(); // Jika user klik "Ya", submit form
      }
    });
  });
});
