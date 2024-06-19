function emailSend(){

	var userName = document.getElementById('ime').value;
	var phone = document.getElementById('num').value;
	var email = document.getElementById('mail').value;
    var upit = document.getElementById('upit').value;

	var messageBody = "Ime i prezime: " + userName +
	"<br/> Broj telefona: " + phone +
	"<br/> E-mail: " + email +
    "<br/> Upit: " + upit;
	Email.send({
    Host : "smtp.elasticemail.com",
    Username : "info@candelina.hr",
    Password : "CD9520677C5E7CA89A188D9D7C66694DE33E",
    Port: 2525,
    To : 'info@candelina.hr',
    From : "info@candelina.hr",
    Subject : "Candelina - upit",
    Body : messageBody
}).then(
    message => {
        if(message=='OK'){
            swal("Hvala!", "Upit uspješno poslan!", "success");
        }
        else{
            swal("Greška!", "Nije moguće poslati upit!", "error");
        }
    }
  
);
}