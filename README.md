# Intranet Postits

Dieses Projekt entstand im Rahmen der Vorlesung Webentwicklung & Java Script Frameworks im SS18 bei Prof. Dr. Wolfgang Taube
an der Hochschule Furtwangen und wurde von Nico Weingärtner entwickelt.
> Da sich die Frameworks und auch der Code dieser App ständig ändern kann es sein das hier gezeigte Codebeispiele nicht auf dem neuesten Stand sind.

## Benutzer Dokumentation

In dieser Webapp können Notizen in Form von Post-its oder zu Deutsch Klebezettel zu den im Intranet der HFU gebuchten Kurse erstellt und verwaltet werden.
#### Registrieren
Um diese Webapp verwenden zu können müssen Sie sich mit Ihrem HFU Account zunächst einloggen, um daraufhin Ihre Kurse abzurufen. Das Passwort wird lediglich md5 kodiert in der Session bei Ihnen lokal gespeichert. 
#### Kursübersicht
Nach erfolgreicher Anmeldung sehen Sie ihre gebuchten Kurse in Form von Post-its, in der unteren rechten Ecke befindet sich ein blauer Kreis, welcher die Anzahl der bereits zu diesem Kurs erstellten Post-Its enthält. 
#### Kurs-Seite
Nachdem Sie einen Kurs angeklickt haben, werden Sie auf die Kursseite weitergeleitet. In der Navigation sehen Sie in welchem Kurs Sie sich momentan befinden und haben die Möglichkeit üben den Zurück-Pfeil wieder auf dei Startseite zu gelangen. Auf der Kursseite erscheint ein Actionbutton mit einem + Symbol, über diesen Button können Sie neue Post-its zu dem aktuellen Kurs indem Sie sich befinden erstellen. 
#### Post-it
Sobald ein Post-it erstellt wurde scrollt die App auf dessen Position und das darin befindliche Textfeld wird fokusiert. Nun können Sie eine kurze Notiz verfassen und durch klicken auf den Senden-Pfeil abschicken. Das neu erstellte Post-it sollte nun mit Text sichtbar sein und 2 Buttons enthalten. Mit dem Bearbeiten-Button symbolisiert durch einen Stift können Sie den Text des Post-its ändern und durch den Löschen-Button (Mülleimer) das Post-it komplett löschen. Diese erstellten Post-its sind für jeden sichtbar der Zugriff zu diesem Kurs hat. Post-its zeigen den Author nicht an (auch wenn diese Information gespeichert wurde) um die Hemmung zu senken öffentliche Notizen zu erstellen, Beispiel Jodel App.

## Technische Dokumentation

### Frontend
Das Frontent wurde mit React und Apollo realisiert im Detail wurden folgende npm module verwendet:
``` 
    "@material-ui/core": "^1.4.3",
    "@material-ui/icons": "^2.0.1",
    "apollo-boost": "^0.1.13",
    "graphql": "^0.13.2",
    "graphql-tag": "^2.9.2",
    "history": "^4.7.2",
    "md5": "^2.2.1",
    "react": "^16.4.2",
    "react-apollo": "^2.1.11",
    "react-dom": "^16.4.2",
    "react-router-dom": "^4.3.1",
    "react-scripts": "1.1.4"
```
#### Apollo
Apollo stellt die Verbindung zwischen dem GraphQL-Server und der React App her. Hierdurch werden die React Komponenten durch Apollo erweitert und durch GraphQL Abfragen mit Daten befüllt.
Für die Integration von Apollo verwendete ich apollo-boost. Apollo-boost ist das von Apollo empfohlene Starter-Kit, welches einen großteil an Voreinstellungen bereits übernimmt, jedoch genug erweiterbar ist um für diese Webapp auszureichen. Für weitere Information zu apollo-boost: https://www.apollographql.com/docs/react/essentials/get-started.html .
Die benötigten User-Informationen für die Abfragen auf dem Backend werden bei jeder Apollo Query/Mutation über den Context mitgeliefert
```    
    const client = new ApolloClient({
    uri: "/api",
    request: async (operation) => {
        operation.setContext({
        headers: {
            username: sessionStorage.getItem('username'),
            password: sessionStorage.getItem('password')
        }
        });
    }
    });
```
#### Navigation
Die Navigation erfolgt über den React-Router dem außerdem eine history übergeben wird um den Zurück-Button zu realisieren
```     
    const App = () => (
        <ApolloProvider client={client}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/course/:id" component={SingleCoursePage}/>
                </Switch>
            </Router>
        </ApolloProvider>
    );
```
Die 3 Hauptseiten, welche über den Router navigiert werden bestehen aus der Login-Seite, der Kursübersicht (hier Home) und der Kursseite eines einzelnen Kurses (hier SingleCoursePage ). Bei dem Wechsel von der Kursübersicht auf einen einzelnen Kurs wird die Id des Kurses als Parameter über die URL mitgegeben um damit die Daten des einzelnen Kurses abzurufen. Dies wäre in der aktuellen Version der App jedoch nicht mehr nötig, da ich nun den Apollo Cache als State für die App verwende und diese Information daraus schöpfen kann (mehr zu der Datenhaltung später).

#### Login
Die Loginkomponente ist dafür zuständig die in den 2 Texfeldern eingetragen Daten Benutzername und Passwort über eine Mutation, welche durch die Apollo Mutation Komponente (siehe https://www.apollographql.com/docs/react/essentials/mutations.html) ausgelöst wird, an unser Backend zu senden, um den Benutzer über das Intranet zu authentifizieren.
#### Kursübersicht
Ist der Benutzer erfolgreich eingeloggt wird die Courses-Komponente angezeigt welche über eine Apollo Query alle im Intranet eingetragenen Kurse abruft und dazu eine SingleCourse-Komponente rendert. Diese Komponente ist zeigt den Namen des Kurses,die Anzahl der zu diesem Kurs erstellten Post-its an und verlinkt auf die Kursseite.
``` 
     <Card className="my-card">
            <Link to={`course/${this.props.id}`}>
                <CardContent>
                <Typography variant="headline" component="h2">
                    {this.props.name}
                </Typography>
                </CardContent>
                </Link>
                <Query
                    query={GET_POSTS_IN_COURSE}
                    variables={{ id: this.props.id.toString() }}
                >
                {({ loading, error, data, refetch }) => {
                    if (loading) return <div className="my-delete-btn">...</div>
                    if (error) return <div className="my-delete-btn">err</div>
                    console.log(data)
                    return <div className="my-delete-btn"><Chip color="primary" variant="outlined" label={data.getPostItsInCourse.length}/></div>
                }}
                </Query>
        </Card>
```
#### Kursseite
Die "Kursseite" besteht aust 3 Komponenten:
**SingleCoursePage** stellt den Grundaufbau der Kursseite da und beinhaltet Die Navigation, den Fab-Button und die PostItList
**PostItList** ist zuständig für das rendern der einzelnen Post-its und auch für die Post-it-Erstellung über eine Mutation
**PostIt** diese Komponente stellt ein einzelnes Post-it mit dessen Textinhalt und den 2 Actionbuttons dar. Hier werden auch die 2 Funktionen Bearbeiten und Löschen über Mutations ausgeführt.

#### Design
Einiges an CSS wurde von mir geschrieben um den gewünschten Post-it Look zu kreieren zudem wurden jedoch Komponenten aus Material-UI-React(https://material-ui.com/) verwendet.
Dazu gehören zum Beispiel die Appbar, der Fab-Button und die Card-Komponente. Diese Komponenten wurden großteils stark bearbeitet. Für das Layout benutze ich CSS-Grid und Flexbox. CSS-Grid ist relativ neu in CSS und wird noch nicht von allen Browsern unterstützt (https://caniuse.com/#feat=css-grid), stellt für mich jedoch die Zukunft dar und macht das Layout Design um einiges angenehmer.

### Backend

### Deployment
