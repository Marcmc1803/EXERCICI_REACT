# Desenvolupament Assistit per IA

Aquest projecte ha estat ampliat amb l'assistència d'una Intel·ligència Artificial (Antigravity). La IA s'ha utilitzat com un company de programació (pair-programmer) per dissenyar i implementar específicament la nova funcionalitat d'**Historial d'Activitat** sobre una base de codi ja existent.

## Procés de Desenvolupament (Peticions Clau)

Per integrar aquesta nova funcionalitat, s'han utilitzat les següents peticions incrementals a la IA:

1.  **Definicó del requeriment**: *"Tinc un projecte de gestió d'usuaris i organitzacions ja funcionant i vull afegir un historial d'activitat per rastrejar els canvis. Com ho podem estructurar?"*
2.  **Modelatge**: *"Necessito un model de TypeScript per a una `Activity` que contingui l'acció realitzada, la data i l'entitat afectada. Em pots ajudar amb la interfície?"*
3.  **Creació del Servei**: *"A partir de la meva factoria `HttpService` actual, podries crear el nou `ActivityService` que es connecti a l'endpoint de l'historial?"*
4.  **Integració en la lògica existent**: *"Com puc modificar els meus hooks actuals (`useUser` i `useOrganization`) perquè enregistrin una entrada a l'historial cada vegada que una operació de crear, editar o esborrar es completi amb èxit?"*
5.  **Disseny de la Interfície**: *"Implementa un component de llista per a l'historial que permeti filtrar i cercar accions, utilitzant els estils que ja fem servir al projecte."*

Aquest enfocament ha permès integrar una funcionalitat complexa de traçabilitat de forma modular i segura, respectant l'arquitectura original del projecte.

## Vídeo de l'Explicació

Podeu trobar una explicació detallada de la implementació i el funcionament en aquest vídeo:

[🎥 Veure vídeo de presentació](https://youtu.be/VaXKSYAd0no)
