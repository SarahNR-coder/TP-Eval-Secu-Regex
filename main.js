const regexObj = {
    regexMail : /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/,
    charDecimal : /\d/,
    charSpecial : /[$&@!]/,
    xssPattern:/<script.*?>.*?<\/script>|<.*?onclick=.*?>|<.*?on\w+=".*?"/i
};
let errorMsg = {
    mailMsg:'',
    passwordMsg:'',
    xssMsg:''
};



const $connexionInputEmail = document.querySelector('#connexionInputEmail');
const $connexionInputPassword = document.querySelector('#connexionInputPassword');
const $connexionForm = document.querySelector('#connexionForm');

const $inscriptionInputEmail = document.querySelector('#inscriptionInputEmail');
const $inscriptionInputPassword = document.querySelector('#inscriptionInputPassword');
const $inscriptionInputConfirmPassword = document.querySelector('#inscriptionInputConfirmPassword');
const $inscriptionForm = document.querySelector('#inscriptionForm');

const $switch = document.querySelector('#flexSwitchCheckDefault');
const $checkboxLabel = document.querySelector('#checkboxLabel');


$inscriptionForm.style.display = "none";
$checkboxLabel.innerText = "Vous n'êtes pas inscrit?"; 

/* $switch.addEventListener("click", function (){
    if($connexionForm.style.display == "block"){
        $checkboxLabel.innerText = "Vous avez déjà un compte?"; 
        $inscriptionForm.style.display = "block";
        $connexionForm.style.display="none";
        $securityInfo.innerHTML = "";    
    }else{
        $checkboxLabel.innerText = "Vous n'êtes pas inscrit?"; 
        $connexionForm.style.display = "block";
        $inscriptionForm.style.display="none";
        $securityInfo.innerHTML = "";
    }
}) */



let selectedForm = true;
$switch.addEventListener("click", function(){
    console.log('ok ça click');
    if(selectedForm){
        $checkboxLabel.innerText = "Vous avez déjà un compte?"; 
        $inscriptionForm.style.display = "block";
        $connexionForm.style.display="none";
        $securityInfo.innerHTML = "";    
    }else{
        $checkboxLabel.innerText = "Vous n'êtes pas inscrit?"; 
        $connexionForm.style.display = "block";
        $inscriptionForm.style.display="none";
        $securityInfo.innerHTML = "";
    }
    selectedForm=!selectedForm;
})


let emailErrorMessage = ``;
let connexionPasswordErrorMessage =``;
let lengthErrorMessage = ``;
let decPasswordErrorMessage = ``;
let charPasswordErrorMessage = ``;
let notSamePasswordsErrorMessage =``;


const $securityInfo = document.querySelector('#securityInfo');
$securityInfo.style.display = "block";




$connexionInputEmail.addEventListener("keyup", function(){
    let testEmail = regexObj.regexMail.test($connexionInputEmail.value);
    if(!testEmail && emailErrorMessage === ``){
        emailErrorMessage = `⛔ Le format du mail n'est pas correct`;
        $connexionInputEmail.style.backgroundColor = "red";
    }else{
        emailErrorMessage=``;
    }
    //$securityInfo.innerText += emailErrorMessage;
})

$inscriptionInputEmail.addEventListener("keyup", function(){
    let testEmail = regexObj.regexMail.test($inscriptionInputEmail.value);
    if(!testEmail && emailErrorMessage ===``){
        $inscriptionInputEmail.style.backgroundColor = "red";
        emailErrorMessage = `⛔ Le format du mail n'est pas correct`;
    }else{
        emailErrorMessage =``;
    }
    //$securityInfo.innerText += emailErrorMessage;
})

$connexionInputPassword.addEventListener("keyup", function(){
    let testPasswordXss = regexObj.xssPattern.test($connexionInputPassword.value);
    if(testPasswordXss){
        connexionPasswordErrorMessage= `⛔ Attention : potentiel XSS détecté`
        $connexionInputPassword.style.backgroundColor = "red";
    }else{
        connexionPasswordErrorMessage= ``;
    }
    //$securityInfo.innerText += connexionPasswordErrorMessage;
})



$inscriptionInputPassword.addEventListener("keyup", function(){
    let testPasswordDec = regexObj.charDecimal.test($inscriptionInputPassword);
    let testPasswordChar = regexObj.charSpecial.test($inscriptionInputPassword);
    if($inscriptionInputPassword.value.length <6){
        lengthErrorMessage = `⛔ Le Mot de Passe est trop court`;
        $inscriptionInputPassword.style.background ="red";
    }else if($inscriptionInputPassword.value.length>12){
        lengthErrorMessage= `⛔ Le Mot de Passe est trop long`;
        $inscriptionInputPassword.style.background ="red";
    }else{
        lengthErrorMessage= ``;
    }
    $securityInfo.innerText +=lengthErrorMessage;

    if(!testPasswordDec){
        decPasswordErrorMessage= `⛔ Le Mot de Passe doit contenir un chiffre`;
        $inscriptionInputPassword.style.background ="red";
    }else{
        decPasswordErrorMessage= ``;
    }
    $securityInfo.innerText +=decPasswordErrorMessage;
    if(!testPasswordChar){
        charPasswordErrorMessage = `⛔ Le Mot de Passe doit contenir un caractère spécial`;
        $inscriptionInputPassword.style.background ="red";
    }else{
        charPasswordErrorMessage = ``;
    }
    //$securityInfo.innerText += charPasswordErrorMessage;
})

$inscriptionInputConfirmPassword.addEventListener("keyup",function(){
    if($inscriptionInputConfirmPassword.value != $inscriptionInputPassword.value){
        notSamePasswordsErrorMessage= `⛔ ≠ Les mots de passe ne correspondent pas`;
        $inscriptionInputConfirmPassword.style.background ="red";
    }else{
        notSamePasswordsErrorMessage= ``;
    }
    //$securityInfo.innerText +=notSamePasswordsErrorMessage;
})

 $securityInfo.innerText = `${emailErrorMessage}
${connexionPasswordErrorMessage}
${lengthErrorMessage}
${decPasswordErrorMessage}
${charPasswordErrorMessage}
${notSamePasswordsErrorMessage} 
`


