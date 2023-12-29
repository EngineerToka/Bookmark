// Get elemnts from HTML
var siteNameInput = document.getElementById('siteName');
var siteURLInput = document.getElementById('siteURL');
var siteNameError = document.getElementById('siteNameError');
var siteURLError = document.getElementById('siteURLError');
var siteList=document.getElementById('siteList');
var searchInput = document.getElementById("searchInput");






// Add Site

function addSite(){
  
    // Validate site name
    if (!isValidSiteName(siteNameInput.value)) {
        siteNameError.textContent = "Please enter a valid site name (alphanumeric characters and spaces only).";
        return;
    } else {
        siteNameError.textContent = "";
    }

    // Validate URL
    if (!isValidURL(siteURLInput.value)) {
        siteURLError.textContent = "Please enter a valid URL (e.g., http://www.example.com).";
        return;
    } else {
        siteURLError.textContent = "";
    }

var newSite ={siteName: siteNameInput.value,siteURL: siteURLInput.value} ; 
    sites.push(newSite);
    saveSitesToLocalStorage();
    displaySites();
   // Clear input fields
   siteNameInput.value = '';
   siteURLInput.value = '';

}


// Display
function displaySites() {
    siteList.innerHTML = '';
    for (let index = 0; index < sites.length; index++) {
        var { siteName , siteURL} = sites[index];
        var rowHTML = `<tr>
        <td>${index+1}</td>
        <td>${siteName}</td>
        <td><button class="btn btnVisit" onclick="visitSite('${siteURL}')" > <i class="fa-solid fa-eye" ></i>  Visit</button> </td>
        <td><button class="btn btnDelete btn-danger" onclick="deleteSite(${index})"> <i class="fa-solid fa-trash-can"></i>  Delete</button> </td>
        </tr>`;
   
      if (siteList !== null) {
        siteList.innerHTML+= rowHTML; 
    } else {
        console.error("Element with ID 'siteList' not found.");
    }
    }

}
// To delete a site
function deleteSite(index) {
    sites.splice(index, 1);
    saveSitesToLocalStorage();
    displaySites();
 
}


// Function to visit a product 
        function visitSite(siteURL) {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(siteURL)}`, '_blank');
        }

        // Function to save products to local storage
        function saveSitesToLocalStorage() {
            localStorage.setItem('sites', JSON.stringify(sites));
        }

        // Function to retrieve products from local storage
        function getsitesFromLocalStorage() {
            const storedsites = localStorage.getItem('sites');
            return storedsites ? JSON.parse(storedsites) : [];
        };

        // Initialize products from local storage
        let sites = getsitesFromLocalStorage();

        // Initial display
        displaySites();


// Function to validate URL
function isValidURL(url) {
    const urlRegex =/^(https?|ftp)?:\/\/(www\.)?[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(url);
  }
  
  // Function to validate site name
  function isValidSiteName(name) {
    // Customize this regex as needed for your site name requirements
    const nameRegex = /^[a-zA-Z0-9\s]+$/;
    return nameRegex.test(name);
  }
      function searchSites() {
        var filter = searchInput.value.toLowerCase();
    
        for (let i = 0; i < sites.length; i++) {
            var td = document.querySelector(`#siteList tr:nth-child(${i + 1}) td:nth-child(2)`); // Adjust the index accordingly
            if (td) {
                var txtValue = td.textContent || td.innerText;
                if (txtValue.toLowerCase().includes(filter)) {
                    td.parentNode.style.display = "";
                } else {
                    td.parentNode.style.display = "none";
                }
            }
        }
    }





// Ensure the DOM is fully loaded before executing the main.js script
document.addEventListener("DOMContentLoaded", function() {
    // Initialize products from local storage
    let sites = getsitesFromLocalStorage();

    // Initial display
    displaySites();
});