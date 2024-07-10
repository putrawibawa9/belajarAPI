$.ajax({
  url: "http://localhost:3000/mahasiswa", // Replace with your API endpoint
  type: "GET", // or 'POST', 'PUT', 'DELETE', etc.
  dataType: "json",
  success: function (response) {
    // Handle successful response
    console.log("Response:", response);
  },
  error: function (xhr, status, error) {
    // Handle error
    console.error("Error:", error);
  },
});
