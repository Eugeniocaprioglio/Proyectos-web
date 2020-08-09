from tkinter import *
import tkinter.font as font
root = Tk()
root.title("Super Calculadora")

#fuentes
large_font = ("verdana", "20") #fuente del display
fuente = font.Font(size=17, weight="bold") #fuente de los botones

#ubicación y tamaño del display
e = Entry(root, width=15, borderwidth=5, font=large_font)
e.grid(row=0, column=0, columnspan=4, padx=10, pady=10)

#Definición de operaciones y comandos

display = False # Esta variable se inicializa en "false" para que no se borre el número en el diplay después de 
                # apretar botón de operación sino cuando se introduce el siguiente número

def button_click(number):

     global display
     if display:
          e.delete(0, END) 
          #después de haber apretado un botón de operación, al escribir el siguiente, borra el que estaba.
          display = False
     current = e.get()
     e.delete(0, END)
     e.insert(0, current + str(number)) 
     #esto es para que los dígitos aparezcan en el orden deseado
     return

def button_clear():

     e.delete(0, END)
     return

def button_suma():

     global operacion
     global display
     global num_1
     numero = e.get()
     num_1 = float(numero)
     operacion = "suma"
     display = True #Esta variable es para que borre el número actual al escribir el siguiente 
     return

def button_resta():

     global operacion
     global display
     global num_1
     numero = e.get()
     num_1 = float(numero)
     operacion = "resta"
     display = True
     return

def button_mult():

     global operacion
     global display
     global num_1
     numero = e.get()
     num_1 = float(numero)
     operacion = "mult"
     display = True
     return

def button_div():

     global operacion
     global display
     global num_1
     numero = e.get()
     num_1 = float(numero)
     operacion = "div"
     display = True
     return

def button_equal():
      
     global operacion
     global display
     global num_1
     numero = e.get()
     num_2 = float(numero)
     e.delete(0, END)
     if operacion == "div":
          num_3 = num_1 / num_2
     if operacion == "mult":
          num_3 = num_1 * num_2
     if operacion == "suma":
          num_3 = num_1 + num_2
     if operacion == "resta":
          num_3 = num_1 - num_2
     num_3_str = str(num_3)
     # El siguiente if es para transformar una representación "float" en "integer". Por ejemplo,
     # si el resultado es 35.0 lo transforma en 35 y lo hace cuando detecta que el último dígito es
     # "0". 
     if num_3_str[-1] == "0":
          num_3_str = num_3_str[0:len(num_3_str)-2]
     e.insert(0, num_3_str)
     display = True 
     return



#paddings de los botones
px = 5
py = 1
# Ahora se definen las funcionalidades, los tamaños y colores de los botones además de los estilos y tamaños de fuente.
# Cuando pasamos un parámetro al apretar un botón, debemos usar una función lambda
button_1 = Button(root, text="1", font= fuente, fg="white", width=px, height=1, bg="red", command=lambda: button_click(1))
button_2 = Button(root, text="2", font= fuente, fg="yellow", width=px,height=1, bg="black", command=lambda: button_click(2))
button_3 = Button(root, text="3", font= fuente, fg="white", width=px, height=1, bg="red", command=lambda: button_click(3))
button_4 = Button(root, text="4", font= fuente, fg="yellow", width=px, height=1, bg="black", command=lambda: button_click(4))
button_5 = Button(root, text="5", font= fuente, fg="white", width=px, height=1, bg="red", command=lambda: button_click(5))
button_6 = Button(root, text="6", font= fuente, fg="yellow", width=px, height=1, bg="black", command=lambda: button_click(6))
button_7 = Button(root, text="7", font= fuente, fg="white", width=px, height=1, bg="red",command=lambda: button_click(7))
button_8 = Button(root, text="8", font= fuente, fg="yellow", width=px, height=1, bg="black", command=lambda: button_click(8))
button_9 = Button(root, text="9", font= fuente, fg="white", width=px, height=1, bg="red",command=lambda: button_click(9))
button_0 = Button(root, text="0", font= fuente, fg="yellow", width=2*px+1, height=1, bg="green", command=lambda: button_click(0))
button_00 = Button(root, text="00", font= fuente, fg="yellow", width=px, height=1, bg="green", command=lambda: button_click("00"))
button_C = Button(root, text="C", font= fuente, fg="white", width=px, height=1, bg="blue", command=button_clear)
button_sumar = Button(root, text="+", font= fuente, fg="white", width=px, height=1, bg="blue", command=button_suma)
button_restar = Button(root, text="-", font= fuente, fg="white", width=px, height=1, bg="blue", command=button_resta)
button_multiplicar = Button(root, text="X", font= fuente, fg="white", width=px, height=1, bg="blue", command=button_mult)
button_dividir = Button(root, text="/", font= fuente, fg="white", width=px, height=1, bg="blue", command=button_div)
button_igual = Button(root, text="=", font= fuente, fg="white", width=2*px+1, height=1, bg="blue", command=button_equal)
button_punto = Button(root, text=".", font= fuente, fg="white", width=px, height=1, bg="blue", command=lambda: button_click("."))

# Ahora definimos la ubicación de los botones en el tablero
button_1.grid(row=3, column=0)
button_2.grid(row=3, column=1)
button_3.grid(row=3, column=2)
button_4.grid(row=2, column=0)
button_5.grid(row=2, column=1)
button_6.grid(row=2, column=2)
button_7.grid(row=1, column=0)
button_8.grid(row=1, column=1)
button_9.grid(row=1, column=2)
button_0.grid(row=4, column=0, columnspan=2)
button_00.grid(row=4, column=2)
button_C.grid(row=5, column=3)
button_igual.grid(row=5, column=0, columnspan=2)
button_sumar.grid(row=1, column=3)
button_restar.grid(row=2, column=3)
button_multiplicar.grid(row=3, column=3)
button_dividir.grid(row=4, column=3)
button_punto.grid(row=5, column=2)











root.mainloop()