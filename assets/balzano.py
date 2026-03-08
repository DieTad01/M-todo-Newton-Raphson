import numpy as np
import math as mt

def balzano_problema1():
    a = 1.5
    b = 1.6
    error = 0.01
    Er = 1
    ## F(x) = ln(x) + x - 2
    i = 0

    ## Paso 0.0
    ## Esta formula sirve para saber cuantas iteraciones
    n = (np.log(b - a) - np.log(error)) / np.log(2)

    ## Paso 0
    funcionA = np.log(a) + a - 2
    funcionB = np.log(b) + b - 2
    print(f"Paso 0")
    print(f"Intervalo: [{a}, {b}]")
    print(f"Funcion A: {funcionA}, Funcion B: {funcionB}")
    print(f"Numero de iteraciones estimadas: {n}\n")
    if (funcionA * funcionB < 0):
        while (Er > error):
            print(f"Iteracion: {i + 1}")
            ## Paso 1
            ## Se saca el punto medio para sacar los nuevos intervalos
            m = (a + b) / 2
            print(f"Paso 1")
            print(f"El punto medio es: {m}")
            ## Se saca la funcion del punto medio para las validaciones
            funcionM = np.log(m) + m - 2
            print(f"Funcion M: {funcionM}")
            ## Paso 2
            ## Si sale 0 es la raiz
            print(f"Paso 2")
            if (funcionA * funcionM == 0):
                print(f"La raiz es: {m}")
                break
            elif (funcionA * funcionM < 0):
                ## Si es negativo
                b = m
                print(f"B cambio por M")
                print(f"El intervalo es: [{a}, {b}]")
            else:
                ## Si es positivo
                a = m
                print(f"A cambio por M")
                print(f"El intervalo es: [{a}, {b}]")
            ## Paso 3
            print(f"Paso 3")
            Er = (b - a) / 2
            print(f"El error es: {Er}\n")
    else:
        print(f"Elija otro intervalo")


def main():
    balzano_problema1()

main()      
