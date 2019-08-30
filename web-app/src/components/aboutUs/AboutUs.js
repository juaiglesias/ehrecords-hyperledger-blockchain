import React from 'react';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

export default function AboutUs() {
    return (
        <Container maxWidth="sm" component="main" className={"MuiContainer--01"}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            About Us
            </Typography>
            <Typography color="textPrimary" component="h2" variant="h4" align="center">
                Proyecto Final de la Carrera de Ingeniería en Sistemas de Computación.
            </Typography>
            <Typography color="textSecondary" component="h3" variant="h5" align="center" gutterBottom> 
                Juan Iglesias
            </Typography>

            <Typography color="textSecondary" component="p">
            La salud digital, o e-Health, definida por la OMS (Organización Mundial de la Salud) como el 
            uso coste-efectivo y seguro de las tecnologías de la información y comunicación (TIC) en el 
            campo de la salud, abarca un gran conjunto de productos y servicios, y presenta un avance de 
            enorme magnitud dentro del área de la sanidad. Uno de los servicios más importantes es el de 
            los Registros Médicos Electrónicos, también conocidos como Historias Clínicas Electrónicas, 
            los cuales corresponden al conjunto de datos de salud propios de un individuo. Esta información 
            es crítica y necesita ser compartida, pero también es privada y de alta sensibilidad, por lo 
            cual el acceso a la misma debe ser regulado.	 	 	
            </Typography>
            <Typography color="textSecondary" component="p">
            Blockchain es una lista de registros, llamados bloques, que están unidos entre si mediante 
            el uso de la criptografía. Cada bloque almacena el hash del anterior, una estampilla de 
            tiempo y la información de la transacción. Debido a esto, el Blockchain es resistente frente 
            a la modificación de la información. Para ser utilizado como una “Distributed Ledger”, un 
            blockchain es manejado por una red peer-to-peer que colectivamente adhiere a un protocolo 
            para la comunicación entre los nodos y la validación de nuevos bloques. Una vez almacenada, 
            la información de cualquier de los bloques no puede ser alterada de forma retroactiva sin 
            alterar todos los bloques siguientes, lo que requiere consenso de la mayoría de la red.
            </Typography>
            <Typography color="textSecondary" component="p">
            El Blockchain ofrece la posibilidad de desarrollar una plataforma en la cual las interacciones 
            de los datos se hagan de forma descentralizada, pero garantizando el control de acceso e integridad 
            de la información.
            </Typography>
            <Typography color="textSecondary" component="p">
            Este proyecto final consiste en la planificación e implementación de un Sistema de Registros 
            Médicos Electrónicos Compartidos utilizando Blockchain. Se investigarán múltiples tecnologías 
            para su desarrollo, así como también se evaluarán diversas arquitecturas para el diseño del sistema. 
            También se considerará la posibilidad de integrar al sistema otros servicios como la gestión de 
            turnos médicos, la prescripción de medicamentos y certificados, las investigaciones clínicas, y 
            las obras sociales.
            </Typography>

        </Container>
    );
}