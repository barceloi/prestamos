// Escuchar el submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
    // esconder resultados
    document.getElementById('results').style.display = 'none';

    // mostrar lader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);


    e.preventDefault();
});

//Calculate Results

function calculateResults() {
    console.log('Calculating...');
    // Variables del UI
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //Compute Monthly Payments

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        //mostrar resultados
        document.getElementById('results').style.display = 'block';

        //esconder el loader
        document.getElementById('loading').style.display = 'none';

    } else {
        showError('Por favor verifica tus numeros hermano');

    }


}

// Mostrar error

function showError(error) {

    //esconder resultados
    document.getElementById('results').style.display = 'none';

    //esconder el loader
    document.getElementById('loading').style.display = 'none';

    // Crear Div
    const errorDiv = document.createElement('div');

    // get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // agregar clase 
    errorDiv.className = 'alert alert-danger';

    // Crear text Node y append al div 
    errorDiv.appendChild(document.createTextNode(error));

    // Insertar error sobre encabezado
    card.insertBefore(errorDiv, heading);

    // Borrar mensaje despues de 3 segundos
    setTimeout(clearError, 3000);




}

// Clear Error  

function clearError() {
    document.querySelector('.alert').remove();
}