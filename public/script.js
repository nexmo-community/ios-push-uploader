const uploadForm = document.querySelector("form");
const statusEl = document.querySelector("#status");

const formData = new FormData();
const privateKeyFileField = document.querySelector('input[name="privatekey"]');
const certFileField = document.querySelector('input[name="certificate"]');

async function uploadData(url=''){
  // add application id and files to form
  formData.append('appid', uploadForm.elements.appid.value);
  formData.append('privatekey', privateKeyFileField.files[0]);
  formData.append('certificate', certFileField.files[0]);
  try {
    const response = await fetch(url, {
      method: 'POST', 
      body: formData 
    });
    if (!response.ok){
      throw new Error('error getting data!');
    }
    console.log('response.status: ',response.status)
    console.log('response: ',response)
    return response.json();   
  }
  catch (error){
    console.error('Error making call to /upload: ', error);
    statusEl.textContent = error;    
  }
}

uploadForm.addEventListener("submit", async(event)=>{
  event.preventDefault();
  statusEl.textContent = "";

  try {
    const status = await uploadData("/upload");
    console.log('status: ',status);
    if (status.code !== 200){
      statusEl.style.color='red';
      statusEl.textContent = `Code: ${status.code} Message: ${status.message}`;
    } else {
      statusEl.style.color='green';
      statusEl.textContent = `Code: ${status.code} Message: ${status.message}`;
    }
  }
  catch(error){
    console.error('error: ', error);
    statusEl.textContent = error;

  }
});
