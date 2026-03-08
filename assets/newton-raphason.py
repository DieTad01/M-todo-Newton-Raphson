import numpy as np;
import math as mt;

def newton_raphson_problema1():
    ## Necesito un error mas grande que 0 y puede ser 1
    error = 1
    ## Puedo 
    x_actual = 3.141592/2
    n = 1
    ## Mientras que el error sea grande puede dar comienzo al este
    while (error > 1e-12):
        funcion = np.sin(x_actual) - 0.5 * (x_actual)
        derivada = np.cos(x_actual) - 0.5
        x_siguiente = x_actual - (funcion/derivada)
        print(f"Iteracion: {n}, x_actual: {x_actual}, error: {error}")
        error = abs((x_siguiente - x_actual)/x_siguiente)
        x_actual = x_siguiente
        n += 1

    print(f"La raiz es: {x_actual}")

def newton_raphson_problema2():
    ## Necesito un error mas grande que 0 y puede ser 1
    error = 1
    ## Puedo 
    x_actual = 0
    n = 1
    ## Mientras que el error sea grande puede dar comienzo al este
    while (error > 1e-12):
        funcion = mt.exp(-x_actual) - x_actual
        derivada = -mt.exp(-x_actual) - 1
        x_siguiente = x_actual - (funcion/derivada)
        print(f"Iteracion: {n}, x_actual: {x_actual}, error: {error}")
        error = abs((x_siguiente - x_actual)/x_siguiente)
        x_actual = x_siguiente
        n += 1

    print(f"La raiz es: {x_actual}")

def main():
    ## No se te olviden los paratensis
    newton_raphson_problema1()
    newton_raphson_problema2()

main()