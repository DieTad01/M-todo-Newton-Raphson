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
    const aproxEl = document.getElementById('aproximacion');
    const tolEl = document.getElementById('tolerancia');
    const iterEl = document.getElementById('iteraciones');
    if (!funcEl || !aproxEl || !tolEl) {
        resultDiv.innerHTML = `<p style="color:red;">Error: faltan campos en el formulario.</p>`;
        return;
    }
    
    const funcInput = funcEl.value.trim();
    const x0Input = parseFloat(aproxEl.value);
    const tolInput = parseFloat(tolEl.value);
    const maxIterInput = parseInt(iterEl?.value) || 100;

    // Validar que tengan datos
    // Validar funcion
    if (!funcInput) {
        resultDiv.innerHTML = `<p style="color:red;">Introduce la función f(x).</p>`;
        return;
    }
    // Validar aproximacion inicial
    if (Number.isNaN(x0Input)) {
        resultDiv.innerHTML = `<p style="color:red;">La aproximación debe ser un número válido.</p>`;
        return;
    }
    // Validar tolerancia
     if (Number.isNaN(tolInput)) {
        resultDiv.innerHTML = `<p style="color:red;">La tolerancia debe ser un número válido.</p>`;
        return;
    }

    try {
        // Llama a la función de Newton-Raphson y muestra el resultado
        const result = raphson(funcInput, x0Input, tolInput, maxIterInput);
        resultDiv.innerHTML = `<center><p>Raíz aproximada: ${result.root}</p></center>
                               <center><p>Iteraciones: ${result.iterations}</p></center>`;
    } catch (err) {
        resultDiv.innerHTML = `<p style="color:red;">Error al calcular: ${err && err.message ? err.message : err}</p>`;
        console.error(err);
    }
});

// Aqui en verdad si me ayude de chatgpt
function raphson(func, x0, tol, maxIter = 10000) {
    let x = x0;
    let iterations = 0;
    while (iterations < maxIter) {
        // Evalua la funcion con el valor de x0
        const f_x = math.evaluate(func, { x: x });
        // Aqui la deriva primero y evalua con en x0
        const f_prime_x = math.derivative(func, 'x').evaluate({ x: x });
        // Si la derivada es cero, no se puede continuar
        if (f_prime_x === 0) {
            throw new Error('La derivada es cero. No se puede continuar.');
        }
        // Formula de Newton-Raphson
        const x_next = x - f_x / f_prime_x;
        if (Math.abs(x_next - x) < tol) {
            return { root: x_next, iterations: iterations + 1 };
        }
        // Actualiza x para la siguiente iteración
        x = x_next;
        iterations++;
    }
    return { root: x, iterations: iterations };
}

// Resultado mostrado dentro del handler de envío para evitar referencias fuera de alcance