# Intranet Postits

Dieses Projekt entstand im Rahmen der Vorlesung Webentwicklung & Java Script Frameworks im SS18 bei Prof. Dr. Wolfgang Taube
an der Hochschule Furtwangen und wurde von Nico Weingärtner entwickelt.

## Benutzer Dokumentation

In dieser Webapp können Notizen in Form von Post-its oder zu Deutsch Klebezettel zu den im Intranet der HFU gebuchten Kurse erstellt und verwaltet werden.
#### Registrieren
Um diese Webapp verwenden zu können müssen Sie sich mit Ihrem HFU Account zunächst einloggen, um daraufhin Ihre Kurse abzurufen. Das Passwort wird lediglich md5 kodiert in der Session bei Ihnen lokal gespeichert. 
#### Kursübersicht
Nach erfolgreicher Anmeldung sehen Sie ihre gebuchten Kurse in Form von Post-its, in der unteren rechten Ecke befindet sich ein blauer Kreis, welcher die Anzahl der bereits zu diesem Kurs erstellten Post-Its enthält. 
#### Kurs-Seite
Nachdem Sie einen Kurs angeklickt haben, werden Sie auf die Kursseite weitergeleitet. In der Navigation sehen Sie in welchem Kurs Sie sich momentan befinden und haben die Möglichkeit üben den Zurück-Pfeil wieder auf dei Startseite zu gelangen. Auf der Kursseite erscheint ein Actionbutton mit einem + Symbol, über diesen Button können Sie neue Post-its zu dem aktuellen Kurs indem Sie sich befinden erstellen. 
####Post-it
Sobald ein Post-it erstellt wurde scrollt die App auf dessen Position und das darin befindliche Textfeld wird fokusiert. Nun können Sie eine kurze Notiz verfassen und durch klicken auf den Senden-Pfeil abschicken. Das neu erstellte Post-it sollte nun mit Text sichtbar sein und 2 Buttons enthalten. Mit dem Bearbeiten-Button symbolisiert durch einen Stift können Sie den Text des Post-its ändern und durch den Löschen-Button (Mülleimer) das Post-it komplett löschen. Diese erstellten Post-its sind für jeden sichtbar der Zugriff zu diesem Kurs hat. Post-its zeigen den Author nicht an (auch wenn diese Information gespeichert wurde) um die Hemmung zu senken öffentliche Notizen zu erstellen, Beispiel Jodel App.

## Technische Dokumentation

### Frontend

### Backend
