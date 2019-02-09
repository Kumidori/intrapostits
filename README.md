# Intranet Postits

Dieses Projekt entstand im Rahmen der Vorlesung Webentwicklung & Java Script Frameworks im SS/WS 18 bei Prof. Dr. Wolfgang Taube
und wurde von Nico Weingärtner entwickelt.

## Benutzer Dokumentation

In dieser Webapp können Notizen in Form von Post-its oder zu Deutsch Klebezettel zu den im Intranet der HFU gebuchten Kurse erstellt und verwaltet werden.
#### Registrieren
Um diese Webapp verwenden zu können müssen Sie sich mit Ihrem HFU Account zunächst einloggen, um daraufhin Ihre Kurse abzurufen. Das Passwort wird lediglich md5 kodiert in der Session bei Ihnen lokal gespeichert. Nach erfolgreicher Anmeldung sehen Sie ihre gebuchten Kurse in Form von Post-its, in der unteren rechten Ecke befindet sich ein blauer Kreis, welcher die Anzahl der bereits zu diesem Kurs erstellten Post-Its enthält. Nachdem Sie einen Kurs angeklickt haben, werden Sie auf die Kursseite weitergeleitet. In der Navigation sehen Sie in welchem Kurs Sie sich momentan befinden und haben die Möglichkeit üben den Zurück-Pfeil wieder auf dei Startseite zu gelangen. Auf der Kursseite erscheint ein Actionbutton mit einem + Symbol, über diesen Button können Sie neue Post-its zu dem aktuellen Kurs indem Sie sich befinden erstellen. Sobald ein Post-it erstellt wurde scrollt die App auf dessen Position und das darin befindliche Textfeld wird fokusiert. Nun können Sie eine kurze Notiz verfassen und durch klicken auf den Senden-Pfeil abschicken. Das neu erstellte Post-it sollte nun mit Text sichtbar sein und 2 Buttons enthalten. Mit dem Bearbeiten-Button symbolisiert durch einen Stift können Sie den Text des Post-its ändern und durch den Löschen-Button (Mülleimer) das Post-it komplett löschen. Diese erstellten Post-its sind für jeden sichtbar der Zugriff zu diesem Kurs hat. Post-its zeigen den Author nicht an (auch wenn diese Information gespeichert wurde) um die Hemmung zu senken öffentliche Notizen zu erstellen, Beispiel Jodel App.
### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
