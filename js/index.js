
var siteName=document.getElementById('siteName')
var siteUrl=document.getElementById('siteUrl')




var userSites=[]
if(localStorage.getItem('My Save Websites')!=null)
{
    userSites=JSON.parse(localStorage.getItem('My Save Websites'))
    displayData()
}



// add site
function addWebsite() {

  if (siteName.value == "" || siteUrl.value == "") {
    emptyInputs.classList.remove("d-none");
  } else {
    emptyInputs.classList.add("d-none");
    isExsit()
    validatInputs();
    if (validatInputs() == true&&isExsit()==false) {
      site = {
        name: siteName.value,
        url: siteUrl.value,
      };
      tryAgainAlert.classList.add("d-none");
      userSites.push(site);
      localStorage.setItem("My Save Websites", JSON.stringify(userSites));
      clear();
      displayData();

      if(siteName.value == "")
      {
        siteName.classList.remove('is-invalid')
        siteName.classList.remove('is-valid')
      }
      if(siteUrl.value == "")
      {
        siteUrl.classList.remove('is-invalid')
        siteUrl.classList.remove('is-valid')
      }

    } else {
      tryAgainAlert.classList.remove("d-none");
    }
  }




  

}




// display data
function displayData()
{
    var temp=''
    for(var i=0;i<userSites.length;i++)
    {
        
        temp+=
        `
        <div class="col-md-3">
        <div class="item shadow">

        <h4 class='text-secondary'>  ${i} </h4>
               <h2 id="demo"></h2>
            <h3>${userSites[i].name}</h3>

            <div class="btns d-flex mt-2">
                <!-- visit -->
                <a href="${userSites[i].url}" target="_blank"> <button class="btn" title="Visit-website"><i class="fa-solid fa-eye fa-2x text-info"></i></button></a>
                <!-- update -->
                <button class="btn update" onclick="UpdateData(${i})" title="update-link"><i class="fa-solid fa-pen-to-square fa-2x text-success"></i></button>
                <!-- delete -->
                <button class="btn delete" onclick="Delete(${i})"title="delete-link"><i class="fa-solid fa-trash fa-2x text-danger"></i></button>
            </div>

        </div>
    </div>
        `


    }
    document.getElementById('rowData').innerHTML=temp;

    if (userSites.length > 0) {
      document.getElementById("deleteAllLinks").innerHTML = 
      `<button class="btn btn-outline-danger  btn-delete" onclick='SURE()'>Delete All ( ${i} )</button>`
      document.querySelector('#numOfItems span').innerHTML=`${i}`
      
    } else {
      document.getElementById("deleteAllLinks").innerHTML = ``;
      document.querySelector('#numOfItems span').innerHTML=`No Links`
  
    }




}


// delete one link
function Delete(index)
{
    userSites.splice(index,1)
    localStorage.setItem('My Save Websites',JSON.stringify(userSites))
    displayData()
}

var areYouSure=document.getElementById('areYouSure')

function SURE()
{
  areYouSure.classList.toggle('d-none')

}

// Delete all links
function DeleteAllData() {
  areYouSure.classList.toggle('d-none')
  userSites.splice(0);
  localStorage.clear();
  displayData();
}


// clear all data
function clear()
{
    siteName.value='';
    siteUrl.value='';
}



// update 
var glopalIndex;
function UpdateData(currentindex)
{
    glopalIndex=currentindex
    siteName.value=userSites[currentindex].name;
    siteUrl.value=userSites[currentindex].url;
    document.getElementById('add').style.display='none'
    document.getElementById('update').style.display='block'
    scroll({ top: 0, behavior: "smooth" });

}
function upadteInputs()
{
    userSites[glopalIndex].name = siteName.value;
    userSites[glopalIndex].url = siteUrl.value;

    localStorage.setItem("My Save Websites", JSON.stringify(userSites));
    displayData();
    clear();
    document.getElementById("add").style.display = "block";
    document.getElementById("update").style.display = "none";

    if (siteName.value == "") {
      siteName.classList.remove("is-invalid");
      siteName.classList.remove("is-valid");
    }
    if (siteUrl.value == "") {
      siteUrl.classList.remove("is-invalid");
      siteUrl.classList.remove("is-valid");
    }

}



// search
function search(term)
{
    var temp=''
    for(var i=0;i<userSites.length;i++)
    {
        if(userSites[i].name.toLowerCase().includes(term.toLowerCase()))
        {
            temp+=
            `
            <div class="col-md-3">
            <div class="item shadow">
            <h3 class='text-secondary'>  ${i} </h3>
                <h2>${userSites[i].name.toLowerCase().replace(term,`<span class="text-danger fw-bold">${term}</span>
                `)}</h2>
    
                <div class="btns d-flex mt-2">
                    <!-- visit -->
                    <a href="${userSites[i].url}" target="_blank"> <button class="btn" title="Visit-website"><i class="fa-solid fa-eye fa-2x text-info"></i></button></a>
                    <!-- update -->
                    <button class="btn update" onclick="UpdateData(${i})" ><i class="fa-solid fa-pen-to-square fa-2x text-success"></i></button>
                    <!-- delete -->
                    <button class="btn delete" onclick="Delete(${i})"><i class="fa-solid fa-trash fa-2x text-danger"></i></button>
                </div>
    
            </div>
        </div>
            `
        }
 
    }
    document.getElementById('rowData').innerHTML=temp


}





// validation
var siteNameAlert=document.getElementById('siteNameAlert')
var siteUrlAlert=document.getElementById('siteUrlAlert')


// validation of name
function validateName()
{
    if(siteName.value=='')
{
  siteName.classList.remove('is-valid')
  siteName.classList.remove('is-invalid')
}
var regex=/^[A-Z][a-z]{0,5}/
if(regex.test(siteName.value))
  {
    siteNameAlert.classList.add('d-none')
    siteName.classList.remove('is-invalid')
    siteName.classList.add('is-valid')
    return true
  }
  else
  {
    siteNameAlert.classList.remove('d-none')
    siteName.classList.remove('is-valid')
    siteName.classList.add('is-invalid')
    return false
  }
}


// validation of url

function validateUrl()
{
    if(siteUrl.value=='')
{
  siteUrl.classList.remove('is-valid')
  siteUrl.classList.remove('is-invalid')
}
var regex=/^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
if(regex.test(siteUrl.value))
  {
    siteUrlAlert.classList.add('d-none')
    siteUrl.classList.remove('is-invalid')
    siteUrl.classList.add('is-valid')
    return true
  }
  else
  {
    siteUrlAlert.classList.remove('d-none')
    siteUrl.classList.remove('is-valid')
    siteUrl.classList.add('is-invalid')
    return false
  }
}


// validation of all inputs

function validatInputs()
{
    validateName()
    validateUrl()
    if(validateName()==true&&validateName()==true)
    {
        return true
    }
    else
    {
        return false
    }
    
}



// the name is exist before of not
function isExsit() {
  var nameExistMsg = document.getElementById("nameExistMsg");
  for (let i = 0; i < userSites.length; i++) {
    if (userSites[i].name.toLowerCase() == siteName.value.toLowerCase()) {
      nameExistMsg.classList.remove("d-none");
      siteName.classList.remove("is-valid");
      siteName.classList.remove('is-invalid')
      siteName.focus();

      return true;
    }
  }
  nameExistMsg.classList.add("d-none");

  return false;
}