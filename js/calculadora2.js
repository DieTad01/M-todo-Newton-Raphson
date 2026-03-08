// De donde se obtiene y se mostrara resultados
const form = document.getElementById('form');
const resultDiv = document.getElementById('result');

// Evento para manejar el envío del formulario con validaciones y manejo de errores
form.addEventListener('submit', function(event) {
    event.preventDefault();
    if (!window.math) {
        resultDiv.innerHTML = `<p style="color:red;">Error: la librería math.js no está cargada.</p>`;
        return;
    }

    // Obtener y validar los datos de entrada
    const funcEl = document.getElementById('funcion');
    const a = document.getElementById('a');
    const b = document.getElementById('b');
    const tolEl = document.getElementById('tolerancia');
    if (!funcEl || !a || !b || !tolEl) {
        resultDiv.innerHTML = `<p style="color:red;">Error: faltan campos en el formulario.</p>`;
        return;
    }
    
    const funcInput = funcEl.value.trim();
    const aInput = parseFloat(a.value);
    const bInput = parseFloat(b.value);
    const tolInput = parseFloat(tolEl.value);

    // Validar que tengan datos
    // Validar funcion
    if (!funcInput) {
        resultDiv.innerHTML = `<p style="color:red;">Introduce la función f(x).</p>`;
        return;
    }
    // Validar intervalo
    if (Number.isNaN(aInput) || Number.isNaN(bInput)) {
        resultDiv.innerHTML = `<p style="color:red;">Los valores del intervalo deben ser números válidos.</p>`;
        return;
    }
    // Validar que a sea menor que b
    if (aInput >= bInput) {
        resultDiv.innerHTML = `<p style="color:red;">El valor de 'a' debe ser menor que el valor de 'b'.</p>`;
        return;
    }
    // Validar tolerancia
     if (Number.isNaN(tolInput)) {
        resultDiv.innerHTML = `<p style="color:red;">La tolerancia debe ser un número válido.</p>`;
        return;
    }

    try {
        // Llama a la función de Bisección y muestra el resultado
        const result = bisection(funcInput, aInput, bInput, tolInput);
        resultDiv.innerHTML = `<center><p>Raíz aproximada: ${result.root}</p></center>
                               <center><p>Iteraciones: ${result.iterations}</p></center>
                               <center><p>Error: ${result.error}</p></center>`;
    } catch (err) {
        resultDiv.innerHTML = `<p style="color:red;">Error al calcular: ${err && err.message ? err.message : err}</p>`;
        console.error(err);
    }
});

function bisection(funcStr, a, b, tol) {
    // Compilamos la función usando math.js para evaluarla varias veces
    const f = math.compile(funcStr);
    // Paso 0
    let fa = f.evaluate({ x: a });
    let fb = f.evaluate({ x: b });
    // No podia ser cero porque detenia todo el programa
    let error = (b - a) / 2;

    // Multiplicamos para verificar 
    if (fa * fb >= 0) {
        throw new Error('La función no cambia de signo en el intervalo [a, b]. Pruebe otro intervalo.');
    }
    let iterations = 0;
    let m, fm;
    while (error > tol) {
        // Paso 1
        m = (a + b) / 2;
        fm = f.evaluate({ x: m });
        // Paso 2
        if (fa * fm === 0) {
            return { root: m, iterations: iterations + 1, error: Math.abs(fm) };
        }
        if (fa * fm < 0) {
            b = m;
        } else {
            a = m;
        }
        const error = (b - a) / 2;
        if (error < tol) {
            return { root: m, iterations: iterations + 1, error: error };
        }
        iterations++;
    }

    return { root: m, iterations: iterations + 1, error: error };
}