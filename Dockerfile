#Version de nodejs
FROM node:12

#Crea directorio de trabajo
WORKDIR /app

#Copia todos los archivos
COPY package*.json ./

#Instalar dependencias
RUN npm install

#Copiar los archivos al contenedor
COPY . .

#Puerto para recibir las solicitudes
EXPOSE 3000

#Comando de incio del contenedor
CMD ["npm", "start"]
